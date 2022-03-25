
import MuiIconButton from '@material-ui/core/IconButton';
import {goBack, push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';
import styles from './style';
import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import { useState} from "react";

import MuiInput from '@material-ui/core/Input';

import Toggle from 'react-toggle';
import "react-toggle/style.css";

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import TransformIcon from '../../../icons/transform';

import AddIcon from "../../../icons/plus";

import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';

import {plane, setSectionPlaneData, addPlane, editEnabled, setActive, editPlaneName, removePlane, duplicatePlane, saveSelectedPlane, setSelectionMode} from "../../../../store/sideBar/clipSlice";
import {setChildItem} from "../../../../store/mainMenuSlice";

import { useEffect } from 'react';

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import MuiMoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '../../../shared/popper'
import { getItem, selectMainMenuItems, setActiveTab } from 'store/mainMenuSlice';

import {undoStack} from "../../../utils/undoStack";

export default function List(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);

  const clickedValues = useAppSelector((state) => state.clipPlane.planes.filter(item => item.selected === true));

  const [copied, setCopied] = useState<boolean>(false); 
  const [copy, setCopy] = useState<plane | null>(null);

  const [editPlane, setEditPlane] = useState<number>(-1)
  const [editName, SetEditName] = useState<string>("");

  const [openMoreOption,setOpenMoreOption] = useState(false)
  const [anchorElMoreOption, setAnchorElMoreOption] = useState(null);

  
  const mainMenuItems = useAppSelector(selectMainMenuItems);
   
  // disable and inable the clipPlane menu items
  useEffect(() => {
      const enabledPlanes = planes.filter(item => item.enabled === true);
      
      if(planes.length === 0)
          dispatch(setChildItem({panelId:'Clip Plane5',childId:'Clip Plane52', boolean: true}))

        else
          dispatch(setChildItem({panelId:'Clip Plane5',childId:'Clip Plane52', boolean: false}))

        
        if(enabledPlanes.length === 0)
        dispatch(setChildItem({panelId:'Clip Plane5',childId:'Clip Plane53', boolean: true}))

        else
          dispatch(setChildItem({panelId:'Clip Plane5',childId:'Clip Plane53', boolean: false}))

      },[planes]);

  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleClick :(e: any, click: any) => any = (e, click)=> {
  
    //Plane Equation

    // Set SelectionMode to None when mupliple item selected. 
    dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))
    dispatch(setActive({clicked: click}))
    if(click.id !== editPlane)
      setEditPlane(-1)
  }

  
    const onClickAddItem = () => {
    dispatch(addPlane({undoable: true}));
  }


  const onHandleCheck = (toCheck:boolean, item: plane, undoable?: boolean) => {
    dispatch(editEnabled({id:item.id,isEnabled:toCheck}));
    dispatch(setSectionPlaneData({id:item.id}));

    const newValue = !item.enabled;
    const oldValue = item.enabled
    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleCheck(oldValue, item),
          redo: () => onHandleCheck(newValue, item),
        }
      )
    }

  }


  const onHandleCopy = () => {
    setCopied(true);
    const copyItem = planes.find(item => item.id === clickedValues[0].id);
    if(copyItem)
      setCopy(copyItem);
  }

  const onHandlePaste = () => {
    if(planes.length < limit)
    {
      if(copy)
      dispatch(duplicatePlane({pastedPlane: copy, undoable : true}));
    }
  }

  const onHandleDelete = () => {
    clickedValues.forEach(item => 
      {
        dispatch(removePlane({id:item.id, undoable: true}))
        dispatch(saveSelectedPlane({clicked: item}))
      })
  }

  const onHandleEdit = () => {
    let item = getItem("Clip Plane52",mainMenuItems);
      dispatch(setActiveTab({menuItem:item}));
      dispatch(push(item.path));
    // dispatch(push(Routes.CLIPPLANES_SETTINGS)); 
  }

  const onHandleTransform = () => {
    let item = getItem("Clip Plane53",mainMenuItems);
    dispatch(setActiveTab({menuItem:item}));
    dispatch(push(item.path));
    // dispatch(push(Routes.CLIPPLANES_TRANSFORMATION));
  }

  const onHandlePlateNameEdit = (e : any) => {
   SetEditName(e.target.value)
  
  }

  const onHandlePlateKey = (e : any, item : any) => {
    if (e.key === 'Enter') {
      setEditPlane(-1)
      if(editName === "" || editName === item.name)
        setEditPlane(-1)
      else{
        const editPlane = {id : item.id, editName : editName, undoable : true}
        dispatch(editPlaneName(editPlane))
      }
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      setEditPlane(-1)
    }
  }



  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
      <div>
      {planes.length === limit 
               ?  
                 <MuiIconButton disabled onClick={() => onClickAddItem()}>
                   <AddIcon/>
                 </MuiIconButton> 
               : 
                 <MuiIconButton onClick={() => onClickAddItem()}>
                   <AddIcon/>
                 </MuiIconButton>    
             }
           </div>
    )
  }
    
  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div>

                    <MuiMenuList>
                    {
                        planes.map((item:any, index: number) => 
                      <div>
                        { editPlane !== item.id 
                          ?
                          <MuiMenuItem selected={item.selected}   key={item.id} alignItems='center' onClick={(event)=> onHandleClick(event,item)}>
                          <MuiListItemText onDoubleClick={() => {setEditPlane(item.id); SetEditName(item.name);}} > {item.name}
                          </MuiListItemText>
                          <MuiListItemIcon>
                              <Toggle
                    checked={item.enabled}
                    onChange={() => onHandleCheck(!item.enabled,item, true)}/>
                          </MuiListItemIcon>
                          </MuiMenuItem>
                      : 
                      <MuiMenuItem>
                  <MuiInput value={editName}  key={item.id}
                  onChange={onHandlePlateNameEdit}
                  onKeyDown={(e) => onHandlePlateKey(e, item)}/>
                      </MuiMenuItem> 
                        }
                        </div>
                    )}
                    </MuiMenuList>

        </div>
      </div>
    )
  }

  const handleClickMoreOption = (e : any) => {
    setOpenMoreOption(!openMoreOption)
    setAnchorElMoreOption( e.currentTarget );
  }

  const onClickAwayMoreOption = () => {
    setOpenMoreOption(false)
  }

  const getFooter = () => {

    let deleteMaster = false;

    const count = clickedValues.filter(item => item.childPlane.length !== 0)

    if(count.length > 0)
      deleteMaster = true;

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
          <OptionContainer>
            <Option label="Settings" icon={<MuiIconButton disabled={clickedValues.length ===  1 && editPlane === -1 ? false : true} onClick={() => onHandleEdit()}>
                <MuiEditIcon/>
              </MuiIconButton>} 
            />
            <Option label="Transform" icon={ <MuiIconButton disabled = {clickedValues.length ===  1 && clickedValues[0].enabled && editPlane === -1 ? false : true}  onClick={() => onHandleTransform()}> 
                    <TransformIcon/>
                </MuiIconButton>}
            />
    
            <Option label="Delete" icon={<MuiIconButton disabled ={clickedValues.length === 1 && deleteMaster === false && editPlane === -1 ? false : true} style={{ }}  onClick={onHandleDelete} > 
                  <MuiDeleteForeverOutlinedIcon/>
                </MuiIconButton> }
            />

            <Option label="More" icon={
              <ClickAwayListener onClickAway={onClickAwayMoreOption}>
                <div>
                  <MuiIconButton aria-label="changle visibility" onClick={handleClickMoreOption}>
                    <MuiMoreVertIcon/>
                  </MuiIconButton>
              
                  <Popper open={openMoreOption} anchorEl={anchorElMoreOption} placement={"top-end"} disablePortal id="display-menu">
                    <MuiMenuList id="simple-menu">
                      <MuiMenuItem alignItems='center' disabled={clickedValues.length === 1 && editPlane === -1 ? false : true} onClick={onHandleCopy} >
                        <MuiListItemIcon>
                          <MuiFileCopyOutlinedIcon />
                        </MuiListItemIcon>
                        <MuiListItemText>
                          Copy
                        </MuiListItemText>
                      </MuiMenuItem>
                      <MuiMenuItem alignItems='center' disabled={copied && planes.length !== limit ? false : true} onClick={onHandlePaste} >
                        <MuiListItemIcon>
                          <MuiPaste />
                        </MuiListItemIcon>
                        <MuiListItemText>
                          Paste
                        </MuiListItemText>
                      </MuiMenuItem>
                    </MuiMenuList>
                  </Popper>
                </div>
              </ClickAwayListener>    
            }      
          />
        </OptionContainer>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"List" } group="Clip Planes"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
