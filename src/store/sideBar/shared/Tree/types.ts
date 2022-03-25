import { ITreeNode } from "../../../../components/shared/RsTreeTable";
export type {ITreeNode as TreeNode};

export interface ITreeState {
    data: {[id:string]:ITreeNode},
    rootIds: string[]
}