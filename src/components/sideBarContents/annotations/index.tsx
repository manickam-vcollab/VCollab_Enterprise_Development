import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToolTip from '@material-ui/core/Tooltip';
import MuiBackIcon from '@material-ui/icons/ArrowBack'

import { useAppDispatch } from "../../../store/storeHooks";
import {setSidebarActiveContent} from "../../../store/appSlice";
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import { sideBarContentTypes } from "../../../config";
import styles from './style';

export default function Annotations(){

    const classes = styles();
    const dispatch = useAppDispatch();  

    const onClickBackIcon = () =>{
        dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu));
    }

    const getHeaderLeftIcon= () => {
        return (
        <MuiToolTip title='Back'>
        <MuiIconButton
        className={classes.backIcon}
        onClick={() => onClickBackIcon()}><MuiBackIcon/></MuiIconButton>
        </MuiToolTip>
        );
    }
  
    const getHeaderContent = () => {
        return (
        <MuiTypography className={classes.heading} variant='h1' noWrap>
            Annotation
        </MuiTypography>)  
    }
  
    const getHeaderRightIcon = () => {
        return null;
    }

    const getBody = () => {
        return (<div style={{ height: "500px", display: "inline-flex", alignItems: "center" }}>Coming Soon</div>)
    }      
  
    const getFooter = () => {
        return null;  
    }

    return (<SideBarContainer
        headerContent={ getHeaderContent() }
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
        />)
}