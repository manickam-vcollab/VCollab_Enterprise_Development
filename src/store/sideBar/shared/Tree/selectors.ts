import {RootState} from '../../../index'
import { ITreeState, TreeNode } from './types';
export const selectCheckedLeafNodes = (state:ITreeState):TreeNode[] => {
    let nodes = [...Object.values(state.data)] as TreeNode[];
    return nodes.filter((item: TreeNode) => item.children.length === 0 && item.state.checked);
}

export const selectUnCheckedLeafNodes = (state:ITreeState):TreeNode[] => {
    let nodes = [...Object.values(state.data)] as TreeNode[];
    return nodes.filter((item: TreeNode) => item.children.length === 0 && item.state.checked === false);
}