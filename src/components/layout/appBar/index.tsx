import { useEffect, useState } from "react";
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import ToggleSplitBtn from 'components/shared/ToggleSplitBtn';

import clsx from 'clsx';
import Displaymodes from '../../icons/displaymodes';
import Fitview from '../../icons/fitview';
import Fullscreen from '../../icons/fullscreen';
import MeasureP2PIcon from '@material-ui/icons/Straighten';
import MeasureArcIcon from '@material-ui/icons/Looks';

import ProbeLabelIcon from "@material-ui/icons/Room";
import ProbeIcon from '@material-ui/icons/Colorize'
import NoteIcon from '@material-ui/icons/NoteAdd';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import FullscreenClose from '../../icons/fullscreen_exit';
import Hamburger from '../../icons/hamburger';
import More from '../../icons/more';

import { selectModelName, selectFullscreenStatus,selectSidebarVisibility, 
  selectActiveViewerID,setFullscreenState, setSidebarVisibility ,  
  setPopupMenuActiveContent, setPopupMenuDisplayMode , setInteractionModeAsync, selectInteractionMode, selectLabelInsertState, selectSelectedLabelInsertMode, setSelectedLabelMode, setLabelInsertionState } from '../../../store/appSlice';
import {enableProbe,selectProbeEnabled} from '../../../store/probeSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';


import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';
import { InteractionMode } from '../../../backend/viewerAPIProxy';
import { popupMenuContentTypes } from '../../../config';
import PopupMenu from '../popupMenu';
import  styles from './style';
import {undo, redo, undoStack, UndoEvents} from '../../utils/undoStack';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const interactionMode = useAppSelector(selectInteractionMode); 
    const labelInsertionState = useAppSelector(selectLabelInsertState);
    const [selectedLabelInsertionMode, setSelectedLabelInsertionMode] = useState(InteractionMode.LABEL2D);
    const labelInsertModeOptions = [
      {
        id: InteractionMode.LABEL2D,
        title: '2D Note',
        icon: <NoteIcon/>
      },
      {
        id: InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT,
        title:'P2P',
        icon:<MeasureP2PIcon></MeasureP2PIcon>
      },
      {
        id: InteractionMode.LABEL_MEASUREMENT_3PT_ARC,
        title:'Arc',
        icon: <MeasureArcIcon></MeasureArcIcon>
      },
      {
        id:InteractionMode.LABEL3D_POINT,
        title:'Probe Point',
        icon: <ProbeLabelIcon/>
      }
    ]
   
    const isContinousProbeEnabled = interactionMode === InteractionMode.CONTINUOUS_PROBE;
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const modelName = useAppSelector(selectModelName);
    const dispatch = useAppDispatch();  

    const [anchorEl, setAnchorEl] = useState(null);
    const [clickedMenu, setClickedMenu] = useState<string>(popupMenuContentTypes.none);
    const popupMenuDisplayMode = useAppSelector(state => state.app.popupMenuActiveContent);
    const [isUndoable, setIsUndoable] = useState(false);
    const [isRedoable, setIsRedoable] = useState(false);
    const onClickFullscreen = () => {
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const handleLabelInsertModeChange = (id:number) => {
      setSelectedLabelInsertionMode(id)
    }

    const handleUndoStackUpdate = (e:any) => {
      setIsUndoable(undoStack.isUndoable());
      setIsRedoable(undoStack.isRedoable());
    }
    useEffect(() => {
      undoStack.addEventListener(UndoEvents.UPDATE, handleUndoStackUpdate);
      return () => {
        undoStack.removeEventListener(UndoEvents.UPDATE);
      }
    },[])

    useEffect(() => {
      switch (interactionMode) {
        case InteractionMode.LABEL2D:
          setSelectedLabelInsertionMode(InteractionMode.LABEL2D);
          break;
        case InteractionMode.LABEL3D_POINT:
          setSelectedLabelInsertionMode(InteractionMode.LABEL3D_POINT);
          break;
        case InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT:
          setSelectedLabelInsertionMode(InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT);
          break;
        case InteractionMode.LABEL_MEASUREMENT_3PT_ARC:
          setSelectedLabelInsertionMode(InteractionMode.LABEL_MEASUREMENT_3PT_ARC);
          break;
        default:
          dispatch(setLabelInsertionState(false));
          break;
      }
    },[interactionMode])

    const handleLabelInsertModeClick = () => {
      let id = !labelInsertionState ? selectedLabelInsertionMode : InteractionMode.DEFAULT;
      viewerAPIProxy.setInteractionMode( activeViewerID, id);
      dispatch(setLabelInsertionState(!labelInsertionState));
    }

    const onClickProbe = () => {
      viewerAPIProxy.setInteractionMode( activeViewerID, !isContinousProbeEnabled ? InteractionMode.CONTINUOUS_PROBE : InteractionMode.DEFAULT);
    }

    const onClickFitview = function(){
      viewerAPIProxy.fitView(activeViewerID);
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    } 

    const onClickAwayMenuPopup = function(){
      if(clickedMenu === popupMenuContentTypes.displayModes || clickedMenu === popupMenuContentTypes.more)
        setClickedMenu(popupMenuContentTypes.none);
      else{
        dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
      }
    }

    const onClickMenuIcon= (evt: any, selectedMode : string) => {
      if(selectedMode === popupMenuContentTypes.displayModes)
      {
        viewerAPIProxy.getDisplayModes(activeViewerID, []) 
          .then((response : any)=>{
            dispatch(setPopupMenuDisplayMode(response));
          });         
      }

      // Inactive the dropdown while click the active dropdown menu button

      if(selectedMode !== popupMenuContentTypes.none && selectedMode === popupMenuDisplayMode){
        setClickedMenu(popupMenuContentTypes.none);
        // setAnchorEl( evt.currentTarget );
        dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
      }

      else{
      setClickedMenu(selectedMode);
      setAnchorEl( evt.currentTarget );
      dispatch(setPopupMenuActiveContent(selectedMode)); 
      }
    }
  
    const handleUndo = () => {
      undo(dispatch);
    }

    const handleRedo = () => {
      redo(dispatch);
    }
    return (
        <MuiAppBar 
          className = { clsx( classes.appBar , {[classes.appBarwithSideBar]: isSidebarVisible}) }
          position='fixed'
        >
        <MuiToolbar className={classes.toolBar}>
          <div className={classes.toolBarLeftContent}>            
            <div className={clsx( classes.leftTitle, { [classes.leftTitleHidden]: isSidebarVisible })}>
              <MuiTooltip title={ modelName } aria-label="ModelName">
                <MuiTypography variant='h1' style ={{ width : '150px', display: 'inline-block' }} noWrap>
                  { modelName } 
                </MuiTypography>         
              </MuiTooltip>
            </div>
          </div>
     
          <div className={classes.toolBarRightContent}>
            <div className={classes.divIcon} onClick={handleUndo} >
            <MuiIconButton disabled={!isUndoable}><UndoIcon /></MuiIconButton> 
            </div>
            <div className={classes.divIcon} onClick={handleRedo}>
            <MuiIconButton disabled={!isRedoable}><RedoIcon /></MuiIconButton> 
            </div>
            {/* <div className={classes.divIcon} onClick={() => {}}>
            <ToggleSplitBtn 
              options={labelInsertModeOptions}
              selectedId={selectedLabelInsertionMode}
              isSelectionEnabled={labelInsertionState}
              onChange={handleLabelInsertModeChange}
              onClick={handleLabelInsertModeClick}
            />
            </div>

            <div className={classes.divIcon} onClick={ onClickProbe } >
            <MuiToggleButton value='cont probe' selected={ isContinousProbeEnabled } ><ProbeIcon /></MuiToggleButton> 
            </div>

            <div className={classes.divIcon}  onClick={(evt) => onClickMenuIcon(evt, popupMenuContentTypes.displayModes) }>
              <MuiIconButton><Displaymodes /></MuiIconButton> 
            </div>
            
            <div className={classes.divIcon} onClick={ onClickFitview }>
              <MuiIconButton><Fitview/></MuiIconButton>
            </div>
            
            <div className={classes.divIcon} onClick={(evt) => onClickMenuIcon(evt,  popupMenuContentTypes.more) }>
              <MuiIconButton><More /></MuiIconButton>
            </div> */}
             
            <div className={classes.divIcon} onClick={ onClickFullscreen }>
              {(isFullscreenEnabled ?
                <MuiIconButton><FullscreenClose  /></MuiIconButton>  :
                <MuiIconButton><Fullscreen /> </MuiIconButton> 
              )}
            </div>

          </div>
        
        </MuiToolbar>     

        <MuiClickAwayListener onClickAway= {() => onClickAwayMenuPopup() }>
            <div>
              <PopupMenu anchorEl={ anchorEl }/>
            </div> 
        </MuiClickAwayListener>
      </MuiAppBar>
    );
}

export default AppBar;
