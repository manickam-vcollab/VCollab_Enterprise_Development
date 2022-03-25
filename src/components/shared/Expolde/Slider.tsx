import React from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import style from './style';

import {selectSlidervalue ,setSlidervalue} from '../../../store/sideBar/settings';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

  
interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}


export default function CustomizedSlider() {

  const classes = style();

  const issliderValue = useAppSelector(selectSlidervalue);

  const dispatch = useAppDispatch();  

  const handleSliderChange =(event: any, newValue: any) => {

    dispatch(setSlidervalue(newValue));
  }

  return (
    <div >
      <Slider
        className={classes.slider}
        ValueLabelComponent={ValueLabelComponent}
        aria-label="custom thumb label"
        value={issliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
}
