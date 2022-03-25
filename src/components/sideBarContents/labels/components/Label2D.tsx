import React,{useRef,useEffect, memo} from 'react'
import { Label2D as ILabel2D } from '../../../../store/sideBar/labelSlice/shared/types'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { Layers, selectWindowMgr, setWindowSize } from '../../../../store/windowMgrSlice';
import Window from '../../../shared/CustomWindow';
import LabelMsg from './shared/LabelMsg';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

type Label2DProps = {
    label:ILabel2D,
    layerId:Layers,
    windowPrefixId:string,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
    }, string>,
    parentRef: any
}

function Label2D(props:Label2DProps) {

    const childRef = useRef<any | null>(null);
    const dispatch = useAppDispatch();
    const handleWindowDrag = (e:any,data:any) => {
        console.log("drag",data);
        let l = props.label;
        let newPos:[number,number] = [Math.max(0,l.pos[0] + data.deltaX),Math.max(0,l.pos[1]+data.deltaY)];
        dispatch(props.setLabelPosReducer({id: l.id,pos:newPos}));
    }
    const handleWindowDragStop = (x:number,y:number) => {
        let l = props.label;
        console.log("drag Stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y]}));
    }
    const handleWindowResize = () => {
        console.log("resize");
    }
    const handleWindowResizeStop = (x:number,y:number) => {
        let l = props.label;
        console.log("resize stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y]}));
    }
    useEffect(() => {
        if(childRef.current) {
            const div = childRef.current as HTMLDivElement;
            dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth+2,div.clientHeight+2]}));
        }
    },[childRef])
    
    const label = props.label;
    return (
        < >
                <Window
                uid={props.windowPrefixId+label.id} 
                layer={props.layerId}
                visible = {label.state.visibility ? true : false} 
                width={childRef?.current?.clientWidth | 0} 
                height={childRef?.current?.clientHeight | 0} 
                resize 
                parentRef={props.parentRef}
                xy={label.pos}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop}
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop}
                >
                    <LabelMsg ref={childRef} msg={label.label} bgColor={label.bgColor}/>
                </Window>
        </>
    )
}

export default Label2D
