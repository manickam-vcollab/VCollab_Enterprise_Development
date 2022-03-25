import MuiPopper from '@material-ui/core/Popper';
import MuiTypography from '@material-ui/core/Typography';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiIcon from '@material-ui/core/Icon';

import { BytesToStructuredString } from '../../../utils/networkUtils';
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';

import { selectActiveViewerID, selectPopupMenuDisplayMode, setPopupMenuDisplayMode } from '../../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';

import styles from './style';

function DisplayMode(props : any)
{
    const classes = styles();
    const popupMenuDisplayMode = useAppSelector(selectPopupMenuDisplayMode);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const dispatch = useAppDispatch();  

    const formatDownloadSize = (size : number) =>
    {
      let formattedSize = BytesToStructuredString(size, 2);   
      return formattedSize;
    }

    const setDisplayMode = (diplayMode : any) => {
        viewerAPIProxy.setDisplayMode(activeViewerID, diplayMode.id, [])
        .then((res) => {
            viewerAPIProxy.getDisplayModes(activeViewerID, []) 
            .then((response)=>{
              dispatch(setPopupMenuDisplayMode(response));
            });         
            //showNotification(diplayMode.title +' is applied');
        });   
    };

    return(
        <MuiPopper className={classes.popper} disablePortal id='display-menu' open={props.open} anchorEl={props.anchorEl}>
            <MuiMenuList id='display-menu-list'  >
                {popupMenuDisplayMode.map((item :any,index : any)=>(
                    <MuiMenuItem className={classes.menuItem}  key={index} onClick={()=>{ setDisplayMode(item)}} disabled = {item.disabled === true}>
                        <item.icon/>
                        <MuiTypography  className={classes.listItem} variant='h2'>{item.title} </MuiTypography>
                        <MuiTypography  className={classes.listItemSize} variant='subtitle1'>{formatDownloadSize((item.downloadMetricValue ? item.downloadMetricValue : 0) )}</MuiTypography>
                    </MuiMenuItem>
                ))}
            </MuiMenuList>
        </MuiPopper>  
    )
}

export default DisplayMode;