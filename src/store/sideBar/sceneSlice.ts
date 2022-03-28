import { PlaylistAddOutlined } from '@material-ui/icons';
import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { mat4 } from 'gl-matrix';
import { getCameraInfo, getCameraStdViews, setCameraInfo, setCameraProjection } from '../../backend/viewerAPIProxy';
import {perspectiveToOrtho,orthoToPerspective} from '../../components/utils/camera'
import type { RootState } from '../index';

import {undoStack} from "../../components/utils/undoStack"

export enum ViewMode {
    Perspective = 0,
    Orthographic = 1,
  }

export type CameraView = {
    id : number,
    name : string,
    userDefined : boolean,
    valuePerspective : {
        name : string,
        value : number,
    }[],
    valueOrthographic : {
        name : string,
        value : number,
    }[],
    cameraPosition: {
        name : string,
        value : number,
    }[],
    cameraDirection: {
        name : string,
        value : number,
    }[],
    cameraUp : {
        name : string,
        value : number,
    }[]
}

export type ColorList = {
    id : number,
    color : {
        r : number,
        g : number,
        b : number,
        a ?: number,
    },
}

type Settings = {
    idGeneratorUserDefined : number,
    idGeneratorSystemDefined : number, 
    defaultCameraParameter : {
        userDefined : boolean,
        valuePerspective : {
            name : string,
            value : number,
        }[],
        valueOrthographic : {
            name : string,
            value : number,
        }[],
        cameraPosition: {
            name : string,
            value : number,
        }[],
        cameraDirection: {
            name : string,
            value : number,
        }[],
        cameraUp : {
            name : string,
         value : number,
        }[]
    }
    activeId : number,
    userDefineLimit : number,
    projection : ViewMode,
    colorLimit : number,
}

type Scenes = {
    cameraViews : CameraView[],
    camMatrix: number[],
    settings : Settings,
    colorList : ColorList[],
    file: any,
    isImageActive: boolean,
    showAxis:boolean,
    axisTriodList : AxisTriodList[],
}


export type AxisTriodList = {
    id:any
    text:string,
    selected:boolean,
    applied:boolean,
}

const initialState : Scenes = {
    cameraViews : [
        
    ],
    camMatrix: [],
    colorList : [{ id:1, color:{r:160, g:160, b:252, a:1}} , {id:2, color:{r:255, g:255, b:255, a:1}}],
    file : null ,
    isImageActive: false,
    showAxis:true,
    axisTriodList:[
        {id:'1',text:'Top Right',selected:false,applied:false},
        {id:'2',text:'Top Left',selected:false,applied:false},
        {id:'3',text:'Middle Right',selected:false,applied:false},
        {id:'4',text:'Middle Left',selected:false,applied:false},
        {id:'5',text:'Bottom Left',selected:false,applied:false},
        {id:'6',text:'Bottom Right',selected:false,applied:false},
        {id:'7',text:'Custom',selected:false,applied:false}
    ],
    settings : {
        idGeneratorUserDefined:20,
        idGeneratorSystemDefined:-1,
        defaultCameraParameter : {
            userDefined : true,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name:"Z", value:2},
            ],
        },
        activeId : -1,
        userDefineLimit: 3,
        projection: ViewMode.Perspective,  
        colorLimit : 4,
    }
}

//camera apis
export const fetchCameraStdViews = createAsyncThunk(
    'scene/fetchCameraStdViews',
    async (data,{dispatch, getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];
        let r:any[] = getCameraStdViews(viewerId);
      
            return r;
    }
)

export const fetchCameraMatrix = createAsyncThunk(
    'scene/fetchCameraMatrix',
    async (data,{dispatch, getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];
        let r:any = getCameraInfo(viewerId,ViewMode.Perspective);
        let x = [...r.right,0];
        let y = [...r.up,0];
        let z = [...r.dir,0];
        let p = [...r.pos,1];
        return [
            x[0],x[1],x[2],x[3],
            y[0],y[1],y[2],y[3],
            z[0],z[1],z[2],z[3],
            p[0],p[1],p[2],p[3]
        ];
    }
)

const undoSetCameraInfoAsync = createAsyncThunk(
    'scene/undoSetCameraInfoAsync',
    async (data: {id : number, callSetActive?: boolean, oldActivePresp?: any, oldActiveOrtho?: any },{dispatch,getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];

        if (data.callSetActive)
            dispatch(setActiveId(data.id))        

        const {oldActivePresp, oldActiveOrtho} = data;
        let camData;

        if(data.id === -1)

            camData = {
                position: oldActivePresp?.pos,
                dir: oldActivePresp.dir,
                up: oldActivePresp?.up,
                perspective: oldActivePresp?.frustum,
                ortho: oldActiveOrtho?.frustum,
            }

        if(data.id !== -1){
            const activeView = state.scene.cameraViews.find(item => item.id === data.id)
            camData = {
                position: [activeView?.cameraPosition[0].value,activeView?.cameraPosition[1].value,activeView?.cameraPosition[2].value],
                dir: [activeView?.cameraDirection[0].value,activeView?.cameraDirection[1].value,activeView?.cameraDirection[2].value],
                up: [activeView?.cameraUp[0].value,activeView?.cameraUp[1].value,activeView?.cameraUp[2].value],
                perspective: 
                {
                    fov: activeView?.valuePerspective[0].value,
                    aspect: activeView?.valuePerspective[1].value,
                    far: activeView?.valuePerspective[2].value,
                    near: activeView?.valuePerspective[3].value
                },
                ortho: {
                    left: activeView?.valueOrthographic[0].value,
                    right: activeView?.valueOrthographic[1].value,
                    top: activeView?.valueOrthographic[2].value,
                    bottom: activeView?.valueOrthographic[3].value,
                    far: activeView?.valueOrthographic[4].value,
                    near: activeView?.valueOrthographic[5].value,
                }
            }
        }
            
        
        setCameraInfo(viewerId,camData);
    }
)

export const setCameraInfoAsync = createAsyncThunk(
    'scene/setCameraInfoAsync',
    async (data: {id : number, undoable?: boolean, callSetActive?: boolean, activeView?: any },{dispatch,getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];

        const oldActiveId = state.scene.settings.activeId;

        if (data.callSetActive)
            dispatch(setActiveId(data.id))        

        const activeView = state.scene.cameraViews.find(item => item.id === data.id)
          
        const oldActivePresp = getCameraInfo(viewerId,ViewMode.Perspective)
        const oldActiveOrtho = getCameraInfo(viewerId,ViewMode.Orthographic)
            
        let camData = {
            position: [activeView?.cameraPosition[0].value,activeView?.cameraPosition[1].value,activeView?.cameraPosition[2].value],
            dir: [activeView?.cameraDirection[0].value,activeView?.cameraDirection[1].value,activeView?.cameraDirection[2].value],
            up: [activeView?.cameraUp[0].value,activeView?.cameraUp[1].value,activeView?.cameraUp[2].value],
            perspective: 
            {
                fov: activeView?.valuePerspective[0].value,
                aspect: activeView?.valuePerspective[1].value,
                far: activeView?.valuePerspective[2].value,
                near: activeView?.valuePerspective[3].value
            },
            ortho: {
                left: activeView?.valueOrthographic[0].value,
                right: activeView?.valueOrthographic[1].value,
                top: activeView?.valueOrthographic[2].value,
                bottom: activeView?.valueOrthographic[3].value,
                far: activeView?.valueOrthographic[4].value,
                near: activeView?.valueOrthographic[5].value,
            }
        }
        setCameraInfo(viewerId,camData);
        
        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoSetCameraInfoAsync, payload:{id: oldActiveId, callSetActive: true, oldActiveOrtho, oldActivePresp }},
                redo: {reducer: setCameraInfoAsync, payload:{id: data.id, callSetActive: true}},
              }
            )
          }
    }
)
export const setProjectionAsync = createAsyncThunk(
    'scene/setProjectionAsync',
    async (data:{value :ViewMode, undoable?: boolean}, {dispatch,getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];

        const oldValue = state.scene.settings.projection;

        setCameraProjection(viewerId,data.value);
        dispatch(sceneSlice.actions.editViewMode({value:data.value}));

        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: setProjectionAsync, payload:{value : oldValue}},
                redo: {reducer: setProjectionAsync, payload:{value : data.value}},
              }
            )
        }

    }
)
//color apis
export const setBackgroundColorAsync = createAsyncThunk(
    'scene/setBackgroundColorAsync',
    async (data:ColorList[], {dispatch,getState}) => {
        dispatch(sceneSlice.actions.updateBackgroundColor(data));
    }
)

export const setBackgroundImageAsync = createAsyncThunk(
    'scene/setBackgroundImageAsync',
    async (data:any, {dispatch,getState}) => {
        dispatch(sceneSlice.actions.updateBackgroundImage(data));
    }
)
export const sceneSlice = createSlice({
    name: "scene",
    initialState : initialState,
    reducers: {
        //camera
        addCameraView : (state, action: PayloadAction<{activeViewerId:string,undoable?:true}>) => {
            if(state.cameraViews.filter(item => item.userDefined === true).length < state.settings.userDefineLimit){
                const userDefinedLength = state.cameraViews.filter(item => item.userDefined === true).length;
                const id : number = ++state.settings.idGeneratorUserDefined;
                const name : string = `Camera View ${userDefinedLength + 1}`;
                const res = getCameraInfo(action.payload.activeViewerId, state.settings.projection);
                const frustum = res.frustum;
                const newCameraView : CameraView = {
                    id,
                    name, 
                    userDefined:true,
                    cameraDirection: [
                        {name:"X", value:res.dir[0]},
                        {name:"Y", value:res.dir[1]},
                        {name:"Z", value:res.dir[2]},
                    ],
                    cameraPosition: [
                        {name:"X" , value:res.pos[0]},
                        {name:"Y", value:res.pos[1]},
                        {name:"Z", value:res.pos[2]},
                    ],
                    cameraUp: [
                        {name:"X", value:res.up[0]},
                        {name:"Y", value:res.up[1]},
                        {name:"Z", value:res.up[2]},
                    ],
                    valuePerspective:  [{name:"Y-Field of View", value:frustum.fov},
                    {name:"Aspect Ratio", value:frustum.aspect},
                    {name:"Far Plane", value:frustum.far},
                    {name:"Near Plane", value:frustum.near}],
                    valueOrthographic: [...state.settings.defaultCameraParameter.valueOrthographic]
                }
                state.cameraViews = [...state.cameraViews, newCameraView];
                sceneSlice.caseReducers.setActiveId(state,{
                    payload: id,
                    type: "sceneSlice/setActiveId"
                })
                if(action.payload.undoable){
                    undoStack.add(
                        {
                            undo: {reducer: undoAddCameraView, payload:{id}},
                            redo: {reducer: addCameraView, payload:{}},
                        }
                    )
                }

            }
        },

        undoAddCameraView : (state,  action: PayloadAction<{id : number}>) => {
            state.cameraViews =  state.cameraViews.filter(item => item.id !== action.payload.id)
            state.settings.idGeneratorUserDefined--;
        },

        pushCameraView : (state, action:PayloadAction<{cameraView: CameraView, index : number}>) => {
            state.cameraViews.push(action.payload.cameraView);
          },

        pasteCameraView: (state,action :  PayloadAction<{data: CameraView, undoable?: true}>) => {
            const userDefinedLength : number = state.cameraViews.filter(item => item.userDefined === true).length;
            let clone = JSON.parse(JSON.stringify(action.payload.data));
            const newId = ++state.settings.idGeneratorUserDefined;
            clone.id= newId;
            clone.userDefined = true;
            clone.name = `Camera View ${userDefinedLength + 1}`;
            state.cameraViews = [...state.cameraViews , clone];

            if(action.payload.undoable){
                undoStack.add(
                    {
                        undo: {reducer: undoAddCameraView, payload:{id :clone.id}},
                        redo: {reducer: pasteCameraView, payload:{data: action.payload.data}},
                    }
                )
            }
        },

        deleteCameraView:(state, action: PayloadAction<{toDeleteItem : CameraView | undefined, undoable?: boolean}>) => {
            const indexOfDeletedCameraView = state.cameraViews.findIndex(item => item.id === action.payload.toDeleteItem?.id)
            const deletedCameraView = action.payload.toDeleteItem;

            console.log(state.cameraViews)

            sceneSlice.caseReducers.setActiveId(state,{payload:-1,type:"sceneSlice/setActiveId"})
            state.cameraViews =  state.cameraViews.filter(item => item.id !== action.payload.toDeleteItem?.id)

            if(action.payload.undoable){
                undoStack.add(
                    {
                      undo: {reducer: pushCameraView, payload:{cameraView : deletedCameraView, index : indexOfDeletedCameraView}},
                      redo: {reducer: deleteCameraView, payload:{toDeleteItem : deletedCameraView}},
                    }
                )
            }
        },

        setActiveId:(state, action :  PayloadAction<number>) => {
            if(action.payload !== state.settings.activeId)
                state.settings.activeId = action.payload;
            else
                state.settings.activeId = -1;
        },

        editViewMode: (state, action:  PayloadAction<{value : ViewMode}>) => {
            state.settings.projection = action.payload.value;
        },
        
        updateChange: (state, action :  PayloadAction<{data : CameraView, tab : ViewMode}>) => {
            const {data,tab} = action.payload;

            console.log("datta",data)

            const index = state.cameraViews.findIndex(item => item.id === data.id)
            if(index > -1){
                if(tab === ViewMode.Perspective)
                {
                    let fov = data.valuePerspective[0].value;
                    let aspect = data.valuePerspective[1].value; 
                    let far = data.valuePerspective[2].value;
                    let near = data.valuePerspective[3].value;
                    let orthoData = perspectiveToOrtho(fov,aspect,near,far);
                    
                    data.valueOrthographic[0].value = orthoData.left;
                    data.valueOrthographic[1].value = orthoData.right;
                    data.valueOrthographic[2].value = orthoData.top;
                    data.valueOrthographic[3].value = orthoData.bottom;
                    data.valueOrthographic[4].value = orthoData.far;
                    data.valueOrthographic[5].value = orthoData.near;
                }
                else{
                    let left = data.valueOrthographic[0].value;
                    let right = data.valueOrthographic[1].value; 
                    let top = data.valueOrthographic[2].value;
                    let bottom = data.valueOrthographic[3].value;
                    let far = data.valueOrthographic[4].value;
                    let near = data.valueOrthographic[5].value;
                    let perspData = orthoToPerspective(left,right,top,bottom,near,far);
                    data.valuePerspective[0].value = perspData.fov;
                    data.valuePerspective[1].value = perspData.aspect;
                    data.valuePerspective[2].value = perspData.far;
                    data.valuePerspective[3].value = perspData.near;
                }
                state.cameraViews[index] = {...data};
            }
        },

        //background
        updateBackgroundColor : (state, action : PayloadAction<ColorList[]>) => {
            state.colorList = action.payload;
            state.isImageActive = false;
        },

        updateBackgroundImage : (state, action) => {
            state.file = action.payload;
            state.isImageActive = true;
        },
        // axisTriad
        setApplyItem:(state, action:PayloadAction<any>)=>{
            state.axisTriodList.forEach((item)=>{    
              if(item.id === action.payload) {
                item.selected = true
              }
              else{
                item.selected = false
              }
        // Apply selected item             
              if(item.selected === true) {
                item.applied = true
                item.selected = false // 
              }
              else {
                item.applied = false
                }
            })
        },
        setShowAxis:(state, action:PayloadAction<boolean>) => {
            state.showAxis = action.payload;
        }
    },
    extraReducers: builder => {

        builder.addCase(fetchCameraStdViews.fulfilled, (state, action:PayloadAction<any[]>) => {
            const r = action.payload;
            let userViews = state.cameraViews.filter(e => e.userDefined === true);
            state.cameraViews = [...userViews];
            state.settings.idGeneratorSystemDefined = -1;
            r.forEach(e => {
                let view = {
                    id: ++state.settings.idGeneratorSystemDefined,
                    name: e.name,
                    userDefined:false,
                    valuePerspective: [
                        {name: "Y-Field of View", value: e.perspective.fov},
                        {name: "Aspect Ratio",value: e.perspective.aspect},
                        {name: "Far Plane", value: e.perspective.far},
                        {name: "Near Plane", value: e.perspective.near}
                    ],
                    valueOrthographic: [
                        {name:"Left", value:e.ortho.left},
                        {name:"Right", value:e.ortho.right},
                        {name:"Top", value:e.ortho.top},
                        {name:"Bottom", value:e.ortho.bottom},
                        {name:"Far", value:e.ortho.far},
                        {name:"Near", value:e.ortho.near},
                    ],
                    cameraPosition : [
                        {name:"X" , value:e.position[0]},
                        {name:"Y", value:e.position[1]},
                        {name:"Z", value:e.position[2]},
                    ],
                    cameraDirection:[
                        {name:"X", value:e.dir[0]},
                        {name:"Y", value:e.dir[1]},
                        {name:"Z", value:e.dir[2]},
                    ],
                    cameraUp:[
                        {name:"X", value:e.up[0]},
                        {name:"Y", value:e.up[1]},
                        {name:"Z", value:e.up[2]},
                    ],
                }
                state.cameraViews.push(view);
            })
            state.settings.defaultCameraParameter = state.cameraViews[0];

        });

        builder.addCase(fetchCameraMatrix.fulfilled, (state, action:PayloadAction<number[]>) => {
            const camMat = action.payload; 
            state.camMatrix = camMat;
        });
    }
})

export const {addCameraView, setActiveId ,  updateChange, pasteCameraView , deleteCameraView, setShowAxis,setApplyItem, pushCameraView, undoAddCameraView} = sceneSlice.actions;

export default sceneSlice.reducer;

//selectors

export const selectAxisTriodList = (state:RootState) => state.scene.axisTriodList;
export const selectShowAxis = (state:RootState) => state.scene.showAxis;

export const selectedCameraView = (state : RootState) => {
    const clickedValues = state.scene.cameraViews.filter(item => item.id === state.scene.settings.activeId);
    return(clickedValues)
  }

export const selectCameraMatrix = (state: RootState) => state.scene.camMatrix;

//background
export const selectIsImageActive = (state:RootState) => state.scene.isImageActive;
export const selectColor = (state:RootState) => state.scene.colorList;
export const selectImage = (state:RootState) => state.scene.file;