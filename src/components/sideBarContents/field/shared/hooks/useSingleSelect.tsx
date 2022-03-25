import React, { useState, useEffect } from 'react'
import {ITreeNode} from '../../../../shared/RsTreeTable'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import {useAppDispatch} from "../../../../../store/storeHooks"
interface Props {
    treeData: {[id:string]:ITreeNode},
    selectReducer?: ActionCreatorWithPayload<{
        leafOnly: boolean;
        nodeId: string;
    }, string>
}
function useSingleSelect(props: Props) : [string[],(rowData:any) => void] {
   const dispatch = useAppDispatch();
   const [selectedIds, setSelectedIds] = useState<string[]>([]);
   function handleSelect(rowData:any){
        if (props.selectReducer)
        dispatch(props.selectReducer({nodeId:rowData.id,leafOnly:true}))
   }
   useEffect(() => {
        let selected = Object.values(props.treeData).filter(e => e.state.selected).map(e => e.id);
        setSelectedIds(selected);
    },[props.treeData])
   return [selectedIds,handleSelect];
}

export default useSingleSelect
