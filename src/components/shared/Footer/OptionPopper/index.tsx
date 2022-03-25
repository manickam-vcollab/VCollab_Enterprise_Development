import React ,{useState} from 'react'
import Popper from '@material-ui/core/Popper';
import MuiClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { useAppDispatch } from '../../../../store/storeHooks';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(createStyles({
    item: {
        maxWidth: 150
    },
    icon: {
        minWidth: 40
    }
}))

type Option = {
    id:string,
    icon: JSX.Element,
    onClick: () => void
}
type VisibilityOptionsProps = {
    disabled: boolean,
    options: Option[],
    parent: Option
}
function VisibilityOptions(props:VisibilityOptionsProps) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.parent.onClick();
        setOpen((prevOpen) => !prevOpen);
      };
    
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
          }
        setOpen(false);
    };
    const handleIconClick = (e:React.MouseEvent<EventTarget>,item:Option) => {
        item.onClick();
        handleClose(e);
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
    
    const classes = useStyles();
    return (
        <>
        <ToolTip title={props.parent.id}>
            <span>
            <IconButton ref={anchorRef} aria-label={props.parent.id} {...props} onClick={handleClick}>
               {
                   props.parent.icon
               }
            </IconButton>
            </span>

        </ToolTip>
       <Popper
        role={undefined}
        transition
        open={open}
        anchorEl={anchorRef.current}
        disablePortal
      >
          { (pooperProps:any) => (
              <Grow {...pooperProps.TransitionProps}
              style={{ transformOrigin: pooperProps.placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper elevation={10}>
                <MuiClickAwayListener onClickAway={handleClose}>
                    <MuiMenuList>
                    {
                        props.options.map((item:any) => {
                            return (
                            <MuiMenuItem className={classes.item} key={item.id} alignItems='center' onClick={(e) => handleIconClick(e,item)}>
                            <MuiListItemIcon classes={{root: classes.icon}}>
                                {item.icon}
                            </MuiListItemIcon>
                            <MuiListItemText primary={item.id}>
                            </MuiListItemText>
                            </MuiMenuItem>
                            )
                        })
                    }
                    </MuiMenuList>
               </MuiClickAwayListener>
              </Paper>
              </Grow>
          )
          }
        
      </Popper>
        </>
    )
}

export default VisibilityOptions
