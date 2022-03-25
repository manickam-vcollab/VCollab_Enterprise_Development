import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import MuiTypography from '@material-ui/core/Typography';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MuiGrid from '@material-ui/core/Grid';

import  {useEffect, useState} from "react";
import NumericInput from 'react-numeric-input';
import styles from '../style';

import MuiButton from '@material-ui/core/Button';
import { CameraView,ViewMode, updateChange, setCameraInfoAsync} from '../../../../store/sideBar/sceneSlice';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';

import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';

import {undoStack} from "../../../utils/undoStack";

export default function CameraEdit (){

    const dispatch = useAppDispatch();
    const classes = styles();

    const [projection, setProjection] = useState(useAppSelector(state => state.scene.settings.projection));
    const active = useAppSelector(state => state.scene.settings.activeId);

    const cameraViews : CameraView[] = useAppSelector(state => state.scene.cameraViews)

    const [cameraView,setCameraView] : any = useState(cameraViews.find(item => item.id === active))

    useEffect(() => {
        if(cameraViews.length > 0){
            setCameraView(cameraViews.find(item => item.id === active))
        }
      },[cameraViews]);
      
    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleProjection = (e: any, value:any) => {
        setProjection(value);
    }

    const onHandleSelect = (newId : number) => {
        dispatch(setCameraInfoAsync({id :newId, undoable: true}))
        setCameraView(cameraViews.find(item => item.id === newId))
    }

    const onHandleChange = (newValue : string , variable: string) => {
        
        console.log(variable)
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));
        switch(variable){
            // Perspective value update
            case "Y-Field of View":
                updatedCameraView.valuePerspective[0].value = newValue;
            break;
            case "Aspect Ratio":
                updatedCameraView.valuePerspective[1].value = newValue;
            break;
            case "Far Plane":
                updatedCameraView.valuePerspective[2].value = newValue;
            break;
            case "Near Plane":
                updatedCameraView.valuePerspective[3].value = newValue;
            break;

            // Orthographic value update
            case "Left":
                updatedCameraView.valueOrthographic[0].value = newValue;
            break;
            case "Right":
                updatedCameraView.valueOrthographic[1].value = newValue;
            break;
            case "Top":
                updatedCameraView.valueOrthographic[2].value = newValue;
            break;
            case "Bottom":
                updatedCameraView.valueOrthographic[3].value = newValue;
            break;
            case "Far":
                updatedCameraView.valueOrthographic[4].value = newValue;
            break;
            case "Near":
                updatedCameraView.valueOrthographic[5].value = newValue;
            break;
        
            // Camera position value update
            case "position X":
                updatedCameraView.cameraPosition[0].value = newValue;
            break;
            case "position Y":
                updatedCameraView.cameraPosition[1].value = newValue;
            break;
            case "position Z":
                updatedCameraView.cameraPosition[2].value = newValue;
            break;

            // camera Direction value update
            case "direction X":
                updatedCameraView.cameraDirection[0].value = newValue;
            break;
            case "direction Y":
                updatedCameraView.cameraDirection[1].value = newValue;
            break;
            case "direction Z":
                updatedCameraView.cameraDirection[2].value = newValue;
            break;

            // CameraUp value update
            case "up X":
                updatedCameraView.cameraUp[0].value = newValue;
            break;
            case "up Y":
                updatedCameraView.cameraUp[1].value = newValue;
            break;
            case "up Z":
                updatedCameraView.cameraUp[2].value = newValue;
            break;
        }

        setCameraView(updatedCameraView)
    }

    const onHandleBlur = (value : string , variable: string) => {
        
        const newValue= Number(value)
        console.log("jib",variable)
        const updatedCameraView = JSON.parse(JSON.stringify(cameraView));
        switch(variable){
            // Perspective value update
            case "Y-Field of View":
                updatedCameraView.valuePerspective[0].value = newValue;
            break;
            case "Aspect Ratio":
                updatedCameraView.valuePerspective[1].value = newValue;
            break;
            case "Far Plane":
                updatedCameraView.valuePerspective[2].value = newValue;
            break;
            case "Near Plane":
                updatedCameraView.valuePerspective[3].value = newValue;
            break;

            // Orthographic value update
            case "Left":
                updatedCameraView.valueOrthographic[0].value = newValue;
            break;
            case "Right":
                updatedCameraView.valueOrthographic[1].value = newValue;
            break;
            case "Top":
                updatedCameraView.valueOrthographic[2].value = newValue;
            break;
            case "Bottom":
                updatedCameraView.valueOrthographic[3].value = newValue;
            break;
            case "Far":
                updatedCameraView.valueOrthographic[4].value = newValue;
            break;
            case "Near":
                updatedCameraView.valueOrthographic[5].value = newValue;
            break;
        
            // Camera position value update
            case "position X":
                updatedCameraView.cameraPosition[0].value = newValue;
            break;
            case "position Y":
                updatedCameraView.cameraPosition[1].value = newValue;
            break;
            case "position Z":
                updatedCameraView.cameraPosition[2].value = newValue;
            break;

            // camera Direction value update
            case "direction X":
                updatedCameraView.cameraDirection[0].value = newValue;
            break;
            case "direction Y":
                updatedCameraView.cameraDirection[1].value = newValue;
            break;
            case "direction Z":
                updatedCameraView.cameraDirection[2].value = newValue;
            break;

            // CameraUp value update
            case "up X":
                updatedCameraView.cameraUp[0].value = newValue;
            break;
            case "up Y":
                updatedCameraView.cameraUp[1].value = newValue;
            break;
            case "up Z":
                updatedCameraView.cameraUp[2].value = newValue;
            break;
        }
        setCameraView(updatedCameraView)
    }

    const onHandleReset = () => {
        setCameraView(cameraViews.find(item => item.id === active))
    }

    const onHandleSave = (newData: CameraView, undoable?: boolean) => {

        const data = JSON.parse(JSON.stringify(newData));
        let oldData = cameraViews.find(item => item.id === data?.id)
        
        dispatch(updateChange({data,tab:projection}))
        dispatch(setCameraInfoAsync({id : data.id}))

        if(undoable){
            undoStack.add(
                {
                  undo: () => onHandleSave(oldData),
                  redo: () => onHandleSave(newData),
                }
            )
        }

    }



    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(null)
    }

    const getAction = () => {
        return(
            <SelectAction
                labelId="display-modes-selection-label-id"
                id="display-modes-selection-id"
                value={active}
                onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
                MenuProps={{
                    disablePortal: true,
                    anchorOrigin: {
                        vertical:"bottom",
                        horizontal:"left",
                    },
                    getContentAnchorEl: null
                }}
            >
                { 
                    cameraViews.map((item) => 
                        <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem> 
                )}
            </SelectAction>
        )
    }

    const getBody = () => {
        return(
            <div className={classes.scrollBar}>
                <div className={classes.cameraEditPageContainer}>
                    <div className={classes.cameraEditCategoryContainer}>
                        <MuiTypography variant="h2" className={classes.cameraEditCategoryHeader} noWrap>
                            Camera Position
                        </MuiTypography>
                        <MuiGrid container spacing={1}>
                            {cameraView.cameraPosition.map((item : any) => 
                                <MuiGrid  key={ 'divParent_' + item.id }  item xs={12} sm={4}>
                                    <MuiGrid container direction="column" spacing={1}>
                                        <MuiGrid item>
                                            <MuiTypography variant="caption" > 
                                                {item.name}
                                            </MuiTypography>
                                        </MuiGrid>
                                        <MuiGrid item>
                                            <input
                                                readOnly={!cameraView.userDefined} 
                                                className={classes.inputEquation} 
                                                type="number" 
                                                value={item.value} 
                                                onChange={(e) => {onHandleChange(e.target.value,`position ${item.name}`)}}
                                                onBlur = {(e) => {onHandleBlur(e.target.value,`position ${item.name}`)}}
                                            />
                                        </MuiGrid>

                                    </MuiGrid>
                                </MuiGrid>
                            )}
                        </MuiGrid>
                    </div>

                    <div className={classes.cameraEditCategoryContainer}>
                        <MuiTypography variant="h2" className={classes.cameraEditCategoryHeader} noWrap>
                            Camera Direction
                        </MuiTypography>
                        <MuiGrid container spacing={1}>
                            {cameraView.cameraDirection.map((item : any) => 
                                <MuiGrid  key={ 'divParent_' + item.id }  item xs={12} sm={4}>
                                    <MuiGrid container direction="column" spacing={1}>
                                        <MuiGrid item>
                                            <MuiTypography variant="caption" > 
                                                {item.name}
                                            </MuiTypography>
                                        </MuiGrid>
                                        <MuiGrid item>
                                            <input
                                                readOnly={!cameraView.userDefined}
                                                className={classes.inputEquation} 
                                                type="number" 
                                                value={item.value} 
                                                onChange={(e) => {onHandleChange(e.target.value,`direction ${item.name}`)}}
                                                onBlur = {(e) => onHandleBlur(e.target.value,`direction ${item.name}`)}
                                            />
                                        </MuiGrid>
                                    </MuiGrid>
                                </MuiGrid>
                            )}
                        </MuiGrid>
                    </div>

                    <div className={classes.cameraEditCategoryContainer}>
                        <MuiTypography variant="h2" className={classes.cameraEditCategoryHeader} noWrap>
                            Camera Up
                        </MuiTypography>
                        <MuiGrid container spacing={1}>
                            {cameraView.cameraUp.map((item : any) => 
                                <MuiGrid  key={ 'divParent_' + item.id }  item xs={12} sm={4}>      
                                    <MuiGrid container direction="column" spacing={1}>
                                        <MuiGrid item>
                                            <MuiTypography variant="caption" > 
                                                {item.name}
                                            </MuiTypography>
                                        </MuiGrid>
                                        <MuiGrid item>
                                            <input
                                                readOnly={!cameraView.userDefined}
                                                className={classes.inputEquation} 
                                                type="number" 
                                                value={item.value} 
                                                onChange={(e) => {onHandleChange(e.target.value,`up ${item.name}`)}}
                                                onBlur = {(e) => onHandleBlur(e.target.value,`up ${item.name}`)}
                                            />
                                        </MuiGrid>
                                    </MuiGrid>
                                </MuiGrid>
                            )}
                        </MuiGrid>
                    </div>

                    <div className={classes.cameraEditCategoryContainer}>
                        <MuiTypography className={classes.cameraEditCategoryHeader} noWrap>
                            View Frustum
                        </MuiTypography>
                        <div style={{marginLeft:"-10px",}}>
                            <MuiTabs  
                                value={projection}
                                aria-label="simple tabs example"
                                onChange={handleProjection}
                                TabIndicatorProps={{style:{backgroundColor:"currentColor"}}}
                                centered
                            >
                                <MuiTab style={{textTransform:"none"}} label="Perspective"/>
                                <MuiTab style={{textTransform:"none"}} label="Orthographic"/>
                            </MuiTabs>          
                        </div>                          

                        <div style={{marginTop:"20px"}}>
                            <MuiGrid container spacing={3}>
                                {   (projection === ViewMode.Perspective 
                                        ?
                                            cameraView.valuePerspective 
                                        : 
                                            cameraView.valueOrthographic)
                                    .map((item: any) => 
                                        <MuiGrid key={ 'divParent_' + item.id } item xs={12} sm={6}>
                                            <MuiGrid container direction="column" spacing={1}>
                                                <MuiGrid item> 
                                                    <MuiTypography variant="caption"> 
                                                        {item.name}
                                                    </MuiTypography>
                                                </MuiGrid>
                                                <MuiGrid item>
                                                    <input
                                                        readOnly={!cameraView.userDefined}
                                                        className={classes.inputEquation} 
                                                        type="number" 
                                                        value={item.value} 
                                                        onChange={(e) => {onHandleChange(e.target.value,item.name)}}
                                                        onBlur = {(e) => {onHandleBlur(e.target.value,item.name)}}
                                                    />
                                                </MuiGrid>
                                            </MuiGrid>
                                        </MuiGrid>
                	                )}
                                </MuiGrid>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    const getFooter = () => {

        let change = false;

        const cameraViewRedux = cameraViews.find(item => item.id === active);

        if(JSON.stringify(cameraViewRedux) !== JSON.stringify(cameraView))
            change = true;
        return(
            <div>
            {
                cameraView.userDefined === false
                ?
                null
                :
                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                <MuiButton style={{backgroundColor:"#5958FF",width:"30%", fontSize:"11px" , marginRight:"5px"}} 
                disabled={!change}
                autoFocus 
                onClick={() => onHandleSave(cameraView, true)}
                // color="primary"
              >
                Save
              </MuiButton>
           
            <MuiButton style={{width:"30%", fontSize:"11px"}} 
                autoFocus 
                onClick={onHandleReset} 
                disabled={!change}
                // color="primary"
              >
                Reset
              </MuiButton>
              </div>
            }
            </div>
        )
    }

    return(
        <SideBarContainer
        headerContent={ <Title text={cameraView.name } group="Scene - Camera"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
      /> 
       
    )
}