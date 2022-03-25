import { TreeNode, ITreeState } from "./types";

export const getNode = (id:string, state:ITreeState):TreeNode|undefined => {
    return state.data[id];
}

export const traverseNode = (rootNodeId:string, state:ITreeState, callback:(node:TreeNode)=>void) => {
    let node = getNode(rootNodeId,state);
    if(node) {
      callback(node);
      if(node.children.length > 0) {
        node.children.forEach(nodeId => {
          traverseNode(nodeId,state,callback);
        })
      }
    }
    
}

const getCheckedChildCount = (nodes:TreeNode[]) => {
    let checkedCount = 0;
    let partialCount = 0;
    nodes.forEach(node => {
      if(node.state.checked){
        checkedCount++;
      }
      if(node.state.partiallyChecked){
        partialCount++;
      }
    });
    return [checkedCount,partialCount];
}

const getHiddenChildCount =(nodes:any[]) => {
  let hiddenCount =0;
  nodes.forEach(node => {
    if(node.state.visibility){
      hiddenCount++;
    }
  });
  return hiddenCount;
}
const getHighlightChildCount = (nodes:any[]) => {
  let highlightedCount =0;
  nodes.forEach(node => {
    if(node.state.highlighted){
      highlightedCount++;
    }
  });
  return highlightedCount;
}

const updateHighlightState = (parent:any,state:ITreeState) => {
  let highlighted = getHighlightChildCount(parent.children.map((c:any) => getNode(c,state)));
    if(highlighted === parent.children.length && parent.children.length >0){
      parent.state.highlighted = true;
    }
    else{
      parent.state.highlighted = false;
    }
}

const updateVisiblityState = (parent:any,state:ITreeState) =>{
  let hide= getHiddenChildCount(parent.children.map((c:any) => getNode(c,state)));
      if(hide === 0 && parent.children.length >0){
        parent.state.visibility =false;
      }
      else{
        parent.state.visibility =true;
      }
}

const updateCheckedState = (parent:any,state:ITreeState) => {
  let [checkedCount,partialCount] = getCheckedChildCount(parent.children.map((c:any) => getNode(c,state))); 
  if(checkedCount === 0){
    parent.state.checked = false;
    parent.state.partiallyChecked = false;
  }
  else if(checkedCount === parent.children.length){
    parent.state.checked = true;
    parent.state.partiallyChecked = partialCount > 0 ? true: false;
  } 
  else{
    parent.state.checked = true;
    parent.state.partiallyChecked = true;
  }
}

export const updateParent = (node:TreeNode, state:ITreeState) => {
    let parent = node.pid ? getParent(node.pid,state): null;
    if(parent){
      updateCheckedState(parent,state);
      updateVisiblityState(parent,state);
      updateHighlightState(parent,state);
      let grandParent = parent.pid ? getParent(parent.pid,state): null;
      if(grandParent !== null && grandParent !== undefined){
          updateParent(parent, state);
      }
    }
}

const getParent = (id:string,state:ITreeState):TreeNode|undefined => {
  return state.data[id];
}

const _checkNode = (toCheck:boolean, node:TreeNode, checkChildren:boolean,state:ITreeState) => {
    node.state.checked = toCheck;
    node.state.partiallyChecked = false;
    if(checkChildren === true && node.children) {
      node.children.map((c:string) => getNode(c,state)).forEach((node:TreeNode|undefined) => node ? _checkNode(toCheck,node,true,state) : null);
    }
}

const _hightlightNode = (toHighlight:boolean, node:TreeNode, checkChildren:boolean,state:ITreeState) => {
  node.state.highlighted = toHighlight;
  if(checkChildren === true && node.children) {
    node.children.map((c:string) => getNode(c,state)).forEach((node:TreeNode|undefined) => node ? _hightlightNode(toHighlight,node,true,state) : null);
  }
}

export const RcheckNode = (toCheck:boolean,node:TreeNode, state:ITreeState) => {

    _checkNode(toCheck,node,true, state);
    updateParent(node, state);
}

export const RHighlightNode = (toHighlight:boolean, node:TreeNode, state:ITreeState) => {
    _hightlightNode(toHighlight,node,true,state);
    updateParent(node,state);
}

export const RinvertNode = (node:TreeNode, state:ITreeState) => {
  
  if(node.children.length > 0)
  {
    node.children.map((c:string) => getNode(c,state)).forEach((e:any) => {
      RinvertNode(e,state);
    });
    const firstNodeId = node.children[0] as string;
    const firstNode = getNode(firstNodeId,state) as TreeNode;
    updateParent(firstNode,state);
  }
  else{
    _checkNode(!node.state.checked,node,true,state);
  }
}

export const setVisibility = (value:boolean,node:TreeNode,checkChildren:boolean,state:ITreeState) => {
    node.state.visibility = value;
    if(node.children.length > 0 && checkChildren === true){
    
      node.children.map((c:string) => getNode(c,state)).forEach((e:TreeNode | undefined) => e ? setVisibility(value,e,true,state) : null)
    }
}

export const RtoggleVisibility = (toShow:boolean, node:TreeNode,state:ITreeState) => {
  setVisibility(toShow,node,true,state);
  updateParent(node,state);
}