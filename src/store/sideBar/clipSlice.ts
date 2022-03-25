import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { mat4, vec3 } from 'gl-matrix';
import {getSectionGUIData, setSectionPlaneGUIData, setSectionPlaneEquation, setActiveSectionPlane, addSectionPlane, deleteSectionPlane, getSceneBoundingBox} from "../../backend/viewerAPIProxy"
import {getNormalizedEqn, getPerpendicular, getWorldTransformFromPlaneEqn, planeEqnFrom3pts} from "../../components/utils/Math"
import type { RootState } from '../index';

import {undoStack} from "../../components/utils/undoStack"

type masterPlane = {
  id: number,
  name: string,
}

type EqnGUI = {
  clipInputX:number,
  clipInputY:number,
  clipInputZ:number,
  clipInputD:number
}

export enum SelectionMode{
  NONE = 0,
  THREE_PT = 1,
  FACE = 2
}

enum Axis{
  X,Y,Z
}

export type plane = {
    id: number,
    name: string,
    enabled: boolean,
    showClip: boolean,
    showEdge: boolean,
    showCap: boolean,
    clipCordX: number,
	  clipCordY: number,
	  clipCordZ: number,
	  clipConstD: number,
    clipNormalInverted: boolean,
    translate: number,
    translateMin: number,
    translateMax: number,
    rotate: number,
    axisX: number,
	  axisY: number,	
    worldTransform: number[],
    localTransform:number[],
    initTransform: number[],
    userInputEquation:number[],		
    color: [number,number,number,number],
    childPlane: number[],
    masterPlane: masterPlane ,
    selected: boolean,      
  }

type settings= {
  planesData: any,
  selectionMode: SelectionMode,
  defaultPlaneParameters : plane
  maxAllowedPlanes : number,
  idGenerator: number,
}

type Color = [number,number,number,number];

type planes = {
  colors: Color[]
  planes : plane[],
  settings : settings
};

const initialState : planes = {
  colors: [[1,0,0,0.1],
  [1,0,0,0.1],
  [1,0,0,0.1],
  [1,0,0,0.1],
  [1,0,0,0.1],
  [1,0,0,0.1]],
  
  planes:[],

  settings :{
    selectionMode: SelectionMode.NONE,
    maxAllowedPlanes : 6,
    idGenerator :-1,
    planesData: [],
    defaultPlaneParameters : {
      id:-1,
      name:'plane',
      enabled: false,
      showClip: false,
      showEdge: false,
      showCap: false,
      clipCordX: 1,
      clipCordY: 0,
      clipCordZ: 0,
      clipConstD:0,
      clipNormalInverted: false,
      translate: 0,
      translateMin:-200,
      translateMax:200,
      rotate: 0,
      axisX: 0,
      axisY: 0,
      worldTransform: Array.from(mat4.create()),
      localTransform: Array.from(mat4.create()),
      initTransform: Array.from(mat4.create()),
      userInputEquation: [1,0,0,0],
      color: [1,0,0,0.3],
      childPlane: [],
      masterPlane: {id:-1, name: "Global"},
      selected: false,
    }
  }
}

//added by pravin
const getRootPlane = (state:planes, id:number):number => {
  const index : any = state.planes.findIndex((item) => item.id === id);
  let curPlane = state.planes[index];
  if((curPlane.masterPlane.id !== null || curPlane.masterPlane.id !== undefined) 
      && curPlane.masterPlane.id > -1) {
    let parentIdx = state.planes.findIndex((item) => item.id === curPlane.masterPlane.id);
    let parent = state.planes[parentIdx];
    return getRootPlane(state, parent.id);
  }
  else {
    return curPlane.id;
  }
}
export const fetchSectionPlaneData = createAsyncThunk(
  "clipSlice/fetchSectionPlaneData",
  async (data,{dispatch,getState}) => {
   
     const rootState = getState() as RootState;
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     let result:any = [];
     if(viewerId)
      result =  getSectionGUIData(viewerId);
     if(result.planeOptions instanceof Array){
       return Promise.resolve(result.planeOptions);
     }
     else{
       return Promise.reject();
     }
  }
)

export const setSectionPlaneData = createAsyncThunk(
  "clipSlice/setSectionPlaneState",
  async (data:{id:number},{dispatch,getState}) => {
     
     const rootState = getState() as RootState;
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     const index : any = rootState.clipPlane.planes.findIndex((item) => item.id === data.id);
     const curPlane = rootState.clipPlane.planes[index];
     let options = {
       ...rootState.clipPlane.settings.planesData[index],
       selectionMode: rootState.clipPlane.settings.selectionMode,
       isPlaneEnabled: curPlane.enabled,
       isPlaneVisible: curPlane.showClip,
       primarySliderValue: curPlane.translate,
       sliderMinMax: [curPlane.translateMin,curPlane.translateMax],
       rotSliderNValue: curPlane.rotate,
       rotSliderUValue: curPlane.axisX,
       rotSliderVValue:curPlane.axisY,
     }
     
     //primary plane
     setSectionPlaneGUIData(data.id,options,viewerId);
     setSectionPlaneEquation(data.id,new Float32Array(curPlane.worldTransform),viewerId,new Float32Array(curPlane.initTransform));
     dispatch(fetchSectionPlaneData());
     
	 //slave planes
     if(curPlane.childPlane.length > 0) {
       curPlane.childPlane.forEach((planeId) => {
        dispatch(setSectionPlaneData({id:planeId}));
       })
     }
     return Promise.resolve('SUCCESS')
  }
)

const generatePlane = (id:number, name:string, transform:number[], eqn:number[], color:Color, radius:number) => {
  
  
  const plane:plane = {  id,name, 
    enabled: false, 
    showClip: false, 
    showEdge: false,
    showCap: false,
    clipCordX:eqn[0],
    clipCordY:eqn[1], 
    clipCordZ:eqn[2],
    clipConstD:-eqn[3],
    clipNormalInverted: false,
    translate: 0,
    translateMin: -radius,
    translateMax: radius,
    rotate: 0,
    axisX:0,
    axisY: 0,
    worldTransform:Array.from(transform),
    localTransform:Array.from(transform),
    initTransform: Array.from(transform),
    userInputEquation: [eqn[0],eqn[1],eqn[2],-eqn[3]],
    color,
    childPlane: [],
    masterPlane: {id:-1, name:"Global"},
    selected: false,
  }
return plane
}

const generateName = (id : number , eqn: number[]) => {

  // let surName="Plane"
  // if(eqn[0]=== 0 && eqn[1] === 0){
  //   surName = 'XY'
  // }

  // if(eqn[0] === 0 && eqn[2] === 0 ){
  //   surName = 'XZ'
  // }

  // if(eqn[1] === 0 && eqn[2] === 0) {
  //   surName = 'YZ'
  // }

  // if(id > 2){
  //   surName = "Plane"
  // }

  const name = `Plane ${id + 1}`;
  return name;
}

const generateEqn = (planes:plane[],bbox:any):[number,number,number,number] => {
  
  let c = bbox.getCenter() as vec3;
  if(planes.length === 0) {
    let n = vec3.fromValues(1,0,0);

    return getNormalizedEqn([
      n[0],
      n[1],
      n[2],
      vec3.dot(n,c) 
    ]);
  }
  else if(planes.length === 1) {
    const plane1 = planes[0];
    let n1 = vec3.fromValues(plane1.worldTransform[8],plane1.worldTransform[9],plane1.worldTransform[10]);
    let n2 = getPerpendicular(n1);
    return getNormalizedEqn([
      n2[0],
      n2[1],
      n2[2],
      vec3.dot(n2,c)
    ]);
  }
  else {
    const plane1 = planes[0];
    const plane2 = planes[1];
    let n1 = vec3.fromValues(plane1.worldTransform[8],plane1.worldTransform[9],plane1.worldTransform[10]);
    let n2 = vec3.fromValues(plane2.worldTransform[8],plane2.worldTransform[9],plane2.worldTransform[10]);
    let n3 = vec3.create();
    vec3.cross(n3,n1,n2);
    return getNormalizedEqn([
      n3[0],
      n3[1],
      n3[2],
      vec3.dot(n3,c)
    ]);
  }
}

export const addPlane = createAsyncThunk(
  "clipSlice/addSectionPlane",
  async (data:{undoable: boolean},{dispatch,getState}) => {
    const rootState = getState() as RootState;
    const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];

    let bbox = getSceneBoundingBox(viewerId,false);
    let center = bbox.getCenter() as vec3;
    let eqn = generateEqn(state.planes,bbox);
    
    let newTransform = getWorldTransformFromPlaneEqn(eqn,center);

    dispatch(clipSlice.actions.incrementId())

    let id = (getState() as RootState).clipPlane.settings.idGenerator;
    let name = generateName(id , eqn);
    let randColorIdx = id % state.colors.length;
    let color = state.colors[randColorIdx];

    addSectionPlane(id, newTransform, color ,viewerId);
    let radius = bbox.getRadius();
    let plane = generatePlane(id, name, Array.from(newTransform), eqn, color,radius);
    dispatch(createPlane({plane}));
    dispatch(editEnabled({id,isEnabled:true}));
    dispatch(setSectionPlaneData({id}))

    if(data.undoable) {
      undoStack.add(
        {
          undo: {reducer: removePlane, payload:{id: id, redoIncrement : true}},
          redo: {reducer: addPlane, payload:{id : id,}},
        }
      )
    }
  }
)
export const duplicatePlane = createAsyncThunk(
  "clipSlice/duplicatePlane",
  async (data:{pastedPlane:plane, undoable?: boolean},{dispatch,getState}) => {
    dispatch(pastePlane(data.pastedPlane))
    const rootState = getState() as RootState;
    const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let cloneId = state.settings.idGenerator;
    const index : any = rootState.clipPlane.planes.findIndex((item) => item.id === cloneId);
    const curPlane = rootState.clipPlane.planes[index];
    addSectionPlane(cloneId,new Float32Array(curPlane.worldTransform),curPlane.color,viewerId);
    dispatch(setSectionPlaneData({id:cloneId}))

    if(data.undoable) {
      undoStack.add(
        {
          undo: {reducer: removePlane, payload:{id: cloneId, redoIncrement : true}},
          redo: {reducer: duplicatePlane, payload:{pastedPlane : data.pastedPlane}},
        }
      )
    }
  }
)
export const removePlane = createAsyncThunk(
  "clipSlice/addSectionPlane",
  async (data:{id:number, redoIncrement?: boolean, undoable?: boolean},{dispatch,getState}) => {
    const rootState = getState() as RootState;

    const deletedPlane = rootState.clipPlane.planes.find(item => item.id === data.id);
    const indexOfDeletedPlane = rootState.clipPlane.planes.findIndex(item => item.id === data.id)

    console.log("deletedPlane" , deletedPlane)

    //const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    dispatch(editEnabled({id:data.id,isEnabled:false}));
    dispatch(setSectionPlaneData({id:data.id}))
    deleteSectionPlane(data.id,viewerId);
    dispatch(clipSlice.actions.deletePlane(data.id));

    if(data.redoIncrement === true)
      dispatch(clipSlice.actions.decrementId())

    if(data.undoable === true){
      undoStack.add(
        {
          undo: {reducer: undoDelete, payload:{plane: deletedPlane, deletedIndex: indexOfDeletedPlane}},
          redo: {reducer: removePlane, payload:{id : data.id,}},
        }
      )
    }
  }
)

const undoDelete = createAsyncThunk(
  "clipSlice/addSectionPlane",
  async (data:{plane : plane, deletedIndex : number},{dispatch,getState}) => {
    const rootState = getState() as RootState;

    let {plane} = data;

    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];

    plane = {...plane, selected : false}

    console.log("planes undoDelete", plane)

    const index = data.deletedIndex;
    addSectionPlane(plane.id,new Float32Array(plane.worldTransform),plane.color,viewerId);
    dispatch(pushPlane({plane, index}));
    dispatch(setSectionPlaneData({id : plane.id}))


  }
)

export const editEquation = createAsyncThunk(
  "clipSlice/editEquation",
  async (data:{id:number,eqn:EqnGUI},{dispatch,getState}) => {
    const rootState = getState() as RootState;
    const {id,eqn} = data;
    const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    dispatch(clipSlice.actions.editEquationGUI({id,eqn}));
    dispatch(clipSlice.actions.updateEqn({id,viewerId}));
  }
)

export const setActive = createAsyncThunk(
  "clipSlice/setActiveSectionPlane",
  async (data:{clicked:plane},{dispatch,getState}) => {
     console.log("active plane", data.clicked.id)
     dispatch(saveSelectedPlane({clicked: data.clicked }))
     const rootState = getState() as RootState;
     const selectedPlane = rootState.clipPlane.planes.filter(item => item.selected === true);
     
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     
     if(selectedPlane.length === 1)
      setActiveSectionPlane(selectedPlane[0].id,viewerId)
    else
      setActiveSectionPlane(-1,viewerId)
  }
)

export const setSelectionMode = createAsyncThunk(
  "clipSlice/setSelectionMode",
  async (data:{activeId:number,selectionMode:SelectionMode }, {dispatch, getState}) => {
    dispatch(clipSlice.actions.editSelectMode(data.selectionMode));
    if(data.activeId > -1) {
      dispatch(setSectionPlaneData({id:data.activeId}));
    }
  }
)

export const handlePlaneSelection = createAsyncThunk(
  "clipSlice/handlePlaneSelection",
  async (data:{e:any}, {dispatch, getState}) => {
    let planeId = data.e?.planeId;
    let points = data.e?.points;
    let state = (getState() as RootState).clipPlane;
    let index = state.planes.findIndex(plane => plane.id === planeId);
    if(index >=0 && points) {
      let eqn = planeEqnFrom3pts(
      new Float32Array(points[0]),
      new Float32Array(points[1]),
      new Float32Array(points[2]));

      if(eqn && eqn.length === 4) {
        let data:EqnGUI = {
          clipInputX: eqn[0],
          clipInputY: eqn[1],
          clipInputZ: eqn[2],
          clipInputD: -eqn[3]
        }
        dispatch(editEquation({id:planeId,eqn:data}));
      }
    }
    dispatch(clipSlice.actions.editSelectMode(SelectionMode.NONE));
    dispatch(setSectionPlaneData({id:0}));
  }
) 

export const clipSlice = createSlice({
  name: "clip",
  initialState : initialState,
  reducers: {
    setPlanesData: (state,action: PayloadAction<plane[]>) => {
      state.settings.planesData = action.payload;
      state.settings.maxAllowedPlanes = action.payload.length;
    },

    incrementId: (state) => {
      state.settings.idGenerator = state.settings.idGenerator + 1 ;
    },

    decrementId : (state) => {
      console.log("sasasdasdsadasd")
      state.settings.idGenerator = state.settings.idGenerator - 1 ;
    },

    createPlane: (state, action:PayloadAction<{plane:plane}>) => {

      console.log("dasd", action.payload.plane)

      if (state.planes.length < state.settings.maxAllowedPlanes){
        state.planes= [...state.planes,action.payload.plane];      
      }
    },

    pushPlane : (state, action:PayloadAction<{plane:plane, index : number}>) => {
      state.planes.splice(action.payload.index, 0, action.payload.plane);
    },

    editEnabled: (state, action:PayloadAction<{id:number, isEnabled:boolean}>) => {
      const index= state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0 ) {
        let changeItem : plane = state.planes[index];

        // if(changeItem.enabled === true && changeItem.slicePlane.enabled === true)
        //   changeItem.slicePlane.enabled = false;
        //   changeItem.slicePlane.showClip = false;

        if(action.payload.isEnabled === false && changeItem.showClip === true)
          changeItem.showClip = false
        if(action.payload.isEnabled === true && changeItem.showClip === false)
          changeItem.showClip = true 
        
        changeItem.enabled = action.payload.isEnabled;
        
        state.planes[index] = changeItem;

      }
    },

    editShowClip : (state,action: PayloadAction<{id:number, value:boolean}>) => {
      const index= state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0 ) {
        let changeItem : plane = state.planes[index];
        // if(changeItem.showClip === true && changeItem.slicePlane.showClip === true)
        //   changeItem.slicePlane.showClip = false;
        // if(changeItem.showClip === false && changeItem.slicePlane.enabled === true)
        //   changeItem.slicePlane.showClip = true;
          
        changeItem.showClip = action.payload.value;
        state.planes[index] = changeItem;
      }
    },

    editEdgeClip : (state,action: PayloadAction<{id:number, value:boolean}>) => {
      const index= state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0 ) {
        let changeItem : plane = state.planes[index];
        changeItem.showEdge = action.payload.value
        state.planes[index] = changeItem;
      }       
    },

    editShowCap : (state,action: PayloadAction<{id:number, value:boolean}>) => {
      const index= state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        changeItem.showCap = action.payload.value
        state.planes[index] = changeItem;
      }
    },

    pastePlane : (state, action: PayloadAction<plane>) => {
      if (state.planes.length < state.settings.maxAllowedPlanes){
        let clone:plane = JSON.parse(JSON.stringify(action.payload));
        clipSlice.caseReducers.incrementId(state);
        clone.id=state.settings.idGenerator;
        clone.selected = false;
        clone.name = generateName(clone.id, []);
        clone.color = state.colors[clone.id % state.colors.length];
        clone.childPlane = [];
        state.planes=[...state.planes, clone];
        //console.log("clone",clone)
        //console.log("After", state.planes)

        console.log("cloneId",clone.id)

        const masterPlaneIndex = state.planes.findIndex(item => item.id === clone.masterPlane.id)
        if(masterPlaneIndex >= 0) {
          let updateMaster = state.planes[masterPlaneIndex];
          console.log("cloneId",clone.id)
          updateMaster.childPlane.push(clone.id);
          state.planes[masterPlaneIndex] = updateMaster;
        }
      

      }
    },

    deletePlane : (state, action: PayloadAction<number>) => {

      const index = state.planes.findIndex(item => item.id === action.payload);
        if( index >= 0 ){
          // const childPlanes = state.planes[index].childPlane;
          const masterPlaneId = state.planes[index].masterPlane.id;
          
          if(masterPlaneId > -1){
            const masterIndex = state.planes.findIndex(item => item.id === masterPlaneId);
            let changeItem = state.planes[masterIndex];
            changeItem.childPlane = changeItem.childPlane.filter(item => item !== action.payload)
            state.planes[masterIndex] = changeItem
          }

          // if(childPlanes.length > 0){
          //   childPlanes.forEach(item => 
          //     {
          //       const childIndex : any = state.planes.findIndex(element => element.id === item)
          //       if ( childIndex >= 0){
          //         let changeItem = state.planes[childIndex]
          //         changeItem.masterPlane = {id: -1, name: "Global"}
          //         state.planes[childIndex] = changeItem;
          //       }
          //     })
          // }
        }
        const newArray = state.planes.filter(item => item.id !== action.payload);
        state.planes=[...newArray];
    },

    editEquationGUI: (state, action:PayloadAction<{id: number,eqn:EqnGUI}>) => {
      let {id,eqn} = action.payload;
      const index : any = state.planes.findIndex((item) => item.id === id);
      if ( index >= 0) {
        let changeItem = state.planes[index];


        if(changeItem.clipCordX !== eqn.clipInputX || changeItem.clipCordY !== eqn.clipInputY || changeItem.clipCordZ !== eqn.clipInputZ)
        {
          changeItem.rotate = 0;
          changeItem.translate = 0;
          changeItem.axisX = 0;
          changeItem.axisY = 0;
        }

        changeItem.clipCordX = eqn.clipInputX;
        changeItem.clipCordY = eqn.clipInputY;
        changeItem.clipCordZ = eqn.clipInputZ;
        changeItem.clipConstD = eqn.clipInputD;

        changeItem.userInputEquation[0] = eqn.clipInputX;
        changeItem.userInputEquation[1] = eqn.clipInputY;
        changeItem.userInputEquation[2] = eqn.clipInputZ;
        changeItem.userInputEquation[3] = eqn.clipInputD;
        state.planes[index] = changeItem;
      }
    },

 	  editNormalInverted: (state, action:PayloadAction<number>) => {
      
      const index : any = state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        changeItem.clipNormalInverted = !changeItem.clipNormalInverted;
        clipSlice.caseReducers.invert(state, {payload:{id:action.payload}, type:"clipSlice/invert"});
        state.planes[index] = changeItem;
      }
    },

    editTranslate: (state, action: PayloadAction<{id:number, translate:number}>) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.translate - changeItem.translate};
        changeItem.translate= action.payload.translate;
        clipSlice.caseReducers.translate(state,{payload:data,type:"clipslice/translate"})
        // state.planes[index] = changeItem;
      }
    },

    editRotate: (state, action: PayloadAction<{id:number, rotate:number}>) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.rotate - changeItem.rotate, axis:Axis.Z};
        clipSlice.caseReducers.rotate(state,{payload:data,type:"clipslice/rotate"})
        changeItem.rotate= action.payload.rotate;
        state.planes[index] = changeItem;
      }
    },

    editAxisX: (state, action: PayloadAction<{id:number, axisX:number}>) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.axisX - changeItem.axisX, axis: Axis.X};
        clipSlice.caseReducers.rotate(state,{payload:data,type:"clipslice/rotate"})
        changeItem.axisX= action.payload.axisX;
        state.planes[index] = changeItem;
      }
    },

    editAxisY: (state, action: PayloadAction<{id:number, axisY:number}>) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.axisY - changeItem.axisY, axis:Axis.Y};
        clipSlice.caseReducers.rotate(state,{payload:data,type:"clipslice/rotate"})
        changeItem.axisY= action.payload.axisY;
        state.planes[index] = changeItem;
      }
    },

    editPlaneName: (state, action: PayloadAction<{id:number, editName:string, undoable : boolean}>) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      let oldName ="";
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        oldName = changeItem.name;
        changeItem.name = action.payload.editName;
        state.planes[index] = changeItem;
      }

      if(action.payload.undoable){
        undoStack.add(
          {
            undo: {reducer: editPlaneName, payload:{id: action.payload.id , editName: oldName}},
            redo: {reducer: editPlaneName, payload:{id : action.payload.id, editName : action.payload.editName}},
          }
        )
      }
      
    },

    saveSelectedPlane: (state, action: PayloadAction<{clicked: plane}>) => {

      const alreadySeletedIndex = state.planes.findIndex((item) => item.selected === true);
      const index= state.planes.findIndex((item) => item.id === action.payload.clicked.id);

      console.log(alreadySeletedIndex , index)

      
      if(alreadySeletedIndex >= 0) {
        let changeItemOne : plane = state.planes[alreadySeletedIndex];
        console.log(changeItemOne.id)
        changeItemOne.selected = false;
        state.planes[alreadySeletedIndex] = changeItemOne;
      }
      
      if ( index >= 0 ) {
        if(index !== alreadySeletedIndex){
          let changeItem : plane = state.planes[index];
          changeItem.selected = true;
          state.planes[index] = changeItem;
        }
      }
    },
        //added by pravin
      setPlaneEqn: (state, action) => {
          const {id, eqn} = action.payload;
          let plane = state.planes[id];
          plane.clipCordX = eqn[0];
          plane.clipCordY = eqn[1];
          plane.clipCordZ = eqn[2];
          plane.clipConstD = eqn[3];
      },
      updateMinMaxGUI: (state, action:PayloadAction<{id:number|string}>) => {
        const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
        if(index < 0)
        return;

        let curPlane = state.planes[index];
        let delta = (curPlane.translateMax - curPlane.translateMin)*0.5;
        if(curPlane.translateMin >= curPlane.translate) {
          curPlane.translateMin = curPlane.translateMin - delta;
          curPlane.translateMax = curPlane.translateMax - delta;
          
        }
        else if(curPlane.translateMax <= curPlane.translate) {
          curPlane.translateMin = curPlane.translateMin + delta;
          curPlane.translateMax = curPlane.translateMax + delta;
          
        }
      },

      undoMinMaxGUI: (state, action:PayloadAction<{id: number, min: number, max:number}>) => {
        const index : any = state.planes.findIndex((item) => item.id === action.payload.id);

        if(index >= 0){
          let curPlane = state.planes[index];
          curPlane.translateMin = action.payload.min;
          curPlane.translateMax = action.payload.max;
        }

      },

      updateEqnGUI: (state, action:PayloadAction<{id:number|string}>) => {
        let {id} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];
        let inputNormal = vec3.fromValues(curPlane.userInputEquation[0],curPlane.userInputEquation[1], curPlane.userInputEquation[2]);
        let l = vec3.len(inputNormal);
        let t = curPlane.worldTransform;
        let n = vec3.fromValues(t[8],t[9],t[10]);
        let pos = vec3.fromValues(t[12],t[13],t[14]);
        curPlane.clipCordX = n[0]*l;
        curPlane.clipCordY = n[1]*l;
        curPlane.clipCordZ = n[2]*l;
        curPlane.clipConstD = vec3.dot(n,pos)*l;
        if(curPlane.childPlane.length > 0) {
          curPlane.childPlane.forEach(planeId => {
            clipSlice.caseReducers.updateEqnGUI(state,{payload:{id:planeId}, type:"clipSlice/updateEqn"});
          })
        }
      },
      updateEqn: (state, action:PayloadAction<{id:number|string, viewerId:any}>) => {
          const {id,viewerId} = action.payload;
          const index : any = state.planes.findIndex((item) => item.id === id);
          const curPlane = state.planes[index];
          let bbox = getSceneBoundingBox(viewerId,false);
          let curCenter = bbox.getCenter() as vec3;
          let radius = bbox.getRadius();
          let eqn = getNormalizedEqn([
            curPlane.clipCordX,
            curPlane.clipCordY,
            curPlane.clipCordZ,
            -curPlane.clipConstD
          ]);
          curPlane.translateMin = -radius;
          curPlane.translateMax = radius;
          let newTransform = getWorldTransformFromPlaneEqn(eqn,curCenter);
          curPlane.worldTransform = Array.from(newTransform);
          if(curPlane.masterPlane.id > -1) {
            let parentIndex = state.planes.findIndex((item) => item.id === curPlane.masterPlane.id);
            let parent = state.planes[parentIndex];
            let parentMat = new Float32Array(parent.worldTransform) as mat4;
            let parentInv = mat4.create();
            mat4.invert(parentInv,parentMat);
            let localMat = mat4.create();
            mat4.multiply(localMat,parentInv,newTransform);
            curPlane.localTransform = Array.from(localMat);
          }
          else{
            curPlane.localTransform = Array.from(newTransform);
          }
          curPlane.initTransform = Array.from(newTransform);
          clipSlice.caseReducers.update(state,{payload:{id:id as number},type:"clipSlice/update"});
      },
      update: (state, action:PayloadAction<{id:number}>) => {
        let {id} = action.payload;
        let rootPlaneId = getRootPlane(state, id);
        clipSlice.caseReducers.updatePlaneMatrix(state,{payload:{id:rootPlaneId, parentMat:null},type:"clipPlanes/updatePlaneMatrix"})
        clipSlice.caseReducers.updateEqnGUI(state, {payload:{id}, type:"clipSlice/updateEqn"});
      },
      invert: (state, action:PayloadAction<{id:number}>) => {
        let {id} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];
        let transform = mat4.clone(new Float32Array(curPlane.localTransform));
        transform[8] = -curPlane.localTransform[8]; 
        transform[9] = -curPlane.localTransform[9]; 
        transform[10] = -curPlane.localTransform[10];
        curPlane.localTransform = Array.from(transform);
        // curPlane.translate = -curPlane.translate;
        clipSlice.caseReducers.update(state, {payload:{id}, type:"clipSlice/update"})

      }, 
      translate: (state, action:PayloadAction<{id:number,delta:number}>) => {

        let {id,delta} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];

        let transform = new Float32Array(curPlane.localTransform) as mat4;
        mat4.translate(transform,transform,vec3.fromValues(0,0,delta));
        curPlane.localTransform = Array.from(transform);
        clipSlice.caseReducers.update(state, {payload:{id}, type:"clipSlice/update"});
      },

      setParent: (state, action:PayloadAction<{id:number, pid:number}>) => {
        const {id,pid} = action.payload;
        const parentIndex= state.planes.findIndex((item) => item.id === pid);
        const childIndex = state.planes.findIndex((item) => item.id === id);

        if(parentIndex === -1) {
          let child = state.planes[childIndex];
          child.localTransform = Array.from(child.worldTransform);
          clipSlice.caseReducers.updatePlaneMatrix(state, {
            payload: {id,parentMat:null},
            type: "clipSlice/updatePlaneMatrix"
          })
          return;
        }

        if(parentIndex > -1 && childIndex > -1) {
          let parent = state.planes[parentIndex];
          let child = state.planes[childIndex];
          let parentInv = mat4.create();
          let parentWorldMat = new Float32Array(parent.worldTransform) as mat4;
          mat4.invert(parentInv,parentWorldMat);
          let childWorldMat = new Float32Array(child.worldTransform) as mat4;
          let childLocalMat = mat4.create();
          mat4.multiply(childLocalMat, parentInv, childWorldMat);
          child.localTransform = Array.from(childLocalMat);
          clipSlice.caseReducers.updatePlaneMatrix(state, {
            payload: {id:pid,parentMat:null},
            type: "clipSlice/updatePlaneMatrix"
          })
        }

        clipSlice.caseReducers.update(state, {payload:{id}, type: "clipSlice/update"});
      },

      updatePlaneMatrix: (state, action:PayloadAction<{id:number, parentMat:mat4 | null}>) => {
        let {id,parentMat} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];
        if(parentMat) {
          let localMat = new Float32Array(curPlane.localTransform) as mat4;
          let worlMat = mat4.create();
          mat4.multiply(worlMat,parentMat,localMat);
          curPlane.worldTransform = Array.from(worlMat);
        }
        else {
          curPlane.worldTransform = Array.from(curPlane.localTransform);
        }
        if(curPlane.childPlane.length > 0) {
          curPlane.childPlane.forEach(planeId => {
            let action = {
              payload: {
                id: planeId,
                parentMat: new Float32Array(curPlane.worldTransform) as mat4
              },
              type: "clipPlanes/updatePlaneMatrix"
            }
            clipSlice.caseReducers.updatePlaneMatrix(state,action);
          })
          
        }

      },
    
	    rotate: (state, action:PayloadAction<{id:number,delta:number, axis:Axis}>) => {
          let {id,delta, axis} = action.payload;
          let index = state.planes.findIndex((item) => item.id === id);
          let curPlane = state.planes[index];

          let rad = Math.PI/180 * delta;
          let transform = new Float32Array(curPlane.localTransform) as mat4;
          switch (axis) {
            case Axis.X:
              mat4.rotateX(transform,transform,rad);
              break;
            case Axis.Y:
              mat4.rotateY(transform,transform,rad);
              break;
            case Axis.Z:
              mat4.rotateZ(transform,transform,rad);
              break;
            default:
              break;
          }
          curPlane.localTransform = Array.from(transform);
          clipSlice.caseReducers.update(state, {payload:{id}, type:"clipSlice/update"});
    
      },

      setChildPlane: (state, action: PayloadAction<{childId:number,masterId:number}>) => {

        const childIndex = state.planes.findIndex((item) => item.id === action.payload.childId);
        if( childIndex >= 0) {
          if (state.planes[childIndex].masterPlane.id === -1){
            const index= state.planes.findIndex((item) => item.id === action.payload.masterId);
            if ( index >= 0 ) {
              let changeItem : any = state.planes[index];
              if( changeItem.childPlane.includes(action.payload.childId) === false) {
                changeItem.childPlane = [...changeItem.childPlane , action.payload.childId ]
                state.planes[index] = changeItem;
              }
            }
          }

          // if(state.planes[childIndex].childPlane.length > 0){
          //   const masterIndex = state.planes.findIndex((item) => item.id === action.payload.masterId);
          //   if(masterIndex >= 0){
          //     let changeMaster : any = state.planes[masterIndex];
          //     changeMaster.childPlane = state.planes[masterIndex].childPlane.concat(state.planes[childIndex].childPlane); 
          //     state.planes[masterIndex] = changeMaster;
          //   }
          // }
        

          if (state.planes[childIndex].masterPlane.id > -1){
            const currentMasterIndex = state.planes.findIndex((item) => item.id === state.planes[childIndex].masterPlane.id);
            if (  currentMasterIndex >= 0) {
              let changeMaster : any = state.planes[currentMasterIndex];
              changeMaster.childPlane = changeMaster.childPlane.filter((item : number) => item !== action.payload.childId)
              state.planes[currentMasterIndex] = changeMaster;
            }
            const newMasterIndex= state.planes.findIndex((item) => item.id === action.payload.masterId);
            if (  newMasterIndex >= 0 ) {
              let changeItem : any = state.planes[newMasterIndex];
              if( changeItem.childPlane.includes(action.payload.childId) === false){
                changeItem.childPlane = [...changeItem.childPlane , action.payload.childId ]
                state.planes[newMasterIndex] = changeItem;
              }
            }
          }
        }
      },

      setMasterPlane: (state, action : PayloadAction<{childId:number,masterName:string,masterId:number}>) => {
        const {childId, masterId} = action.payload;
        const index= state.planes.findIndex((item) => item.id === childId);
        if ( index >= 0 ) {
          let changeItem : plane= state.planes[index];
          changeItem.masterPlane = {id: masterId, name: action.payload.masterName}
          clipSlice.caseReducers.setParent(state,{
            payload: {id:childId, pid:masterId},
            type: "clipSlice/setParent"
          });
          state.planes[index] = changeItem;
        }
      },

      editSelectMode:(state, action : PayloadAction<SelectionMode>) => {
        state.settings.selectionMode = action.payload;
      }
  },

extraReducers: (builder) => {
  builder.addCase(fetchSectionPlaneData.fulfilled, (state,{payload}) => {
    clipSlice.caseReducers.setPlanesData(state,{payload,type:"any"})
  });
}
})

export const { createPlane,pushPlane,editEnabled,editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editNormalInverted , editTranslate, editRotate, editAxisX, editAxisY, editPlaneName, updateMinMaxGUI , saveSelectedPlane , setMasterPlane , setChildPlane , undoMinMaxGUI  } = clipSlice.actions;

//selectors

export const selectedPlane = (state : RootState) => {
  const clickedValues = state.clipPlane.planes.filter(item => item.selected === true);
  return(clickedValues)
}

export const selectActivePlane = (state : RootState) => {
  const clickedValues = state.clipPlane.planes.filter(item => item.selected === true);
  if(clickedValues.length === 1)
    return (clickedValues[0].id)
  else  
    return(-1)
};

export const selectPlanes = (state:RootState) => {
  return state.clipPlane.planes
}

export default clipSlice.reducer;
