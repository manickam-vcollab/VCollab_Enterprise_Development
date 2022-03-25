import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../../components/icons/back';
import styles from './style';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import {Routes} from "../../../../routes"

import TransformIcon from '../../../icons/transform';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import { useState} from "react";

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

import MuiInput from '@material-ui/core/Input';

import MuiCheckbox from '@material-ui/core/Checkbox';

// import Switch from "react-switch";
// import Toggle from 'react-toggle';
import "react-toggle/style.css";


import MuiEditIconEquation from '@material-ui/icons/Edit';

import MuiToggleButton from '@material-ui/lab/ToggleButton';

// import Edit from "../../../assets/images/edit.svg";
// import Copy from "../../../assets/images/copy.svg";
// import ClipPlates from "../../../assets/images/clipboard.svg";
// import Delete from "../../../assets/images/trash.svg";
// import WarningCircle from "../../../assets/images/warningCircle.svg";
// import { PlayCircleOutlineSharp } from '@material-ui/icons';

import {goBack, push} from 'connected-react-router/immutable';

// import ClipPlane from "../clipPlane"
import {SelectionMode,selectActivePlane, setSectionPlaneData, editEnabled, setActive, editShowClip, editEdgeClip, editShowCap, editEquation , setChildPlane , setMasterPlane, setSelectionMode, selectedPlane,} from "../../../../store/sideBar/clipSlice";

//Plane Equation
// import {selectActiveViewerID} from "../../../../store/appSlice";
import clsx from 'clsx';
import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
import Triangle from '../../../../components/icons/triangle'
import ThreePoints from '../../../../components/icons/threePoints'
// import MuiFormControl from '@material-ui/core/FormControl'
// import MuiInputLabel from '@material-ui/core/InputLabel'
import MuiSelect from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';
// import { isTypeNode } from 'typescript';
import { useEffect } from 'react';
//palne Equation

import MuiTooltip from '@material-ui/core/Tooltip'

// import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';

import {undoStack} from "../../../utils/undoStack";

export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const enabledPlanes = planes.filter(item => item.enabled === true)
  // const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);
  const activePlaneId = useAppSelector(selectActivePlane);
  const clickedPlanes = useAppSelector(selectedPlane);
  // const clickedValues = useAppSelector((state) => state.clipPlane.planes.filter(item => item.selected === true && item.enabled === true));

  const [activeId,setActiveId] = useState(planes.length > 0 ? clickedPlanes.length > 1 ? -2 : activePlaneId >= 0 ? activePlaneId : planes[0].id : -3);
  const toSelectList = planes.map((item) => ({id:item.id, name: item.name, enabled: item.enabled}));
  if(clickedPlanes.length > 1){
  // toSelectList.unshift({id:-2,name:"Selected Planes"})
  }
  toSelectList.unshift({id:-1,name:"All Planes", enabled : true})
  // plane Equation 
  // const clickedValuesCount = clickedValues.length;
  const indexOfActive = planes.findIndex(item => item.id === activeId)
  
  const [clipInputX, setClipInputX] = useState<number>(activeId >= 0 ? planes[indexOfActive].userInputEquation[0] : 0);
  const [clipInputY, setClipInputY] = useState<number>(activeId >= 0 ? planes[indexOfActive].userInputEquation[1] : 0);
  const [clipInputZ, setClipInputZ] = useState<number>(activeId >= 0 ? planes[indexOfActive].userInputEquation[2] : 0);
  const [clipInputD, setClipInputD] = useState<number>(activeId >= 0 ? planes[indexOfActive].userInputEquation[3] : 0);
  
  useEffect(() => {
    if(activeId >= 0){
      setClipInputX(planes[indexOfActive].userInputEquation[0]);
      setClipInputY(planes[indexOfActive].userInputEquation[1]);
      setClipInputZ(planes[indexOfActive].userInputEquation[2]);
      setClipInputD(planes[indexOfActive].userInputEquation[3]);
    }
  },[planes]);

// plane Equation
  
  // const [edit, setEdit] = useState<boolean>(false);

  const [editMode, setEditMode] = useState(false)

  const clipPlaneMode = useAppSelector((state) => state.clipPlane.settings.selectionMode);      

  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleClipUndo = (newValues :{id:number, value:boolean, functionName:any}[]) => {

    console.log(newValues)
      newValues.forEach((item :any) => {
        switch (item.functionName){ 
          case "showClip":
            dispatch(editShowClip({id:item.id,value:item.value}));
          break;
          case "showCap":
            dispatch(editShowCap({id:item.id,value:item.value}));
          break;
          case "showEdge":
            dispatch(editEdgeClip({id:item.id,value:item.value}));
          break;
        }
        dispatch(setSectionPlaneData({id:item.id})); 
      });
    
  }
  
  const onHandleClip = (functionName: any , indeterminate : boolean , boolean : boolean, undoable?: boolean) => {

    let currentValues : {id: number, value : boolean , functionName : any}[] = [];

    const changeBoolean = (index : any) => {
      switch (functionName){ 
        case "showClip":
          if(indeterminate){          
            dispatch(editShowClip({id:planes[index].id,value:false}));
            currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showClip, functionName: "showClip"}]
          }
          else{
            if(boolean){
              dispatch(editShowClip({id:planes[index].id,value:false}));
              currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showClip, functionName: "showClip"}]
            }
            else{
            dispatch(editShowClip({id:planes[index].id,value:true}));
            currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showClip, functionName: "showClip"}]
            }
          }  
          dispatch(setSectionPlaneData({id:planes[index].id}));         
      break;

      case "showEdge":
        if(indeterminate){          
          dispatch(editEdgeClip({id:planes[index].id,value:false}));
          currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showEdge, functionName: "showEdge"}]
        }
        else{
          if(boolean){
            dispatch(editEdgeClip({id:planes[index].id,value:false}));
            currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showEdge, functionName: "showEdge"}]
          }
          else{
            dispatch(editEdgeClip({id:planes[index].id,value:true}));
            currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showEdge, functionName: "showEdge"}]
          }
          }  
          dispatch(setSectionPlaneData({id:planes[index].id})); 
      break;
      
      case "showCap":
        if(indeterminate){   
          dispatch(editShowCap({id:planes[index].id,value:false}));
          currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showCap, functionName: "showCap"}]
        }
        else{
          if(boolean){
            dispatch(editShowCap({id:planes[index].id,value:false}));
            currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showCap, functionName: "showCap"}]
          }
          else{
            dispatch(editShowCap({id:planes[index].id,value:true}));
            currentValues = [...currentValues, {id: planes[index].id, value: planes[index].showCap, functionName: "showCap"}]
          }
        }  
        dispatch(setSectionPlaneData({id:planes[index].id})); 
      break;
    } 
  }
    
  if(activeId >= 0)
  changeBoolean(planes.findIndex(item => item.id === activeId));
 
    if(activeId === -1){
      planes.forEach((item :any) => {
        changeBoolean(planes.findIndex(element => item.id === element.id))
      })
    }

    if(activeId === -2){
      planes.forEach((item: any) => {
        if(item.selected === true)
        changeBoolean(planes.findIndex(element => item.id === element.id))
      })
    }

    if(undoable) {
      undoStack.add(
        {
          undo: () => onHandleClipUndo(currentValues),
          redo: () => onHandleClip(functionName, indeterminate, boolean),
        }
      )
    }

  }

  // Equation
  const OnHandleEquation:(value : number, variable: string) => any = (value,variable) => {
    switch(variable){
      case "clipCordX" :
        setClipInputX(value);
      break;
      case "clipCordY" :
        setClipInputY(value);
      break;
      case "clipCordZ" :
        setClipInputZ(value);
      break;
      case "clipConstD" :
        setClipInputD(value);
      break;
    }
    }
    
   


  const onHandleEquationBlur = () => {
    if(!clipInputX)
      setClipInputX(planes[indexOfActive].userInputEquation[0])
    if(!clipInputY)
      setClipInputY(planes[indexOfActive].userInputEquation[1])
    if(!clipInputZ)
      setClipInputZ(planes[indexOfActive].userInputEquation[2])
    if(!clipInputD)
      setClipInputD(planes[indexOfActive].userInputEquation[3])
  }

  const handleEquationSave = (id: number, inputX :number, inputY:number, inputZ:number, inputD:number, undoable?: boolean) => {

    const currentX = planes[indexOfActive].userInputEquation[0]
    const currentY = planes[indexOfActive].userInputEquation[1]
    const currentZ = planes[indexOfActive].userInputEquation[2]
    const currentD = planes[indexOfActive].userInputEquation[3]

    dispatch(editEquation({id:id,eqn:{clipInputX :inputX, clipInputY:inputY,clipInputZ: inputZ, clipInputD :inputD},}));
    dispatch(setSectionPlaneData({id}));

    if(undoable){
      undoStack.add(
        {
          undo: () => handleEquationSave(id, currentX, currentY, currentZ, currentD),
          redo: () => handleEquationSave(id, inputX, inputY, inputZ, inputD),
        }
      )
    }
   

  }

  const handleEditShow = () => {
    if(editMode === true){
      setEditMode(false)

      // Set SelectionMode None in showMode 
      dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))

        if (Number(clipInputX) === 0 && Number(clipInputY) === 0 && Number(clipInputZ) === 0){
          setClipInputX(planes[indexOfActive].userInputEquation[0])
          setClipInputY(planes[indexOfActive].userInputEquation[1])
          setClipInputZ(planes[indexOfActive].userInputEquation[2])
        }
    
        if(Number(clipInputX) !== planes[indexOfActive].userInputEquation[0] || Number(clipInputY) !== planes[indexOfActive].userInputEquation[1] || Number(clipInputZ) !== planes[indexOfActive].userInputEquation[2] || Number(clipInputD) !== planes[indexOfActive].userInputEquation[3]){ 
          const id= planes[indexOfActive].id
          handleEquationSave(id, clipInputX, clipInputY, clipInputZ, clipInputD, true)
        }
      }

    else{
      setEditMode(true)
    }
  }

  const onHandleSlicePlane = (masterId : any , masterPlaneList: any, undoable?: boolean) => {
    const newMaster :any = masterPlaneList.find((item : any) => item.id === masterId)
    console.log("hell0", newMaster)


    const childOldMaster = planes[indexOfActive].masterPlane.id;

    dispatch(setChildPlane({masterId: newMaster.id, childId : planes[indexOfActive].id}));
    dispatch(setMasterPlane({masterId : newMaster.id , masterName: newMaster.name, childId : planes[indexOfActive].id}));
  
    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleSlicePlane(childOldMaster,masterPlaneList ),
          redo: () => onHandleSlicePlane(masterId, masterPlaneList),
        }
      )
    }

  
  }
  //Equation
 
  const onHandleTransform = () => {
    dispatch(push(Routes.CLIPPLANES_TRANSFORMATION));
  }
  

  // Set SelectionMode
  const onHandleSelectMode  = (clickedSelection : SelectionMode) => {

    let select = SelectionMode.NONE;
    let id = planes[indexOfActive].id;

    console.log("ActiveId", id)

    if(clickedSelection === clipPlaneMode)
      select = SelectionMode.NONE
    
    else
        select = clickedSelection

      const data = {activeId: id, selectionMode : select}
      dispatch(setSelectionMode(data))
  }

  const onHandleEnabledUndo = (newEditEnabled:{id:number, isEnabled: boolean}[]) => {

    console.log(newEditEnabled)
      newEditEnabled.forEach((item :any) => {
        dispatch(editEnabled({id:item.id,isEnabled: item.isEnabled}));
        dispatch(setSectionPlaneData({id:item.id})); 
      });
  }

   
  const onHandleEnabled = (indeterminate: boolean , boolean: boolean, undoable?: boolean) => {
    
    setEditMode(false)
    dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))

    let currentEnabled : {id:number, isEnabled: boolean}[] = [];

    if( activeId >= 0){
      if(indeterminate){     
        dispatch(editEnabled({id:planes[indexOfActive].id,isEnabled:false}));
        currentEnabled = [...currentEnabled, {id:planes[indexOfActive].id,isEnabled:planes[indexOfActive].enabled}]
      }
        else{
          if(boolean){
            dispatch(editEnabled({id:planes[indexOfActive].id,isEnabled:false}));
            currentEnabled = [...currentEnabled, {id:planes[indexOfActive].id,isEnabled:planes[indexOfActive].enabled}]
          }
          else{
            dispatch(editEnabled({id:planes[indexOfActive].id,isEnabled:true}));
            currentEnabled = [...currentEnabled, {id:planes[indexOfActive].id,isEnabled:planes[indexOfActive].enabled}]
          }
        }  
        dispatch(setSectionPlaneData({id:planes[indexOfActive].id}));         
    } 

    if ( activeId === -1 ){
      planes.forEach((item :any) => {
        if(indeterminate){          
          dispatch(editEnabled({id:item.id,isEnabled:false}));
          currentEnabled = [...currentEnabled, {id:item.id,isEnabled:item.enabled}]
        }
        else{
          if(boolean){
            dispatch(editEnabled({id:item.id,isEnabled:false}));
            currentEnabled = [...currentEnabled, {id:item.id,isEnabled:item.enabled}]
          }
          else{
            dispatch(editEnabled({id:item.id,isEnabled:true}));
            currentEnabled = [...currentEnabled, {id:item.id,isEnabled:item.enabled}]
          }
        }  
        dispatch(setSectionPlaneData({id:item.id}));  
      })
    }

    if ( activeId === -2 ){
      clickedPlanes.forEach((item :any) => {
        if(indeterminate){          
          dispatch(editEnabled({id:item.id,isEnabled:false}));
          currentEnabled = [...currentEnabled, {id:item.id,isEnabled:item.enabled}]
        }
        else{
          if(boolean){
            dispatch(editEnabled({id:item.id,isEnabled:false}));
            currentEnabled = [...currentEnabled, {id:item.id,isEnabled:item.enabled}]
          }
          else{
            dispatch(editEnabled({id:item.id,isEnabled:true}));
            currentEnabled = [...currentEnabled, {id:item.id,isEnabled:item.enabled}]
          }
        }  
        dispatch(setSectionPlaneData({id:item.id}));  
      })
    }

    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleEnabledUndo(currentEnabled),
          redo: () => onHandleEnabled(indeterminate, boolean),
        }
      )
    }
  }

  const onHandleSelect = (newId : number) => {

    dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))
    const click : any  = planes.find(item => item.id === newId);
    dispatch(setActive({clicked: click}))
    
    setEditMode(false)
    setActiveId(newId)
    const indexOfNewId = planes.findIndex(item => item.id === newId)
    setClipInputX(newId >=0  ? planes[indexOfNewId].userInputEquation[0] : 0);
    setClipInputY(newId >=0  ? planes[indexOfNewId].userInputEquation[1] : 0);
    setClipInputZ(newId >=0  ? planes[indexOfNewId].userInputEquation[2] : 0);
    setClipInputD(newId >=0  ? planes[indexOfNewId].userInputEquation[3] : 0);
  }


  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return(
      <div>
          <MuiGrid container item direction='column' justify='flex-start' style={{marginLeft:"-5px"}}>
                    <MuiGrid item>
                    <MuiTooltip title="Transform">
                    <MuiIconButton disabled={enabledPlanes.length> 0 ? false : true}  onClick={() => onHandleTransform()}> 
                    <TransformIcon/>
                </MuiIconButton>
                </MuiTooltip>
                    </MuiGrid>
                    {/* <MuiGrid item>
                        <MuiTypography  variant='h5'>Transform</MuiTypography>    
                    </MuiGrid> */}
                  </MuiGrid>
      </div>
    ) 
  }

  // const Test = function(){
  //   useEffect(() => {
  //     console.log("mounted")
  //   },[]);
  //   return(<div>hello</div>)
  // }

  const getAction = () => {
    return (
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeId}
      onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
       { 
        toSelectList.map((item) => 
          <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem> 
      )}
      </SelectAction>
    );
  }

    
  const getBody = () => {

    // let enableCount = 0;
    let displayShowClip = false;
    let displayShowEdge = false;
    let displayShowCap = false;
    let enablePlane = false;
    let indeterminateShowClip = false;
    let indeterminateShowEdge = false;
    let indeterminateShowCap = false;
    let indeterminateEnablePlane = false;


    if(activeId >= 0 ){
      displayShowClip = planes[indexOfActive].showClip;
      displayShowEdge = planes[indexOfActive].showEdge;
      displayShowCap = planes[indexOfActive].showCap;
      enablePlane = planes[indexOfActive].enabled;
    }

    if(activeId === -1 ) {
          let countShowClip = 0;
          let countShowEdge = 0;
          let countShowCap = 0;
          let countEnabled = 0;
 
          planes.forEach((item : any) => {
              countShowClip = item.showClip ? countShowClip + 1 : countShowClip ;
              countShowEdge = item.showEdge ? countShowEdge + 1 : countShowEdge ;
              countShowCap = item.showCap ? countShowCap + 1 : countShowCap ;
              countEnabled = item.enabled ? countEnabled + 1 : countEnabled;
          })
        
          displayShowClip = countShowClip === planes.length && true ;
          displayShowEdge = countShowEdge === planes.length && true ;
          displayShowCap = countShowCap === planes.length && true ;
          enablePlane = countEnabled === planes.length && true;
 
      indeterminateShowClip = (countShowClip > 0) && (countShowClip < planes.length) && true;
      indeterminateShowEdge = (countShowEdge > 0) && (countShowEdge < planes.length) && true;
      indeterminateShowCap = (countShowCap > 0) && (countShowCap < planes.length) && true;
      indeterminateEnablePlane = (countEnabled > 0 ) && (countEnabled < planes.length) && true;
    }

//     if(activeId === -2 ) {
//       let countShowClip = 0;
//       let countShowEdge = 0;
//       let countShowCap = 0;
//       let countEnabled = 0;

//       clickedPlanes.forEach((item : any) => {
//           countShowClip = item.showClip ? countShowClip + 1 : countShowClip ;
//           countShowEdge = item.showEdge ? countShowEdge + 1 : countShowEdge ;
//           countShowCap = item.showCap ? countShowCap + 1 : countShowCap ;
//           countEnabled = item.enabled ? countEnabled + 1 : countEnabled;
//       })
    
//       displayShowClip = countShowClip === clickedPlanes.length && true ;
//       displayShowEdge = countShowEdge === clickedPlanes.length && true ;
//       displayShowCap = countShowCap === clickedPlanes.length && true ;
//       enablePlane = countEnabled === clickedPlanes.length && true;

//   indeterminateShowClip = (countShowClip > 0) && (countShowClip < clickedPlanes.length) && true;
//   indeterminateShowEdge = (countShowEdge > 0) && (countShowEdge < clickedPlanes.length) && true;
//   indeterminateShowCap = (countShowCap > 0) && (countShowCap < clickedPlanes.length) && true;
//   indeterminateEnablePlane = (countEnabled > 0 ) && (countEnabled < clickedPlanes.length) && true;
// }



    // MasterPlaneList calculation
    let masterPlaneList=[{id:-2, name:"None"}]
    let masterPlane = {id:-2 , name: "None"};
    
    if(activeId >= 0){
    let masterPlaneSet = planes.filter((item) => (item.id !== planes[indexOfActive].id))
    let removed : any[] = []

      masterPlaneSet.forEach( item => {
        if(item.masterPlane.id === planes[indexOfActive].id) {
          removed.push(item.id)
          masterPlaneSet = masterPlaneSet.filter(element => element.id !== item.id)
        }
      })

      if(removed.length > 0){
        for(let i=0; i < planes.length; i++ ){
          let newlyRemoved : any[] = [];
          masterPlaneSet.forEach( item => {
            if(removed.includes(item.masterPlane.id)) {
              newlyRemoved.push(item.id)
              masterPlaneSet = masterPlaneSet.filter(element => element.id !== item.id)
            }
            console.log(removed.length)
            // removed = removed.filter(element => element !== item.masterPlane.id)
          })

          removed = [];
          if(newlyRemoved.length === 0)
            break;
          
          removed =[...newlyRemoved]
        }
      }
      


      console.log("removed" , removed)
      console.log("resa" , masterPlaneSet)


    masterPlaneList = masterPlaneSet.map((item) => ({id:item.id, name: item.name}))

      // masterPlaneList = masterPlaneList.filter((item) => item.masterPlane.id.include())

      masterPlaneList.unshift({id:-1,name:"Global"})
      masterPlane = planes[indexOfActive].masterPlane
    }


    return (
      <div className={classes.scrollBar}>
        
        <div className={classes.settingPageContainer}>
          
          <div className={classes.settingItemContainer}>
            <MuiMenuItem style={{marginTop:"-10px"}} onClick={() => onHandleEnabled(indeterminateEnablePlane,enablePlane, true)} >
              <MuiListItemIcon>
                <MuiCheckbox color="default" indeterminate={indeterminateEnablePlane} checked ={enablePlane} />
              </MuiListItemIcon>
              <MuiListItemText >
                Enable
              </MuiListItemText>
            </MuiMenuItem>
          </div>

          <div className={classes.settingItemContainer}>
            <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>
              Plane Equation 
              { activeId >= 0 && planes[indexOfActive].enabled === true
                ?
                  <MuiToggleButton 
                    className={classes.editButton}
                    value="check"
                    selected={!editMode}
                    onChange={handleEditShow}
                  >
                    <MuiEditIconEquation style={{fontSize:"15px"}}/>
                  </MuiToggleButton>
                :
                    null
              }
            </MuiTypography>
            { editMode === false
              ?
                <MuiInput disabled inputProps={{style: { textAlign: 'center' },}} style={{marginTop:"-5px"}} className={ `${classes.disabledTextBox}`} 
                  value={activeId === -1 ?"":`${Math.round(clipInputX*1000)/1000}X ${Math.sign(clipInputY)===1 || Math.sign(clipInputY) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipInputY*1000)/1000)}Y ${Math.sign(clipInputZ) === 1 || Math.sign(clipInputZ) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipInputZ*1000)/1000)}Z = ${Math.round(clipInputD*1000)/1000}`}
                />
              :
                <div className={classes.inputEqnBorder}>
                  <input  className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputX} onChange={(e : any) => OnHandleEquation(e.target.value,"clipCordX")} onBlur={onHandleEquationBlur}/>X+
                  <input className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputY} onChange={(e : any) => OnHandleEquation(e.target.value,"clipCordY")} onBlur={onHandleEquationBlur}/>Y+
                  <input className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputZ} onChange={(e : any) => OnHandleEquation(e.target.value, "clipCordZ")} onBlur={onHandleEquationBlur}/>Z =
                  <input  className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputD}  onChange={(e : any) => OnHandleEquation(e.target.value, "clipConstD")} onBlur={onHandleEquationBlur} />
                </div>
            }
            <MuiGrid container  spacing={3} style={{marginTop:"-4px", marginBottom:"20px"}}>
              <MuiGrid item xs={12} sm={6} >
                <MuiButton disabled={editMode ? false : true}  className={clsx({ [classes.button]: clipPlaneMode === SelectionMode.FACE  })} size="small"  startIcon={<Triangle />}  onClick={() => onHandleSelectMode(SelectionMode.FACE)}>
                  <MuiTypography variant="h5" style={{textTransform:"none"}} >
                    Select Surface
                  </MuiTypography> 
                </MuiButton>
              </MuiGrid>
              <MuiGrid item xs={12} sm={6}  >
                <MuiButton disabled={editMode ? false : true}  className={clsx({ [classes.button]: clipPlaneMode === SelectionMode.THREE_PT })} size="small" startIcon={<ThreePoints/>}   onClick={() => onHandleSelectMode(SelectionMode.THREE_PT)}>
                  <MuiTypography variant="h5"  style={{textTransform:"none"}}>
                    Select Points
                  </MuiTypography>  
                </MuiButton>
              </MuiGrid>
            </MuiGrid>
          </div>
          
          <div className={classes.settingItemContainer}>
            <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>        
              Master Plane Coordinates
            </MuiTypography> 
            <MuiSelect 
              disabled={editMode ? false : true} 
              MenuProps={{
                disablePortal: true,
                anchorOrigin: {
                  vertical:"bottom",
                  horizontal:"left",
                },
                getContentAnchorEl: null
              }}
              style={{width:"100%",border: "1px solid currentColor",}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={masterPlane.id}
              onChange={(e) => onHandleSlicePlane(e.target.value , masterPlaneList, true)}
            >
              {
                masterPlaneList.map((item) => 
                  <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem>  
              )}
            </MuiSelect>
          </div>
                  
          <div className={classes.settingItemContainer}>          
            <MuiMenuList>
              <MuiMenuItem onClick={() =>onHandleClip("showClip",indeterminateShowClip,displayShowClip,true )} >
                <MuiListItemIcon>
                  <MuiCheckbox color="default" indeterminate={indeterminateShowClip} checked ={displayShowClip} />
                </MuiListItemIcon>
                <MuiListItemText > 
                  Show Clip Plane
                </MuiListItemText>
              </MuiMenuItem>
              <MuiMenuItem onClick={() =>onHandleClip("showEdge",indeterminateShowEdge,displayShowEdge,true)} >
                <MuiListItemIcon>
                  <MuiCheckbox color="default" indeterminate={indeterminateShowEdge} checked={displayShowEdge}/>
                </MuiListItemIcon>
                <MuiListItemText > 
                    Show Edge
                </MuiListItemText>
              </MuiMenuItem>
              <MuiMenuItem onClick={() =>onHandleClip("showCap",indeterminateShowCap,displayShowCap,true)} >
                <MuiListItemIcon>
                  <MuiCheckbox color="default" indeterminate={indeterminateShowCap} checked={displayShowCap} />
                </MuiListItemIcon>
                <MuiListItemText >
                  Show Cap
                </MuiListItemText>
              </MuiMenuItem>
            </MuiMenuList>
          </div>    
        
        </div>
      </div> 
    )
  }


  return (
          <SideBarContainer
            headerContent={ <Title text={"Settings" } group="Clip Planes"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
          /> 
  )
}