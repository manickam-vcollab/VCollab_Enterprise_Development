import React, { useEffect, useState } from 'react'
import { EventDispatcher } from '../../backend/EventDispatcher';
import {getEventDispatcher,getEventsList} from "../../backend/viewerAPIProxy";
import { useAppDispatch , useAppSelector } from '../../store/storeHooks';
import { setModelLoadingStatus, setInteractionModeAsync , selectActiveViewerID } from '../../store/appSlice';
import { handlePlaneSelection } from '../../store/sideBar/clipSlice';
import {init as label2dInit, handleLabel2DCreation, handleProbeLabelCreation} from '../../store/sideBar/labelSlice/labelAllSlice';
import { addMessage, updateMessage, NetworkData, NotificationType, finishMessage } from '../../store/sideBar/messageSlice';
import { handleHighlightAsync } from '../../store/sideBar/productTreeSlice';
import { fetchCameraMatrix } from '../../store/sideBar/sceneSlice';
import { toastMsg } from '../../store/toastSlice';
import { viewerEvents } from '../../backend/ViewerManager';
type Props = {
    mount: boolean
}

function setup(dispatch:any) {
  dispatch(label2dInit({}));
}
function EventRegistry(props: Props) {
    const dispatch = useAppDispatch();
    const activeViewerID = useAppSelector(selectActiveViewerID);
    setup(dispatch);
    useEffect(() => {
        if(props.mount) {
            let eventDispatcher = getEventDispatcher();
            let events = getEventsList();
            
            eventDispatcher?.addEventListener(
                events.viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,
                (event : any) => {
                  dispatch(setModelLoadingStatus(event.data));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.DOWNLOAD_START,
                (event: any) => {
                  let data = event.data;
                  let networkData:NetworkData = {
                    transfferedSize: 0,
                    totalSize: data.event.totalSize,
                    pause: false,
                    cancel: false,
                    timeLeft: ""
                  }
                  dispatch(addMessage({
                    id: data.id,
                    type: NotificationType.NETWORK_TRANSFER_MESSAGE,
                    tags: ["Downloads","Display Mode"],
                    data: networkData,
                    title: data.event.title
                  }))
                  dispatch(toastMsg({msg:`Downloading ${data.event.title}`}));
                  console.log("start",networkData.totalSize);
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.DOWNLOAD_PROGRESS,
                (event: any) => {
                  let data = event.data;
                  dispatch(updateMessage({
                    id: data.id,
                    transferredSize: data.event.loaded
                  }))
                  console.log("update",data.event);
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.DOWNLOAD_END,
                (event: any) => {
                  let data = event.data;
                 
                  dispatch(finishMessage({
                    id: data.id
                  }))
                  dispatch(toastMsg({msg:`${data.event.title}`}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.MODEL_PART_HIGHLIGHTED,
                (event: any) => {
                    let nodeIds = event.data.nodeIds;
                    let toHighlight = event.data.isHighlighted;
                  dispatch(handleHighlightAsync({nodeIds,toHighlight}));            
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.SECTION_PLANE_SELECTED,
                (event : any) => {
                  let data = event.data;
                  dispatch(handlePlaneSelection({e:data}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.CAMERA_MOVED,
                (event:any) => {
                  dispatch(fetchCameraMatrix())
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.INTERACTION_MODE_CHANGED,
                (event:any) => {
                  let mode = event.data.currState;
                  dispatch(setInteractionModeAsync(mode));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.LABEL3D_CREATED,
                (event:any) => {
                  dispatch(handleProbeLabelCreation({data: event, undoable: true ,activeViewerID:activeViewerID}));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.VIEWER_CLICK,
                (event:any) => {
                  dispatch(handleLabel2DCreation({data: event, undoable: true}));
                }
              )
        }
    },[props.mount])
    return (
        <>

        </>
    )
}

export default EventRegistry
