import { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';

import style from './tooglebuttonstyle';


const ThemchangeButton = withStyles((theme) => ({

    root:{
      textTransform: 'none'
    },
    label: {
      color: theme.palette.text.primary,
    },
    sizeSmall:{

      width:60,
      height:30
    }
  }))(ToggleButton);

interface ToggleButtonProps {
  value: boolean,
  onToggle?: (isOn:boolean, undoable?: boolean) => void 
}

export default function ToggleButtons(props:ToggleButtonProps) {

const classes = style();
 

const handleDarkTheme= function() {

  props.onToggle && props.onToggle(true, true);
}

const handleLightTheme= function() {

  props.onToggle && props.onToggle(false, true);
}

  return (

    <div className={classes.toggleContainer}>  
    <div className={classes.toggleButtons}>
      Show
    </div> 
    <ToggleButtonGroup
    size='small'
    >
      <ThemchangeButton  value="darktheme-button" onClick={handleDarkTheme} selected={props.value? true : false}>
           On
      </ThemchangeButton>
      <ThemchangeButton value="lighttheme-button" onClick={handleLightTheme} selected={props.value? false : true}>
           Off
      </ThemchangeButton>
    </ToggleButtonGroup>
   
    </div>
  );
}