import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'

import EditLabel from './pages/editLabel';
import LabelList from './pages/labelList';

function Labels() {
    
    return (
        <Switch>
            <Route path={Routes.LABELS_LIST}>
                <LabelList/>
            </Route> 
            <Route path={Routes.LABEL_EDIT}>
                <EditLabel/>
            </Route>
        </Switch>
    )
}

export default Labels