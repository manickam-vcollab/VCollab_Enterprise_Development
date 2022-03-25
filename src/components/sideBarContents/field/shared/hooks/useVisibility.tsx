import React, { useState, useEffect } from 'react'
import {ITreeNode} from '../../../../shared/RsTreeTable'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import {useAppDispatch} from "../../../../../store/storeHooks"
interface Props {
    source: {[id:string]:ITreeNode},
    target: {[id:string]:ITreeNode},
    targetSetVisibilityReducer?: ActionCreatorWithPayload<{
        toShow: boolean;
        nodeId: string;
    }, string>,
    targetIds: string[]
}

function useVisibility(props:Props): string[] {
    const dispatch = useAppDispatch();
    const [visibleIds, setVisibleIds] = useState<string[]>([]);
    useEffect(() => {
            let visible:string[] = [];
            let reducer = props.targetSetVisibilityReducer;
            if(reducer !== undefined) {
                Object.values(props.target).forEach(e => {
                    dispatch((reducer as any)({toShow:false,nodeId:e.id}))
                })
            }
            
            Object.values(props.target).forEach(e => {
            if(props.targetIds.includes(e.id)){
                visible.push(e.id);
                if(reducer)
                dispatch(reducer({toShow:true,nodeId:e.id}))
            }
            })
            setVisibleIds([...visible])
        
    },[props.targetIds])
    return visibleIds
}

export default useVisibility
