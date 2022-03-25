import { useMemo, useState ,useEffect ,useCallback, useRef } from 'react'
import { Editable, withReact, Slate ,ReactEditor ,useSlate  } from 'slate-react'
import {
  BaseEditor ,
  createEditor,
  Descendant,
  Transforms,
  Element as SlateElement,
} from 'slate'
import { HistoryEditor ,withHistory } from 'slate-history';


type CustomText = { text: string }
type CustomElement = { type: 'paragraph'; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}


const Element = (props:any) => {

  const {attributes, children, element} = props;

  switch (props.element.type) {

      case 'alignLeft':
          return <div style={{textAlign:'left',listStylePosition:'inside'}} {...attributes}>{children}</div>
      case 'alignCenter':
          return <div style={{textAlign:'center',listStylePosition:'inside'}} {...attributes}>{children}</div>
      case 'alignRight':
          return <div style={{textAlign:'right',listStylePosition:'inside'}} {...attributes}>{children}</div>
      case 'bulleted-list':
        return <ul style={{margin:'0px'}} {...attributes}>{children}</ul>
      case 'list-item':
            return  <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol style={{margin:'0px'}} {...attributes}>{children}</ol>
      default:
       return <p style={{margin:'0px'}} {...attributes}>{children}</p>
  }
} 

const Leaf = (props:any) => {

  let {attributes, children ,leaf} = props;

    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
    if (leaf.italic) {
      children = <em>{children}</em>
    }
    if (leaf.underline) {
      children = <u>{children}</u>
    }
    if(leaf.strikethrough){
      children = <del>{children}</del>
    }


    // if (leaf.code) {
    //   children = <code>{children}</code>
    // }

    // if(leaf.superscript){
    //     children = <sup>{children}</sup>
    // }
    // if(leaf.subscript){
    //     children = <sub>{children}</sub>
    // }
    // if(leaf.color){
    //     children = <span style={{color:leaf.color}}>{children}</span>
    // }
    // if(leaf.bgColor){
    //     children = <span style={{backgroundColor:leaf.bgColor}}>{children}</span>
    // }

return <span {...attributes}>{children}</span>
}

export default function LabelEditor(props:{msg:string}) {   

  const countRef = useRef(0);

  const [value, setValue] = useState<Descendant[]>(JSON.parse(props.msg));

  const editor = useMemo(() => withReact(withHistory(createEditor())), [])

  const renderElement = useCallback(props => <Element {...props}/>,[])

  const renderLeaf = useCallback(props =>  <Leaf {...props} />,[])  

  useEffect(()=> {

        countRef.current +=1;
        if(countRef.current > 1) {
            Transforms.select(editor,[]);
            Transforms.insertNodes(
              editor,
              JSON.parse(props.msg),
              { at: [0] }
            )
            Transforms.delete(editor);
        }
  },[props.msg])

    return (

      <Slate editor={editor} value={value} onChange={(newValue)=>{setValue(newValue)}}>
          <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly
          />
      </Slate>
    )
}
