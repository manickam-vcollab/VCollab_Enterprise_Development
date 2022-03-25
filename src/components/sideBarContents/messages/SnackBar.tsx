import React, { Ref, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent  from '@material-ui/core/SnackbarContent';
import { selectMsg,selectOpen,setOpen,clearMsg} from "../../../store/toastSlice";
import {useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import Pop from '@material-ui/core/Popover';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

type IProps = {
  parentRef:  React.RefObject<HTMLDivElement>
}
type ViewerSize = {
  x:number,
  y:number,
  w:number,
  h:number
}
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  topCenter: (props:ViewerSize) => ({
    backgroundImage: "none",
    top: props.y,
    left: props.x + props.w/2
  })
}))


export default function Snackbars(props:IProps) {
    const dispatch = useAppDispatch();
    const [viewerSize, setViewerSize] = useState<ViewerSize>({x:0,y:0,w:0,h:0});
    const messageInfo = useAppSelector(selectMsg);
    const open = useAppSelector(selectOpen);
    const classes = useStyles(viewerSize);
  
    useEffect(() => {
        if(props.parentRef.current) {
          let rect = props.parentRef.current.getBoundingClientRect();
          setViewerSize({
            x:rect.x,
            y:rect.y,
            w:rect.width,
            h:rect.height
          })
        }
    },[props.parentRef.current, props.parentRef.current?.offsetLeft, props.parentRef.current?.offsetTop])
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
          classes = {{
            anchorOriginTopCenter: classes.topCenter
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          onExited={handleExited}
        >
          <SnackbarContent
          classes={{root: classes.root}}
          message={messageInfo ? 
            <Typography variant = "h2">
              {messageInfo.message}
            </Typography> : undefined}
          />
        </Snackbar>
    )
  }