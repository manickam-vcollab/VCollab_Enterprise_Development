import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Routes } from '../routes';

//icons
import GeometryIcon  from 'components/icons/geometry';
import AssemblyIcon  from 'components/icons/assembly';
import DisplayModeIcon from 'components/icons/displaymodes';
import MaterialColorIcon from 'components/icons/materialColor';
import CoordinateIcon from 'components/icons/coordinateSystem';

import FieldIcon from 'components/icons/field';
import StepsAndSubcaseIcon from 'components/icons/stepsAndSubcase';
import DerivedIcon from 'components/icons/derived';
import SectionAndLayersIcon from 'components/icons/sectionAndLayers'

import SceneIcon from 'components/icons/scene';
import CameraIcon from 'components/icons/camera';
import TriadIcon from 'components/icons/triad';
import LightIcon from 'components/icons/lights';

import ColorMapIcon from 'components/icons/colormap';
import ColorMapEditIcon from 'components/icons/colormapEdit';
import ColorMapPaletteIcon from 'components/icons/palette';
import ColorMapValueSettings from 'components/icons/valueSettings';
import LegendSettingsIcon from 'components/icons/legendSettings';

import LabelIcon from 'components/icons/label';

import ClipIcon from 'components/icons/clipplanes';
import ClipPlaneListIcon from 'components/icons/clipPlaneList';
import ClipPlaneTransformIcon from 'components/icons/clipPlaneTransform';
import ClipPlaneSettingsIcon from 'components/icons/clipPlaneSettings';

import TransformIcon from 'components/icons/transform';
import AnimIcon from 'components/icons/animation';
import SlidesIcon from 'components/icons/slides';
import MessageIcon from 'components/icons/Messages';
import SettingsIcon from 'components/icons/settings';
import MoreIcon from 'components/icons/more';

import ThemeIcon from 'components/icons/theme';
import MouseControlsIcon from 'components/icons/mouseControls';
import AddGroupIcon from 'components/icons/addGroup';
import type { RootState } from './index';

export type MainMenuItem = {
    id:string,
    name: string,
    type: MainMenuItems,
    path: Routes,
    expanded: boolean,
    disabled: boolean,
    isEditMode?: boolean,
    children: MainMenuItem[]
}

export enum MainMenuItems {
    GEOMETRY,
    GEOMETRY_ASSEMBLY_TREE,
    GEOMETRY_SEARCH,
    GEOMETRY_DISPLAY_MODE,
    GEOMETRY_MATERIAL_COLOR,
    GEOMETRY_COORDINATE_SYSTEM,
    GEOMETRY_TRANSFORMATION,
    GEOMETRY_PART_LIST,

    FIELD,
    FIELD_VARIABLES,
    FIELD_STEPS_AND_SUBCASES,
    FIELD_SECTIONS_AND_LAYERS,
    FIELD_DERIVED_TYPES,
    
    SCENE,
    SCENE_CAMERA,
    SCENE_BACKGROUND,
    SCENE_AXIS_TRIAD,
    SCENE_LIGHT,

    COLOR_MAPS,
    COLOR_MAPS_LIST,
    COLOR_MAPS_EDIT,
    COLOR_MAPS_VARIABLE,
    COLOR_MAPS_STEPS_AND_SUBCASE,
    COLOR_MAPS_SELECTION_AND_LAYER,
    COLOR_MAPS_DERIVED_TYPES,
    COLOR_MAPS_COLOR_PALETTE,
    COLOR_MAPS_VALUE_SETTINGS,
    COLOR_MAPS_LEGEND_SETTINGS,

    CLIP_PLANE,
    CLIP_PLANE_LIST,
    CLIP_PLANE_SETTINGS,
    CLIP_PLANE_TRANSFORM,

    LABELS,
    LABELS_LIST,

    TRANSFORMATIONS,

    ANIMATIONS,

    SLIDES,

    MESSAGES,

    SETTINGS,
    SETTINGS_THEME, 
    SETTINGS_MOUSE_CONTROLS,

    MORE,
    ADD_GROUP,
    NEW_GROUP,
    CUSTOM_GROUP

}

export const getIcon = (type:MainMenuItems): any | null => {
    let Out = null;
    switch(type) {
        // geometry
        case MainMenuItems.GEOMETRY:
        Out =  GeometryIcon 
        break;
        case MainMenuItems.GEOMETRY_ASSEMBLY_TREE:
        Out = AssemblyIcon
        break;
        case MainMenuItems.GEOMETRY_DISPLAY_MODE:
        Out = DisplayModeIcon
        break;
        case MainMenuItems.GEOMETRY_MATERIAL_COLOR:
        Out = MaterialColorIcon
        break;
        case MainMenuItems.GEOMETRY_COORDINATE_SYSTEM:
        Out = CoordinateIcon
        break;
        case MainMenuItems.GEOMETRY_TRANSFORMATION:
        Out = TransformIcon
        break;
        // field
        case MainMenuItems.FIELD:
        Out =  FieldIcon
        break;
        case MainMenuItems.FIELD_VARIABLES:
        Out = FieldIcon
        break;
        case MainMenuItems.FIELD_STEPS_AND_SUBCASES:
        Out = StepsAndSubcaseIcon
        break;
        case MainMenuItems.FIELD_DERIVED_TYPES:
        Out = DerivedIcon
        break;
        case MainMenuItems.FIELD_SECTIONS_AND_LAYERS:
        Out = SectionAndLayersIcon
        break;
        //scene
        case MainMenuItems.SCENE:
        Out =  SceneIcon
        break;
        case MainMenuItems.SCENE_CAMERA:
        Out = CameraIcon
        break;
        case MainMenuItems.SCENE_BACKGROUND:
        Out = MaterialColorIcon
        break;
        case MainMenuItems.SCENE_AXIS_TRIAD:
        Out = TriadIcon
        break;
        case MainMenuItems.SCENE_LIGHT:
        Out = LightIcon
        break;
        //colormap
        case MainMenuItems.COLOR_MAPS:
        Out =  ColorMapIcon
        break;
        case MainMenuItems.COLOR_MAPS_LIST:
        Out =  ColorMapIcon
        break;
        case MainMenuItems.COLOR_MAPS_EDIT:
        Out = ColorMapEditIcon
        break;
        case MainMenuItems.COLOR_MAPS_VARIABLE:
        Out = FieldIcon
        break;
        case MainMenuItems.COLOR_MAPS_DERIVED_TYPES:
        Out = DerivedIcon
        break;
        case MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER:
        Out = SectionAndLayersIcon
        break;
        case MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE:
        Out = StepsAndSubcaseIcon
        break;
        case MainMenuItems.COLOR_MAPS_COLOR_PALETTE:
        Out = ColorMapPaletteIcon
        break;
        case MainMenuItems.COLOR_MAPS_VALUE_SETTINGS:
        Out = ColorMapValueSettings
        break;
        case MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS:
        Out = LegendSettingsIcon
        break;
        //clip plane
        case MainMenuItems.CLIP_PLANE:
        Out =  ClipIcon
        break;
        case MainMenuItems.CLIP_PLANE_LIST:
        Out = ClipPlaneListIcon
        break;
        case MainMenuItems.CLIP_PLANE_TRANSFORM:
        Out = ClipPlaneTransformIcon
        break;
        case MainMenuItems.CLIP_PLANE_SETTINGS:
        Out = ClipPlaneSettingsIcon
        break;
        //labels
        case MainMenuItems.LABELS:
        Out =  LabelIcon
        break;
        case MainMenuItems.TRANSFORMATIONS:
        Out =  TransformIcon
        break;
        case MainMenuItems.ANIMATIONS:
        Out =  AnimIcon
        break;
        case MainMenuItems.SLIDES:
        Out =  SlidesIcon
        break;
        case MainMenuItems.MESSAGES:
        Out =  MessageIcon
        break;
        //settings
        case MainMenuItems.SETTINGS:
        Out =  SettingsIcon
        break;
        case MainMenuItems.SETTINGS_THEME:
        Out = ThemeIcon
        break;
        case MainMenuItems.SETTINGS_MOUSE_CONTROLS:
        Out = MouseControlsIcon
        break;
        case MainMenuItems.MORE:
        Out = MoreIcon;
        break;
        case MainMenuItems.ADD_GROUP:
        Out = AddGroupIcon;
        break;
        default:
        Out =  GeometryIcon
        break;
    }
    
    return Out ;
}

export type MainMenu = {
    menuItems: MainMenuItem[],
    userCreatedMenuItems: MainMenuItem[],
    activeTab: MainMenuItem | null,
    defaultOptions: string[] ,
    bottomTabOptions: string[],
    temporaryTab: string | null
}
const initialState: MainMenu ={
    menuItems: [
        {
            id:'Geometry1',
            expanded: false,
            name: "Geometry",
            type: MainMenuItems.GEOMETRY,
            path: Routes.GEOMETRY,
            disabled: false,
            children: [
                {
                    id: 'Geometry11',
                    name: "Assembly Tree",
                    type: MainMenuItems.GEOMETRY_ASSEMBLY_TREE,
                    path: Routes.GEOMETRY_ASSEMBLY_TREE,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id: 'GeometryPartList',
                    name: "Parts List",
                    type: MainMenuItems.GEOMETRY_PART_LIST,
                    path: Routes.GEOMETRY_PART_LIST,
                    disabled: false,
                    children:[],
                    expanded:false
                },
                  {
                    id: 'Geometry13',
                    name: "Display Mode",
                    type:MainMenuItems.GEOMETRY_DISPLAY_MODE,
                    path: Routes.GEOMETRY_DISPLAY_MODES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id: 'Geometry14',
                    name: "Material Color",
                    type:MainMenuItems.GEOMETRY_MATERIAL_COLOR,
                    path: Routes.GEOMETRY_MATERIAL_COLOR,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  // not done 
                  {
                    id: 'Geometry15',
                    name: "Coordinate System",
                    type:MainMenuItems.GEOMETRY_COORDINATE_SYSTEM,
                    path: Routes.GEOMETRY,
                    children: [],
                    expanded: false,
                    disabled: true,
                  },
                  {
                    id: 'Geometry16',
                    name: "Geometry Transform",
                    type:MainMenuItems.GEOMETRY_TRANSFORMATION,
                    path: Routes.GEOMETRY_TRANSFORM,
                    children: [],
                    expanded: false,
                    disabled: false,
                  }
            ]
        },
        {
            id:'Field2',
            expanded: false,
            name: "Field",
            type: MainMenuItems.FIELD,
            path: Routes.FIELD,
            disabled: false,
            children: [
                {
                    id:'Field21',
                    name: "Steps & Subcases",
                    type:MainMenuItems.FIELD_STEPS_AND_SUBCASES,
                    path:Routes.FIELD_STEPS_AND_SUBCASES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                {
                    id: 'Field22',
                    name: "Variables",
                    type:MainMenuItems.FIELD_VARIABLES,
                    path:Routes.FIELD_VARIABLES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id:'Field23',
                    name: "Derived Types",
                    type:MainMenuItems.FIELD_DERIVED_TYPES,
                    path:Routes.FIELD_DERIVED_TYPES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id:'Field24',
                    name: "Sections & Layers",
                    type:MainMenuItems.FIELD_SECTIONS_AND_LAYERS,
                    path:Routes.FIELD_SECTIONS_AND_LAYERS,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
            ]
        },
        {
            id:'Scene3',
            expanded:false,
            name: "Scene",
            type: MainMenuItems.SCENE,
            path:Routes.SCENE,
            disabled:false,
            children: [
                {
                    id:'Scene31',
                    name: "Camera",
                    type:MainMenuItems.SCENE_CAMERA,
                    path:Routes.SCENE_CAMERA,
                    disabled:false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Scene32',
                    name: "Background",
                    type:MainMenuItems.SCENE_BACKGROUND,
                    path:Routes.SCENE_BACKGROUND,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Scene33',
                    name: "Axis Triad",
                    type:MainMenuItems.SCENE_AXIS_TRIAD,
                    path:Routes.SCENE_AXIS_TRIAD,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Scene34',
                    name: "Lights",
                    type:MainMenuItems.SCENE_LIGHT,
                    path:Routes.SCENE_LIGHT,
                    disabled: true,
                    children:[],
                    expanded: false
                },
            ]
        },
        {
            id:'Color Maps4',
            expanded:false,
            name: "Color Maps",
            type:MainMenuItems.COLOR_MAPS,
            path:Routes.COLORMAPS,
            disabled:false,
            children:[
                {
                    id:'Color Maps41',
                    name: "List",
                    type:MainMenuItems.COLOR_MAPS_LIST,
                    path:Routes.COLORMAPS_LIST,
                    disabled: false,
                    children: [],
                    expanded: false
                },    
                {
                    id:'Color Maps42',
                    name: "Edit",
                    type:MainMenuItems.COLOR_MAPS_EDIT,
                    path:Routes.COLORMAPS_EDIT,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps43',
                    name: "Variable",
                    type:MainMenuItems.COLOR_MAPS_VARIABLE,
                    path:Routes.COLORMAPS_VARIABLE,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps44',
                    name: "Steps & Subcase",
                    type:MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE,
                    path:Routes.COLORMAPS_STEPS_AND_SUBCASE,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps45',
                    name: "Section & Layer",
                    type:MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER,
                    path:Routes.COLORMAPS_SELECTION_AND_LAYER,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps46',
                    name: "Derived Type",
                    type:MainMenuItems.COLOR_MAPS_DERIVED_TYPES,
                    path:Routes.COLORMAPS_DERIVED_TYPES,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps47',
                    name: "Color Palette",
                    type:MainMenuItems.COLOR_MAPS_COLOR_PALETTE,
                    path:Routes.COLORMAPS_COLOR_PALETTE,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps48',
                    name: "Value Setting",
                    type:MainMenuItems.COLOR_MAPS_VALUE_SETTINGS,
                    path:Routes.COLORMAPS_VALUE_SETTINGS,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps49',
                    name: "Legend Setting",
                    type:MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS,
                    path:Routes.COLORMAPS_LEGEND_SETTINGS,
                    disabled: true,
                    children: [],
                    expanded: false
                },
            ]
        },
        {
            id:'Clip Plane5',
            expanded: false,
            name: "Clip Plane",
            type: MainMenuItems.CLIP_PLANE,
            path:Routes.CLIPPLANES,
            disabled:false,
            children: [
                {
                    id:'Clip Plane51',
                    name: "Clip planes List",
                    type:MainMenuItems.CLIP_PLANE_LIST,
                    path:Routes.CLIPPLANES_LIST,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Clip Plane52',
                    name: "Clip plane Settings",
                    type:MainMenuItems.CLIP_PLANE_SETTINGS,
                    path:Routes.CLIPPLANES_SETTINGS,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Clip Plane53',
                    name: "Clip plane Transform",
                    type:MainMenuItems.CLIP_PLANE_TRANSFORM,
                    path:Routes.CLIPPLANES_TRANSFORMATION,
                    disabled: true,
                    children: [],
                    expanded: false
                },
            ]
        },
        {
            id:'Labels6',
            expanded: false,
            name: "Labels",
            type: MainMenuItems.LABELS,
            path:Routes.LABELS_LIST,
            disabled: false,
            children: [],
        },
        {
            id:'7',
            expanded: false,
            name: "Transformations",
            type: MainMenuItems.TRANSFORMATIONS,
            path:Routes.HOME,
            disabled: false,
            children: []
        },
        {
            id:'8',
            expanded: false,
            name: "Animations",
            type: MainMenuItems.ANIMATIONS,
            path:Routes.HOME,
            disabled: false,
            children: []   
        },

        {
            id:'3DSlides',
            expanded: false,
            name: "3D Slides",
            type: MainMenuItems.SLIDES,
            path:Routes.SLIDES,
            disabled: false,
            children:[]
        },

        {
            id:'10',
            expanded: false,
            name: "Messages",
            type: MainMenuItems.MESSAGES,
            path:Routes.MESSAGES,
            disabled: false,
            children:[]
        },
        
        {
            id:'11',
            expanded: false,
            name: "Application Settings",
            type: MainMenuItems.SETTINGS,
            path:Routes.HOME,
            disabled:false,
            children: [
                {

                    id:'Application Settings111',
                    name: "Color Theme",
                    type:MainMenuItems.SETTINGS_THEME,
                    path:Routes.SETTINGS_THEME ,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {

                    id:'Application Settings112',
                    name: "Mouse Controls",
                    type:MainMenuItems.SETTINGS_MOUSE_CONTROLS,
                    path:Routes.SETTINGS_MOUSE_CONTROLS,
                    disabled: false,
                    children: [],
                    expanded: false
                }

                    
            ]
        },

        // leftbar bottom options
        {
            id:'12',
            name: 'All Menus',
            type:MainMenuItems.MORE,
            path:Routes.MORE,
            disabled: false,
            children: [],
            expanded: false

        },
        {
            id:'13',
            name: 'Add Group',
            type: MainMenuItems.ADD_GROUP,
            path: Routes.ADD_GROUP,
            disabled: false,
            children: [],
            isEditMode: true,
            expanded: false
        }
    ],
    userCreatedMenuItems: [

    ],
    activeTab: null,
    defaultOptions: [
        // uncomment below to enable default tabs
        'Geometry1',
        'Geometry11',
        'Field2',
        'Scene3',
        'Color Maps4',
        'Clip Plane5',
        'Labels6',
        '3DSlides'
    ],
    bottomTabOptions: [
    ],
    temporaryTab: null
}

export const mainMenuSlice = createSlice({
    name: 'mainMenu',
    initialState,
    reducers: {
        addMenuItem: (state, action: PayloadAction<{menuItem: MainMenuItem}>) => {
            const {menuItem} = action.payload;
            state.menuItems.push(menuItem);

        },
        updateMenuItem: (state, action: PayloadAction<{menuItem: MainMenuItem}>) => {
            const {menuItem} = action.payload;
            let idx = state.menuItems.findIndex(e => e.id === menuItem.id);
            if(idx !== -1){
                state.menuItems[idx].id = menuItem.id;
                state.menuItems[idx].isEditMode = menuItem.isEditMode;
                state.menuItems[idx].disabled = menuItem.disabled;
                state.menuItems[idx].expanded = menuItem.expanded;
                state.menuItems[idx].name = menuItem.name;
                state.menuItems[idx].path = menuItem.path;
                state.menuItems[idx].type = menuItem.type;
                state.menuItems[idx].children = menuItem.children;
            }
        },
        deleteMenuItem: (state, action: PayloadAction<{menuItemId: string}>) => {
            const {menuItemId} = action.payload;
            let idx = state.menuItems.findIndex(e => e.id === menuItemId);
            if(idx !== -1) {
                state.menuItems.splice(idx, 1);
            }
        },
        addTab: (state, action: PayloadAction<{menuItemId:string}>) => {
            state.defaultOptions.push(action.payload.menuItemId);
        },
        removeTab: (state, action: PayloadAction<{menuItemId: string}>) => {
            let id = action.payload.menuItemId;
            let idx = state.defaultOptions.findIndex(e => e === id);
            if(idx !== -1)
            state.defaultOptions.splice(idx,1);
        },
        setDefaultTabs: (state, action:PayloadAction<{tabIds: string[]}>) => { 
            state.defaultOptions = [...action.payload.tabIds]
        },
        setActiveTab: (state, action: PayloadAction<{menuItem: MainMenuItem | null}>) => {
            const {menuItem} = action.payload;
            if(menuItem &&
                ( menuItem.type === MainMenuItems.MORE || 
                  state.defaultOptions.includes(menuItem.id) || 
                  state.bottomTabOptions.includes(menuItem.id))
            ) {
                mainMenuSlice.caseReducers.setTemporartyTab(state,{
                    payload: {
                        menuItemID: null
                    },
                    type: 'mainMenuSlice/setTemporaryTab'
                })
            }
            else{
                mainMenuSlice.caseReducers.setTemporartyTab(state,{
                    payload: {
                        menuItemID: menuItem? menuItem.id: null
                    },
                    type: 'mainMenuSlice/setTemporaryTab'
                })
            }
            state.activeTab = menuItem;
        },
        setTemporartyTab: (state, action: PayloadAction<{menuItemID: string | null}>) => {
            state.temporaryTab = action.payload.menuItemID;
        },
        togglePanel: (state, action:PayloadAction<{panelId:string}>) => {
            const {panelId} = action.payload; 
            state.menuItems.forEach(item => {
                if(item.id === panelId) {
                    item.expanded = !item.expanded
                }
                else {
                    item.expanded = false;
                }
            })
        },
        setChildItem: (state, action:PayloadAction<{panelId:string, childId:string, boolean: boolean}>) => {
            const menuItemIndex = state.menuItems.findIndex(item => item.id === action.payload.panelId);
            let changeItem: MainMenuItem  = state.menuItems[menuItemIndex]

            const childItemIndex = changeItem.children.findIndex(item => item.id === action.payload.childId);
            changeItem.children[childItemIndex].disabled = action.payload.boolean;
            
            state.menuItems[menuItemIndex] = changeItem;

        }
    },

})
export const {togglePanel, addMenuItem, updateMenuItem, setDefaultTabs, deleteMenuItem, addTab, removeTab, setChildItem, setActiveTab} = mainMenuSlice.actions;
//selectors
export const selectMainMenu = (state:RootState) => state.mainMenu 
export const selectMainMenuItems = (state:RootState) => state.mainMenu.menuItems
export const getItem = (id:string, items: MainMenuItem[]): MainMenuItem => {
    let r = null;
    for(let i=0; i< items.length; i++) {
        let item = items[i];
        if(item.id === id){
            r = item;
            break;
        }
        else{
           r = getItem(id,item.children);
           if(r)
           break;
        }
    }
    return r as MainMenuItem;
}
export const getItemFromPath = (path:string, items: MainMenuItem[]): MainMenuItem | null => {
    let r = null;
    for(let i=0; i< items.length; i++) {
        let item = items[i];
        if(item.path === path){
            r = item;
            break;
        }
        else{
           r = getItemFromPath(path,item.children);
           if(r)
           break;
        }
    }
    return r as MainMenuItem;
}
export const selectActiveTab = (state:RootState): MainMenuItem | null => state.mainMenu.activeTab 
export const selectDefaultOptions = (state:RootState): MainMenuItem[] => state.mainMenu.defaultOptions.map(id => getItem(id, state.mainMenu.menuItems)) as MainMenuItem[]
export const selectBottonTabOptions = (state:RootState): MainMenuItem[] => state.mainMenu.bottomTabOptions.map(id =>  getItem(id, state.mainMenu.menuItems)) as MainMenuItem[]
export const selectLeafMainMenuItems = (state:RootState): MainMenuItem[] => {
    let items: MainMenuItem[] = [];
    state.mainMenu.menuItems.forEach(item => {
        if(item.children.length > 0) {
            items.push(...item.children);
        }
        else{
            items.push(item);
        }
    })
    return items;
}
export const selectMoreMenu = (state:RootState):MainMenuItem | undefined => {
    return state.mainMenu.menuItems.find(e => e.type === MainMenuItems.MORE)
}
export const selectTemporaryTab = (state:RootState): MainMenuItem | null => state.mainMenu.temporaryTab ? getItem(state.mainMenu.temporaryTab,state.mainMenu.menuItems) : null
export default mainMenuSlice.reducer;