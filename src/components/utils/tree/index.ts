import {ITreeNode, ITreeNodeState} from '../../shared/RsTreeTable'

const traverseParent = (rootId:string, data:{[id:string]:ITreeNode} ,cbk:(node:ITreeNode|null) => void) => {
    let root = data[rootId];
    if(root.pid !== '-1' && root.pid !== null) {
        let parent = data[root.pid];
        cbk(parent);
        traverseParent(parent.id, data, cbk);
    }
    else{
        cbk(null)
    }
}
const traverse = (rootId:string, data:{[id:string]:ITreeNode}, cbk:(node:ITreeNode) => void) => {
    let root = data[rootId];
    cbk(root);
    root.children.forEach(id => {
        traverse(id,data,cbk);
    })
}
const createTree = (rootId:string, data:{[id:string]:ITreeNode}):any => {
    let root = data[rootId];
    let expandedKeys:string[] = [];
    let treeNode: {[id:string]:any} = {
        id: root.id,
        title: root.title,
        state: root.state,
        children: [] as any[]
    }
    
    if(root.state.expanded)
    expandedKeys.push(root.id);

    if(root.matches)
    treeNode.matches = root.matches;

    root.children.forEach((id:string) => {
        let child = data[id]
        if(child)
        {
            let [node,expanded] = createTree(child.id,data);
            treeNode.children.push(node)
            expandedKeys = [...expandedKeys,...expanded];
        }
        
    })
    return [treeNode, expandedKeys]
}
export const getTreeData = (data:{[id:string]:ITreeNode}, results:ITreeNode[]) => {
    if(!data)
    return {}

    let treeData = [] as any[]
    let filteredData:{[id:string]:ITreeNode} = {}
    results.forEach(r => filteredData[r.id] = r);

    let expandedKeys:string[] = [];
    if(results.length > 0) {
        results.forEach(res => {
            traverse(res.id,data,(child) => {
                if(child && filteredData[child.id] === undefined)
                filteredData[child.id] = child
            })
            traverseParent(res.id,data,(parent) => {
                if(parent && filteredData[parent.id] === undefined)
                filteredData[parent.id] = parent
            })
        })
    }
        let input = results.length > 0 ? filteredData : data
        let rootNodes = Object.values(input).filter(node => (node.pid === "-1" || node.pid === null));
        rootNodes.forEach(root => {
            let [node, expanded] = createTree(root.id,input)
            treeData.push(node);
            expandedKeys = [...expandedKeys,...expanded]
        })
        return {treeData,expandedKeys}
    
    
} 

const createTreeNode = (id:string,data:{[id:string]:ITreeNode},expandedNodes:string[]) => {
    let node = data[id];
    if(node) {
      if(node.state.expanded) {
        expandedNodes.push(node.id);
      }
      let children:any[] = [];
      if(node.children.length > 0)
      {
        children = node.children.map((c:string) => createTreeNode(c,data,expandedNodes));
      }
      return {
        id: node.id,
        pid: node.pid,
        title: node.title,
        children
      }
    }

}
export  const convertListToTree = (data:{[id:string]:ITreeNode},rootIds:string[]) => {
    let roots:any[] = [];
    let expanded:string[] = [];
    rootIds.forEach(root => {
      let node = createTreeNode(root,data,expanded);
      if(node)
      roots.push(node)
    })
    return {roots,expanded};
}