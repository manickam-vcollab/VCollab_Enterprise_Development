import MuiTypgraphy from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
// import NumericInput from 'react-numeric-input';
import styles from './style';
import MuiExpandLessIcon from '@material-ui/icons/ExpandLess';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiInput from '@material-ui/core/Input';
import {useState, useEffect} from 'react';

export default function TranslateSlider( props : any ){
    const classes = styles();
    const [value, setValue] = useState(props.value)
      useEffect(() => {
        setValue(props.value)
      },[props.value]);

    let valueMin = Math.round(props.valueMin*1000)/1000;
    let valueMax = Math.round(props.valueMax*1000)/1000;

    if (Math.sign(props.valueMax) === 1) {
      if(props.valueMax < 0.01 || props.valueMax > 999)
        valueMax = props.valueMax.toExponential(3)
    }
    if (Math.sign(props.valueMax) === -1){
       if(props.valueMax > -0.01 || props.valueMax < -999)
      valueMax = props.valueMax.toExponential(3)
    }
    
    if(Math.sign(props.valueMin) === 1 ){
      if(props.valueMin < 0.01 || props.valueMin > 999)
      valueMin = props.valueMin.toExponential(3)
    }
    if(Math.sign(props.valueMin) === -1) {
      if(props.valueMin > -0.01 || props.valueMin < -999)
     valueMin = props.valueMin.toExponential(3)
   }
    

  const onHandleSlider = (value : any) => {
    props.onHandleCommited(value, props.stepValue, true)
  }

return(
    <div>
  <MuiGrid container spacing={1} >
    <MuiGrid item xs={12} sm={7} className={classes.translate}>
      <Slider className={classes.translate} style={ props.editMode ? {color:"cuttentColor", opacity:"50%"} : {color:"currentColor",}}
        disabled={props.editMode}
        value={props.value}
        step={props.stepValue}
        min={props.valueMin}
        max={props.valueMax}
        railStyle={{backgroundColor:"#80808080",height: 4,}}
        trackStyle={{ backgroundColor: 'currentColor',height: 5,}}
        handleStyle={{
          borderColor: 'currentColor',
          backgroundColor: 'currentColor',
          height: 10,
          width: 10,
          marginTop: -3,
        }}
        startPoint= {props.startPoint && (props.valueMax + props.valueMin) /2}
        onChange={(newValue) => props.onHandleChange(newValue, true)}
        onAfterChange={(value) => onHandleSlider(value)}
      />
      <div style={{marginLeft:"8px",marginTop:"-5px" , width:"100%", fontSize:"11px"}}>
        <span style={{float:"left"}}> {valueMin}</span>
          <span style={{float:"right"}} >{valueMax}</span>
      </div>
    </MuiGrid>
    
  <MuiGrid item xs={12} sm={3} style={{marginTop:"-28px"}} >
  <MuiIconButton disabled={props.editMode} style={{height:10, width:10, marginLeft:"5px"}}><MuiExpandLessIcon  onClick={() => props.value < props.valueMax && props.onHandleTextbox(Number((props.value + props.stepValue).toFixed(4)), true)} className={`${classes.translateButton} + ${props.editMode && classes.disabledButton}`}/></MuiIconButton>
  <input 
    readOnly={props.editMode}
    step= {props.stepValue}
     min= {props.valueMin}
    max= {props.valueMax} 
    className={`${classes.inputTranslate} + ${props.editMode && classes.disabled}`} 
    style={{width: "70px", }} 
    type="number" 
    value={value} 
    onChange={(e) => setValue(e.target.value)} 
    onBlur={() => props.onHandleTextbox(Number(value), true)} 
  />
     <MuiIconButton disabled={props.editMode} style={{height:10, width:10,marginLeft:"5px"}}><MuiExpandMoreIcon  onClick={() =>  props.value > props.valueMin && props.onHandleTextbox(Number((props.value - props.stepValue).toFixed(4)), true)} className={`${classes.translateButton} + ${props.editMode && classes.disabledButton}`}/></MuiIconButton>
  </MuiGrid>
</MuiGrid>

</div>
)
}