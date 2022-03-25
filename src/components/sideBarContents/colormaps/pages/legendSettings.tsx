import MuiIconButton from "@material-ui/core/IconButton";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";
import { goBack, push } from "connected-react-router/immutable";
import { InputLabel, ListItemIcon, SvgIcon, Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import PanToolIcon from '@material-ui/icons/PanTool';
import MuiTextField from "@material-ui/core/TextField";
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { selectcolormapData, colormapElements, setColorMapSelection, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList, setLegendSettings,ColormapType ,LegendDirection,LegendTitlePlacement,LegendValuePlacement, LegendType } from "../../../../store/sideBar/colormapSlice";


import { Layers, selectActiveLayers, setEditMode} from '../../../../store/windowMgrSlice';

import MuiGrid from '@material-ui/core/Grid'

import styles from "./style";

import MuiListSubHeader from '@material-ui/core/ListSubheader'

import { useEffect, useState } from "react";

import {undoStack}  from '../../../utils/undoStack'

export default function LegendSettings() {


  const classes = styles();
  const dispatch = useAppDispatch();

  const list = useAppSelector(colormapElements);
  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const colormapsData = useAppSelector(selectcolormapData);
  const paletteTypeList = useAppSelector(paletteTypeDataList);
  const directionList = useAppSelector(directionDataList);
  const ticPositionList = useAppSelector(ticPositionDataList);
  const titlePlacementList = useAppSelector(titlePlacementDataList);
  const valuePlacementList = useAppSelector(valuePlacementDataList);
  const activeLayer = useAppSelector(selectActiveLayers);
  const isPanBtnPressed = activeLayer.includes(Layers.BACK);

  const [paletteType, setPaletteType] = useState<string>(colormapsData[selectedColorMapId]?.paletteType);
  const [direction, setDirection] = useState<string>(colormapsData[selectedColorMapId]?.direction);
  const [ticPosition, setTicPosition] = useState<string>(colormapsData[selectedColorMapId]?.ticPosition);
  const [titlePlacement, setTitlePlacement] = useState<string>(colormapsData[selectedColorMapId]?.titlePlacement);
  const [valuePlacement, setValuePlacament] = useState<string>(colormapsData[selectedColorMapId]?.valuePlacement);
  const [gapValue, setGapValue] = useState<number>(colormapsData[selectedColorMapId]?.gap);

  const [isTitleOptionsError , setTitleOptionsError] = useState<boolean>(false);
  const [isValueOptionsError , setValueOptionsError] = useState<boolean>(false);
  let isLegendTitleError:boolean = false ;
  let isLegendValueError:boolean = false ;
  const ErrorMsg:string = "Please select correct option"; 

 
  const readOnly = useAppSelector(state => state.colormap.colormapTree.data[selectedColorMapId]?.colormapType === ColormapType.SYSTEM ? true : false)

  useEffect(() => {
    setPaletteType(colormapsData[selectedColorMapId]?.paletteType);
    setDirection(colormapsData[selectedColorMapId]?.direction);
    setTicPosition(colormapsData[selectedColorMapId]?.ticPosition);
    setTitlePlacement(colormapsData[selectedColorMapId]?.titlePlacement);
    setValuePlacament(colormapsData[selectedColorMapId]?.valuePlacement);
    setGapValue(colormapsData[selectedColorMapId]?.gap);
  },[selectedColorMapId]);
  
const onClickBackIcon = () => {
    dispatch(goBack());
};

const onHandleSelect = (id : string , undoable:boolean) => {

  if(undoable) {
    undoStack.add({
      undo:()=>{onHandleSelect(selectedColorMapId,false)},
      redo:()=>{onHandleSelect(id ,false)}
    })
    } 
    

    dispatch(setColorMapSelection(id));
}

const handleSelectChange = (newValue : string, valueType: string ,undoable:boolean) => {

    switch(valueType){
      case "paletteType" :
        paletteTypeUndoRedo(newValue , undoable);
        setPaletteType(newValue);

      break;

      case "direction" :
        paletteDirectionUndoRedo(newValue , undoable);
        setDirection(newValue);
      break;

      case "ticPosition" :
        ticPositionUndoRedo(newValue , undoable);
        setTicPosition(newValue);
      break;

      case "titlePlacement" :
        titlePlacementUndoRedo(newValue , undoable);
        setTitlePlacement(newValue);
      break;

      case "valuePlacement" :
        valuePlacementUndoRedo(newValue , undoable);
        setValuePlacament(newValue);
      break;
    }
    
}

const paletteTypeUndoRedo =(newValue:string , undoable:boolean)=>{

  if(undoable) {
    undoStack.add({
      undo:()=>{setPaletteType(paletteType)},
      redo:()=>{setPaletteType(newValue)}
    })
    } 

}

const paletteDirectionUndoRedo =(newValue:string , undoable:boolean)=>{

  if(undoable) {
    undoStack.add({
      undo:()=>{setDirection(direction)},
      redo:()=>{setDirection(newValue)}
    })
    } 

}

const ticPositionUndoRedo =(newValue:string , undoable:boolean)=>{

  if(undoable) {
    undoStack.add({
      undo:()=>{setTicPosition(ticPosition)},
      redo:()=>{setTicPosition(newValue)}
    })
    } 

}

const titlePlacementUndoRedo =(newValue:string , undoable:boolean)=> {

    if(undoable) {
      undoStack.add({
        undo:()=>{setTitlePlacement(titlePlacement)},
        redo:()=>{setTitlePlacement(newValue)}
      })
    } 

}

const valuePlacementUndoRedo =(newValue:string , undoable:boolean)=>{

  if(undoable) {
    undoStack.add({
      undo:()=>{setValuePlacament(valuePlacement)},
      redo:()=>{setValuePlacament(newValue)}
    })
    } 

}

const handleGap = (newValue:string , undoable:boolean) => {

    setGapValue(Number(newValue));

    if(undoable) {
      undoStack.add({
        undo:()=>{setGapValue(gapValue)},
        redo:()=>{setGapValue(Number(newValue))}
      })
      }
}

const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}>
        <BackButton />
      </MuiIconButton>
    );
};

const getmenuItems = (listmenu: any, column: boolean) => {
    if (column === false) {
      return listmenu.map((menu: any) => {
        return (
          <MuiMenuItem value={menu.id} style={{height:"40px"}}>
            <MuiGrid container>
              <MuiGrid item>
              <ListItemIcon style={{verticalAlign: "middle", marginLeft:"10px", height:"30px", paddingBottom:"5px"}}>
                <img height="40px" width="50px" src={menu.image}></img>
            </ListItemIcon>
              </MuiGrid>
              <MuiGrid item style={{marginTop:"10px"}}>
              {menu.name}
              </MuiGrid>
            </MuiGrid>
            
            
          </MuiMenuItem>
        );
      });
    } 
    else {
      return listmenu.map((menu: any) => {
        return (
          <MuiMenuItem value={menu.id} style={{height:"55px"}}>
            <div>
              <span>{menu.name}</span>
              <div>
                <ListItemIcon style={{verticalAlign: "middle", marginLeft:"10px", paddingBottom:"5px"}}>
                  <img src={menu.image}></img>
                </ListItemIcon>
              </div>
            </div>
          </MuiMenuItem>
        );
      });
    }
};

const handlePanChange = () => {

        dispatch(setEditMode({
          uid: "colorPlotWindow",
          isEdit: !isPanBtnPressed
    }));
}

const getHeaderRightIcon = () => {
    return (
     <MuiToggleButton selected={isPanBtnPressed} onChange={handlePanChange}>
      <PanToolIcon/>
    </MuiToggleButton>

    );
};
  
const getAction = () => {
    
    const parentNodes = list.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      id="grouped-select" label="Grouping"
      value={selectedColorMapId}
      onChange={(e : any) => {if(e.target.value) onHandleSelect(e.target.value ,true)}}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
        <MuiListSubHeader key={parentNodes[0]?.id}>{parentNodes[0]?.name}</MuiListSubHeader>
        {
          list.map((element : any) => {
            return(
              element.pid === parentNodes[0]?.id 
                ?
                  <MuiMenuItem key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          }) 
        }

        <MuiListSubHeader key={parentNodes[1]?.id}>{parentNodes[1]?.name}</MuiListSubHeader>
        {
          list.map((element : any) => {
            return(
              element.pid === parentNodes[1]?.id 
                ?
                  <MuiMenuItem key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          })        
        }
      </SelectAction>
    )
};

const handleLegendOptions =()=> {

  let selectedLegendDirection = parseInt(direction) ;
  let selectedTitlePlacement = parseInt(titlePlacement);
  let selectedValuePlacement = parseInt(valuePlacement);

  if(selectedLegendDirection === LegendDirection.HORIZONTAL || selectedLegendDirection === LegendDirection.AUTO) {

        // check  horizontal title placement option 

        if(selectedTitlePlacement === LegendTitlePlacement.TOP_LEFT ||selectedTitlePlacement === LegendTitlePlacement.TOP_MIDDLE || selectedTitlePlacement === LegendTitlePlacement.TOP_RIGHT ||selectedTitlePlacement === LegendTitlePlacement.BOTTOM_LEFT || selectedTitlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE || selectedTitlePlacement === LegendTitlePlacement.BOTTOM_RIGHT) {
  
          setTitleOptionsError(false);
          isLegendTitleError = false ;
  
        }
        else {
  
          setTitleOptionsError(true);
          isLegendTitleError = true ;
        }

        // check horizontal value placement option

        if(selectedValuePlacement === LegendValuePlacement.TOP || selectedValuePlacement === LegendValuePlacement.BOTTOM || selectedValuePlacement === LegendValuePlacement.ALTERNATING) {

          setValueOptionsError(false);
          isLegendValueError = false ;
        }
        else {

          setValueOptionsError(true);
          isLegendValueError = true ;
        }

  }
  else if (selectedLegendDirection === LegendDirection.VERTICAL) {

        // check vertical title placement option 

        if(selectedTitlePlacement === LegendTitlePlacement.TOP || selectedTitlePlacement === LegendTitlePlacement.BOTTOM) {

          setTitleOptionsError(false);
          isLegendTitleError = false ;

        }

        else {

          setTitleOptionsError(true);
          isLegendTitleError = true ;

        }

        // check vertical value placement option 
        if(selectedValuePlacement === LegendValuePlacement.LEFT || selectedValuePlacement === LegendValuePlacement.RIGHT || selectedValuePlacement === LegendValuePlacement.ALTERNATING) {

          setValueOptionsError(false);
          isLegendValueError = false ;
        }
        else {

          setValueOptionsError(true);
          isLegendValueError = true ;

        }
  }

  if(isLegendTitleError === true || isLegendValueError === true) {


     return true ;

  }
  else {

     return false ;

  }

}
  
const getBody = () => {

    return (
      <div className={classes.scrollBar}>
        <div className={classes.legendSelection}>
         <SelectAction
            style={{ textAlign: "left"}}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Palette Type"}
            value={paletteType}
            error={false}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "paletteType" ,true) }
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(paletteTypeList, false)}
          </SelectAction>
          </div>

          <div className={classes.legendSelection}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Direction"}
            value={direction}
            error={false}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "direction" ,true)}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(directionList, false)}
          </SelectAction>
          </div>

          <div className={classes.legendSelection}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Tic Position"}
            value={ticPosition}
            error={false}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "ticPosition" ,true)}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(ticPositionList, true)}
          </SelectAction>
          </div>

          <div className={classes.legendSelection}>

            
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label = {"Title Placement"}
            value={titlePlacement}
            error={isTitleOptionsError}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "titlePlacement" ,true)}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            getContentAnchorEl: null,
            }}
          >
            {getmenuItems(titlePlacementList, false)}

          </SelectAction>
          <FormHelperText className={classes.invalid}>{isTitleOptionsError?ErrorMsg:null}</FormHelperText>

          </div>

          <div className={classes.legendSelection}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Value Placement"}
            value={valuePlacement}
            error={isValueOptionsError}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "valuePlacement" ,true)}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(valuePlacementList, false)}

          </SelectAction>
          <FormHelperText className={classes.invalid}>{isValueOptionsError?ErrorMsg:null}</FormHelperText>
          </div>

        <div style={{ textAlign: "left", marginTop: "30px", marginLeft:"10px",marginBottom:"5px" }}>
        <MuiGrid container>
            <MuiGrid item style={{ marginRight: "5%", marginTop:"10px" }}>
              <span >Gap</span>
            </MuiGrid>
            <MuiGrid item>
              <MuiTextField
                type="number"
                variant="outlined"
                style={{ width: "30%" }}
                size="small"
                value={gapValue}
                onChange={(e:any)=>handleGap(e.target.value , true)}
              />
            </MuiGrid>
          </MuiGrid>
        </div>
      </div>
    );
};


//Updating title and value option based on direction

useEffect(()=> {

  let selectedLegendDirection = parseInt(direction) ;

  if(selectedLegendDirection === LegendDirection.VERTICAL) {

    titlePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendTitlePlacement.TOP) {

        setTitlePlacement(id.toString());
      }


    })

    valuePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendValuePlacement.RIGHT) {

        setValuePlacament(id.toString());
      }


    })

  }
  else if(selectedLegendDirection === LegendDirection.HORIZONTAL || selectedLegendDirection === LegendDirection.AUTO ) {

    titlePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendTitlePlacement.TOP_LEFT) {

        setTitlePlacement(id.toString());
      }


    })

    valuePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendValuePlacement.TOP) {

        setValuePlacament(id.toString());
      }


    })


  }


},[direction])

// Update if any option change in legendsettings   

useEffect(()=>{

      let isLegendSettingError = handleLegendOptions();

      console.log("error",isLegendSettingError);

      if(!isLegendSettingError) {
        
      dispatch(setLegendSettings({colorMapId: selectedColorMapId, newPaletteType: paletteType, newDirection: direction, newTicPosition: ticPosition, newTitlePlacement: titlePlacement, newValuePlacement: valuePlacement, newGap: gapValue}))

      }


},[paletteType ,direction ,ticPosition, titlePlacement ,valuePlacement ,gapValue])

const getFooter = () => {

    return (
         <div></div>
      
    );
};

  return (
    <SideBarContainer
      headerLeftIcon={getHeaderLeftIcon()}
      headerContent={<Title text={"Legend Settings"} group="Color Maps" />}
      headerRightIcon={getHeaderRightIcon()}
      headerAction={getAction()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
