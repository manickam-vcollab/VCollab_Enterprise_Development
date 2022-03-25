import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { selectMsg,selectOpen,setOpen,clearMsg} from "../../../store/toastSlice";
import {useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

export default function Snackbars() {
    const dispatch = useAppDispatch();
    const messageInfo = useAppSelector(selectMsg);
    const open = useAppSelector(selectOpen);

  
    const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(setOpen({isOpen:false}));
    };
  
    const handleExited = () => {
        dispatch(clearMsg());
    };
  
    return(
      <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          onExited={handleExited}
          message={messageInfo ? messageInfo.message : undefined}
          TransitionComponent={SlideTransition}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        />
    )
  }