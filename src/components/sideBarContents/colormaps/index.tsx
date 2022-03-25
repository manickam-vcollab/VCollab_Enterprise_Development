import React from 'react';
import {Switch,Route} from 'react-router';
import { Routes } from '../../../routes';

import List from './pages/list';
import Edit from './pages/edit';
import Variable from './pages/variable';
import StepsAndSubcase from './pages/stepsAndSubcase';
import SectionAndLayer from './pages/sectionAndLayer';
import DerivedType from './pages/derivedType';
import ColorPalette from './pages/colorPalette';
import ColorPalleteEdit from './pages/colorPaletteEdit';
import ValueSettings from './pages/valueSettings';
import LegendSettings from './pages/legendSettings';

function Colormaps() {
    
    return (
        <Switch>
            <Route path={Routes.COLORMAPS_LIST}>
                <List/>
            </Route>
            <Route path={Routes.COLORMAPS_EDIT}>
                <Edit/>
            </Route>
            <Route path={Routes.COLORMAPS_VARIABLE}>
                <Variable/>
            </Route>
            <Route path={Routes.COLORMAPS_STEPS_AND_SUBCASE}>
                <StepsAndSubcase/>
            </Route>
            <Route path={Routes.COLORMAPS_SELECTION_AND_LAYER}>
                <SectionAndLayer/>
            </Route>
            <Route path={Routes.COLORMAPS_DERIVED_TYPES}>
                <DerivedType/>
            </Route>
            <Route path={Routes.COLORMAPS_COLOR_PALETTE}>
                <ColorPalette/>
            </Route>
            <Route path={Routes.COLORMAPS_COLOR_PALETTE_EDIT}>
                <ColorPalleteEdit/>
            </Route>
            <Route path={Routes.COLORMAPS_VALUE_SETTINGS}>
                <ValueSettings/>
            </Route>
            <Route path={Routes.COLORMAPS_LEGEND_SETTINGS}>
                <LegendSettings/>
            </Route>
        </Switch>
    )
}

export default Colormaps