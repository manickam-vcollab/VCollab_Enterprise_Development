import {PayloadAction} from '@reduxjs/toolkit'
import { TreeNode, ITreeState } from './types';
import {getNode, RcheckNode, RHighlightNode, RinvertNode, RtoggleVisibility, setVisibility, updateParent} from './helpers';
export const saveTreeReducer = (state:ITreeState, action : PayloadAction<{tree:{[id:string]:TreeNode},rootIds:string[]}>) => {
    state.data = action.payload.tree;
    state.rootIds = action.payload.rootIds;
}
export const checkNodeReducer = (state:ITreeState, action : PayloadAction<{toCheck:boolean,nodeId:string}>) => {
    const {toCheck,nodeId} = action.payload;
    let node = getNode(nodeId,state);
    if(node)
    RcheckNode(toCheck, node, state)
}
export const highlightNodeReducer = (state:ITreeState, action : PayloadAction<{toHighlight:boolean,nodeId:string}>) => {
  const {toHighlight,nodeId} = action.payload;
  let node = getNode(nodeId,state);
  if(node)
  RHighlightNode(toHighlight, node, state)
}
export const invertNodeReducer = (state:ITreeState, action : PayloadAction<{nodeId:string}>) => {
    const {nodeId} = action.payload;
    let node = getNode(nodeId,state);
    if(node)
    RinvertNode(node,state);
}
export const expandNodeReducer = (state:ITreeState, action: PayloadAction<{toOpen:boolean, nodeId:string}>) => {
    const {toOpen,nodeId} = action.payload;
    let node = state.data[nodeId];
    if(node){
      node.state.expanded = toOpen;
    }
}
export const toggleVisibilityReducer = (state:ITreeState, action : PayloadAction<{toShow:boolean,nodeId:string}>) => {
    const {toShow,nodeId} = action.payload;
    let node = getNode(nodeId,state);
    if(node)
    RtoggleVisibility(toShow,node,state);
}
export const setCheckedVisibilityReducer = (state:ITreeState, action:PayloadAction<{toShow:boolean,leafIds:string[]}>) => {
    const {toShow,leafIds} = action.payload;
    let pids = new Set<string>();
    leafIds.forEach((nodeId:string) => {
      let node = getNode(nodeId,state);
      if(node?.pid) 
      pids.add(node.pid);
      
      //  To make the intermediate parent node also selectable.
      // if(node && node.children.length === 0)
      if(node)
      {
        setVisibility(toShow,node,true,state);
      }
  });
    pids.forEach((pid:string) => {
      let node = getNode(pid,state);
      let firstChild = node? getNode(node.children[0],state) : null;
      if(firstChild && firstChild.children.length >= 0)
      {
        updateParent(firstChild,state);
      }
    })
}
export const invertCheckedVisibilityReducer = (state:ITreeState, action:PayloadAction<{leafIds:string[]}>) => {
   const leafIds = action.payload.leafIds;
   let visible:string[] = [];
   let invisible:string[] = [];
   leafIds.forEach(id => {
     const node = getNode(id,state);
     node?.state.visibility ? visible.push(id) : invisible.push(id);  
   });
   setCheckedVisibilityReducer(state,{
     payload: {
       toShow: false,
       leafIds: visible
     },
     type: 'invertCheckedVisibilityReducer/setCheckedVisibilityReducer'
   });
   setCheckedVisibilityReducer(state,{
    payload: {
      toShow: true,
      leafIds: invisible
    },
    type: 'invertCheckedVisibilityReducer/setCheckedVisibilityReducer'
  });
}
export const selectNodeReducer = (state:ITreeState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
  const {leafOnly,nodeId} = action.payload;
    let node = state.data[nodeId];
    if(leafOnly){
      [...Object.values(state.data)].forEach(node => {
        if(node.id !== nodeId)
        node.state.selected = false;
      });
      if(node.children && node.children.length === 0) {
        node.state.selected = !node.state.selected;
      }
    }
}
export const addNodeReducer = (state:ITreeState, action:PayloadAction<TreeNode>) => {
  let node = action.payload;
  if(node.pid !== null && node.pid !== "-1"){
    let parent = state.data[node.pid];
    parent.children.push(node.id);

  }
  else{
    state.rootIds.push(node.id);
  }
  state.data[node.id] = node;
  
}
export const deleteNodeReducer = (state:ITreeState, action:PayloadAction<{nodeId:string}>) => {
  let nodeId = action.payload.nodeId;
  let current = state.data[nodeId];
  if(!current)
  return;

  let pid = current.pid;
  delete state.data[nodeId];

  if(pid && pid !== "-1") {
    let parent = state.data[pid];
    let index = parent.children.indexOf(nodeId);
    if(index > -1)
    parent.children.splice(index,1);
  }
  updateParent(current,state);
}

export const regroupReducer = (state:ITreeState, action:PayloadAction<{nodeId:string, newParentId: string}>) => {
  let nodeId = action.payload.nodeId;
  let node = state.data[nodeId]
  let newPid = action.payload.newParentId;
  const elementPid = state.data[nodeId].pid;

  state.data[elementPid?elementPid : "-1"].children = state.data[elementPid?elementPid : "-1"].children.filter(item => item !== nodeId)
  

  updateParent(node, state);

  // state.data[elementPid?elementPid : "-1"].state.checked = false;
  // state.data[elementPid?elementPid : "-1"].state.partiallyChecked = false;

  let newNote = {...state.data[nodeId]};
  newNote.pid = newPid;
  newNote.state.checked = false;

  addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
  updateParent(newNote, state);
}