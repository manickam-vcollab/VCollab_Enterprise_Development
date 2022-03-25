import React,{useRef,useEffect} from 'react'
import ReactDOM from 'react-dom';
import { Label3D as ILabel3D } from '../../../../store/sideBar/labelSlice/shared/types'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { Layers, selectWindowMgr, setWindowSize } from '../../../../store/windowMgrSlice';
import Window from 'components/shared/CustomWindow';
import LabelMsg from './shared/LabelMsg';
import LabelAnchor from './shared/LabelAnchor';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import * as Sqrl from 'squirrelly'


type Label3DProps = {
    label:ILabel3D,
    windowPrefixId:string,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
        anchor?: [number, number];
    }, string>,
    parentRef: any,
    layerId:Layers
}

const getSQRLObj = (label:ILabel3D) => {
    return {
        nodeId: (options:any) => label.probeData +" "+ options.id,
        options: {id: label.title}
    }
}

function Label3D(props:Label3DProps) {
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const childRef = useRef<any | null>(null);
    const viewerDivRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const updateArrow = useXarrow();
    const handleWindowDrag = (e:any,data:any) => {
        console.log("drag",data);
        let l = props.label;
        let a = l.anchor;
        let newPos:[number,number] = [Math.max(0,l.pos[0] + data.deltaX),Math.max(0,l.pos[1]+data.deltaY)];
        dispatch(props.setLabelPosReducer({id: l.id,pos:newPos, anchor:a}));
        //updateArrow();
    }
    const handleWindowDragStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        console.log("drag Stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
        //updateArrow();
    }
    const handleWindowResize = () => {
        console.log("resize");
        //updateArrow();
    }
    const handleWindowResizeStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        console.log("resize stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
        //updateArrow();
    }
    useEffect(() => {
        let viewerDiv = document.getElementById("windows_container"+Layers.VIEWER);
        viewerDivRef.current = viewerDiv as HTMLDivElement;

    },[])
    useEffect(() => {
        if(childRef.current) {
            const div = childRef.current as HTMLDivElement;
            dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth+2,div.clientHeight+2]}));
        }
    },[childRef])
    useEffect(() => {
        updateArrow();
    },[props.label.anchor,props.label.pos])
    const label = props.label;
    return (
        
        < >
            {
                viewerDivRef.current ?
                ReactDOM.createPortal(
                <LabelAnchor ref={startRef} pos={label.anchor} visible={label.state.visibility ? true :false} />,
                viewerDivRef.current)
                :null
            }
            
                <Window
                layer={props.layerId}
                ref={endRef} 
                uid={props.windowPrefixId+label.id} 
                visible={label.state.visibility ? true : false}
                width={childRef?.current?.clientWidth | 0} 
                height={childRef?.current?.clientHeight | 0} 
                resize 
                parentRef={props.parentRef}
                xy={label.pos}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop}
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop}
                autoPositionOnResize = {false}
                >
                    
                    <LabelMsg ref={childRef} 
                    msg={Sqrl.render(label.label,getSQRLObj(label),{useWith:true})}
                    bgColor={label.bgColor}
                    />
                </Window>
                {
                    viewerDivRef.current ?
                ReactDOM.createPortal(
                    <Xarrow 
                start={startRef} 
                showXarrow={label.state.visibility}
                end={endRef} 
                path={'straight'} 
                strokeWidth={2}
                color={'black'}
                tailColor={'yellow'}
                showHead={false} 
                showTail={false}/>,
                viewerDivRef.current
                ):null
                }
                
        </>
    )
}

export default Label3D
