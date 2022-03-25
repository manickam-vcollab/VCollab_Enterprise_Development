import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'

import {Layers, selectWindowSize} from 'store/windowMgrSlice'

import { setEditMode , selectWindowMgr} from 'store/windowMgrSlice'

import CustomWindow from "components/shared/CustomWindow"
import Legend from "components/shared/colorPlot/legend";

import { selectcolormapData } from "store/sideBar/colormapSlice";


export const  windowId = "colorPlotWindow";

interface Props {
    parentRef: any,
    layerId:Layers
}


function ColorPlotdWindow(props:Props) {

    const colorMapData = useAppSelector(selectcolormapData);

   // const selectWindowManager = useAppSelector(selectWindowMgr).windows[windowId];

    const dispatch = useAppDispatch();

    return (

            <CustomWindow 
            uid={windowId}
            layer={props.layerId}
            visible={true} 
            resize={true} 
            parentRef = {props.parentRef} 
            width={100} 
            height={300} >
                {
                        
                        Object.values(colorMapData).length > 0 ?  <Legend></Legend> :null
                }
            </CustomWindow>
            
    )
}

export default ColorPlotdWindow