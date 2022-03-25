import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';
import {goBack} from 'connected-react-router/immutable';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { useRef, useState } from 'react';
import { colormapElements, selectcolormapData, selectColorPaletteData, ValueType, setSelectedValue, setSelectedValueType, ColormapType, ValueNature ,} from '../../../../store/sideBar/colormapSlice';

import MuiGrid from '@material-ui/core/Grid'
import styles from './style'
import {useEffect} from 'react'
import MuiInput from '@material-ui/core/Input';
import MuiButton from '@material-ui/core/Button';

import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiClearIcon from '@material-ui/icons/Clear';

export default function Variable(){

  const dispatch = useAppDispatch();  

  const classes = styles();
  const containerRef = useRef(null);

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)

  const colorSetList = useAppSelector(selectColorPaletteData);

  const appliedColorPaletteId = colormapsData[activeColormapId].colorPalette

  const appliedColorPalette = colorSetList[appliedColorPaletteId];

  const colormapNameList = useAppSelector(colormapElements)

  const [valueSet, setValueSet] = useState<any>(appliedColorPalette.valueSet)

  const [valueType, setValueType] = useState<ValueType>(appliedColorPalette.valueType)

  const readOnly = useAppSelector(state => state.colormap.colormapTree.data[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false)

  useEffect(() => {
    setValueSet(appliedColorPalette.valueSet)
    setValueType(appliedColorPalette.valueType)
  },[appliedColorPalette]);

  // const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }


  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onHandleEditValue = (index : number, e: any) => {

    let newValueSet = [...valueSet];

    if(appliedColorPalette.valueNature === ValueNature.MAXMIN)
      newValueSet[index] = Number(e.currentTarget.value);
    else
      newValueSet[index] = e.currentTarget.value; 

    setValueSet([...newValueSet]);

  }

  const onHandleDeleteValue = (index : number) => {
    let newValueSet = [...valueSet];
    newValueSet[index] = "";

    setValueSet([...newValueSet]);
  }

  const onHandleClearAll = () => {
    let newValueSet = [...valueSet];
    newValueSet.forEach((item,index) => newValueSet[index] = "")

    setValueSet([...newValueSet])

  }

  const handleRadioChange = (e : any) => {
    const newValueType = Number(e.currentTarget.value)
    setValueType(newValueType)
  }
  
  const onHandleSave = () => {
    dispatch(setSelectedValue({colorPaletteId: appliedColorPaletteId, updatedValueSet : valueSet}))
    dispatch(setSelectedValueType({colorPaletteId: appliedColorPaletteId, updatedValueType : valueType}))
  }

  const onHandleReset = () => {
    setValueSet(appliedColorPalette.valueSet)
    setValueType(appliedColorPalette.valueType)
  }

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    const parentNodes = colormapNameList.filter(item => item.children?.length !== 0)

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
          colormapNameList.map((element : any) => {
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
          colormapNameList.map((element : any) => {
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

  // const handleChangeChange = (e :any) => {
  //   const newValue = Number(e.currentTarget.value)

  //   dispatch(editColorPaletteNature({colorPaletteId : appliedColorPaletteId , newValueNature: newValue}))

  // }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const maxMin = () => {
    return(
      <MuiGrid container style={{marginTop:"30px", marginLeft:"20px"}}>
          <MuiGrid item xs={2} >
            <MuiGrid container direction="column">
              { appliedColorPalette.colorSet.map(item =>
                <MuiGrid key={ 'colorSet_' + item.id }>
                  <div style={{marginBottom:"5px",height:"50px", 
                                width:"30px",
                                backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                        }}
                  >
                  </div>
                </MuiGrid>
              )}
            </MuiGrid>
          </MuiGrid>
          
          <MuiGrid item xs={6}>
            <MuiGrid container direction="column" style={{marginTop:"-15px"}}>
              { valueSet.map((item : any,index : number) => 
                <MuiGrid key={ 'valueSet_' + index} item style={{marginBottom:"25px"}} >
                  <div  className={classes.textBox} >
                    <MuiGrid container>
                      <MuiGrid item xs={8}>
                        <MuiInput disabled={readOnly} inputProps={{style: { textAlign: 'center' , margin:"-2px"},}} 
                          value={item}
                          onChange={(e) => onHandleEditValue(index,e)}
                        />
                      </MuiGrid>
                    <MuiGrid item xs={4}>
                      { item === "" || readOnly
                        ?
                          null
                        :
                          <MuiIconButton style={{height:"2px"}} onClick={() => onHandleDeleteValue(index)}><MuiClearIcon/></MuiIconButton>
                      } 
                    </MuiGrid>
                  </MuiGrid>
                </div>
              </MuiGrid>
            )}
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    )
  }

  const single = () => {
    return(
      <MuiGrid container style={{marginTop:"30px", marginLeft:"20px"}}>
        <MuiGrid item xs={2} >
          <MuiGrid container direction="column">
            { appliedColorPalette.colorSet.map(item =>
              <MuiGrid key={ 'colorSet_' + item.id }>
                <div style={{ marginBottom:"5px",height:"50px", 
                              width:"30px",
                              backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                      }}
                >
                </div>
              </MuiGrid>
            )}
          </MuiGrid>
        </MuiGrid>
    
        <MuiGrid item xs={6}>
          <MuiGrid container direction="column" style={{marginTop:"10px"}}>
            { valueSet.map((item : any,index : number) => 
              <MuiGrid key={ 'valueSet_' + index} item style={{marginBottom:"25px"}} >
                <div  className={classes.textBox} >
                  <MuiGrid container>
                    <MuiGrid item xs={8}>
                      <MuiInput disabled={readOnly} inputProps={{style: { textAlign: 'center' , margin:"-2px"},}} 
                        value={item}
                        onChange={(e) => onHandleEditValue(index,e)}
                      />
                    </MuiGrid>
                    <MuiGrid item xs={4}>
                      { item === "" || readOnly
                        ?
                          null
                        :
                          <MuiIconButton style={{height:"2px"}} onClick={() => onHandleDeleteValue(index)}><MuiClearIcon/></MuiIconButton>
                      }
                    </MuiGrid>
                  </MuiGrid>
                </div>
              </MuiGrid>
            )}
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    )
  }


  const getBody = () => {
    console.log(appliedColorPalette)
    
    return (
      <div style={{height:"100%"}}>
      <div className={classes.scrollBarValueSetting} >
        { appliedColorPalette.valueNature === ValueNature.MAXMIN
          ?
            maxMin()
          :
            single()
        }
    </div> 
    <div style={{marginTop:"10px", marginBottom:"20px"}}>
                  <MuiButton style={{backgroundColor:"#5958FF",width:"30%", fontSize:"12px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleClearAll} 
                    // color="primary"
                    disabled= {readOnly}
                  >
                    Clear All
                  </MuiButton>
      </div>

      <div style={{marginTop:"10px", marginBottom:"20px"}}>
        { appliedColorPalette.valueNature === ValueNature.MAXMIN
          ?
          <MuiRadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
         
          value={valueType}
          onChange={handleRadioChange}
        >
          <MuiGrid container>
            <MuiGrid item xs={6}>
            <MuiFormControlLabel  disabled= {readOnly} value={ValueType.LINEAR} control={<MuiRadio color="default"/>} label="Linear" />
            </MuiGrid>
            <MuiGrid item xs={6}>
            <MuiFormControlLabel  disabled= {readOnly} value={ValueType.LOGARITHMIC} control={<MuiRadio color="default" />} label="Logarithmic" />
            </MuiGrid>
          </MuiGrid>
          
         
        </MuiRadioGroup>
      :
          null
        }

{/* <MuiRadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
         
          value={appliedColorPalette.valueNature}
          onChange={handleChangeChange}
        >
          <MuiGrid container>
            <MuiGrid item xs={6}>
            <MuiFormControlLabel  disabled= {readOnly} value={ValueNature.MAXMIN} control={<MuiRadio color="default"/>} label="min-max" />
            </MuiGrid>
            <MuiGrid item xs={6}>
            <MuiFormControlLabel  disabled= {readOnly} value={ValueNature.SINGLE} control={<MuiRadio color="default" />} label="single" />
            </MuiGrid>
          </MuiGrid>
          
         
        </MuiRadioGroup> */}
      </div>

    <div style={{marginTop:"20px", marginBottom:"20px"}}>
      {
        readOnly 
        ?
          null
        :
              <div>
                  <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"12px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleSave} 
                    // color="primary"
                    disabled= {valueSet === appliedColorPalette.valueSet}
                  >
                    Save
                  </MuiButton>

                  <MuiButton style={{width:"20%", fontSize:"12px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleReset} 
                    // color="primary"
                    disabled= {valueSet === appliedColorPalette.valueSet}
                  >
                    Reset
                  </MuiButton>
                </div>
      }
      </div>
    </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Value Settings" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
