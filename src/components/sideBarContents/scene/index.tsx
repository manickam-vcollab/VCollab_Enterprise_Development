import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import Camera from './pages/camera' 
import Background from './pages/background'
import AxisTriad from './pages/AxisTriad'
import Light from './pages/light'
import CameraEdit  from './pages/cameraEdit'
import Views from './pages/views'


function ClipPlanes() {
    
    return (
        <Switch>
            
            <Route exact path={Routes.SCENE_CAMERA}>
                <Camera/>
            </Route>
            
            <Route path={Routes.SCENE_BACKGROUND}>
                <Background/>
            </Route>
            <Route path={Routes.SCENE_AXIS_TRIAD}>
                <AxisTriad/>
            </Route>
            <Route path={Routes.SCENE_LIGHT}>
                <Views/>
            </Route>
            <Route  path={Routes.SCENE_CAMERA_EDIT}>
                <CameraEdit/>
            </Route>
        </Switch>
    )
}

export default ClipPlanes
