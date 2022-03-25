import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import List from './pages/list' 
import Settings from './pages/settings'
import Transformation from './pages/transformation'

function ClipPlanes() {
    
    return (
        <Switch>
            <Route path={Routes.CLIPPLANES_LIST}>
                <List/>
            </Route>
            <Route path={Routes.CLIPPLANES_SETTINGS}>
                <Settings/>
            </Route>
            <Route path={Routes.CLIPPLANES_TRANSFORMATION}>
                <Transformation/>
            </Route>
        </Switch>
    )
}

export default ClipPlanes
