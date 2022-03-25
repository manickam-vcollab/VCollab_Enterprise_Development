import {useEffect} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


//icons import
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BoundingBoxIcon from "../../../icons/boundingBox";
import HiddenLineIcon from "../../../icons/hiddenLine";
import PointIcon from "../../../icons/point";
import ShadedIcon from "../../../icons/shaded";
import ShadedMeshIcon from "../../../icons/shadedMesh";
import TransparentIcon from "../../../icons/transparent";
import WireframeIcon from "../../../icons/wireframe";
import DownloadStatusIcon from "./DownloadStatusIcon";

import {DownloadStates, expandPanel,fetchDisplayModes,setDisplayModeAsync, selectDisplayModesData,setSelectedMenu,setDownloadStatus} from "../../../../store/sideBar/displayModesSlice";
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import useStyles from './styles';


const getIcon = (name:String) => {
  switch (name) {
    case "Bounding Box":
      return <BoundingBoxIcon/>
    case "Point":
      return <PointIcon/>
    case "Hidden Line":
      return <HiddenLineIcon/>
    case "Shaded":
      return <ShadedIcon/>
    case "Shaded Mesh":
      return <ShadedMeshIcon/>
    case "Transparent":
      return <TransparentIcon/>
    case "Wireframe":
      return <WireframeIcon/>
    default:
      break;
  }
}


function DisplayModesBody(props:any) {
    const dispatch = useAppDispatch();
    const panelsData = useAppSelector(selectDisplayModesData);

    const handlePanelClick = (panelIndex:number) => {
        const selectedPanel = panelsData[panelIndex];
        panelsData.forEach((panel:any,index:number) => {
          if (panel.id === selectedPanel.id) dispatch(expandPanel({panelId:panelIndex,value:!selectedPanel.expanded}));
          else dispatch(expandPanel({panelId:index,value:false}));
        });
    };
  
    const onSelectMenu = (menuIndex:number, panelIndex:number) => {
        const selectedPanel = panelsData[panelIndex];
        if(panelIndex === 0){
          selectedPanel.menuData.forEach((menu:any,index:number) => {
            if (index === menuIndex) {
              dispatch(setSelectedMenu({menuId:index,panelId:panelIndex,value:true}));
              if(menu.status === DownloadStates.DOWNLOADED)
              {
                handleDownload(menuIndex,panelIndex);
              }
            } else {
              dispatch(setSelectedMenu({menuId:index,panelId:panelIndex,value:false}));
            }
          });
        }
      //console.log(panelsData);
    };

    const handleDownload = (menuIndex:number, pannelIndex:number) => {
        
        dispatch(setDownloadStatus({panelId:pannelIndex,menuId:menuIndex,status:DownloadStates.IN_PROGRESS}));
        dispatch(setDisplayModeAsync({menuId:menuIndex}));
    };

    
    useEffect(() => {
      dispatch(fetchDisplayModes());
      
    },[dispatch]);
    const classes = useStyles();

    return (
        <List>
        { panelsData.map((panel:any, panelIndex:number) => (
         <div key = {panelIndex}>
              <List  className={classes.displayModeList}>
              {panel?.menuData?.map((item:any, menuIndex:number) => (
                <ListItem disabled={props.disabled} key={menuIndex} dense button  role={undefined}
                selected = {item.selected}
                onClick={() => onSelectMenu(menuIndex, panelIndex)}>
                  <ListItemIcon>
                    {getIcon(item.title)}
                  </ListItemIcon>
                  <ListItemText id={item.title} primary={item.title}>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <DownloadStatusIcon status = {item.status} />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              </List>
          </div>

        ))}
      </List>
    );
}

export default DisplayModesBody
