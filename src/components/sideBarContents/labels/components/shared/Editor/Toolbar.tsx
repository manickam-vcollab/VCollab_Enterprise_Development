import { Editor ,Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import { ToggleButton } from "@material-ui/lab";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const alignment = ["alignLeft", "alignRight", "alignCenter"];
const list_types = ['numbered-list', 'bulleted-list'];

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  });

  return !!match;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = list_types.includes(format);
  const isIndent = alignment.includes(format);
  const isAligned = alignment.some((alignmentType) =>
    isBlockActive(editor, alignmentType)
  );

  /*If the node is already aligned and change in indent is called we should unwrap it first and split the node to prevent
    messy, nested DOM structure and bugs due to that.*/
  if (isAligned && isIndent) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        alignment.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true
    });
  }

  /* Wraping the nodes for alignment, to allow it to co-exist with other block level operations*/
  if (isIndent) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: []
    });
    return;
  }
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      list_types.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });
  if (isList && !isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: []
    });
  }
};

const MarkButton = ({ format, label,children}) => {
  const editor = useSlate();
  return (
    <ToggleButton
      size="small"
      selected={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      value={format}
      aria-label={label}
    >
      {children}
    </ToggleButton>
  );
};

const BlockButton = ({ format, label,children}) => {

  const editor = useSlate();
  return (
    <ToggleButton
      size="small"
      selected={isBlockActive(editor, format)}
      format={format}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
      value={format}
      aria-label={label}
    >
      {children}
    </ToggleButton>
  );
};

const ToolBar =()=>{

  return (
    <div>
        <MarkButton format="bold" label="bold">
           <FormatBoldIcon fontSize="small" />
        </MarkButton>
        <MarkButton format="italic" label="italic">
           <FormatItalicIcon fontSize="small" />
        </MarkButton>
        <MarkButton format="underline" label="underlne">
           <FormatUnderlinedIcon fontSize="small" />
        </MarkButton>
        <MarkButton format="strikethrough" label="strikethrough">
           <StrikethroughSIcon fontSize="small"/>
        </MarkButton>
        <BlockButton format="alignLeft" label="alignLeft">
          <FormatAlignLeftIcon fontSize="small"/>
        </BlockButton>
        <BlockButton format="alignCenter" label="alignCenter">
          <FormatAlignCenterIcon fontSize="small"/>
        </BlockButton>
        <BlockButton format="alignRight" label="alignRight">
          <FormatAlignRightIcon fontSize="small"/>
        </BlockButton>
        <BlockButton format="numbered-list" icon="format_list_numbered" >
          <FormatListNumberedIcon fontSize="small"/>
        </BlockButton>
        <BlockButton format="bulleted-list" icon="format_list_bulleted" >
          <FormatListBulletedIcon fontSize="small"/>
        </BlockButton>

    </div>

  )
}

export default ToolBar;
