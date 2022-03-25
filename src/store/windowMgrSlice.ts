import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stringify } from 'querystring';
import type { RootState } from './index';

import {undoStack} from "../components/utils/undoStack"

export enum Layers {
    BACKGROUND = 'BACKGROUND',
    VIEWER = 'VIEWER',
    BACK = 'BACK',
    FRONT = 'FRONT'
}
export type WindowState = {
    id:string,
    zOrder: number,
    isEditMode: boolean,
    isHidden: boolean,
    pos: [number,number],
    anchor: [number,number],
    size: [number, number]
}

type WindowMgrState = {
    windows : {[id: string] : WindowState},
    windowsCount: number,
    isEnabled: boolean,
    activeLayers: {[key in keyof typeof Layers]:boolean}
}

const initialState = {
    isEnabled: false,
    windowsCount: 0,
    windows: {},
    activeLayers: {
        "VIEWER" : true
    }
} as WindowMgrState

export const windowMgrSlice = createSlice({
    name: 'windowMgr',
    initialState,
    reducers: {
        addWindow: (state, action: PayloadAction<{uid:string}>) => {
            const { uid } = action.payload;
            if(state.windows[uid] !== undefined)
            {
                throw new Error("The provided window id in not unique")
            }
            state.windows[uid] = {
                id:uid, 
                pos:[-1,-1],
                anchor:[0,0],
                size: [300,300],
                isEditMode: false, 
                isHidden: false, 
                zOrder: 0
            };
            state.windowsCount = state.windowsCount+1;
        },
        removeWindow: (state, action: PayloadAction<{uid:string}>) => {
            const { uid } = action.payload;
            if(state.windows[uid] !== undefined)
            {
                delete state.windows[uid]
                state.windowsCount = state.windowsCount-1;
            }
            else{
                throw new Error("The provided window id does not exist")
            }
        },
        setEditMode: (state, action:PayloadAction<{uid:string,isEdit:boolean}>) => {
            const {uid, isEdit} = action.payload;
            if(state.windows[uid] !== undefined) {
                state.windows[uid].isEditMode = isEdit;
                let selectedWindow = state.windows[uid];
                if(isEdit === true)
                {
                    selectedWindow.zOrder =1;
                }
                else{
                    selectedWindow.zOrder =0;
                }
            }
            else{
                console.warn("Invalid window uid");
            }
        },
        setHiddenState: (state, action:PayloadAction<{uid:string,isHidden:boolean}>) => {
            const {uid, isHidden} = action.payload;
            if(state.windows[uid] !== undefined) {
                state.windows[uid].isHidden = isHidden;
            }
            else{
                throw new Error("Invalid window uid");
            }
        },
        setWindowPos: (state, action:PayloadAction<{uid:string, pos:[number,number]}>) => {
            let {uid,pos} = action.payload;
            if(state.windows[uid])
            state.windows[uid].pos = pos;
        },
        setWindowAnchor: (state, action:PayloadAction<{uid:string, anchor:[number,number]}>) => {
            const {uid,anchor} = action.payload;
            state.windows[uid].anchor = anchor;
        },

        undoWindowSize : (state, action:PayloadAction<{uid:string, size:[number,number], pos:[number,number]}>) => {
            let {uid,size,pos} = action.payload;
            state.windows[uid].size = size;
            state.windows[uid].pos = pos;

        },
        setWindowSize: (state, action:PayloadAction<{uid:string, size:[number,number]}>) => {
            let {uid,size} = action.payload;
            state.windows[uid].size = size;
        },

        setWindowPostionHandler:(state, action:PayloadAction<{uid:string, anchor: [number,number],pos: [number,number], undoable?: boolean}>)=> {
            const {uid,pos,anchor,undoable} = action.payload;

            const oldPos = JSON.parse(JSON.stringify(state.windows[uid].pos));
            const oldAnchor = JSON.parse(JSON.stringify(state.windows[uid].anchor));

            windowMgrSlice.caseReducers.setWindowAnchor(state, {payload:{uid, anchor}, type:"windowMrgSlice/setWindowAnchor"});
            windowMgrSlice.caseReducers.setWindowPos(state, {payload:{uid, pos}, type:"windowMrgSlice/setWindowPos"});

            if(undoable){
                undoStack.add(
                    {
                      undo: {reducer: setWindowPostionHandler, payload:{uid, anchor:oldAnchor, pos: oldPos}},
                      redo: {reducer: setWindowPostionHandler, payload:{uid, anchor, pos}},
                    }
                  )
            }
        },

        setWindowSizeHandler: (state, action:PayloadAction<{uid:string, size:[number,number],pos: [number,number], undoable?: boolean}>) => {
            let {uid,size, pos} = action.payload;

           const oldSize =  JSON.parse(JSON.stringify(state.windows[uid].size));
           const oldPos = JSON.parse(JSON.stringify(state.windows[uid].pos))

            state.windows[uid].size = size;
            // state.windows[uid].pos = pos;
            windowMgrSlice.caseReducers.setWindowPos(state, {payload:{uid, pos}, type:"windowMrgSlice/setWindowPos"});

            if(action.payload.undoable) {
                undoStack.add(
                  {
                    undo: {reducer: undoWindowSize, payload:{uid, size:oldSize, pos: oldPos}},
                    redo: {reducer: setWindowSizeHandler, payload:{uid, size, pos}},
                  }
                )
              }

        },

        setActiveLayers: (state, action:PayloadAction<Layers[]>) => {
            const layers = action.payload;
            let selection:any = {};
            layers.forEach(l => {
                selection[l] = true;
            });
            if(selection[Layers.VIEWER]){
                selection = {};
                selection[Layers.VIEWER] = true;
            } 
            state.activeLayers = selection;
        }
    }
}) 

export const {
    addWindow,
    removeWindow,
    setEditMode,
    setHiddenState,
    setWindowPos,
    setWindowSize,
    setWindowSizeHandler,
    setWindowPostionHandler,
    setWindowAnchor,
    setActiveLayers,
    undoWindowSize,
} = windowMgrSlice.actions;

export const selectActiveLayers = (state: RootState): Layers[] => Object.keys(state.windowMgr.activeLayers) as Layers[];
export const selectWindowMgr = (state: RootState) => state.windowMgr
export const selectWindowSize = (state: RootState, id:string) => state.windowMgr.windows[id]? state.windowMgr.windows[id].size : [-1,-1];
export const selectWindowXY =  (state: RootState, id:string) => state.windowMgr.windows[id]? state.windowMgr.windows[id].pos : [-1,-1];
export const selectWindowAnchor = (state: RootState, id:string) => state.windowMgr.windows[id]? state.windowMgr.windows[id].anchor : [0,0];  
export default windowMgrSlice.reducer