import React from 'react'
import AxisTriadWindow from "../../../components/sideBarContents/scene/components/AxisTriadWindow"
import Legend from "../../sideBarContents/colormaps/shared/colorPlot/colorplotWindow"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
type ContainerProps = {
    parentRef:any
}
function Container(props:ContainerProps) {
    const layer = Layers.BACK;
    return (
        <Layer id={layer} >
            <AxisTriadWindow parentRef={props.parentRef} layerId={layer}/>
            <Legend parentRef={props.parentRef} layerId={layer}/>
        </Layer>
    )
}

export default Container

