import React, { useRef, useEffect } from 'react'

import {useAppDispatch, useAppSelector} from '../../../../../../store/storeHooks'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { batch} from 'react-redux';
import { selectActiveViewerID } from '../../../../../../store/appSlice';
import { ILabel, Label3D, Label3DType, LabelType } from '../../../../../../store/sideBar/labelSlice/shared/types';
import { selectCameraMatrix } from '../../../../../../store/sideBar/sceneSlice';
import { get3DLabelCanvasPos } from '../../../../../../backend/viewerAPIProxy';

type Props = {
    labelTree: {[id:string]:ILabel},
    onStart?: () => void,
    onRotate?: () => void,
    onStop?: () => void,
    toggleVisibilityReducer: ActionCreatorWithPayload<
    {
        toShow: boolean;
        nodeId: string;
    },string>,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
        anchor?: [number, number];
    },string>
}

const isLeafNode = (node:Label3D):boolean => {
    return node.title.includes("N:");
}
function useHideOnRotate(props:Props) {
    const timer = useRef<any | null>(null);
    const wasVisible = useRef<{[id:string]:boolean}>({});
    const dispatch = useAppDispatch();
    const viewerId = useAppSelector(selectActiveViewerID);
    const cameraMat = useAppSelector(selectCameraMatrix);
    const labelTree = props.labelTree;
    const toggleVisibility = props.toggleVisibilityReducer;
    const setLabelPos = props.setLabelPosReducer;
    useEffect(() => {
        if(Object.values(labelTree).length === 0)
        return;

        if(props.onRotate)props.onRotate();
        if (timer.current !== null){
            clearTimeout(timer.current);
        } 
        else{
            //first
            if(props.onStart)props.onStart() 
            batch(() => {
                Object.values(labelTree).forEach(l => {
                    if(l.labelType !== LabelType.LABEL2D && isLeafNode(l)){
                        wasVisible.current[l.id] = l.state.visibility ? true : false;
                         dispatch(toggleVisibility({
                            toShow: false,
                            nodeId: l.id
                        }))
                    }
                });
            })
        }
        timer.current = setTimeout(() => {
            if(props.onStop)props.onStop();
            batch(() => {
                Object.values(labelTree).forEach(l => {
                    if(l.labelType !== LabelType.LABEL2D && isLeafNode(l)) {
                        let hitPos = get3DLabelCanvasPos(l.id,viewerId) as [number,number];
                        let p = l.pos;
                        if(hitPos){
                            let isInitial = p[0] === 0 && p[1] === 0 ? true : false; 
                            dispatch(setLabelPos({id:l.id,pos:isInitial?hitPos:p, anchor:hitPos}));
                        }
                        //last
                        if(wasVisible.current[l.id]){
                            dispatch(toggleVisibility({
                                toShow: true,
                                nodeId: l.id
                            }));
                        }
                    }
                });
            });
            timer.current = null; 
            
        },500);
},[cameraMat])
}

export default useHideOnRotate
