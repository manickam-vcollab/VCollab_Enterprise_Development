import {useState, useEffect} from "react";
import styles from './style';

import {goBack, push} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../../components/icons/back';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import MuiGrid from '@material-ui/core/Grid';

import FlipDirectionLeft from "../../../../components/icons/flipDirectionLeft";
import FlipDirectionRight from "../../../../components/icons/flipDirectionRight";

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

import MuiInput from '@material-ui/core/Input';

import {Routes} from "../../../../routes"

import { setSectionPlaneData, editNormalInverted,editTranslate, editRotate, editAxisX, editAxisY, updateMinMaxGUI, selectActivePlane, selectedPlane , setActive, undoMinMaxGUI} from '../../../../store/sideBar/clipSlice';
import RotateSlider from '../shared/rotateSlider';
import TranslateSlider from '../../../shared/translateSlider';

import MuiFormControl from '@material-ui/core/FormControl'
import MuiInputLabel from '@material-ui/core/InputLabel'
import MuiSelect from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';

import MuiEditIcon from '@material-ui/icons/EditOutlined';

import MuiTooltip from '@material-ui/core/Tooltip'

import {undoStack} from "../../../utils/undoStack";

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const planes = useAppSelector((state) => state.clipPlane.planes);

  const enabledPlanes = planes.filter(item => item.enabled === true);
  const selected = useAppSelector(selectActivePlane);
  
  const IndexofSelected = planes.findIndex(item => item.id === selected)
  const enabledSelectedPlanes = useAppSelector(selectedPlane).filter(item => item.enabled === true);
  const [activeId,setActiveId] = useState(planes.length === 0 || enabledPlanes.length === 0 ? -3 : enabledSelectedPlanes.length > 1  ? enabledSelectedPlanes[0].id : selected >= 0 && planes[IndexofSelected].enabled === true ? selected : enabledPlanes[0].id );

  const indexofActive = planes.findIndex(item => item.id === activeId)
  const clipNormalInverted = planes[indexofActive].clipNormalInverted;
  const name = planes[indexofActive].name;
  const translate = planes[indexofActive].translate;
  const translateMin = planes[indexofActive].translateMin;
  const translateMax = planes[indexofActive].translateMax;
  const rotate = planes[indexofActive].rotate;
  const axisX = planes[indexofActive].axisX;
  const axisY = planes[indexofActive].axisY;

  const clipCordX = planes[indexofActive].clipCordX;
  const clipCordY = planes[indexofActive].clipCordY;
  const clipCordZ = planes[indexofActive].clipCordZ;
  const clipConstD = planes[indexofActive].clipConstD;
  
  
  const [stepValue, setStepValue] = useState((translateMax - translateMin) / 100);

  const [stepValueDisplay, setStepValueDisplay] = useState<string | number>(stepValue)
  
  useEffect(() => {
        setStepValue((translateMax - translateMin) / 100)
        setStepValueDisplay((translateMax - translateMin) / 100)
      },[activeId]);

  const onHandleBlurStepValue = () => {
    if(stepValueDisplay)
    setStepValue(Number(stepValueDisplay));
    
    else
      setStepValueDisplay(Number(stepValue));  
  }

  const onHandleDirection = (undoable? : boolean) => {
    const id= planes[indexofActive].id
    dispatch(editNormalInverted(id))
    dispatch(setSectionPlaneData({id}));

    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleDirection(),
          redo: () => onHandleDirection(),
        }
      )
    }
   
  }

  const undoTranslate = (oldValue : number, minMaxChange : boolean, oldMax: number, oldMin: number) => {
    const update= {id : planes[indexofActive].id, translate : oldValue};
    dispatch(editTranslate(update))
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))

    if(minMaxChange) {
      dispatch(undoMinMaxGUI({id:planes[indexofActive].id, min: oldMin, max : oldMax}))
    }

  }


  const onHandleTranslateCommitted= (newValue:any , stepValue : any, undoable? : boolean) => {
    console.log("stepValue",stepValue)
 
    console.log("hwllo" ,translateMax)

    let functionExecuted = false;
    let minMaxChange = false;
    let oldMin = 0;
    let oldMax  =0;
    const oldValue = planes[indexofActive].translate;

    if( (newValue - stepValue) <= translateMin ){
      functionExecuted = true;
      minMaxChange = true;
      const update= {id : planes[indexofActive].id, translate : newValue - stepValue};
      oldMin = planes[indexofActive].translateMin;
      oldMax = planes[indexofActive].translateMax;

      dispatch(editTranslate(update))
      dispatch(updateMinMaxGUI({id:planes[indexofActive].id}));
    }

       
    if( (newValue + stepValue) >= translateMax ){
      functionExecuted = true;
      minMaxChange = true;
      oldMin = planes[indexofActive].translateMin;
      oldMax = planes[indexofActive].translateMax;

      const update= {id : planes[indexofActive].id, translate : newValue + stepValue};
      dispatch(editTranslate(update))
      dispatch(updateMinMaxGUI({id:planes[indexofActive].id}));
    }

    if(undoable && functionExecuted){
      undoStack.add(
        {
          undo: () => undoTranslate(oldValue, minMaxChange, oldMax, oldMin),
          redo: () => onHandleTranslateTextbox(newValue, stepValue),
        }
      )
    }


  }

  const onHandleBack = () => {
    dispatch(goBack());
  }

  const onHandleSelect = (id : number) => {

    const click : any  = planes.find(item => item.id === id);
    dispatch(setActive({clicked: click}))
    setActiveId(id)
  }

  const onHandleTranslate= ( newValue : any, undoable?: boolean) => {

    if(newValue !== planes[indexofActive].translate){
      const update= {id : planes[indexofActive].id, translate : Number(newValue)};
      const oldValue = planes[indexofActive].translate;
      dispatch(editTranslate(update))
      dispatch(setSectionPlaneData({id:planes[indexofActive].id}))

      if(undoable){
        undoStack.add(
          {
            undo: () => undoTranslate(oldValue, false, 0, 0),
            redo: () => onHandleTranslateTextbox(newValue),
          }
        )
      }
    }
  }

  const onHandleTranslateTextbox= (newValue : number, undoable?: boolean ) => {
    const update= {id : planes[indexofActive].id, translate : newValue};
    const oldValue = planes[indexofActive].translate;

    let oldMax = 0;
    let oldMin = 0;
    let minMaxChange = false;
    dispatch(editTranslate(update))
    if(update.translate >= translateMax || update.translate <= translateMin) {
      minMaxChange= true;
      oldMax = planes[indexofActive].translateMax;
      oldMin = planes[indexofActive].translateMin;
      dispatch(updateMinMaxGUI({id:planes[indexofActive].id}));
    }
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))

    if(undoable){
      undoStack.add(
        {
          undo: () => undoTranslate(oldValue, minMaxChange, oldMax, oldMin),
          redo: () => onHandleTranslateTextbox(newValue),
        }
      )
    }

  }

  const onHandleRotate = (value : any, undoable?: boolean) => {

    const oldValue = planes[indexofActive].rotate;
    const update= {id : planes[indexofActive].id, rotate : value};
    dispatch(editRotate(update))
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))

    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleRotate(oldValue),
          redo: () => onHandleRotate(value),
        }
      )
    }
  }
  
  const onHandleRotateX = (value : any, undoable?: boolean) => {

    const oldValue = planes[indexofActive].axisX;
    const update= {id : planes[indexofActive].id, axisX : value };
    dispatch(editAxisX(update));
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))

    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleRotateX(oldValue),
          redo: () => onHandleRotateX(value),
        }
      )
    }
  }

  const onHandleRotateY = (value : any, undoable?: boolean) => {

    const oldValue = planes[indexofActive].axisY;
    const update= {id : planes[indexofActive].id, axisY : value};
    dispatch(editAxisY(update));
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))

    if(undoable){
      undoStack.add(
        {
          undo: () => onHandleRotateY(oldValue),
          redo: () => onHandleRotateY(value),
        }
      )
    }
  }

  const onHandleTransform = () => {
    dispatch(push(Routes.CLIPPLANES_SETTINGS));
  }

  const getHeaderLeftIcon= () => {
    return (
      <MuiIconButton onClick={() => onHandleBack()}><BackButton/></MuiIconButton>
    );
  }

  const getHeaderRightIcon = () => {
    return(
      <div>
      <MuiGrid container item direction='column' justify='flex-start'>
                <MuiGrid item>
                  <MuiTooltip title="Settings">
                <MuiIconButton   onClick={() => onHandleTransform()}> 
                <MuiEditIcon/>
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

  const getAction = () => {
    return(
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
            planes.map((item) => 
              <MuiMenuItem disabled={item.enabled ? false : true} value={item.id}>{item.name}</MuiMenuItem>  
          )}
      </SelectAction>
    )
  }
    
  const getBody = () => {
    //console.log("getBody",rotate)
    return (
      <div className={classes.scrollBar}> 

      <div className={classes.translatePageContainer}>

        <div className={classes.settingItemContainer}>
          <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>
            Plane Equation
          </MuiTypography>
          <div style={{width:"90%"}}>
            <MuiInput disabled inputProps={{style: { textAlign: 'center' ,},}} className={classes.disabledTextBox} value={`${Math.round(clipCordX*1000)/1000}X ${Math.sign(clipCordY)===1 || Math.sign(clipCordY) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipCordY*1000)/1000)}Y ${Math.sign(clipCordZ) === 1 || Math.sign(clipCordZ) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipCordZ*1000)/1000)}Z = ${Math.round(clipConstD*1000)/1000}`}/>
          </div>
        </div>

        <div className={classes.settingItemContainer}>
          <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>
            Coordinate System
          </MuiTypography>
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} sm={6}>
              <MuiGrid container spacing={1} direction='column' >
                <MuiGrid item>
                  <MuiIconButton style={{width:"60px",height: "90px", }}   onClick={() => onHandleDirection(true)}>
                    { clipNormalInverted === false 
                      ? 
                        <FlipDirectionLeft/>
                      :
                        <FlipDirectionRight/>
                    }
                </MuiIconButton>
              </MuiGrid>
              <MuiGrid item>
                <MuiTypography className={classes.caption} variant="caption" noWrap>
                  Flip Direction
                </MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid item xs={12} sm={6}>
            <RotateSlider value={rotate} handleChange={onHandleRotate} label={"Rotate"}/>
          </MuiGrid>
        </MuiGrid>
      </div>

      <div className={classes.settingItemContainer}>
      <MuiTypography variant="h2" className={classes.settingPageCaption}>
          Translate
        </MuiTypography>
          <TranslateSlider  
            value={translate} valueMin={translateMin} 
            valueMax={translateMax} onHandleChange={onHandleTranslate}
            stepValue= {stepValue}
            onHandleTextbox={onHandleTranslateTextbox} onHandleCommited={onHandleTranslateCommitted}
            startPoint = {true}
          />
    
          <div style={{marginTop: "12px", marginLeft:"5px"}}>


          <MuiGrid container>

          <MuiGrid item xs={12} sm={4}>
          </MuiGrid>

          <MuiGrid item xs={12} sm={4}>
      <MuiTypography style={{ fontSize: "14px",}}>Step Value :</MuiTypography>
    </MuiGrid>


    <MuiGrid item xs={12} sm={3} >
    <input
    // inputProps={{style: { textAlign: 'center', padding:"1px",  }, }} 
    className={classes.inputTranslate} 
    style={{width: "70px",marginLeft:"5px"}} 
    type="number" 
    value={stepValueDisplay} 
    onChange={(e) => {setStepValueDisplay(e.target.value)}}  
    onBlur = {onHandleBlurStepValue}
  />
    </MuiGrid>
  </MuiGrid>
  </div>
      </div>
      
      <div className={classes.settingItemContainer}>
      <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>Rotate</MuiTypography>
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} sm={6}>
            <RotateSlider value={axisX} handleChange={onHandleRotateX}  label={"X-Axis"}/>
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
            <RotateSlider value={axisY} handleChange={onHandleRotateY}  label={"Y-Axis"}/>
            </MuiGrid>
          </MuiGrid>  
      </div>
      </div>
          </div>

    )
  } 

    return(
        <SideBarContainer
      headerContent={ <Title text={"Transformation" } group="Clip Planes"/> }
      headerAction = {getAction()}
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
    />
    )
}