import React, { useEffect, useRef, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import {goBack, goForward, push, } from 'connected-react-router/immutable';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft'
import RightArrowIcon from '@material-ui/icons/ChevronRight'
import { topbarHeight } from 'config'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useAppDispatch } from 'store/storeHooks';
import clsx from 'clsx';
import { MainMenuItem, setActiveTab } from 'store/mainMenuSlice';
import {setSidebarVisibility} from 'store/appSlice'

const useStyles = makeStyles( theme => {
    return {
        root: {
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.background.default}`
        },
        icon: {
            height: '100%',
            color: theme.palette.text.secondary,
        },
        iconHover: {
            '& :hover':{
                color: theme.palette.text.primary
            }
        },
        disabled: {
            color: theme.palette.text.disabled + '!important'
        }

    }
})

type NavProps = {
    activeItem: MainMenuItem | null,
}

function Nav(props: NavProps) {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const activeItemHistory = useRef<(MainMenuItem | null)[]>([]); 
    const historyPointer = useRef(-1);
    const isNavPressed = useRef(false);
    const [isLeftArrowEnabled, setIsLeftArrowEnabled] = useState(true);
    const [isRightArrowEnabled, setIsRightArrowEnabled] = useState(true);

    const classes = useStyles({
        isLeftArrowEnabled,
        isRightArrowEnabled
    });

    const handleNavBack = () => {
        if(historyPointer.current > 0){
          isNavPressed.current = true;
          historyPointer.current-=1;
          const active = activeItemHistory.current[historyPointer.current];
          dispatch(setActiveTab({menuItem: active}))
          dispatch(setSidebarVisibility(true));
        }
      }
    
      const handleNavForward = () => {
        if(historyPointer.current < activeItemHistory.current.length-1){
          isNavPressed.current = true;
          historyPointer.current+=1;
          const active = activeItemHistory.current[historyPointer.current];
          dispatch(setActiveTab({menuItem: active}))
          dispatch(setSidebarVisibility(true));
        }
      }

    useEffect(() => {
        if(props.activeItem && !isNavPressed.current)
        {
            if(historyPointer.current < activeItemHistory.current.length -1) {
                activeItemHistory.current.splice(historyPointer.current+1, activeItemHistory.current.length-(historyPointer.current+1));
            }
          activeItemHistory.current.push(props.activeItem);
          historyPointer.current+=1;
        }
        isNavPressed.current = false;
      },[props.activeItem])
    
    
  return (
    <Grid container className={classes.root} style={{width:'100%', height: topbarHeight + 'px'}}>
        <Grid item xs className={clsx({
            [classes.iconHover]:isLeftArrowEnabled, 
           })} alignItems='center' alignContent='center' onClick={handleNavBack}>
        <LeftArrowIcon fontSize='large'  className={
            clsx({[classes.icon]:true,[classes.disabled]:!isLeftArrowEnabled})}/>
        </Grid>
        <Grid item xs className={clsx({
            [classes.iconHover]:isRightArrowEnabled, 
           })} alignItems='center' onClick={handleNavForward}>
        <RightArrowIcon fontSize='large' 
        className={clsx({[classes.icon]:true,[classes.disabled]:!isLeftArrowEnabled})}/>
        </Grid>
    </Grid>
  )
}

export default Nav