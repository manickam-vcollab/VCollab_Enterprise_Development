import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import Variable from './pages/Variable'
import Steps from './pages/StepsAndSubCase'
import Derived from './pages/DerivedTypes'
import Section from './pages/Sections'

function ClipPlanes() {
    
    return (
        <Switch>
            <Route path={Routes.FIELD_VARIABLES}>
                <Variable/>
            </Route>
            <Route path={Routes.FIELD_STEPS_AND_SUBCASES}>
                <Steps/>
            </Route>
            <Route path={Routes.FIELD_DERIVED_TYPES}>
                <Derived/>
            </Route>
            <Route path={Routes.FIELD_SECTIONS_AND_LAYERS}>
                <Section/>
            </Route>
        </Switch>
    )
}

export default ClipPlanes
