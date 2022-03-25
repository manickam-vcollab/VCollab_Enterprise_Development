import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import RTree, { ITreeNode } from '../../../shared/RsTreeTable';
import { selectCheckedLeafNodes } from '../../../../store/sideBar/labelSlice/labelAllSlice';
import {invertNode, expandNode, selectLabelData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel, setActiveLabel, handleProbeHeadCreation, handleMeasurementHeadCreation, selectedLeafNodes, reGroupLabel, selectActiveId, handleFaceHeadCreation} from '../../../../store/sideBar/labelSlice/labelAllSlice'
import AddCell from '../components/shared/TreeIcons/AddCell'

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import VisibilityOptions from '../components/shared/Footer/Options/VisibilityOption';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';

import {goBack,push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"

import InvertCell from '../../../shared/RsTreeTable/Invert';
import TreeNode from '../../../shared/RsTreeTable/TreeNode';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import MuiGrid from '@material-ui/core/Grid';
import PanToolIcon from '@material-ui/icons/PanTool';

import { convertListToTree } from '../../../utils/tree';

import { useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { Layers, selectActiveLayers , setEditMode} from '../../../../store/windowMgrSlice';
import { windowPrefixId } from '../../../../store/sideBar/labelSlice/labelAllSlice';
import { selectInteractionMode, setLabelInsertionState, selectActiveViewerID } from 'store/appSlice';
import { InteractionMode, setInteractionMode } from 'backend/viewerAPIProxy';
import { LabelType,Label3DType } from 'store/sideBar/labelSlice/shared/types';

import SelectPointIcon from 'components/icons/selectPoint';

import MuiAddIcon from '@material-ui/icons/Add';
import MuiCreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';

import {undoStack} from "../../../utils/undoStack";

export default function LabelList(){

  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack()); 
  }
  
  const treeDataRedux = useAppSelector(selectLabelData);
  const treeRootIds = useAppSelector(selectRootIds);
  const checkedNodes = useAppSelector(selectCheckedLeafNodes);

  const selectedCount = useAppSelector(selectedLength);
  
  const selectedLeafNode = useAppSelector(selectedLeafNodes)
  const selectedLeafCount = selectedLeafNode.length
  const activeLayer = useAppSelector(selectActiveLayers);
  const interactionMode = useAppSelector(selectInteractionMode);
  const viewerId = useAppSelector(selectActiveViewerID);
  
  const [selectToggle, setSelectToggle] = useState<boolean>(false);
  const activeLabelId : string = useAppSelector(selectActiveId)

  const isPanBtnPressed = activeLayer === Layers.FRONT;
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);


  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const handlePanChange = () => {
    Object.values(treeDataRedux).forEach(e => {
        if(e.children.length === 0)
        dispatch(setEditMode({
          uid: windowPrefixId+e.id,
          isEdit: !isPanBtnPressed
        }))
    })
}

  const getHeaderRightIcon = () => {
    return (
      <MuiToggleButton selected={isPanBtnPressed} onChange={handlePanChange}>
        <PanToolIcon/>
      </MuiToggleButton>
    )
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandNode({toOpen,nodeId}));
  }

  const handleInvert = (node:ITreeNode, undoable?:boolean) => {
    dispatch(invertNode({nodeId:node.id}));

    console.log("undoable", undoable)
    if(undoable){
      undoStack.add(
        {
          undo: () => handleInvert(node),
          redo: () => handleInvert(node),
        }
      )
    }
    
  }
  
  const handleCheck = (toCheck:boolean, nodeId:string, undoable?:boolean) => {
    dispatch(checkNode({toCheck,nodeId}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleCheck(!toCheck, nodeId),
          redo: () => handleCheck(toCheck, nodeId),
        }
      )
    }
  }

  const handleVisibility = (toShow:boolean,node:ITreeNode,undoable?:boolean) => {
    const leafIds = [node.id];
    const pids = [node.pid];
    console.log(leafIds, pids)
    dispatch(setCheckedVisibility({toShow, leafIds}))

    if(undoable){
      undoStack.add(
        {
          undo: () => handleVisibility(!toShow, node),
          redo: () => handleVisibility(toShow, node),
        }
      )
    }
  }

  const handleAdd = (node:ITreeNode) => {
    if(node.id === LabelType.LABEL2D){
      let mode = interactionMode !== InteractionMode.LABEL2D ? InteractionMode.LABEL2D : InteractionMode.DEFAULT;
      setInteractionMode(viewerId, mode);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL2D));
    }

    if(node.id === Label3DType.PROBE){
      dispatch(handleProbeHeadCreation({undoable: true}))
      setInteractionMode(viewerId, InteractionMode.DEFAULT);
      dispatch(setLabelInsertionState(false));
    }

    if(node.id === Label3DType.FACE){
      dispatch(handleFaceHeadCreation({undoable: true}))
      setInteractionMode(viewerId, InteractionMode.DEFAULT);
      dispatch(setLabelInsertionState(false));
    }

    if(node.id === Label3DType.DISTANCE){
      dispatch(handleMeasurementHeadCreation({pid :Label3DType.DISTANCE, undoable: true }))
      setInteractionMode(viewerId, InteractionMode.DEFAULT);
      dispatch(setLabelInsertionState(false));
    }

    if(node.id === Label3DType.ARC){
      dispatch(handleMeasurementHeadCreation({pid : Label3DType.ARC,  undoable: true}))
      setInteractionMode(viewerId, InteractionMode.DEFAULT);
      dispatch(setLabelInsertionState(false));
    }

    
    // if(node.id === Label3DType.DISTANCE){
    //   let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT));
    // }
    
    // if(node.id === Label3DType.ARC){
    //   let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT;
    //   setInteractionMode(viewerId, mode);
    //   dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC));
    // }

  }

  const handleSelectPoints = () => {
    const node = treeDataRedux[activeLabelId]

    setSelectToggle(!selectToggle)

    if(node.pid === Label3DType.PROBE){
      let mode = interactionMode !== InteractionMode.LABEL3D_POINT ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT;
      setInteractionMode(viewerId, mode);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_POINT));
    }

    if(node.pid === Label3DType.FACE){
      let mode = interactionMode !== InteractionMode.LABEL3D_FACE ? InteractionMode.LABEL3D_FACE : InteractionMode.DEFAULT;
      setInteractionMode(viewerId, mode);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL3D_FACE));
    }

    if(node.pid === Label3DType.DISTANCE){
      let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT;
      setInteractionMode(viewerId, mode);
      dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT));
    }

    if(node.pid === Label3DType.ARC){
          let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT;
          setInteractionMode(viewerId, mode);
          dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC));
    }

    
  }

  const onHandleEdit = ( undoable:boolean)=>{

    dispatch(push(Routes.LABEL_EDIT))

    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleEditUndo(),
          redo: () => onHandleEdit(false),
        }
      )
    }


  }

  const onHandleEditUndo = ()=>{

    dispatch(push(Routes.LABELS_LIST));

  }
  
  const onHandleDeleteButton = () => {
    dispatch(delete3DLabel({undoable: true}));
  }

  const onHandleRegroup = () => {
    const id = selectedLeafNode[0]
    const pid = treeDataRedux[id].pid;

    const mainPid = treeDataRedux[pid].pid;

    setInteractionMode(viewerId, InteractionMode.DEFAULT);
    dispatch(setLabelInsertionState(false));

    dispatch(reGroupLabel({selectedNodes : selectedLeafNode, grandPid: mainPid, currentPid:pid, undoable: true}))
  }

  const handleSetActive = (node : any) => {
    dispatch(setActiveLabel({id: node.id}))
    if(node.id !== LabelType.LABEL2D )
      setInteractionMode(viewerId, InteractionMode.DEFAULT);
    setSelectToggle(false)
    // dispatch(setLabelInsertionState(false));
  }

  const getBody = () => {

    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <RTree 
        treeData={roots} 
        expandedRowIds = {expanded}
        onExpand={handleExpand}
        selectable={true}
        selected={[activeLabelId]}
        onRowClick = {handleSetActive}
        width = {containerWidth}
        height = {containerHeight ? containerHeight - 5: 0}
        renderTreeToggle = {
          (icon,rowData) => {
            if (  rowData.pid === "-1" || 
                  rowData.id === Label3DType.PROBE ||
                  rowData.id === Label3DType.FACE ||  
                  rowData.id === Label3DType.DISTANCE || 
                  rowData.id === Label3DType.ARC ||
                  rowData.pid === Label3DType.PROBE || 
                  rowData.pid === Label3DType.FACE || 
                  rowData.pid === Label3DType.DISTANCE || 
                  rowData.pid === Label3DType.ARC) {
              let state = treeDataRedux[rowData.id].state;
            return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
            }
            
            return null
          }
        }
        treeNode = {(node) => {
          return (
            <TreeNode 
              node={treeDataRedux[node.id]}
              onCheck={handleCheck}
            >
            </TreeNode>
          )
        }}
        column1 = {(node) => {
            return (
              <div>
                {node?.id === LabelType.LABEL3D || node?.id === LabelType.MEASUREMENT
                  ?
                     null
                  :
                    <InvertCell selected={activeLabelId.includes(node.id)} node={treeDataRedux[node.id]} onClick={handleInvert}></InvertCell>
                }
              </div>
              
            )
        }}
        column2 = {(node) => {
          return (
            <div>
              { node?.pid === "-1" || node?.pid === LabelType.MEASUREMENT || node?.pid === LabelType.LABEL3D
                ?
                  node?.id === LabelType.LABEL3D || node?.id === LabelType.MEASUREMENT
                    ?
                      null
                    :
                      <AddCell node = {treeDataRedux[node.id]} selected={interactionMode === InteractionMode.LABEL2D && node.id === LabelType.LABEL2D} onToggle={handleAdd}/>
                :
                  <ShowHideCell selected={activeLabelId.includes(node.id)} node = {treeDataRedux[node.id]} onToggle={handleVisibility}></ShowHideCell>
              }    
            </div>
          )
        }}
      />  
    </div>
    )
  }


  const getFooter = () => {

    let disableSelect = true;

    if(activeLabelId !== "-1"){
      if(treeDataRedux[activeLabelId].pid === Label3DType.PROBE || treeDataRedux[activeLabelId].pid === Label3DType.FACE || treeDataRedux[activeLabelId].pid === Label3DType.DISTANCE || treeDataRedux[activeLabelId].pid === Label3DType.ARC)
        disableSelect = false;
    }

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
          <OptionContainer>
          <Option label="Visibility" 
            icon={
              <VisibilityOptions 
              disabled={selectedCount < 1}
              showClick={() => {dispatch(setCheckedVisibility({
                toShow: true,
                leafIds: checkedNodes.map(n => n.id),
                undoable: true,
              }))}}
              hideClick={() => {dispatch(setCheckedVisibility({
                toShow: false,
                leafIds: checkedNodes.map(n => n.id),
                undoable: true,
              }))}}
              invertClick={() => {dispatch(invertCheckedVisibility({
                leafIds: checkedNodes.map(n => n.id),
                undoable: true,
              }))}}
              />
            }/>
            <Option label="Select" icon={<MuiToggleButton disabled={disableSelect
            //  || 
            //  treeDataRedux[activeLabelId].pid !== Label3DType.PROBE 
            //   ||
            //   treeDataRedux[activeLabelId].pid !== Label3DType.DISTANCE 
              // || treeDataRedux[activeLabelId].pid !== Label3DType.ARC
            } 
               selected={selectToggle} onClick={handleSelectPoints}>
                <SelectPointIcon/>
              </MuiToggleButton>} 
            />
            
            {/* <Option label="Add" icon={<MuiIconButton disabled={activeLabelId === "-1"}>
                <MuiAddIcon/>
              </MuiIconButton>} 
            /> */}

            <Option label="Edit" icon={<MuiIconButton disabled={activeLabelId === "-1" || treeDataRedux[activeLabelId].pid ==="-1" || (treeDataRedux[activeLabelId].pid !== LabelType.LABEL2D && treeDataRedux[activeLabelId].children.length === 0)} onClick={() => onHandleEdit(true)}>
                <MuiEditIcon/>
              </MuiIconButton>} 
            />
             <Option label="Delete" icon={<MuiIconButton disabled={selectedCount >= 1? false : true} onClick={onHandleDeleteButton} > 
                  <MuiDeleteForeverOutlinedIcon/>
                </MuiIconButton> }
            />

            <Option label="New Group" icon={<MuiIconButton disabled={selectedLeafCount >= 1 ? false : true} onClick={onHandleRegroup} > 
                  <MuiCreateNewFolderOutlinedIcon/>
                </MuiIconButton> }
            />

            </OptionContainer>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Notes" } group="Labels"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
