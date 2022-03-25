import React from 'react'
import Viewer from "../../viewer"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
interface ViewerContainerProps {
    parentRef: any
}
function ViewerContainer(props:ViewerContainerProps) {
    return (
        <Layer id={Layers.VIEWER}>
            <Viewer/>
        </Layer>
    )
}

export default ViewerContainer
