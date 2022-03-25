import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import {Selection , setSelection , part, colorSet, updateOpacity , updateShininess, updateParts} from "../../../../store/sideBar/materialColorSlice"


import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import ColorPicker from '../../../shared/colorPicker';

import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';

import TranslateSlider from '../../../shared/translateSlider';

import {useState} from "react"

import styles from '../styles/materialColor';

export default function MaterialColor() {

    const classes = styles();

    const partsRedux : part[] = useAppSelector(state => state.materialColor.parts);
    const shininessRedux : number = useAppSelector(state => state.materialColor.shininess)
    const opacityRedux : number = useAppSelector(state => state.materialColor.opacity)

    const applyTo : Selection = useAppSelector(state => state.materialColor.selection);
    const dispatch = useAppDispatch();

    const [shininess, setShininess] = useState(shininessRedux);
    const [opacity, setOpacity] = useState(opacityRedux);
    const [parts, setParts] = useState(partsRedux)

    const [selectedColor, setSelectedColor] = useState<any>();

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleChangeComplete = (color : colorSet) => {
       
        let newArray = JSON.parse(JSON.stringify(parts));

        if( applyTo === Selection.UNSELECTED_PARTS){
            newArray.forEach((item : part) => {
                if(item.selected !== true){
                    if(selectedColor.id === 0)
                        item.ampientColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
                    
                    if(selectedColor.id === 1)
                        item.diffuseColor = {r :color.r, g: color.g, b:color.b ,a:color.a}

                    if(selectedColor.id === 2)
                        item.emissiveColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
            
                    if(selectedColor.id === 3)
                        item.specularColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
                }
            })
        }

        
        if( applyTo === Selection.SELECTED_PARTS){
           newArray.forEach((item : part) => {
               if(item.selected === true){
                   if(selectedColor.id === 0)
                       item.ampientColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
                   
                   if(selectedColor.id === 1)
                       item.diffuseColor = {r :color.r, g: color.g, b:color.b ,a:color.a}

                   if(selectedColor.id === 2)
                       item.emissiveColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
               
                   if(selectedColor.id === 3)
                       item.specularColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
               }
           })
       }

        if( applyTo === Selection.ALL_PARTS){
           newArray.forEach((item : part) => {
                if(selectedColor.id === 0)
                   item.ampientColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
               
               if(selectedColor.id === 1)
                   item.diffuseColor = {r :color.r, g: color.g, b:color.b ,a:color.a}

               if(selectedColor.id === 2)
                   item.emissiveColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
           
               if(selectedColor.id === 3)
                   item.specularColor = {r :color.r, g: color.g, b:color.b ,a:color.a}
           })
       }
        setParts(newArray)
    }

    const handleColorSelector : (item : any) => any = (item) => {
        if( selectedColor && selectedColor.id === item.id)
            setSelectedColor(null)
        else
            setSelectedColor(item)
    }
    
    const onHandleShininess = (newValue : number) => {
        setShininess(newValue)
    }

    const onHandleOpacity = (newValue : number) => {
        setOpacity(newValue)
    }

    const onHandleReset = () => {
        setShininess(shininessRedux);
        setOpacity(opacityRedux);
        setParts(partsRedux)
    }

    const onHandleSave = () => {
        if(opacityRedux !== opacity){
            dispatch(updateOpacity(opacity));
        }

        if(shininessRedux !== shininess) {
            dispatch(updateShininess(shininess));
        }

        if(JSON.stringify(partsRedux) !== JSON.stringify(parts)){
            dispatch(updateParts(parts));
        }
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(null)
    }

    const getAction = () => {
        return(
            <SelectAction
                labelId="display-modes-selection-label-id"
                id="display-modes-selection-id"
                value={applyTo}
                onChange={handleSelectChange}
                MenuProps={{
                    disablePortal: true,
                    anchorOrigin: {
                        vertical:"bottom",
                        horizontal:"left",
                    },
                    getContentAnchorEl: null
                }}
            >
              <MuiMenuItem value={Selection.SELECTED_PARTS}>Selected Parts</MuiMenuItem>
              <MuiMenuItem value={Selection.ALL_PARTS}>All Parts</MuiMenuItem>
              <MuiMenuItem value={Selection.UNSELECTED_PARTS}>Unselected Parts</MuiMenuItem>
            </SelectAction>
        )
    }

    const handleSelectChange = (e:React.ChangeEvent<{ value: Selection }>) => {
        dispatch(setSelection(e.target.value));
      }

    const getBody = () => {

        let colorList;
        let singleColorAmbient  = true;
        let singleColorDiffuse  = true;
        let singleColorEmissive  = true;
        let singleColorSpecular = true;
        let list : part| any;
        let selectedColorValue ;
  
        if(applyTo === Selection.UNSELECTED_PARTS)
            list = parts.filter((item : part) => item.selected !== true);
        
        if(applyTo === Selection.SELECTED_PARTS)
                 list = parts.filter((item : part)=> item.selected === true);
            
        if(applyTo === Selection.ALL_PARTS)
            list = JSON.parse(JSON.stringify(parts));    
            
            if(list.length === 1){                
                singleColorAmbient = true;
                singleColorDiffuse = true;
                singleColorEmissive = true;
                singleColorSpecular = true;
            }
            
            
            if(list.length >1)
                {
                    let countAmbient = 0;
                    let countDiffuse = 0;
                    let countEmissive = 0;
                    let countSpecular = 0;
                    list.forEach((item : any) =>{
                       if(JSON.stringify(item.ampientColor) === JSON.stringify(list[0].ampientColor))
                            countAmbient++;
                        if( JSON.stringify(item.diffuseColor) === JSON.stringify(list[0].diffuseColor))
                            countDiffuse++;
                        if( JSON.stringify(item.emissiveColor) === JSON.stringify(list[0].emissiveColor))
                            countEmissive++;
                        if( JSON.stringify(item.specularColor) === JSON.stringify(list[0].specularColor))
                            countSpecular++;
                    })

                    if(countAmbient === list.length)
                        singleColorAmbient = true;
                    else 
                        singleColorAmbient = false;

                    if(countDiffuse === list.length)
                        singleColorDiffuse = true;
                    else
                        singleColorDiffuse = false;

                    if(countEmissive === list.length)
                         singleColorEmissive = true;
                    else
                        singleColorEmissive = false;

                    if(countSpecular === list.length)    
                        singleColorSpecular = true;
                    else
                        singleColorSpecular = false;
                }
        
        colorList = [
            { id:0 , name:"Ambient" , color: list[0].ampientColor , single: singleColorAmbient, },
            { id:1 , name:"Diffuse" , color: list[0].diffuseColor , single: singleColorDiffuse, },
            { id:2 , name:"Emissive" , color: list[0].emissiveColor , single: singleColorEmissive, },
            { id:3 , name:"Specular" , color: list[0].specularColor , single: singleColorSpecular, }
        ]

        if(selectedColor && selectedColor.id === 0 )
            selectedColorValue = list[0].ampientColor
        if(selectedColor && selectedColor.id === 1 )
            selectedColorValue = list[0].diffuseColor
        if(selectedColor && selectedColor.id === 2 )
            selectedColorValue = list[0].emissiveColor
        if(selectedColor && selectedColor.id === 3 )
            selectedColorValue = list[0].specularColor        
        
        return(
            <div className={classes.scrollBar}>
                <div style={{marginLeft:"10px"}}>
                <div style = {{marginTop:"20px" , marginBottom:"30px"}}>
                    <MuiGrid container spacing={1}>
                        {
                            colorList?.map(item => 
                                <MuiGrid item xs={12} sm={3}>
                                    <MuiTypography variant="caption"> 
                                        {item.name}
                                    </MuiTypography>
                                    {
                                        item.single
                                        ?
                                            <div className={selectedColor && selectedColor.id === item.id && classes.active} style={{backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` , width:"60px" , height:"19px", borderRadius:"5px"}}
                                                onClick={() => handleColorSelector(item)}>
                                            </div>
                                        :
                                            <div className={selectedColor && selectedColor.id === item.id && classes.active} style={{width:"60px" , height:"19px", borderRadius:"5px" , background:" linear-gradient(to right, red 20%, orange 20% 40%, yellow 40% 60%, green 60% 80%, blue 80%)"}}
                                                onClick={() => handleColorSelector(item)}>
                                            </div>
                                    }
                                </MuiGrid>
                        )}    
                    </MuiGrid>
                </div>
                {   selectedColor
                    ?
                        <div style={{marginLeft:"10%"}}>
                            <ColorPicker color={ selectedColorValue } onChangeComplete={handleChangeComplete}/>
                        </div>
                    :
                        <div style={{marginLeft:"10%", width:"75%", height:"220px", border:"2px dotted" , borderRadius:"5px"}}>
                            <MuiTypography style={{marginTop:"47%"}}>
                                Select a color
                            </MuiTypography>
                        </div>
                }
                
                <div style={{marginTop:"40px", marginBottom:"20px"}}>
                    <MuiTypography style={{textAlign:"left"}}>Shininess</MuiTypography>
                    <TranslateSlider 
                        value={shininess} 
                        stepValue={1}
                        valueMax={100}
                        valueMin={0}
                        onHandleChange={onHandleShininess}
                        onHandleTextbox={onHandleShininess} 
                        onHandleCommited={onHandleShininess}
                    />
                </div>
                
                <div>
                    <MuiTypography style={{textAlign:"left"}}>Transperancy</MuiTypography>
                    <TranslateSlider 
                        value={opacity} 
                        stepValue={1}
                        valueMax={100}
                        valueMin={0}
                        onHandleChange={onHandleOpacity}
                        onHandleTextbox={onHandleOpacity} 
                        onHandleCommited={onHandleOpacity}
                    />
                </div>
            </div>
            </div>
        )
    }

    const getFooter = () => {
        let change = false;
        if(JSON.stringify(partsRedux) !== JSON.stringify(parts) || opacityRedux !== opacity || shininessRedux !== shininess)
            change = true;
        return(
            <div>
                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                <MuiButton disabled={!change} style={{backgroundColor:"#5958FF",width:"30%", fontSize:"11px" , marginRight:"5px"}} 
                autoFocus 
                onClick={onHandleSave}
                // color="primary"
              >
                Save
              </MuiButton>
           
            <MuiButton style={{width:"30%", fontSize:"11px"}} 
                autoFocus 
                disabled={!change}
                onClick={onHandleReset} 
                // color="primary"
              >
                Reset
              </MuiButton>
              </div>
            </div>
        )
    }


    return(
        <SideBarContainer
        headerContent={ <Title text="Geometry" group="Material Color"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
      />
    )
}