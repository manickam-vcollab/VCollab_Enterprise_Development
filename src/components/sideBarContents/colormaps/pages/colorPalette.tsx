import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { colormapElements, selectColorPaletteData, selectColorPaletteRootIds, expandColorPaletteNode, createPalette, setColorPalette , selectcolormapData, selectedColorPaletteId, setSelectedColorPalette, deleteColorPalette, pasteColorPalette , ColormapType} from '../../../../store/sideBar/colormapSlice';

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';
import {useState} from 'react';

import RTree from '../../../shared/RsTreeTable';
import AddIcon from "@material-ui/icons/Add";

import { convertListToTree } from '../../../utils/tree';

import TreeNodeWithoutCheckbox from '../../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { useRef } from 'react';
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

import {Routes} from "../../../../routes"

export default function ColorPalette(){

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const colormapsData = useAppSelector(selectcolormapData)
  const colormapNamelist = useAppSelector(colormapElements)
  
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const appliedColorPalette = colormapsData[activeColormapId].colorPalette;

  const selectedColorPalette = useAppSelector(selectedColorPaletteId);

  const readOnly = colormapsData[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false;

  const treeDataRedux = useAppSelector(selectColorPaletteData);
  const treeRootIds = useAppSelector(selectColorPaletteRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();

  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandColorPaletteNode({toOpen,nodeId}));
  }

  const handleCreatePalette = () => {
    dispatch(createPalette());
  }

  const handlePaletteClick = (node :any) => {
    if(treeDataRedux[node.id].pid !== "-1" && treeDataRedux[node.id].children.length === 0 )
      dispatch(setSelectedColorPalette(node.id))
    setOpenDelete(false)
  }
  
  const onHandleApply = () => {
    if(treeDataRedux[selectedColorPalette].children.length === 0 && treeDataRedux[selectedColorPalette].pid !== "-1")
      dispatch(setColorPalette({colorMapId :activeColormapId, colorPaletteId : selectedColorPalette}))
  }

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  }

  const onHandleDelete = () => {
    if(treeDataRedux[selectedColorPalette].pid !== "-1" && treeDataRedux[selectedColorPalette].pid !== "0")
      dispatch(deleteColorPalette(selectedColorPalette));
    setOpenDelete(false);
  }

  const onHandleCopy = () => {
    const newCopy = treeDataRedux[selectedColorPalette];
    setCopied(newCopy);
  }

  const onHandlePaste = () => {
    if(copied)
      dispatch(pasteColorPalette(copied))
  }

  const onHandleEdit = () => {
    dispatch(push(Routes.COLORMAPS_COLOR_PALETTE_EDIT))
  }
  
  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    const parentNodes = colormapNamelist.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColormapId}
      onChange={(e : any) => {if(e.target.value) onHandleSelect(e.target.value)}}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
         <MuiListSubHeader key={parentNodes[0].id}>{parentNodes[0].name}</MuiListSubHeader>
        {
          colormapNamelist.map((element : any) => {
            return(
              element.pid === parentNodes[0].id 
                ?
                  <MuiMenuItem key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          }) 
        }

        <MuiListSubHeader key={parentNodes[1].id}>{parentNodes[1].name}</MuiListSubHeader>
        {
          colormapNamelist.map((element : any) => {
            return(
              element.pid === parentNodes[1].id 
                ?
                  <MuiMenuItem key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          })        
        }
      </SelectAction>
    )
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const getBody = () => {
    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <RTree 
        treeData={roots} 
        expandedRowIds = {expanded}
        onExpand={handleExpand}
        onRowClick = {handlePaletteClick}
        width = {300}
        hover={true}
        selectable={true}
        selected={[selectedColorPalette]}
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
              onCheck={() => console.log("")}
            >
            </TreeNodeWithoutCheckbox>
          )
        }}
        column1 = {(node) => {
          return (
            <div>
              { appliedColorPalette === node.id
                ?
                  <div style={{marginTop:"10px"}}>
                    <MuiCheckIcon fontSize='small'/>
                  </div>
                :
                  null
              }
            </div>
          )
        }}
        column2 = {(node) => {
          return (
            <div>
              { node?.pid !== "-1"
                ?
                 <div></div>
                :        
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                    <MuiGrid item xs={4}></MuiGrid>
                    <MuiGrid item xs={6}>
                      {
                        node.id === "1"
                        ?
                        <MuiIconButton size='small' 
                      onClick={() => handleCreatePalette()}
                      >
                        <AddIcon fontSize='default'/> 
                      </MuiIconButton> 
                      :
                      null
                      }
                      
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
              { selectedColorPalette !== "-1" && selectedColorPalette !== appliedColorPalette 
                ?
                  <div style={{marginTop:"20px", marginBottom:"20px"}}>
                    <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      onClick={onHandleApply} 
                      disabled={readOnly}
                      // color="primary"
                    >
                      Apply
                    </MuiButton>
                  </div>
                :
                   null
              }                                 
                              
              <OptionContainer>
                <Option label={ treeDataRedux[selectedColorPalette]?.pid !== "0" ? "Edit" : "View"} 
                  icon={<MuiIconButton 
                    disabled={selectedColorPalette === "-1" }
                    onClick={onHandleEdit}
                    >
                      { treeDataRedux[selectedColorPalette]?.pid !== "0"
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
                    disabled={selectedColorPalette === "-1"}
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
                    disabled={selectedColorPalette === "-1" || treeDataRedux[selectedColorPalette].pid === "0" || selectedColorPalette === appliedColorPalette}
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
                    Are you sure want to delete the selected Color Palette?
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
            headerContent={ <Title text={"Color Palette" } group="Color Maps"/> }
            headerAction = {getAction()} 
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
