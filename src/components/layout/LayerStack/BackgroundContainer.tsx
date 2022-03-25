import React from 'react'
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
import Background from "../../viewer/Background";
type BackgroundContainerProps = {
    parentRef:any
}
function BackgroundContainer(props:BackgroundContainerProps) {
    return (
        <Layer id={Layers.BACKGROUND} >
            <Background />
        </Layer>
        
    )
}

export default BackgroundContainer

