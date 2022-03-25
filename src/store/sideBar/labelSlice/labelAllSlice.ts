import { createSlice,createAsyncThunk, PayloadAction ,applyMiddleware} from '@reduxjs/toolkit';
import {add3DLabel,delete3DLabel as delete3DLabelApi, get3DLabelCanvasPos, probe} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {LabelMode, Label2D, LabelSettings, Label2DType, LabelType, ILabel, Label3DType, Label3D} from './shared/types';
import { setLabelModeReducer } from './shared/reducers';
import {ITreeState} from "../shared/Tree/types";
import {   
    selectCheckedLeafNodes as selectCheckedLeafNodesTree, 
    selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree
} from 'store/sideBar/shared/Tree/selectors';
import {
    saveTreeReducer, 
    checkNodeReducer, 
    highlightNodeReducer,
    addNodeReducer,
    deleteNodeReducer, 
    invertNodeReducer, 
    expandNodeReducer, 
    toggleVisibilityReducer, 
    setCheckedVisibilityReducer, 
    invertCheckedVisibilityReducer,
    regroupReducer} from "../shared/Tree/reducers";
import nextId from 'react-id-generator';
import { selectInteractionMode } from 'store/appSlice';
import { InteractionMode } from 'backend/ViewerManager';
import { Label2DTemplate, Label3DTemplate } from 'components/sideBarContents/labels/components/shared/Editor/common';

import {undoStack} from "../../../components/utils/undoStack"
import { AnyArray } from 'immer/dist/internal';

export const windowPrefixId = "Label2D";
interface labelSettings extends LabelSettings {
    defaultParameters : ILabel,
    count2D: number,
    countPoint : number,
    countFace : number,
    countMeasurement : number,
    probeLeafCount : number,
    faceLeafCount : number,
    distanceLeafCount : number,
    arcLeafCount : number
} 


interface InitialState extends ITreeState {
    data : {[id:string]:ILabel},
    rootIds : string[],
    labelsListSettings : labelSettings,
}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    labelsListSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
                labelType: LabelType.LABEL2D,
                pos:[0,0], 
                state: {
                    checked : false,
                    partiallyChecked : false,
                    expanded : true,
                    highlighted : false,
                    visibility : true,
                    selected: false,
                },
                attributes: {},
                label: "Lorem ipsum dolor sit amet",
                bgColor: "#ff0000"
        },
        mode: LabelMode.VIEW,
        count2D: 0,
        countPoint : 0,
        countFace : 0,
        countMeasurement : 0,
        probeLeafCount : 0,
        faceLeafCount :0,
        distanceLeafCount : 0,
        arcLeafCount : 0 ,
    }
}

export const init = createAsyncThunk(
    "LabelListSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.labelAll.rootIds;
        if(treeRootIds.length === 0) {
            dispatch(createParentLabel({id:LabelType.LABEL2D,name:"Notes", pid:"-1"}));
            dispatch(createParentLabel({id:LabelType.LABEL3D,name:"3D Labels",pid:"-1"}));
            dispatch(createParentLabel({id:LabelType.MEASUREMENT,name:"Measurements",pid:"-1"}));

            dispatch(createParentLabel({id:Label3DType.PROBE,name:"Point",pid:LabelType.LABEL3D}))
            dispatch(createParentLabel({id:Label3DType.FACE,name:"Face",pid:LabelType.LABEL3D}))

            dispatch(createParentLabel({id:Label3DType.DISTANCE ,name:"Point to Point",pid:LabelType.MEASUREMENT}));
            dispatch(createParentLabel({id:Label3DType.ARC, name:"3 Point Arc Length",pid:LabelType.MEASUREMENT}));
          }
    }
)

// const RedoHandleLabel2DCreation =  createAsyncThunk(
//     "LabelListSlice/handleLabel2DCreation",
//     (data:{data: any , undoable?:boolean , id?: string },{dispatch,getState}) => {
//         let rootState = getState() as RootState;
        
//         let e = data.data.data as PointerEvent;
//             let pos = [e.offsetX,e.offsetY];
//             console.log("e",e);
//             let idNew = data.id? data.id : nextId('label-2d')
//             dispatch(createLabel({id:idNew,pid:LabelType.LABEL2D,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:JSON.stringify(Label2DTemplate)}));

//               if(data.undoable) {
//             undoStack.add(
//               {
//                 undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelType.LABEL2D,}},
//                 redo: {reducer: handleLabel2DCreation, payload:{id:idNew, data: data.data}},
//               }
//             )
//             }
// });


export const handleLabel2DCreation = createAsyncThunk(
    "LabelListSlice/handleLabel2DCreation",
    (data:{data: any , undoable?:boolean;},{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let mode = selectInteractionMode(rootState);

        // if(mode === InteractionMode.DEFAULT)
        //     return;
        
        let e = data.data.data as PointerEvent;
        
        if(mode === InteractionMode.LABEL2D) {
            let pos = [e.offsetX,e.offsetY];
            console.log("e",e);
            let idNew = nextId('label-2d')
            dispatch(createLabel({id:idNew,pid:LabelType.LABEL2D,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:JSON.stringify(Label2DTemplate)}));

              if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:LabelType.LABEL2D,}},
                redo: {reducer: createLabel, payload:{id:idNew,pid:LabelType.LABEL2D,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:JSON.stringify(Label2DTemplate)}},
              }
            )
            }
        }
});

export const handleProbeHeadCreation = createAsyncThunk(
"labelListSlice/handleProbeLabelCreation",
(data:{undoable?: boolean},{dispatch, getState}) => {
    // let e = data.data;
    const idNew = nextId('label-3d')
    dispatch(createInterLabel({id:idNew,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:"nill"}));
    dispatch(setActiveLabel({id: idNew}));

        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:Label3DType.PROBE,}},
                redo: {reducer: createInterLabel, payload:{id:idNew,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:"nill"}},
              }
            )
        }
});

export const handleFaceHeadCreation = createAsyncThunk(
    "labelListSlice/handleProbeLabelCreation",
    (data:{undoable? : boolean},{dispatch, getState}) => {
        // let e = data.data;
        const idNew = nextId('label-3d')
        dispatch(createInterLabel({id:idNew,pid:Label3DType.FACE,pos:[-10,-10],type:Label3DType.FACE,msg:"nill"}));
        dispatch(setActiveLabel({id: idNew}));

        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid:Label3DType.FACE,}},
                redo: {reducer: createInterLabel, payload:{id:idNew,pid:Label3DType.FACE,pos:[-10,-10],type:Label3DType.FACE,msg:"nill"}},
              }
            )
        }

        
});

export const handleMeasurementHeadCreation = createAsyncThunk(
    'labelListSlice/handleMeasurementLabelCreation',
    async (data: {pid: any, undoable?: boolean}, {dispatch,getState}) => {

        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let e = data.pid;
        const idNew = nextId('label-3d')
        dispatch(createInterLabel({
            id: idNew,
            pid: e,
            type:e,
            msg: "nill",
            pos:[-10,-10],
        }));
        dispatch(setActiveLabel({id: idNew}));

        if(data.undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : idNew,pid: e,}},
                redo: {reducer: createInterLabel, payload:{id: idNew,pid: e,type:e,msg: "nill",pos:[-10,-10],}},
              }
            )
        }
 })

export const handleProbeLabelCreation = createAsyncThunk(
    "labelListSlice/handleProbeLabelCreation",
    async(data:{data:any, undoable?: boolean ,activeViewerID:string},{dispatch}) => {


        let e = data.data.data;
        let undoable:boolean = data.undoable!;
    
   dispatch(handleProbeLabelCreationUndoRedo({data:e,undoable:undoable,activeViewerID:data.activeViewerID}))
    //     let rootState = getState() as RootState;
    //     let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
    //     let pos = get3DLabelCanvasPos(e.labelId,viewerId);
    //     const loading:string = rootState.labelAll.lableCreationStatus;

    //     let array : string[] = [];
    //             let activeLabel = "-1"
    //             Object.keys(rootState.labelAll.data).forEach(key => {
    //                 if (rootState.labelAll.data[key].state.selected === true)
    //                     array.push(rootState.labelAll.data[key].id)
    //             })
            
    //             if(array.length >= 1)
    //                activeLabel = array[0];



    //                if(loading == "fulfilled") {

    //                  dispatch(createLabel({id:e.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:e.type,msg:JSON.stringify(Label3DTemplate),probeData:e.msg, activeLabel: activeLabel}));

    //                  if(data.undoable) {
    //                     undoStack.add(
    //                       {
    //                         undo: {reducer: undoCreateLabel, payload:{id : e.labelId,pid: activeLabel, activeViewerID:viewerId}},
    //                         redo: {reducer: redoCreateLabel, payload:{id:e.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:e.type,msg:JSON.stringify(Label3DTemplate),probeData:e.msg, activeLabel: activeLabel,labelType:e.type,probeDataInArray:e.probeData,selectedPoints:e.selectedPoints,activeViewerID:viewerId}},
    //                       }
    //                     )
    //                 }
                       
    //                }

        
});

export const delete3DLabel = createAsyncThunk(
    "labelListSlice/delete3DLabel",
    (data:{undoable?: boolean},{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.labelAll;
        let keys:string[] = [];
        let dataList : any[] = [];
        Object.keys(state.data).forEach( key => {
            if( state.data[key].state.checked === true && state.data[key].pid !== "-1" && state.data[key].id !== Label3DType.PROBE && state.data[key].id !== Label3DType.DISTANCE && state.data[key].id !== Label3DType.ARC){

                delete3DLabelApi(key,viewerId);

                // if(state.data[key].state.partiallyChecked === false)
                // keys.push(key);

                if(state.data[key].children.length === 0){
                    keys.push(key);
                    dataList.push(state.data[key])
                }
                
            }
        })
        dispatch(LabelAllSlice.actions.deleteLabel({keys}));
        
        if(data.undoable){
            undoStack.add(
                {
                  undo: {reducer: undoDelete, payload:{dataList}},
                  redo: {reducer: redoDelete, payload:{keys}},
                }
              )
        }
});

const redoDelete = createAsyncThunk(
    "labelListSlice/delete3DLabel",
    (data:{keys: string[]},{dispatch,getState}) => {
        // let rootState = getState() as RootState;
        // let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];

        // data.keys?.forEach((item :any) => {
        //     delete3DLabelApi(item,viewerId)
            
        // })

        dispatch(LabelAllSlice.actions.deleteLabel({keys: data.keys}));
});

const undoDelete = createAsyncThunk(
    "labelListSlice/handleProbeLabelCreation",
    (data:{dataList : any},{dispatch,getState}) => {

        console.log("item", data.dataList)
        data.dataList.forEach((item: any) => 
            dispatch(LabelAllSlice.actions.undoDeleted(item))
        )
    
});

const handleProbeLabelCreationUndoRedoAsync = createAsyncThunk(

    "labelListSlice/handleProbeLabelCreationUndoRedo",

    (data:{id:string,pid: string,pos: number[], anchor:number,type:any,msg:any,probeData:any, activeLabel: string,labelType:any,probeDataInArray:any,selectedPoints:any,activeViewerID:string},{dispatch,getState}) => {


        add3DLabel(data.id,data.selectedPoints,data.labelType,data.probeDataInArray,data.activeViewerID);


     }
);

export const reGroupLabel = createAsyncThunk(
    "labelListSlice/RegroupLabel",
    (data:{selectedNodes: any, grandPid: any, currentPid: string, undoable?: boolean, redoPid?: string},{dispatch,getState})=>{

        let {selectedNodes, grandPid, currentPid, redoPid} = data;

        let newPid : string = "";

        if(grandPid === Label3DType.PROBE){
            newPid = redoPid? redoPid : nextId('label-3d')
            dispatch(createInterLabel({id:newPid,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:"nill"}))
          }
      
          if(grandPid === Label3DType.FACE){
            newPid = redoPid? redoPid: nextId('label-3d')
            dispatch(createInterLabel({id:newPid,pid:Label3DType.FACE,pos:[-10,-10],type:Label3DType.FACE,msg:"nill"}));
          }
      
          if(grandPid === Label3DType.DISTANCE){
            newPid = redoPid? redoPid: nextId('label-3d')
                dispatch(createInterLabel({id: newPid,pid: Label3DType.DISTANCE,type:Label3DType.DISTANCE,msg: "nill",pos:[-10,-10],}));
          }
      
          if(grandPid === Label3DType.ARC){
            newPid = redoPid? redoPid: nextId('label-3d')
                dispatch(createInterLabel({id: newPid,pid: Label3DType.ARC,type:Label3DType.ARC,msg: "nill",pos:[-10,-10],}));
          }
         
        selectedNodes.forEach((item: string )=> 
            dispatch(LabelAllSlice.actions.regroupLabel({key: item, newPid : newPid}))
        )

        if(data.undoable){
            undoStack.add(
                {
                  undo: {reducer: undoRegroup, payload:{selectedNodes,oldPid: currentPid, currentPid: newPid, grandPid}},
                  redo: {reducer: reGroupLabel, payload:{selectedNodes,grandPid, redoPid : newPid}},
                }
            )
        }
        
    }
)

export const LabelAllSlice = createSlice({
    name: "LabelAll",
    initialState : initialState,
    reducers: {
        saveTree: saveTreeReducer,
        checkNode: checkNodeReducer,
        highlightNode: highlightNodeReducer,
        invertNode: invertNodeReducer,
        expandNode: expandNodeReducer,
        toggleVisibility: toggleVisibilityReducer,

        setCheckedVisibility: (state, action:PayloadAction<{toShow:boolean,leafIds:any, undoable?:boolean}>) => {
            const {toShow, leafIds,undoable} = action.payload;
            if(undoable)
            undoStack.add(
              {
                undo: {reducer: setCheckedVisibility, payload:{toShow: !toShow , leafIds}},
                redo: {reducer: setCheckedVisibility, payload:{toShow,leafIds}}
              }
            )
            setCheckedVisibilityReducer(state,action);
        },

        invertCheckedVisibility: (state, action:PayloadAction<{leafIds:any, undoable?:boolean}>) => {
            const {leafIds,undoable} = action.payload;
            if(undoable)
            undoStack.add(
              {
                undo: {reducer: invertCheckedVisibility, payload:{leafIds}},
                redo: {reducer: invertCheckedVisibility, payload:{leafIds}}
              }
            )
            invertCheckedVisibilityReducer(state,action);
        },

        setlabelMode: (state,action) => setLabelModeReducer(state.labelsListSettings,action),

        createParentLabel : (state, action : PayloadAction<{id:string,name: string, pid: string}>) => {
            const {id,name, pid} = action.payload;
            let newParent = {...state.labelsListSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = pid;
            newParent.title = name;
            newParent.label = "";
            newParent.isGroup = true;
            addNodeReducer(state,{payload: newParent, type: 'ITreeNode'});
        },

        createInterLabel: (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType ,msg:string}>) => {


            const {id,pid,pos,msg} = action.payload;

            let newNote = {...state.labelsListSettings.defaultParameters};
            newNote.id = id
            newNote.pid = pid
            newNote.label = msg;
            newNote.pos = pos;


            if(newNote.pid === Label3DType.PROBE){
                newNote.anchor = pos;
                state.labelsListSettings.countPoint+= 1;
                newNote.title = `Point Label ${state.labelsListSettings.countPoint}`;
                newNote.labelType = LabelType.LABEL3D;
            }

            if(newNote.pid === Label3DType.FACE){
                newNote.anchor = pos;
                state.labelsListSettings.countFace+= 1;
                newNote.title = `Face Label ${state.labelsListSettings.countFace}`;
                newNote.labelType = LabelType.LABEL3D;
            }

            if(newNote.pid === Label3DType.DISTANCE || newNote.pid === Label3DType.ARC){
                newNote.anchor = pos; 
                state.labelsListSettings.countMeasurement+= 1;
                newNote.title = `Measurement ${state.labelsListSettings.countMeasurement}`;
                newNote.labelType = LabelType.LABEL3D;
            }
            addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
        },

        undoDeleted : (state, action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType ,msg:string, probeData?:any, activeLabel?:string}>) => {
            addNodeReducer(state,{payload: action.payload, type: 'ITreeNode'});
        },

        createLabel : (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType ,msg:string, probeData?:any, activeLabel?:string}>) => {
                
                const {id,pid,pos,msg,probeData} = action.payload;
                let newNote:any = {...state.labelsListSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.label = msg;
                newNote.pos = pos;
                if(probeData)
                newNote.probeData = probeData;
                if(newNote.pid === LabelType.LABEL2D){
                    state.labelsListSettings.count2D+= 1;
                    newNote.title = `Label ${state.labelsListSettings.count2D}`;
                    newNote.labelType = LabelType.LABEL2D
                }


                if(newNote.pid === action.payload.activeLabel){

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.PROBE){
                        newNote.anchor = pos;
                        state.labelsListSettings.probeLeafCount +=1 ;
                        newNote.title = `N: Point ${state.labelsListSettings.probeLeafCount}`;
                        newNote.labelType = LabelType.LABEL3D;
                        newNote.type = Label3DType.PROBE;
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.FACE){
                        newNote.anchor = pos;
                        state.labelsListSettings.faceLeafCount +=1 ;
                        newNote.title = `N: Face ${state.labelsListSettings.faceLeafCount}`;
                        newNote.labelType = LabelType.LABEL3D;
                        newNote.type = Label3DType.FACE;
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.DISTANCE){
                        newNote.anchor = pos;
                        state.labelsListSettings.distanceLeafCount += 1;
                        newNote.title = `N: Point-Point ${state.labelsListSettings.distanceLeafCount}`;
                        newNote.labelType = LabelType.LABEL3D;
                        newNote.type = Label3DType.DISTANCE;
                    }

                    if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.ARC){
                        newNote.anchor = pos;
                        state.labelsListSettings.arcLeafCount += 1;
                        newNote.title = `N: Arc ${state.labelsListSettings.arcLeafCount}`;
                        newNote.labelType = LabelType.LABEL3D;
                        newNote.type = Label3DType.ARC;
                    }
                }

                addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});

                // if(true) {
                //     undoStack.add(
                //       {
                //         undo: {reducer: undoCreateLabel, payload:{id,pid}},
                //         redo: {reducer: createLabel, payload: action.payload},
                //       }
                //     )
                //     }
        },

        undoCreateLabel : (state , action: PayloadAction<{id:string, pid: string ,activeViewerID:string}>) => {

            const parentnodeList : string[] = [LabelType.LABEL2D,Label3DType.PROBE, Label3DType.FACE, Label3DType.DISTANCE,Label3DType.ARC]

            if(parentnodeList.includes(action.payload.pid)){

                switch(action.payload.pid){
                    case LabelType.LABEL2D :
                        state.labelsListSettings.count2D--;
                    break;
                    case Label3DType.PROBE:
                        state.labelsListSettings.countPoint--;
                    break;
                    case Label3DType.FACE:
                        state.labelsListSettings.countFace--;
                    break;
                    case Label3DType.DISTANCE :
                        state.labelsListSettings.countMeasurement--;
                    break;
                    case Label3DType.ARC :
                        state.labelsListSettings.countMeasurement--;
                    break;
                    default:
                }
            } 

            else{
                const labelType = JSON.parse(JSON.stringify(state.data[action.payload.id].type ? state.data[action.payload.id].type : "sda"));
                switch(labelType){
                    case Label3DType.PROBE:
                        state.labelsListSettings.probeLeafCount--;
                    break;
                    case Label3DType.FACE:
                        state.labelsListSettings.faceLeafCount--;
                    break;
                    case Label3DType.DISTANCE :
                        state.labelsListSettings.distanceLeafCount--;
                        
                    break;
                    case Label3DType.ARC :
                        state.labelsListSettings.arcLeafCount--;
                    break;
                    default:
            }
        }

        delete3DLabelApi(action.payload.id ,action.payload.activeViewerID);
        deleteNodeReducer(state, {payload:{nodeId:action.payload.id},type:'string'})
  
        },
        redoCreateLabel: (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],anchor?:[number,number],type:Label2DType | Label3DType ,msg:string, probeData?:any, activeLabel?:string,labelType:Label2DType | Label3DType,probeDataInArray:any,selectedPoints:AnyArray,activeViewerID:string}>) => {

           const {id,pid,pos,msg,probeData,labelType,probeDataInArray,selectedPoints,activeViewerID} = action.payload;
           

           let newNote:any = {...state.labelsListSettings.defaultParameters};
           newNote.id = id
           newNote.pid = pid
           newNote.label = msg;
           newNote.pos = pos;
           if(probeData)
           newNote.probeData = probeData;
           if(newNote.pid === LabelType.LABEL2D){
               state.labelsListSettings.count2D+= 1;
               newNote.title = `Label ${state.labelsListSettings.count2D}`;
               newNote.labelType = LabelType.LABEL2D
           }


           if(newNote.pid === action.payload.activeLabel){

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.PROBE){
                   newNote.anchor = pos;
                   state.labelsListSettings.probeLeafCount +=1 ;
                   newNote.title = `N: Point ${state.labelsListSettings.probeLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.PROBE;
               }

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.FACE){
                   newNote.anchor = pos;
                   state.labelsListSettings.faceLeafCount +=1 ;
                   newNote.title = `N: Face ${state.labelsListSettings.faceLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.FACE;
               }

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.DISTANCE){
                   newNote.anchor = pos;
                   state.labelsListSettings.distanceLeafCount += 1;
                   newNote.title = `N: Point-Point ${state.labelsListSettings.distanceLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.DISTANCE;
               }

               if(state.data[action.payload.activeLabel? action.payload.activeLabel: -1].pid === Label3DType.ARC){
                   newNote.anchor = pos;
                   state.labelsListSettings.arcLeafCount += 1;
                   newNote.title = `N: Arc ${state.labelsListSettings.arcLeafCount}`;
                   newNote.labelType = LabelType.LABEL3D;
                   newNote.type = Label3DType.ARC;
               }
           }
          
           addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
           add3DLabel(id,selectedPoints,labelType,probeDataInArray,activeViewerID);
          
        },

        setLabelPos:(state, action:PayloadAction<{id:string,pos:[number,number],anchor?: [number,number]}>) => {
            const {id,pos,anchor} = action.payload;
            if(id !== "-1") {
                state.data[id].pos = pos;
                if(anchor){
                    (state.data[id] as Label3D).anchor = anchor;
                }
            }
        },

        editLabel: (state, action: PayloadAction<{id:string, value:string}>) => {
            const {id,value} = action.payload;
            if(id !== "-1"){
                state.data[id].label = value;
            }
        },

        editLabelBackground: (state, action: PayloadAction<{id:string, color:string}>) => {
            const {id,color} = action.payload;
            state.data[id].bgColor = color;
        },

        deleteLabel: (state, action: PayloadAction<{keys:string[]}>) => {
            let keys = action.payload.keys;
            alert("deleteKeys"+ keys)
            keys.forEach(k => {
                deleteNodeReducer(state, {payload:{nodeId:k},type:'string'})
            })
        },

        regroupLabel: (state, action: PayloadAction<{key:string, newPid:string}>) => {
            
            let key = action.payload.key;
            let array: string[] = [];
            Object.keys(state.data).forEach( key => {
                if( state.data[key].state.selected === true)
                    array.push(state.data[key].id)
            })
            regroupReducer(state,{payload: {nodeId : key, newParentId : action.payload.newPid}, type:'ITreeNode'})
        },

        undoRegroup: (state, action: PayloadAction<{selectedNodes : string[],oldPid: string, currentPid: string, grandPid : string }>) => {

            const {selectedNodes, oldPid, currentPid, grandPid} = action.payload;
            
            selectedNodes.forEach(item =>
                LabelAllSlice.caseReducers.regroupLabel(state, {payload:{key: item, newPid: oldPid}, type:"labelAllSlice/regroupLabel"})
            )
            LabelAllSlice.caseReducers.undoCreateLabel(state, {payload:{id: currentPid, pid: grandPid}, type:"labelAllSlice/undoCreateLabel"});
        },

        setActiveLabel : (state, action: PayloadAction<{id:string}>) => {

            if(state.data[action.payload.id].state.selected === true)
                state.data[action.payload.id].state.selected = false;
            else
                if(state.data[action.payload.id].pid === LabelType.LABEL2D || state.data[action.payload.id].pid === Label3DType.PROBE ||state.data[action.payload.id].pid === Label3DType.DISTANCE || state.data[action.payload.id].pid === Label3DType.ARC || state.data[action.payload.id].pid === Label3DType.FACE || state.data[action.payload.id].type === Label3DType.PROBE || state.data[action.payload.id].type === Label3DType.FACE || state.data[action.payload.id].type === Label3DType.DISTANCE || state.data[action.payload.id].type === Label3DType.ARC )
                    state.data[action.payload.id].state.selected = true;

            Object.keys(state.data).forEach( key => {
                if( state.data[key].state.selected === true && key !== action.payload.id)
                    state.data[key].state.selected = false;
            })
        } ,

        handleProbeLabelCreationUndoRedo:(state ,action: PayloadAction<{data:any,undoable:boolean,activeViewerID:string}>) =>{

             const {data , undoable , activeViewerID } = action.payload;

             let pos = get3DLabelCanvasPos(data.labelId,activeViewerID);

               let array : string[] = [];
                 let activeLabel = "-1"
                 Object.keys(state.data).forEach(key => {
                     if (state.data[key].state.selected === true)
                         array.push(state.data[key].id)
                 })
            
                 if(array.length >= 1)
                    activeLabel = array[0];
   
      

         LabelAllSlice.caseReducers.createLabel(state, {payload:{id:data.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:data.type,msg:JSON.stringify(Label3DTemplate),probeData:data.msg, activeLabel: activeLabel}, type:"labelListSlice/handleProbeLabelCreation"})
               //  createLabel({id:data.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:data.type,msg:JSON.stringify(Label3DTemplate),probeData:data.msg, activeLabel: activeLabel});

        if(undoable) {
            undoStack.add(
              {
                undo: {reducer: undoCreateLabel, payload:{id : data.labelId,pid: activeLabel, activeViewerID:activeViewerID}},
                redo: {reducer: handleProbeLabelCreationUndoRedoAsync, payload:{id:data.labelId,pid: activeLabel,pos: pos as [number,number], anchor: pos as [number,number],type:data.type,msg:JSON.stringify(Label3DTemplate),probeData:data.msg, activeLabel: activeLabel,labelType:data.type,probeDataInArray:data.probeData,selectedPoints:data.selectedPoints,activeViewerID:activeViewerID}},
              }
            )
        }

        }
    },
})

export default LabelAllSlice.reducer;
export const {
    //reuse from tree 
    saveTree , 
    checkNode, 
    highlightNode, 
    invertNode, 
    expandNode, 
    toggleVisibility, 
    setCheckedVisibility,
    invertCheckedVisibility,
    //current 
    createLabel,
    handleProbeLabelCreationUndoRedo,
    createInterLabel,
    editLabel,
    editLabelBackground,
    setlabelMode,
    setLabelPos, 
    createParentLabel,
    setActiveLabel,
    undoCreateLabel,
    redoCreateLabel,
    undoRegroup,
    
} = LabelAllSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.labelAll.rootIds
export const selectLabelData = (state:RootState) => state.labelAll.data

export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.labelAll.data).forEach(key => {
        if (state.labelAll.data[key].state.checked === true)
            if(state.labelAll.data[key].pid === "-1" || state.labelAll.data[key].pid === LabelType.LABEL3D || state.labelAll.data[key].pid === LabelType.MEASUREMENT)
                return null
            else
                array.push(key)
     })

     return (array.length);
}

export const selectedLeafNodes = (state:RootState) => {
    const array : string[] = [];
    const typeLabel : any[] = [];
     Object.keys(state.labelAll.data).forEach(key => {
        if (state.labelAll.data[key].state.checked === true)
            if(state.labelAll.data[key].pid === "-1" || state.labelAll.data[key].pid === LabelType.LABEL3D || state.labelAll.data[key].pid === LabelType.MEASUREMENT || state.labelAll.data[key].pid === LabelType.LABEL2D || state.labelAll.data[key].pid === Label3DType.PROBE || state.labelAll.data[key].pid === Label3DType.ARC || state.labelAll.data[key].pid === Label3DType.DISTANCE || state.labelAll.data[key].pid === Label3DType.FACE)
                return null
            else{
                array.push(key)
                typeLabel.push(state.labelAll.data[key].type);
            }
            })
     
        const filtered = typeLabel.filter(item => item === typeLabel[0]);

        if(filtered.length === typeLabel.length)
            return (array);
        else    
            return([])
}

export const selectLabelMode = (state:RootState):LabelMode => state.labelAll.labelsListSettings.mode;
export const selectedLabel2D = (state: RootState):Label2D | null=> {
    let node:Label2D | null = null;
    const length = selectedLength(state);

    if(length === 1){
    Object.keys(state.labelAll.data).forEach(key => {
        if (state.labelAll.data[key].state.checked === true && state.labelAll.data[key].pid !== "-1" )
            node = state.labelAll.data[key]
     })
    }
    return(node);
}

export const selectActiveId = (state:RootState) => {

    let array : string[] = [];

    Object.keys(state.labelAll.data).forEach(key => {
        if (state.labelAll.data[key].state.selected === true)
            array.push(state.labelAll.data[key].id)
    })

    if(array.length >= 1)
        return(array[0])
    else return("-1")
}

export const selectCheckedLeafNodes = (state:RootState) =>  selectCheckedLeafNodesTree(state.labelAll)
export const selectUnCheckedLeafNodes = (state:RootState) =>  selectUnCheckedLeafNodesTree(state.labelAll)