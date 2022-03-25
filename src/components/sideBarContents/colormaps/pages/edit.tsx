import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

import {goBack,push} from 'connected-react-router/immutable';

import {useEffect, useState} from 'react';

import {colormapElements, selectcolormapData, Colormap, setColorMapSelection} from '../../../../store/sideBar/colormapSlice';

import styles from './style';

import MuiTypography from '@material-ui/core/Typography';
// import MuiGrid from '@material-ui/core/Grid';
import MuiKeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Routes } from '../../../../routes';

import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import { DerivedType, Sections, selectDerivedTypes, selectSections, selectSteps, selectVariables, Step, Variable } from '../../../../store/sideBar/fieldSlice';
import { ITreeNode } from '../../../shared/RsTreeTable';

import { selectColorPaletteData} from '../../../../store/sideBar/colormapSlice';

export default function Edit(){

  const variables = useAppSelector(selectVariables);
  const steps = useAppSelector(selectSteps);
  const derived = useAppSelector(selectDerivedTypes);
  const sections = useAppSelector(selectSections);
  const colorpalette = useAppSelector(selectColorPaletteData);

  


  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const colorMap = useAppSelector(selectcolormapData);
  const selectedColorMap = colorMap[selectedColorMapId];
  // const [activeId, setActiveId] = useState(selectedColorMapId); 
  
  const list = useAppSelector(colormapElements);

  const selectedVariable= variables[selectedColorMap?.variable];
  const selectedStep = steps[selectedColorMap?.step];
  const selectedDerivedType = derived[selectedColorMap?.derivedType];
  const selectedSection = sections[selectedColorMap?.section]

  const dispatch = useAppDispatch(); 
  const classes = styles();

  const validateSelection = ():boolean => {
    if(!selectedColorMap)
    return false
    if(selectedStep && selectedVariable && selectedDerivedType )
    {
      return (selectedStep.varibleIds.includes(selectedVariable.id) &&
      selectedVariable.derivedIds.includes(selectedDerivedType.id) 
      //&& selectedVariable.sectionIds.includes(selectedSection.id)
      )
    }
    else{
      return false
    }
  
  }

  const isValid = validateSelection();

  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleSelect = (id : string) => {
    console.log(id)
    dispatch(setColorMapSelection(id));
  }
  
  const getParent = (treeData: {[id:string]:ITreeNode}, id:string, rootParent:boolean): ITreeNode | null => {
      let node = treeData[id];
      if(node.pid === "-1" || node.pid === null)
      {
        return null;
      }
      let parent = treeData[node.pid];
      if(!rootParent) {
         return parent;
      }
      if(parent.pid === "-1" ) {
          return parent;
      }
      else {
        return getParent(treeData,parent.id, rootParent)
      }
  }
  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {

    const parentNodes = list.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      id="grouped-select"
      value={selectedColorMapId}
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
          list.map((element : any) => {
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
          list.map((element : any) => {
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
      <div className={classes.scrollBar}>
        <MuiMenuList>
        <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_STEPS_AND_SUBCASE))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Steps & Subcases
                </MuiTypography>
                <MuiTypography classes={{root: !isValid ? classes.invalid : ""}} variant="h1" align="left">
                  {
                    selectedStep && 
                    getParent(steps,selectedStep.id,true)?.title + " - " + selectedStep.title
                  }
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>
          	<MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_VARIABLE))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Variable
                </MuiTypography>
                <MuiTypography classes={{root: !isValid ? classes.invalid : ""}} variant="h1" align="left">
                {
                    selectedVariable && 
                    getParent(variables,selectedVariable.id,true)?.title + " - " + selectedVariable.title
                  }
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_DERIVED_TYPES))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Derived Types
                </MuiTypography>
                <MuiTypography classes={{root: !isValid ? classes.invalid : ""}} variant="h1" align="left">
                  {
                    selectedDerivedType && 
                    getParent(derived,selectedDerivedType.id,true)?.title + " - " + selectedDerivedType.title
                  }
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_SELECTION_AND_LAYER))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Sections & Layers
                </MuiTypography>
                <MuiTypography classes={{root: !isValid ? classes.invalid : ""}} variant="h1" align="left">
                  {
                    selectedSection && 
                    getParent(sections,selectedSection.id,true)?.title + " - " + selectedSection.title
                  }
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_COLOR_PALETTE))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Color Palette
                </MuiTypography>
                <MuiTypography variant="h1" align="left">
                  {
                    selectedColorMap && selectedColorMap.colorPalette !== "-1" ? colorpalette[selectedColorMap.colorPalette].title : null
                  }
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_VALUE_SETTINGS))}>
              <MuiListItemText>
                <MuiTypography variant="h2" align="left">
                  Value Settings
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_LEGEND_SETTINGS))}>
              <MuiListItemText>
                <MuiTypography variant="h2" align="left">
                  Legend Settings
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

        </MuiMenuList>
      </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
          {
            !isValid ? <MuiTypography classes={{root:classes.invalid}}>
              Data not available for the current selection
            </MuiTypography> : null
          }
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Edit" } group="Color Maps"/> }
            headerAction = {getAction()} 
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
