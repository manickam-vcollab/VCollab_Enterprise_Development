import MuiGrid from'@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiButton from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import {useState,useEffect} from 'react';

import AddIcon from '@material-ui/icons/Add';
import BackIcon from'../shared/BackIcon'
import SyncIcon from '@material-ui/icons/Sync';

//import ControlView from './ControlView';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import {goBack} from 'connected-react-router/immutable';

import  {Source} from '../../../../components/shared/List/List';
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import Input from '../components/ActionControlEdit'; 
import {undoStack} from '../../../../components/utils/undoStack';
import FooterOptionsContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import FooterOption from'../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';

import {
  selectUserProvided,
  selectSystemProvided,
  addItemToMouseControlsList,
  selectisResetMouseControlList,
  selectActiveMenuId,
  selectcontrols,
  selectactions,
  MouseControlListItem,
  Control,
  Action,
  selectItemSaved,
  setItemSave,
  setMouseControlListReset,
  resetControlAction,
  selectmenuItems,
  setSelectedItem,
  setSelectedMouseControl,
  selectIsControlReadOnly,
  setControlReadOnly,
  selectdefaultMouseControlList

} from '../../../../store/sideBar/settings';

import { useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import { TrueLiteral } from 'typescript';

export default function ApplicationSettings() {

const dispatch = useAppDispatch();

const isResetMouseControlList = useAppSelector(selectisResetMouseControlList);
const menuItemList = useAppSelector(selectmenuItems);
const systemProvided = useAppSelector(selectSystemProvided);
const userProvided = useAppSelector(selectUserProvided);
const actions = useAppSelector(selectactions);
const controls = useAppSelector(selectcontrols);
const activeMenuId = useAppSelector(selectActiveMenuId);
const itemSaved = useAppSelector(selectItemSaved);
const isControlReadyOnly = useAppSelector(selectIsControlReadOnly);
const defaultMouseControls = useAppSelector(selectdefaultMouseControlList);

const [menuItem, setItem] = useState(activeMenuId);

const [isSaved , setIsSaved] = useState(false);

const[isReset ,setReset] = useState(false);


useEffect(()=>{

  setIsSaved(itemSaved);

},[itemSaved])

useEffect(()=>{

  setReset(isResetMouseControlList);

},[isResetMouseControlList])

const onClickBackIcon = () =>{
  dispatch(goBack());
} 


const onHandleSelection = ( event:any ) => {

  if(event.target.value as string!= undefined) {

    setItem(event.target.value as string);
    const id:string = event.target.value as string;
  
  // do display after data saved or user changed options  
  
    menuItemList?.map((item)=>{
  
    if(item.id === event.target.value) {
  
        const isSelected:boolean = !item.selected;
        const undoable:boolean = true ;
  
        dispatch(setSelectedMouseControl({id,isSelected}))
        dispatch(setControlReadOnly(item.id));

        if(undoable) {

          undoStack.add({
            undo:()=>{selectionUndoRedo(activeMenuId ,isSelected )},
            redo:()=>{selectionUndoRedo(event.target.value, isSelected)}
          })
         }
    }
  
    })

  }
  else {

    event.stopPropagation();
  }

};

const selectionUndoRedo = (id:string , isSelected:boolean)=>{

  setItem(id);

  dispatch(setSelectedMouseControl({id,isSelected}))

}

const getHeader=()=> {

  return (

    <Title text={"Mouse Controls"} group="Application Settings"/>
  )

}

const getHeaderRightIcon=()=>{

  const onhandleAddItemToMouseControlsList= ()=> {

    const undoable:boolean = true ;

    dispatch(addItemToMouseControlsList({undoable,activeMenuId}));
  
  } 
  
  return (

    isControlReadyOnly?null:<MuiIconButton onClick={onhandleAddItemToMouseControlsList}><AddIcon></AddIcon></MuiIconButton>

  )

}

const getAction=()=> {

  return (

        <SelectAction
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={menuItem}
          onChange={(event:any) => onHandleSelection(event)}
          MenuProps={{
            disablePortal: true,
            anchorOrigin: {
              vertical:"bottom",
              horizontal:"left",
           },
           getContentAnchorEl: null
          }}
        >

              <ListSubheader >System Provided</ListSubheader>
                {
                   menuItemList?.map((item)=>{

                    if(item.type === Source.SYSTEM) {

                      return (

                        <MuiMenuItem key={item.id} value={item.id}>{item.text}</MuiMenuItem>
  
                      )


                    }

                   })

                }

              <ListSubheader>User Provided</ListSubheader>

              {
                   menuItemList?.map((item)=>{
                        
                   
                    if(item.type === Source.USER) {

                      return (

                        <MuiMenuItem key={item.id} value={item.id}>{item.text}</MuiMenuItem>
  
                      )


                    }
                    

                   })

                }
         
        </SelectAction>)

}

const getBody=()=>{
 
const getSelectedUserData = (id:string) => {


  let userData:any[] =[];

  menuItemList?.map((item)=>{

    if(item.id === id) {

       if(item.type === Source.USER) {

        userProvided.forEach((item) => {

          if(item.id === id) {
      
           const controlAndAction = getControlandActions(item.list);
      
           userData = controlAndAction;
      
          }
        })

       }
       else {
      
        systemProvided.forEach((item) => {

          if(item.id === id) {

      
           const controlAndAction = getControlandActions(item.list);
      
           userData = controlAndAction;
      
          }
        })


       }
    }

  })


  return userData;
}

const getControlandActions = (list:MouseControlListItem[]) => {


let listData:any[] = [];

list.forEach((item)=> {

const control = controls.filter((controlItem) => {

    if(controlItem.id === item.control ) {

      return true;

    }

  })


const action = actions.filter((actionItem) => {

if(actionItem.id === item.action) {

  return true
}

}) 


  listData.push({rowId:item.id,control:control[0],action:action[0]});


})

return listData;


}
 
let selectedUserData = getSelectedUserData(activeMenuId);



  return (

    <div style={{marginTop:"10px"}}>

    <MuiGrid container spacing={2}>

        <MuiGrid item xs={6}>

            <div style={{textAlign:'left',marginLeft:'18px'}}>Controls</div> 

        </MuiGrid>

            <MuiGrid item xs={6}>

              {isControlReadyOnly ? <div  style={{textAlign:'center',marginLeft:'-10px'}}>Actions</div> :<div  style={{textAlign:'center',marginLeft:'-60px'}}>Actions</div> }

            </MuiGrid>

     </MuiGrid>

               {
                 selectedUserData?.map((item:{rowId:string,control:Control,action:Action}) => {


                  return (
        
                    <Input item={item} save={isSaved} reset={isReset}/> 
                    
                  )
                  })
               }
    </div>
  )

}

// const getFooter=()=> {

//   const onClickReset =() => {
//     dispatch(setMouseControlListReset(true));

//     dispatch(resetControlAction(activeMenuId));

//   }

//   const onClickSave=()=>{

//     dispatch(setItemSave(true));
//   }

//   return (
//     isControlReadyOnly? null:
//     <div>
//     <FooterOptionsContainer>
           
//            <FooterOption label={"Reset"} icon={<MuiIconButton onClick={()=>onClickReset()}><SyncIcon/></MuiIconButton>}></FooterOption>
          
//            <Grid item>

//                 <div style={{marginTop:"25px"}}><MuiButton  variant="contained" color="primary" onClick={()=>onClickSave()}>Save</MuiButton></div>
//            </Grid>
            
//     </FooterOptionsContainer>
//     </div>

//   )
// }

return (
   <SideBarContainer
    headerLeftIcon = { <BackIcon onClick={onClickBackIcon}/> }
    headerRightIcon = {getHeaderRightIcon()}
    headerContent={ getHeader() }
    headerAction = {getAction()}
    body ={ getBody() }
  />
  
)

}