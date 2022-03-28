import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';

import MuiTypography from '@material-ui/core/Typography';
import AddIcon from "../../../icons/plus";

import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';

import { useState} from "react";
import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import {goBack, push} from 'connected-react-router/immutable';
import MuiButton from '@material-ui/core/Button';

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiVisibilityIcon from '@material-ui/icons/Visibility';

import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { Routes } from '../../../../routes/index'
import styles from '../style';

import { CameraView ,addCameraView , setActiveId, ViewMode , setProjectionAsync , pasteCameraView , deleteCameraView, setCameraInfoAsync} from '../../../../store/sideBar/sceneSlice';
import { selectActiveViewerID } from 'store/appSlice';

export default function Camera (){

    const classes = styles();

    const dispatch = useAppDispatch();
    const maxUserDefined = 3;
    const [copy, setCopy] = useState(-1);
    const [openDelete,setOpenDelete] = useState(false)

    const cameraList : CameraView[] = useAppSelector((state) => state.scene.cameraViews)
    const active = useAppSelector(state => state.scene.settings.activeId);
    const projection = useAppSelector(state => state.scene.settings.projection)
    const activeViewerId = useAppSelector(selectActiveViewerID);
    
    const userDefinedLength : number = cameraList.filter(item => item.userDefined === true).length;
    
    // useEffect(() => {
    //     if(value){
    //         setActive(value.id)
    //         dispatch(setActiveId(value.id))
    //     }
    //     else
    //         dispatch(setActiveId(-1))
    //   },[cameraList]);
      

    const onHandleCamera = (id : number) => {
        dispatch(setCameraInfoAsync({id, undoable: true, callSetActive: true}))

    }

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const onHandleAdd = () => {
        dispatch(addCameraView({activeViewerId,undoable: true}));
    }

    const onHandleCopy = () => {
        setCopy(active);
    }

    const onHandlePaste = () => {
        const data = cameraList.find(item => item.id === copy)
        if(data)
        dispatch(pasteCameraView({data, undoable: true}))
        // setCameraList(newCameraList);
    }

    const onHandleDelete = () => {
        setOpenDelete(false);
        const toDeleteCameraView = cameraList.find(item => item.id === active)
        dispatch(deleteCameraView({toDeleteItem : toDeleteCameraView, undoable: true}))
    }

    const onHandleViewMode = (e : any) => {
        const value = Number(e.currentTarget.value);
        dispatch(setProjectionAsync({value, undoable : true}))
    }

    const onHandleEdit = () => {
        dispatch(push(Routes.SCENE_CAMERA_EDIT));  
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return ( 
            <MuiIconButton onClick={onHandleAdd}>
            <AddIcon/>
        </MuiIconButton> 
        )
    }

    const getAction = () => {
        return (
                <div style={{marginBottom: "20px", textAlign:"center"}}>
                <MuiToggleButtonGroup
            // style={{marginBottom:"20px",}}
            size="small" 
            value={projection}
            exclusive
            onChange={onHandleViewMode}
            aria-label="text alignment"
        >
            <MuiToggleButton value={ViewMode.Perspective} aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Perspective</MuiTypography>
            </MuiToggleButton>
            <MuiToggleButton value={ViewMode.Orthographic} aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Orthographic</MuiTypography>
            </MuiToggleButton>
        </MuiToggleButtonGroup>
                </div>
        )
    }

    const getBody = () => {
        return (
            <div className={classes.scrollBar}>
            
                <div style={{marginLeft:"10px", marginTop:"20px",}}>

                        <MuiTypography  style={{textTransform:"none", textAlign:"left"}}>
                            System Provided
                        </MuiTypography>

                <div>
                    <MuiMenuList>
                        {
                            cameraList.filter(item => item.userDefined !== true).map(item =>
                                <MuiMenuItem  key={ 'divParent_' + item.id }  selected={active === item.id} onClick={() => onHandleCamera(item.id)}>
                                <MuiTypography>
                                    {item.name}
                                </MuiTypography>
                            </MuiMenuItem>
                        )}
                    </MuiMenuList>
                    
                {
                    userDefinedLength > 0 
                    ?
                    <div>
                         <MuiTypography  style={{textTransform:"none", textAlign:"left"}}>
                            User Defined
                        </MuiTypography>
                        <MuiMenuList>
                        {
                            cameraList.filter(item => item.userDefined === true).map(item =>
                                <MuiMenuItem  key={ 'divParent_' + item.id }  selected={active === item.id} onClick={() => onHandleCamera(item.id)}>
                                <MuiTypography>
                                    {item.name}
                                </MuiTypography>
                            </MuiMenuItem>
                        )}
                    </MuiMenuList>
                    </div>

                    :
                    null
                }
                </div>
            </div>
            </div>

        )
    }

    const getFooter = () => {
        // const activeItem = cameraList.filter(item => item.id === active) 
        return(
            <div>     
                <OptionContainer>
                    <Option label={cameraList.find(item => item.id === active)?.userDefined ? "Edit" : "View"} icon={<MuiIconButton 
                        disabled={active === -1}
                        onClick={() => onHandleEdit()}
                    >   
                        { cameraList.find(item => item.id === active)?.userDefined
                            ?
                                <MuiEditIcon/>
                            :
                                <MuiVisibilityIcon/>
                        }                                        
                        </MuiIconButton>} 
                    />
                                        
                    <Option label="Copy" icon={ <MuiIconButton 
                        disabled = {active === -1 || userDefinedLength === maxUserDefined} 
                        onClick={() => onHandleCopy()}
                    > 
                        <MuiFileCopyOutlinedIcon/>
                        </MuiIconButton>}
                    />
                    
                    <Option label="Paste" icon={ <MuiIconButton 
                        disabled = {copy === -1 || userDefinedLength === maxUserDefined }  
                        onClick={() => onHandlePaste()}
                    > 
                        <MuiPaste/>
                        </MuiIconButton>}
                    />
                    
                    <Option label="Delete" icon={ <MuiIconButton 
                        disabled = {active === -1 || cameraList.find(item => item.id === active)?.userDefined === false}  
                        onClick={() => onHandleDelete()}
                    > 
                        <MuiDeleteForeverOutlinedIcon/>
                        </MuiIconButton>}
                    />                        
                </OptionContainer>
            </div>
        )
    }

    return(
        <SideBarContainer
        headerContent={ <Title text={"Camera" } group="Scene"/> }
        headerAction = {getAction()}
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />

    )
}