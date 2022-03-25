import {useState,useEffect} from 'react';

//buttons

import MuiButton from '@material-ui/core/Button';

//icons 

import MuiIconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MuiAddIcon from '@material-ui/icons/Add';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeletIcon from '@material-ui/icons/DeleteForeverOutlined';


import {Routes} from '../../../../routes/index'
import BackIcon from'../shared/BackIcon'

//components

import MouseControl , {Source} from '../../../../components/shared/List/List';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import FooterOptionsContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import FooterOption from'../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'


import {undoStack} from '../../../../components/utils/undoStack';

import {goBack,push} from 'connected-react-router/immutable';

import {
    selectmenuItems,
    setSelectedItem,
    addItemToMenuItems,
    selectcopyItem,
    selectActiveMenuId,
    setcopyItem,
    pasteItem,
    applyMouseData,
    deleteItem,
    setMenuItemEditable,
    setMenuItemEditableText,
    setControlReadOnly
} from '../../../../store/sideBar/settings';

import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';

import useStyles from'./MouseControlStyle';

export default function MouseControlPanel() {
 
const classes = useStyles();
const dispatch = useAppDispatch();    

const isItemCopy = useAppSelector(selectcopyItem);

const menuItems = useAppSelector(selectmenuItems);

const activeUserId = useAppSelector(selectActiveMenuId);

const onClickBackIcon = () =>{
  dispatch(goBack());
}    


const getHeaderRightIcon=()=> {

  const onhandleAdd= () => {

    dispatch(addItemToMenuItems({undoable:true}));
  
  }

  return (

    <MuiIconButton onClick={(event) => onhandleAdd()}><MuiAddIcon/></MuiIconButton>
  )


} 

const getBody=()=> {

    const items = menuItems

    const onSelectMenuList = (
      id:string,
      isSelected:boolean,

    ) => {

      dispatch(setSelectedItem({id,isSelected}));

    };

    const onClickSetMenuListEditable =(id:string , edit:boolean) =>{

      dispatch(setMenuItemEditable({edit:edit,activeMenuId:id}));

    }
    const onClickUpdateListName=(id:string ,value:string)=>{
    
      dispatch(setMenuItemEditableText({text:value,activeMenuId:id}));
      
    };

    return (

      <MouseControl items={items} onSelectMenuList={onSelectMenuList} onClickSetListEditable={onClickSetMenuListEditable} onClickUpdateListName={onClickUpdateListName}></MouseControl>

    )

}

const getFooter =() => {

const onHandleApply = (undoable:boolean , id:string) => {

  var newSelectedID:string  = id ;
  var lastSelectedID:string = '';

  menuItems.forEach((items:any)=>{

    if(items.applied === true ) {

      lastSelectedID = items.id;

    }

  })

   if(undoable) {

    undoStack.add({
      undo:()=>{onHandleApply(false , lastSelectedID )},
      redo:()=>{onHandleApply(false , newSelectedID )}
    })
   }

    dispatch(applyMouseData({applyID:id}));
}  

const onHandleEdit=(undoable:boolean) => {
   
  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS_EDIT));

  dispatch(setControlReadOnly(activeUserId));

  if(undoable) {

    undoStack.add({
      undo:()=>{onHandleEditUndo()},
      redo:()=>{onHandleEditRedo()}
    })
   }

}

const onHandleEditUndo =()=>{

  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS));

}

const onHandleEditRedo =()=>{

  const id = activeUserId; 
  const isSelected = true ;
  dispatch(setSelectedItem({id,isSelected}));
  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS_EDIT));

}

const onHandleCopy =() => {

  menuItems.find((item)=> {

        if(item.selected === true) {

        dispatch(setcopyItem(true));

        }
  })

}

const onHandlePaste =() => {


  if(isItemCopy === true) {

    menuItems.find((item)=> {

      if(item.selected === true) {


        dispatch(pasteItem({id:item.id,undoable:true}));

      }
  })

  } 

  else {

    dispatch(setcopyItem({isItemCopy:false , undoable:true}));
  }

  
}

const onClickDelete= ()=> {

  menuItems.find((item)=> {

    if(item.selected === true) {

      dispatch(deleteItem({id:item.id,undoable:true}));

    }
}) 

   
}

 return (

  <div>

  {menuItems.map((item)=>{

    if(item.selected === true) {

       return (
          
           <div>
           <div style={{paddingTop:"10px",paddingBottom:"10px"}}><MuiButton  variant="contained" color="primary" 
           
           onClick={()=> 

            {
              var selectedID:string = '';

              menuItems.forEach((items:any)=> {

                if(items.selected === true) {

                  selectedID = item.id;

                }

              })
              onHandleApply(true,selectedID);
            }
            
            }>Apply</MuiButton></div>
          <FooterOptionsContainer>

          {menuItems.map((item)=>{

              if(item.type === Source.USER && item.selected === true) {
                    
                return (

                  <FooterOption label={"Edit"}  icon={<MuiIconButton  onClick={() => onHandleEdit(true)}><MuiEditIcon/></MuiIconButton>}></FooterOption>
                
                  )
              }
              else if(item.type === Source.SYSTEM && item.selected === true){

                return (
                  <FooterOption label={"View"}  icon={<MuiIconButton  onClick={() => onHandleEdit(true)}><VisibilityIcon/></MuiIconButton>}></FooterOption>

                )
              }
          })}
            <FooterOption label={"Copy"} 
            icon={<MuiIconButton disabled={menuItems.find((item)=>{
                    return(
                      item.selected === true
                    )
      
                    }) ? false: true } onClick={() => onHandleCopy()}> 
                    <MuiFileCopyIcon />
            </MuiIconButton>}></FooterOption>
      
            <FooterOption label={"Paste"} 
            icon={<MuiIconButton disabled={isItemCopy ? false:true} onClick={() => onHandlePaste()}> 
                    <MuiPaste/>
            </MuiIconButton>}></FooterOption>
      
            <FooterOption label={"Delete"} 
            icon={<MuiIconButton disabled={menuItems.find((item)=>{
      
              if(item.type === Source.USER) {
      
                return(
                  item.selected === true
                )
              }
      
            }) ?  false: true } onClick={() => onClickDelete()}> 
            <MuiDeletIcon />
            </MuiIconButton>}></FooterOption>
        </FooterOptionsContainer>

           </div>

       )

    }       
  })}
</div>)

}

return (
          <>
           <SideBarContainer
            headerLeftIcon = { <BackIcon onClick={onClickBackIcon}/> }
            headerRightIcon = {getHeaderRightIcon()}
            headerContent={ <Title text={"Mouse Controls"} group="Application Settings"/> }
            body ={ getBody() }
            footer = { getFooter() }
          />
          </>

)

}