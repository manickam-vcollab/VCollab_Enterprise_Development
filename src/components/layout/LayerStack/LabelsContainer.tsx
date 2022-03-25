import React from 'react'
import Label3DWindowLayer from "../../sideBarContents/labels/components/Label3DWindowLayer"
import MeasurementWindowLayer from "../../sideBarContents/labels/components/MeasurementWindowLayer"
import Label2DWindowLayer from "../../sideBarContents/labels/components/Label2DWindowLayer"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
interface Label3DContainerProps {
    parentRef: any
}
function Label3DContainer(props:Label3DContainerProps) {
    const layer = Layers.FRONT;
    return (
        <Layer id={layer}>
        <Label3DWindowLayer parentRef={props.parentRef} layerId={layer} /> 
        <MeasurementWindowLayer parentRef={props.parentRef} layerId={layer} />
        <Label2DWindowLayer parentRef={props.parentRef} layerId={layer} />
        </Layer>
    )
}

export default Label3DContainer
