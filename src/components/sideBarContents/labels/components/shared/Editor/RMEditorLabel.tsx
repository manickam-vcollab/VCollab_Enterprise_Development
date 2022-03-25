// import { forwardRef, useImperativeHandle, useCallback, useEffect } from 'react'

// import {
//   ReactExtensions,
//   ReactFrameworkOutput,
//   Remirror,
//   useRemirror,
//   useHelpers,
//   useCommands,
//   useKeymap
// } from '@remirror/react';
// import { makeStyles } from '@material-ui/core';
// import { extensions, Extensions } from './common';


// const useEditorStyles = makeStyles(theme => (
//   {
//     root: {
//       overflowY: 'hidden !important'
//     }
//   }
// ));
// const EditorWithRef = forwardRef<ReactFrameworkOutput<Extensions>>((props:any, ref) => {
//     const classes = useEditorStyles();
//     const { manager, state, setState, getContext, onChange } = useRemirror({ extensions,
//       content: props.content,
//       selection: 'start',
//     });
  
//     useImperativeHandle(ref, () => getContext(), [getContext]);

//     useEffect(() => {
//       manager.view.updateState(manager.createState({ content: props.content }));
//     },[props.content])
  
//     // Add the state and create an `onChange` handler for the state.
//     return (
//       <Remirror
//         {...props}
//         classNames={[classes.root]}
//         manager={manager}
//         editable={false}
//         state={state}
//         onChange={onChange}
//       >
//       </Remirror>
//     );
//   });

// export default EditorWithRef