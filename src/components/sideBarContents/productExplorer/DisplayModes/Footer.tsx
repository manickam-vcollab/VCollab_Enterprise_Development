import React,{useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {BytesToStructuredString} from "../../../utils/networkUtils"
import useStyles from './styles';

import {DownloadStates, fetchDisplayModes,setDisplayModeAsync, selectDisplayModesData,setSelectedMenu,setDownloadStatus} from "../../../../store/sideBar/displayModesSlice";
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";



const RenderSelectedMenu = (props:any) => {
    

    const handleDownload = (menuIndex:number, pannelIndex:number) => {
        
        props.dispatch(setDownloadStatus({panelId:pannelIndex,menuId:menuIndex,status:DownloadStates.IN_PROGRESS}));
        props.dispatch(setDisplayModeAsync({menuId:menuIndex}));
    };

    return(props.panelsData.map((panel:any,panelIndex:any) => {
        return panel?.menuData?.map((item:any, menuIndex:number) => (
            item.selected && item.status === DownloadStates.NOT_DOWNLOADED ? (
              <Grid item container direction='column' justify='center' alignContent='center'>
                  <Grid item alignContent='center'>
                  <Typography style={{padding:10}} >{BytesToStructuredString(item.size)}</Typography>
                  </Grid>
                  <Grid item style={{height:50}}>
                  <Button
                  className = {props.classes.selectedButton}
                  key = {menuIndex}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleDownload(menuIndex,panelIndex)}
                >
                  Download and Show
                </Button>
                  </Grid>

              </Grid>
      
            ) : item.selected && item.status === DownloadStates.DOWNLOADED ? (
                <>
      
                </>
            ) : null
        ))
    }))

}

  
function Footer() {
    const panelsData = useAppSelector(selectDisplayModesData);
    const classes = useStyles();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchDisplayModes());
        
      },[dispatch]);
    return (
            <div>
                {
                    <RenderSelectedMenu panelsData={panelsData} classes={classes} dispatch = {dispatch}/>
                
                }
            </div>
    )
}

export default Footer
