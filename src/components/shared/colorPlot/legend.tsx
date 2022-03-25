import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import {Palette, PaletteBuilder} from 'components/utils/palette/PaletteBuilder'
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { selectcolormapData, colormapElements, setColorMapSelection, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList, setLegendSettings,ColormapType ,selectColorPaletteData ,selectedColorPaletteId ,LegendDirection,LegendValuePlacement ,selectLegendTitle} from 'store/sideBar/colormapSlice';
import {selectWindowSize,setWindowSize} from 'store/windowMgrSlice';

function Legend() {
    const canvasRef = useRef(null);
    const paletteRef = useRef<Palette| null>(null);
    const [ctx, setCtx] = useState< CanvasRenderingContext2D | null>(null);
    const dispatch = useAppDispatch();

   // const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
    const appliedColorMapId = useAppSelector(state => state.colormap.appliedColorMapId);
    const paletteTypeArray = useAppSelector(paletteTypeDataList);
    const paletteDirectionArray =useAppSelector(directionDataList);
    const paletteTickPositionArray = useAppSelector(ticPositionDataList);
    const paletteTittlePlacementArray = useAppSelector(titlePlacementDataList);
    const paletteValuePlacementArray = useAppSelector(valuePlacementDataList);
    const colormapsData = useAppSelector(selectcolormapData);
    const legendTitle = useAppSelector(selectLegendTitle);
   // const colorPaletteData = useAppSelector(selectColorPaletteData);


    const appliedColorPalette = colormapsData[appliedColorMapId].colorPalette;
    const colorPaletteList = useAppSelector(state => state.colormap.colorPaletteTree.data);

    const colorSet =  colorPaletteList[appliedColorPalette].colorSet;
    const valueSet =   colorPaletteList[appliedColorPalette].valueSet;

    const [colorMapWindowSizeWidth ,colorMapWindowSizeHeight]  = useAppSelector(state=>selectWindowSize(state,'colorPlotWindow'));

    const paletteTypeID = colormapsData[appliedColorMapId].paletteType;
    const paletteDirectionID = colormapsData[appliedColorMapId].direction;
    const paletteTickPositionID = colormapsData[appliedColorMapId].ticPosition;
    const paletteTittlePlacementID = colormapsData[appliedColorMapId].titlePlacement;
    const paletteValuePlacementID = colormapsData[appliedColorMapId].valuePlacement;
    const paletteGap = colormapsData[appliedColorMapId].gap;



    let colorSetValues:string[] = [];

    colorSet.forEach(data => {

        let R = data.color.r ;
        let G = data.color.g ;
        let B = data.color.b ;
        let A = data.color.a ;

        let colors = 'rgba('+R+','+G+','+B+','+A+')';
        let hexValue = convertRGBtoHEX(colors);

         colorSetValues.push(hexValue);

    })


    function convertRGBtoHEX(colors:any) {

        const colorValue = colors;
        const rgba = colorValue.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

        const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        return hex ;

    }


    let paletteType:any;
    let paletteDirection:any;
    let paletteTickPosition:any; 
    let paletteTittlePlacement:any;
    let paletteValuePlacement:any;


    // palette Type
    paletteTypeArray.forEach( data => {
    if ( data.id === paletteTypeID ) {
        paletteType = data.type;
    }
    });

    // palette Direction
     paletteDirectionArray.forEach( data => {
        if ( data.id === paletteDirectionID ) {
            paletteDirection = data.direction;
        }
     });

    // palette tick position 
     paletteTickPositionArray.forEach(data=> {

        if(data.id === paletteTickPositionID ) {

            paletteTickPosition = data.ticktype;

        }

     });

     //palette tittle position 

     paletteTittlePlacementArray.forEach(data=> {

        if(data.id === paletteTittlePlacementID ) {

            paletteTittlePlacement = data.position;

        }

     });

     //palette value position

     paletteValuePlacementArray.forEach(data=> {

        if(data.id === paletteValuePlacementID ) {

            paletteValuePlacement = data.position;

        }

     });


    // palette direction change set window size 

    useEffect(()=> {

                if(paletteDirection === LegendDirection.VERTICAL) {

                    dispatch(setWindowSize({uid:'colorPlotWindow',size:[150,300]}));
                    
                }

                if(paletteDirection === LegendDirection.HORIZONTAL || paletteDirection === LegendDirection.AUTO) {

                    dispatch(setWindowSize({uid:'colorPlotWindow',size:[500,150]}));

                }

    },[paletteDirection]) 


    useEffect(() => {
        
        if(canvasRef.current) {

            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = colorMapWindowSizeWidth;
            canvas.height = colorMapWindowSizeHeight;
            setCtx(canvas.getContext('2d'));

            if(ctx){
                paletteRef.current = new PaletteBuilder().build();
            }    
        }
    },[canvasRef.current])


    useEffect(() => {

            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = colorMapWindowSizeWidth;
            canvas.height = colorMapWindowSizeHeight;


    },[colorMapWindowSizeWidth , colorMapWindowSizeHeight])

    useEffect(() => {
        
        if(paletteRef.current && ctx) {

            paletteRef.current.setPaletteType(paletteType);

            paletteRef.current.setPaletteDirection(paletteDirection);

            paletteRef.current.setPaletteTickPosition(paletteTickPosition);

            paletteRef.current.setPaletteTittlePlacement(paletteTittlePlacement);

            paletteRef.current.setPaletteValuePlacement(paletteValuePlacement);

            paletteRef.current.setPaletteColor(colorSetValues);

            paletteRef.current.setPaletteValue(valueSet);

            paletteRef.current.setPaletteGap(paletteGap);

            paletteRef.current.setLegendTitle(legendTitle);

            paletteRef.current.draw(ctx ,colorMapWindowSizeWidth ,colorMapWindowSizeHeight);   

        }
        return () => {
            if(ctx && canvasRef.current !== null) {   
                const canvas = canvasRef.current as unknown as HTMLCanvasElement;
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    })

    return (
        <>
        <canvas ref={canvasRef} >
        </canvas>
        </>
    )
}

export default Legend