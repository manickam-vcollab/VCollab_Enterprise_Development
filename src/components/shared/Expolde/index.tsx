import React from 'react';
import Popper from '@material-ui/core/Popper';
import MuiIconButton from '@material-ui/core/IconButton';
import AllOutIcon from '@material-ui/icons/AllOut';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';


import CustomizedSlider from './Slider'
import style from './style'


export default function SimplePopper() {
  const classes = style();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    event.stopPropagation();
  };

  const OnClickAwayMenuPopup =() => {

     setAnchorEl(null);
  }
  return (
    <div>
       <MuiIconButton  onClick={handleClick}>
         <AllOutIcon  />
       </MuiIconButton>
       <ClickAwayListener onClickAway={()=> OnClickAwayMenuPopup()}>
          <Popper  open={Boolean(anchorEl)} anchorEl={anchorEl} className={classes.poperbox}> 
          <div >
            <div className={classes.sliderTitle}>Expolde</div>
             <CustomizedSlider/>
          </div>
          </Popper>
        </ClickAwayListener>
    </div>
  );
}
