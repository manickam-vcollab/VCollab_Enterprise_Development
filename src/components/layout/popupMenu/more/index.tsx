import MuiPopper from "@material-ui/core/Popper";
import MuiTypography from '@material-ui/core/Typography';
import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiMenuList from "@material-ui/core/MenuList";
import MuiIcon from '@material-ui/core/Icon';

import { selectActiveViewerID} from '../../../../store/appSlice';
import { useAppSelector } from '../../../../store/storeHooks';

import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';

import MuiCameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
//import MuiUpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';

import styles from './style';

function More(props : any)
{
    const classes = styles();
    const activeViewerID = useAppSelector(selectActiveViewerID);

    const moreMenuItems = [
        //{ title: "Status", icon: MuiUpdateOutlinedIcon },
        { title: "Capture", icon: MuiCameraAltOutlinedIcon, id : "capture" },
    ];  

    const handleClickMore=( event :any, item : any )=>{
        if(item.id === "capture"){
            viewerAPIProxy.captureScreen(activeViewerID);
        }     
    };
        
    return(
        <MuiPopper className={classes.popper} disablePortal id="more-menu" open={props.open} anchorEl={props.anchorEl}>
        <MuiMenuList id="more-menu-list"  >
            {moreMenuItems.map((item :any,index : any)=>(
                <MuiMenuItem className={classes.menuItem}  key={index} onClick={(e) => handleClickMore(e, item)} disabled = {item.disabled === true}>
                    <MuiIcon className={classes.icon}><item.icon/></MuiIcon>
                    <MuiTypography  className={classes.listItem} variant="h2">{item.title} </MuiTypography>
                </MuiMenuItem>
            ))}
        </MuiMenuList>
    </MuiPopper>  
    )
}

export default More;