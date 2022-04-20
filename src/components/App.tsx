import { useRef,  useCallback, useEffect, createContext, Ref, useState } from 'react';
import clsx from 'clsx';
import { useResizeDetector } from 'react-resize-detector';
import FullScreen from 'react-fullscreen-crossbrowser';


import { useHistory } from 'react-router-dom';


import styles from './App.style';
import FileLoadingOverlay from './layout/fileLoadingOverlay';
import Sidebar from './layout/sideBar';
import AppBar from './layout/appBar';
import LeftBar from './layout/leftBar';
import FullscreenIcon from './layout/fullscreenIcon';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import {selectAppBarVisibility,selectFullscreenStatus,selectSidebarVisibility,
        setAppBarVisibility, setFullscreenState ,selectModelLoadedState, setPopupMenuActiveContent } from '../store/appSlice';
import { appBarMinHeight, leftbarWidth, popupMenuContentTypes } from '../config';
import LayerStack from "./layout/LayerStack";
import { fetchCameraMatrix, fetchCameraStdViews } from '../store/sideBar/sceneSlice';
import Grid from '@material-ui/core/Grid'
import { MainMenuItem, MainMenuItems, selectActiveTab, selectBottonTabOptions, selectDefaultOptions } from 'store/mainMenuSlice';

export const ViewerContext = createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);

function App() {

  const isModelLoaded = useAppSelector(selectModelLoadedState);
     
  const classes = styles();
  const isAppBarVisible  = useAppSelector(selectAppBarVisibility);
  const isFullscreenOn = useAppSelector(selectFullscreenStatus);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const activeLeftBarItem = useAppSelector(selectActiveTab);
  const leftBarDefaultItems = useAppSelector(selectDefaultOptions);
  const leftBarBtmOptions = useAppSelector(selectBottonTabOptions);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);
  const viewerContainerRef = useRef(null);

  // browser histroy test 

  const [ locationKeys, setLocationKeys ] = useState<(string | undefined)[]>([]);
  const history = useHistory()

    useEffect(() => {
      return history.listen(location => {
        if (history.action === 'PUSH') {

          setLocationKeys([ location.key ])
        }

        if (history.action === 'POP') {
          if (locationKeys[1] === location.key) {
            setLocationKeys(([ _, ...keys ]) => keys)

            // Handle forward event


          } else {
            setLocationKeys((keys) => [ location.key, ...keys ])

            // Handle back event

          }
        }
      })
    }, [ locationKeys, ])

  //===========================================================================
  const onResize = useCallback((width ?:number, height ?: number) => {
    dispatch(fetchCameraStdViews());
    dispatch(fetchCameraMatrix());
    if(height && height > appBarMinHeight)
          dispatch(setAppBarVisibility(true));
      else 
          dispatch(setAppBarVisibility(false));
  }, [ dispatch]);

  useResizeDetector({ 
    refreshMode: 'debounce',
    refreshRate: 400,
    refreshOptions :{trailing : true, leading : false },
    onResize,
    targetRef
  });

  const handleFullscreen = (isFullscreenEnabled : any) =>{
    if(isFullscreenEnabled !== isFullscreenOn) // To avoid unnecessary dispatch and handle exit fullscreen by pressing esc key
      dispatch(setFullscreenState(isFullscreenEnabled));
  }
  
  useEffect(() => {
    if(isAppBarVisible === false)
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
  },[isAppBarVisible, dispatch]);

  return (
    <FullScreen
    enabled={ isFullscreenOn }
    onChange={(isFullscreenEnabled: any) => handleFullscreen(isFullscreenEnabled)}
    >
      <Grid style={{height: '100%'}} container spacing={0}>
      <Grid item style={{height: '100%'}} >
        <LeftBar topTabs={leftBarDefaultItems} bottomTabs={leftBarBtmOptions}/>
      </Grid>
      <Grid item wrap='nowrap' style={{width:`calc(100% - ${leftbarWidth}px)`}} >
      <div className={classes.root} ref = { targetRef }> 
      
      {isModelLoaded === false ? (
        <FileLoadingOverlay />
      ) : null} 

        {( !isAppBarVisible ? 
        <FullscreenIcon />
        : null ) }
      
        { ( isAppBarVisible ?   
        <><AppBar />
        <ViewerContext.Provider value={viewerContainerRef}>
          <Sidebar selectedItem={activeLeftBarItem} />
        </ViewerContext.Provider>
        </>
        : null ) }
        <main  className={ clsx(classes.content , {[classes.contentWithSideBar]: isSidebarVisible} , {[classes.contentWithTopBar]: isAppBarVisible}) }>
          <div ref = {viewerContainerRef} className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isAppBarVisible})}>
            <LayerStack parentRef={viewerContainerRef}/>
          </div>     
        </main>
      </div>
      </Grid>
      </Grid>
    </FullScreen>

  );
}

export default App;
