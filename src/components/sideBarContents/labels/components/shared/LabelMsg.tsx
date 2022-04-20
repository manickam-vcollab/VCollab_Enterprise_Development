import React, { forwardRef, } from 'react';
import Editor from "../shared/Editor/SlateEditorLabel"

type LabelMsgProps = {
    msg:string,
    bgColor: string
}

function LabelMsg(props:LabelMsgProps, ref:any) {
    return (
        <div ref={ref} style={{ backgroundColor:props.bgColor, width:'100%' , height:'100%', zIndex:1}}>{
            <Editor msg = {props.msg}/>
        }</div>
        
    )
}

export default forwardRef(LabelMsg)
