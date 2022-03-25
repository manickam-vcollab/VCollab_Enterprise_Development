import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';


import MuiPlusIcon from '@material-ui/icons/Add';
import MuiMinusIcon from '@material-ui/icons/Remove';
import MuiGrid from '@material-ui/core/Grid';
import ColorPicker from '../../../shared/colorPicker';
import MuiTypography from '@material-ui/core/Typography';

import FileMoveUpIcon from '../../../icons/fileMoveUp';
import FIleMoveDownIcon from '../../../icons/fileMoveDown';

import {useState} from 'react';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useRef } from 'react';

import MuiKeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MuiKeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import styles from './style';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';

import {selectedColorPaletteId, editColorPalette, colorPaletteElements,setSelectedColorPalette} from '../../../../store/sideBar/colormapSlice';

import {useEffect} from 'react';

export default function ColorPalleteEdit(){

  const dispatch = useAppDispatch();
  const classes = styles();
  
  const slider = useRef(null);

  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const activeColorPaletteId = useAppSelector(selectedColorPaletteId)

  const colorPaletteList = useAppSelector(state => state.colormap.colorPaletteTree.data)

  const [colorSet,setColorSet] = useState( colorPaletteList[activeColorPaletteId].colorSet);
  const [valueSet,setValueSet] = useState( colorPaletteList[activeColorPaletteId].valueSet);


  const colorPaletteNameList = useAppSelector(colorPaletteElements)

  const [selectedColor, setSelectedColor] = useState<any>();
  const [openDelete, setOpenDelete] = useState(false);
  const [idGenerator, setIdGenerator] = useState(colorSet.length)

  const viewOnly = colorPaletteList[activeColorPaletteId].pid === "0" ? true : false;

  useEffect(() => {
    setColorSet(colorPaletteList[activeColorPaletteId].colorSet)
    setValueSet(colorPaletteList[activeColorPaletteId].valueSet)
  },[activeColorPaletteId]);

  const handleAddColor = () => {

    const colorPicker = () => {

      const colorList = [ { r:255, g:0, b:0, a:1}, { r:0, g:255, b:0, a:1 }, { r:0, g:0, b:255, a:1}, { r:255, g:255, b:0, a:1},
                          { r:0, g:255, b:255, a:1}, { r:255, g:0, b:255, a:1}, { r:192, g:192, b:192, a:1},  { r:128, g:128, b:128, a:1},
                          { r:128, g:0, b:0, a:1}, { r:128, g:128, b:0, a:1}, { r:0, g:128, b:0, a:1},
                          { r:128, g:0, b:128, a:1}, { r:0, g:128, b:128, a:1}, { r:0, g:0, b:128, a:1},  
                        ]

      const colorListFiltered =colorList.filter(item => JSON.stringify(item) !== JSON.stringify(colorSet[colorSet.length -1].color))
      let randomColor = colorListFiltered[(Math.random() * colorListFiltered.length) | 0];
      return(randomColor)

    }

    const newValueSet = [...valueSet]
    const newColor = {
      id: idGenerator ,
      color:   colorPicker(),
    }

    const newColorSet = [...colorSet, newColor]
    newValueSet.push("Auto")

    setColorSet(newColorSet);
    setValueSet(newValueSet);
    setIdGenerator(idGenerator + 1)
    setSelectedColor(null)
  }

  const onHandleSelect = (id : string) => {
    dispatch(setSelectedColorPalette(id))
  }


  const handleColorSelector = (colorSet : any) => {
    if(colorSet !== selectedColor)
      setSelectedColor(colorSet);
    else
      setSelectedColor(null);
    setOpenDelete(false);
  }

  const handleChangeComplete = (colorNew : {r : number , g:number, b:number, a:number}) => {
    const index = colorSet.findIndex((item) => item.id === selectedColor.id);
    if(index >= 0){
      let newArray=[...colorSet];
      newArray[index]= {...newArray[index], color :colorNew};
      setColorSet(newArray);
      setSelectedColor(newArray[index])
    }
  }

  const onHandlDownButton = () => {
    const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id)
    let newArray = [...colorSet];
    newArray.splice(indexOfSelected, 1)
    newArray.splice(indexOfSelected + 1, 0,selectedColor)

    setColorSet(newArray)
  }

  const onHandleUpButton = () => {
    const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id)
    let newArray = [...colorSet];
    newArray.splice(indexOfSelected, 1)
    newArray.splice(indexOfSelected - 1, 0,selectedColor)

    setColorSet(newArray)
  }

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  }

  const onHandleDelete = () => {
    const newValueData = [...valueSet];
    const newColorData = colorSet.filter(item => item.id !== selectedColor.id);

    if(colorSet.length !== newColorData.length)
      newValueData.pop();

    setColorSet(newColorData);
    setValueSet(newValueData);
    setSelectedColor(null);
    setOpenDelete(false)
  }

  const onHandleApply = () => {
    dispatch(editColorPalette({colorPaletteId : activeColorPaletteId , colorData : colorSet, valueData : valueSet}))
  }

  const onHandleReset = () => {
    setColorSet(colorPaletteList[activeColorPaletteId].colorSet)
  }

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

  const SampleNextArrow = () => {
    return(
      null
    )
  }

  const getAction = () => {
    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColorPaletteId}
      onChange={(e : any) => onHandleSelect(e.target.value)}
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
            colorPaletteNameList.map((item : any) => 
              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem>  
          )}
      </SelectAction>
    )
  }

  const getBody = () => {
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SampleNextArrow />
    }

    return (
      <div className={classes.scrollBar}>
        <div style={{marginTop:"20px"}}>
          <div>
            <MuiGrid container>
              <MuiGrid item xs={4}>
                <MuiTypography>
                  Add Color
                </MuiTypography>
              </MuiGrid>
              <MuiGrid item xs={6}></MuiGrid>
              <MuiGrid item xs={2}>
                <MuiIconButton size="small" disabled={viewOnly}><MuiPlusIcon
                   onClick={handleAddColor}
                /></MuiIconButton>             
              </MuiGrid>
            </MuiGrid>
          </div>
          
          <MuiGrid container spacing={2} style={{marginLeft:"10px",marginTop:"10px", height:"270px"}}>
            <MuiGrid item xs={2}>
              { colorSet.length <= 5 
                ?
                  null
                :
                  <MuiIconButton style={{marginTop:"-18px", marginLeft:"-5px"}} size="small" onClick={() => slider?.current?.slickPrev()}> <MuiKeyboardArrowUpIcon/> </MuiIconButton>
              } 
              <div  style={{marginTop:"-5px"}}>
                <Slider ref={slider}  {...settings}>
                  { colorSet.map((item : any, index : number) => 
                    <div>
                      <div 
                        key={ 'divParent_' + index } 
                        className={selectedColor ? item.id !== selectedColor.id ? classes.colorPicker : classes.active : classes.colorPicker} 
                        style={{height:"30px", 
                          marginTop:"4px",
                          width:"30px",
                          backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                        }}
                        onClick={() => handleColorSelector(item)}
                      >
                      </div>
                    </div>
                  )}
                </Slider>
              </div>
                { colorSet.length <= 5
                  ?
                    null
                  :
                    <MuiIconButton style={{marginTop:"-5px", marginLeft:"-5px"}} size="small" onClick={() => slider?.current?.slickNext()}> <MuiKeyboardArrowDownIcon/></MuiIconButton>
                }
            </MuiGrid>
                          
            <MuiGrid item xs={4} style={{marginLeft:"5px"}}>
              <ColorPicker
                color={selectedColor ? selectedColor.color : {r:255, g:255, b:255, a:1}}
                onChangeComplete={selectedColor && !viewOnly && handleChangeComplete }
              />                 
            </MuiGrid>
          </MuiGrid>                     
        </div>

        <div style={{marginLeft:"10px"}}>
          <MuiTypography variant="h2" align="left">
              Preview
          </MuiTypography>
          <div style={{marginTop:"10px"}}>
            <MuiTypography variant="h3" align="left">
              Discrete
            </MuiTypography>
            <MuiGrid container style={{marginTop:"5px"}}>
            { colorSet.map((item : any, index : number) => 
              <MuiGrid item 
                key={ 'divParent_' + index }  
                style={{width:280/colorSet.length, 
                  height:"30px",
                  backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                }}
              >
              </MuiGrid>
            )}
          </MuiGrid>
        </div>

        <div style={{marginTop:"10px"}}>
          <MuiTypography variant="h3" align="left">
            Continous
          </MuiTypography>

        { colorSet.length === 1 
          ?
          
            <div 
              style={{width:280, 
                marginTop:"5px",
                height:"30px",
                background: `rgb(${colorSet[0].color.r},${colorSet[0].color.g},${colorSet[0].color.b})`
              }}
            >
            </div>
:
<div 
style={{width:280, 
  marginTop:"5px",
  height:"30px",
  backgroundImage: `linear-gradient(to right, ${colorSet.map(item => `rgb(${item.color.r},${item.color.g},${item.color.b})`)})`
}}
>
</div>
        }
          
        </div>
      </div>
    </div>
  )
}


  const getFooter = () => {

    let disableDown = true;
    let disableUp = true;

    let disabled = true;

    if(selectedColor){
      const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id);
      if(indexOfSelected !== colorSet.length -1)
        disableDown = false;
    }

    if(selectedColor) {
      const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id);
      if(indexOfSelected !== 0)
        disableUp = false;
    }

    if( JSON.stringify(colorSet) !== JSON.stringify(colorPaletteList[activeColorPaletteId].colorSet))
      disabled = false;

    return(
      <div>
      { !openDelete
        ?
          <div>
            { viewOnly 
              ?
                null
              :
                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                  <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleApply} 
                    // color="primary"
                    disabled= {disabled}
                  >
                    Save
                  </MuiButton>

                  <MuiButton style={{width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleReset} 
                    // color="primary"
                    disabled= {disabled}
                  >
                    Reset
                  </MuiButton>
                </div>
            }
            <OptionContainer>
              <Option label="Down" 
                icon={<MuiIconButton 
                  disabled={disableDown || viewOnly}
                   onClick={onHandlDownButton}
                  >
                    <FIleMoveDownIcon/>
                  </MuiIconButton>
                } 
              />
              <Option label="Up" 
                icon={ <MuiIconButton 
                  disabled={disableUp || viewOnly}
                   onClick={onHandleUpButton}
                  > 
                    <FileMoveUpIcon/>
                  </MuiIconButton>
                }
              />
              <Option label="Delete" 
                icon={ <MuiIconButton 
                 disabled={!selectedColor || colorSet.length === 1 || viewOnly}
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
                Are you sure want to delete ?
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
            headerContent={ <Title text={"Color palette - Edit" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
