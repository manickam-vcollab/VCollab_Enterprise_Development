import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import {fetchCameraMatrix, selectCameraMatrix, selectShowAxis} from '../../../../store/sideBar/sceneSlice'
import CustomWindow from "../../../shared/CustomWindow"
import {vec3, mat4} from "gl-matrix";
import { Layers, selectWindowSize } from '../../../../store/windowMgrSlice';

export const  windowId = "axisTriadWindow";
type Color = [number,number,number,number];
function drawAxes(ctx: CanvasRenderingContext2D, rotMat:mat4, width:number,height:number) {
    function drawX(ctx:CanvasRenderingContext2D, pos:vec3, r:number) {
     

      let x1 = pos[0];
      let y1 = pos[1];


      let fontWidth = 0;

      if(width>200 && height>200) {

        fontWidth = (width+height)/22;

      }
      else {

        fontWidth = 16;
      }
      

      ctx.save();
      ctx.translate(x1*1.2, (y1*1.2)-6);
      ctx.scale(1,-1);
      ctx.font = fontWidth+'px Times New Roman';
      ctx.textAlign = 'center';
      ctx.fillStyle ="#000000";
      ctx.fillText('X',0,0);
      ctx.restore();

    }
    function drawY(ctx:CanvasRenderingContext2D, pos:vec3, r:number) {

      let x1 = pos[0];
      let y1 = pos[1];

      let fontWidth = 0;

      if(width>200 && height>200) {

        fontWidth = (width+height)/22;

      }
      else {

        fontWidth = 16;
      }

      ctx.save();
      ctx.translate(x1*1.2, (y1*1.2)-7);
      ctx.scale(1,-1);
      ctx.font = fontWidth+'px Times New Roman';
      ctx.textAlign = 'center';
      ctx.fillStyle ="#000000";
      ctx.fillText('Y',0,0);
      ctx.restore();

    }
    function drawZ(ctx:CanvasRenderingContext2D, pos:vec3, r:number) {

      let x1 = pos[0];
      let y1 = pos[1];

      
      let fontWidth = 0;

      if(width>200 && height>200) {

        fontWidth = (width+height)/22;

      }
      else {

        fontWidth = 16;
      }

      ctx.save();
      ctx.translate(x1*1.2, (y1*1.2)-7);
      ctx.scale(1,-1);
      ctx.font = fontWidth+'px Times New Roman';
      ctx.textAlign = 'center';
      ctx.fillStyle ="#000000";
      ctx.fillText('Z',0,0);
      ctx.restore();

     
    }
    function drawArrow(ctx:CanvasRenderingContext2D, pos:vec3, color:Color) {
      var headlen = 8;
      var dx = pos[0] - 0;
      var dy = pos[1] - 0;
      var angle = Math.atan2(dy, dx);

      ctx.lineWidth = 2.5;
      ctx.beginPath();
      //ctx.moveTo(0, 0);
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
      ctx.lineTo(pos[0], pos[1]);
      ctx.lineTo(pos[0] - headlen * Math.cos(angle - Math.PI / 6), pos[1] - headlen * Math.sin(angle - Math.PI / 6));
      //ctx.moveTo(pos[0], pos[1]);
      ctx.lineTo(pos[0] - headlen * Math.cos(angle + Math.PI / 6), pos[1] - headlen * Math.sin(angle + Math.PI / 6));
      ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
      ctx.fill();
      ctx.closePath();
      ctx.stroke();

    }
    function drawLine(ctx:CanvasRenderingContext2D, pos:vec3,color:Color) {

      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
      ctx.lineTo(pos[0], pos[1]);
      ctx.closePath();
      ctx.stroke();
    }
    function drawAxis(ctx:CanvasRenderingContext2D, pos:vec3, axis:string, r:number, color:Color) {
      if(r < 0)
      return;
      drawLine(ctx, pos,color);
      drawArrow(ctx, pos, color);
      let textSize = r / 1.1;
      switch (axis) {
        case "x":
          drawX(ctx, pos, textSize);
          break;
        case "y":
          drawY(ctx, pos, textSize);
          break;
        case "z":
          drawZ(ctx, pos, textSize);
          break;
        default:
          break;
      }
    }
  
  ctx.resetTransform();
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctx.scale(1, -1);
  let scale = width / 2 * 0.7;
  let X = vec3.fromValues(rotMat[0], rotMat[1], rotMat[2]);
  let Y = vec3.fromValues(rotMat[4], rotMat[5], rotMat[6]);
  let Z = vec3.fromValues(rotMat[8], rotMat[9], rotMat[10]);
  vec3.scale(X,X,scale);
  vec3.scale(Y,Y,scale);
  vec3.scale(Z,Z,scale);
  
  let red:Color = [255, 0, 0, 1];
  let green:Color = [0, 255, 0, 1];
  let blue:Color = [0, 0, 255, 1];
  let zFirst = [
      { id: "x", pos: X, col:red },
      { id: "y", pos: Y, col:green },
      { id: "z", pos: Z, col:blue }
  ];
  zFirst.sort((a, b) => a.pos[2] - b.pos[2]);
  zFirst.forEach(e => {

      drawAxis(ctx,e.pos,e.id,width/20,e.col);
  })
}

interface Props {
    parentRef: any,
    layerId:Layers
}

function AxisTriadWindow(props:Props) {
    const dispatch = useAppDispatch();
    const showAxis = useAppSelector(selectShowAxis);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const rotMat = useAppSelector(selectCameraMatrix);
    const [width,height] = useAppSelector(state => selectWindowSize(state,windowId));
    useEffect(() => {
        dispatch(fetchCameraMatrix());
        if(canvasRef.current)
        ctxRef.current = canvasRef.current.getContext('2d');
    },[canvasRef.current])

    useLayoutEffect(() => {
        if(ctxRef.current) {
            drawAxes(ctxRef.current,new Float32Array(rotMat),width,height);
            
        }   
    },[rotMat, width, height])
    return (
        <>
        <CustomWindow uid={windowId} layer={props.layerId} visible={showAxis} resize parentRef = {props.parentRef} width={150} height={150}>
            {
                <canvas ref={canvasRef} width={width} height={height} ></canvas>
            }
        </CustomWindow>
        </>
    )
}

export default AxisTriadWindow