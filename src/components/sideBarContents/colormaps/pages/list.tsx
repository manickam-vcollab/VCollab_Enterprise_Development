import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style'

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import RTree from '../../../shared/RsTreeTable';
 
import AddIcon from "@material-ui/icons/Add";

import { selectcolormapData, selectColormapRootIds, expandNode, createColorMap, deleteColorMap, setColorMapSelection, ColormapType, applyColorMap, pasteColormap } from '../../../../store/sideBar/colormapSlice';

import TreeNodeWithoutCheckbox from '../../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../../utils/tree';

import { useRef , useEffect} from 'react';
import useContainer from '../../../../customHooks/useContainer';

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiVisibilityIcon from '@material-ui/icons/Visibility';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiCheckIcon from '@material-ui/icons/Check';

import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuicloudDoneIcon from '@material-ui/icons/CloudDone';

import {Routes} from "../../../../routes"

import { useState } from 'react';

import {setChildItem} from "../../../../store/mainMenuSlice";

import sizeCalculator from '../../../../customHooks/useSizeCalculator';

export default function List(){

  const treeDataRedux = useAppSelector(selectcolormapData);
  const treeRootIds = useAppSelector(selectColormapRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);

  const appliedColorMapId = useAppSelector(state => state.colormap.appliedColorMapId);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();

  const classes = styles()
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  
  useEffect(() => {

    if(selectedColorMapId === "-1"){
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps42', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps43', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps44', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps45', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps46', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps47', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps48', boolean: true}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps49', boolean: true}))
    }

    else{
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps42', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps43', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps44', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps45', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps46', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps47', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps48', boolean: false}))
      dispatch(setChildItem({panelId:'Color Maps4',childId:'Color Maps49', boolean: false}))
    }


    },[selectedColorMapId]);


  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandNode({toOpen,nodeId}));
  }

  const handleCreateLabel = (nodeId : string) => {
    	dispatch(createColorMap(nodeId))
  }

  const handleRowClick = (node : any) => {
    setOpenDelete(false);
    if(node.children.length === 0)
      dispatch(setColorMapSelection(node.id));
  }

  const onHandleEdit = () => {
    dispatch(push(Routes.COLORMAPS_EDIT))
  }

  const onHandleCopy = () => {
    const newCopy = treeDataRedux[selectedColorMapId];
    setCopied(newCopy)
  }

  const onHandlePaste = () => {
    dispatch(pasteColormap(copied))
  }


  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  }

  const onHandleDelete = () => {
    dispatch(deleteColorMap(selectedColorMapId))
    setOpenDelete(false)
  }

  const onHandleApply = () => {
    dispatch(applyColorMap(selectedColorMapId))
  }

  const getBody = () => {
    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <RTree 
        treeData={roots} 
        expandedRowIds = {expanded}
        onExpand={handleExpand}
        onRowClick = {handleRowClick}
        width = {300}
        hover={true}
        selectable={true}
        selected={[selectedColorMapId]}
        height = {containerHeight ? containerHeight - 5: 0}
        renderTreeToggle = {
          (icon,rowData) => {
            if (rowData.children && rowData.children.length === 0) {
              return null;
            }
            let state = treeDataRedux[rowData.id].state;
            return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
          }
        }
        treeNode = {(node) => {
          return (
            <TreeNodeWithoutCheckbox 
              node={treeDataRedux[node.id]}
              onCheck={() => console.log("sa")}
            >
            </TreeNodeWithoutCheckbox>
          )
        }}
        column1 = {(node) => {
          return (
            <div></div>
          )
        }}
        column2 = {(node) => {
          return (
            <div>
              { node?.pid !== "-1"
                ?
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                    <MuiGrid item xs={9}></MuiGrid>
                    <MuiGrid item xs={3}>
                      { appliedColorMapId === node.id
                        ?
                          <MuiCheckIcon fontSize='small'/>
                        :
                          treeDataRedux[node.id].pid !== "-1"
                            ?
                              treeDataRedux[node.id].downloaded === true 
                                ?
                                  <MuicloudDoneIcon fontSize='small'/>
                                :
                                  <MuiDownloadIcon fontSize='small'/>
                            :
                              null
                        }
                      </MuiGrid>
                    </MuiGrid>
                  :        
                    <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                      <MuiGrid item xs={4}></MuiGrid>
                      <MuiGrid item xs={6}>
                        <MuiIconButton size='small' onClick={() => handleCreateLabel(node.id)}>
                          <AddIcon fontSize='default'/> 
                        </MuiIconButton> 
                      </MuiGrid>
                    </MuiGrid>
                }    
            </div>
          )
        }}
      />  
    </div>
    )
  }


  const getFooter = () => {

    return(
      <div>
        { !openDelete
          ?
            <div>
              { selectedColorMapId !== "-1" && selectedColorMapId !== appliedColorMapId 
                ?
                  <MuiGrid container  style={{marginTop:"20px", marginBottom:"20px"}}>
                    { treeDataRedux[selectedColorMapId].downloaded === true
                      ?
                        <MuiGrid item xs={4}></MuiGrid>
                      :
                        <MuiGrid item xs={4}> {sizeCalculator(treeDataRedux[selectedColorMapId].size)} </MuiGrid> 
                    }
                    <MuiGrid item>
                      <MuiButton style={{backgroundColor:"#5958FF",width:"100%", fontSize:"9px" , marginRight:"5px"}} 
                        autoFocus 
                        onClick={onHandleApply} 
                        // disabled={readOnly}
                        // color="primary"
                      >
                        {treeDataRedux[selectedColorMapId].downloaded === true ? "Apply" : "Download & Apply"} 
                      </MuiButton>
                    </MuiGrid>
                  </MuiGrid>
                  
                :
                   null
              }                                 
                              
              <OptionContainer>
                <Option label={ treeDataRedux[selectedColorMapId]?.colormapType === ColormapType.USER ? "Edit" : "View"} 
                  icon={<MuiIconButton 
                    disabled={selectedColorMapId === "-1" }
                    onClick={onHandleEdit}
                    >
                      { treeDataRedux[selectedColorMapId]?.colormapType === ColormapType.USER
                        ?
                          <MuiEditIcon/>
                        :
                          <MuiVisibilityIcon/>
                      }  
                    </MuiIconButton>
                  } 
                />

                <Option label="Copy" 
                  icon={ <MuiIconButton 
                    disabled={selectedColorMapId === "-1"}
                    onClick={onHandleCopy}
                    > 
                      <MuiFileCopyOutlinedIcon/>
                    </MuiIconButton>
                  }
                />
                <Option label="Paste" 
                  icon={ <MuiIconButton 
                    disabled={!copied} 
                    onClick={onHandlePaste}
                    > 
                      <MuiPaste/>
                    </MuiIconButton>
                  }
                />
                <Option label="Delete" 
                  icon={ <MuiIconButton 
                    disabled={treeDataRedux[selectedColorMapId]?.colormapType === ColormapType.SYSTEM || selectedColorMapId === appliedColorMapId}
                    onClick={onHandleDeleteButton}
                    > 
                      <MuiDeleteForeverOutlinedIcon/>
                    </MuiIconButton>
                  }
                />     
              </OptionContainer>
            </div>
          :
              <div>
                <div style={{marginBottom:"5px", marginTop:"5px"}}>
                  <MuiTypography style={{marginBottom:"5px", fontSize:"14px"}}>
                    Are you sure want to delete the selected Color Map?
                  </MuiTypography>
                  <div style={{alignContent:"center",}}>
                    <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      onClick={onHandleDelete} 
                      // color="primary"
                    >
                      Confirm
                    </MuiButton>
                    <MuiButton style={{width:"20%", fontSize:"9px"}}
                      onClick={() => setOpenDelete(false)} 
                      // color="primary"
                    >
                      Cancel
                    </MuiButton>
                  </div>
                </div>
              </div>
          }          
        </div>
      ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"List" } group="Color Maps"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
