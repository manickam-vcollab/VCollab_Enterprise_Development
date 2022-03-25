// import { ThemeProvider, Remirror } from "@remirror/react";
// import { useRemirror } from "@remirror/react";
// import { ILabel } from "../../../../../../store/sideBar/labelSlice/shared/types";
// import {extensions, hooks, getInitialContent} from './common'
// import { BoldItalicUnderlineBtns, AlignButtons } from "./Buttons";
// const RMEditorSideBar = (props:{selectedLabels:ILabel[]}): JSX.Element => {
//     const { manager, state, onChange } = useRemirror({
//       extensions: extensions,
//       content: getInitialContent(props.selectedLabels)
//     });
  
//     return (
//       <ThemeProvider>
//         <Remirror
//           manager={manager}
//           autoFocus
//           onChange={onChange}
//           initialContent={state}
//           hooks={hooks}
//           autoRender='end'
//         >
//           <BoldItalicUnderlineBtns />
//           <AlignButtons/>
//         </Remirror>
//       </ThemeProvider>
//     );
//   };

// export default RMEditorSideBar