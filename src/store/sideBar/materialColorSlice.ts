import { PlaylistAddOutlined } from '@material-ui/icons';
import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';

export enum Selection {
    ALL_PARTS,
    SELECTED_PARTS,
    UNSELECTED_PARTS
  }

export type colorSet = {
    r:number,
    g:number,
    b:number,
    a?:number,
}

export type part= {
    id : number,
    name : string,
    selected : boolean,
    ampientColor : colorSet,
    diffuseColor  : colorSet,
    emissiveColor : colorSet,
    specularColor : colorSet,
}

type materialColor = {
    parts: part[],
    selection: Selection,
    shininess : number,
    opacity : number,
}


const initialState : materialColor ={
    parts: [
    {
        id: 0,
         name: "Part One",
         selected : true,
         ampientColor: { r:255,g:255,b:255, a:1},
         diffuseColor : {r:211,g:21,b:21, a:1},
         emissiveColor : {r:10,g:23,b:117, a:1},
         specularColor : {r:10,g:23,b:230, a:1}
     },
     
     {
         id: 1,
         name: "Part Two",
         selected : true,
         ampientColor : {r:255,g:255,b:255, a:1},
         diffuseColor : {r:255,g:255,b:255, a:1},
         emissiveColor : {r:10,g:23,b:117, a:1},
         specularColor : {r:223,g:83,b:8, a:1}
     },

     {
         id: 2,
         name: "Part Three",
         selected : false,
         ampientColor : {r:255,g:255,b:255, a:1},
         diffuseColor : {r:211,g:21,b:21, a:1},
         emissiveColor : {r:10,g:23,b:117, a:1},
         specularColor : {r:223,g:83,b:8, a:1}
     },
],
shininess: 20,
opacity: 85,
selection: Selection.SELECTED_PARTS,

}

export const materialColorSlice = createSlice({
    name: "scene",
    initialState : initialState,
    reducers: {
        setSelection(state, action : PayloadAction<Selection>){
            state.selection = action.payload;
        },

        updateShininess(state, action:  PayloadAction<number>){
            state.shininess = action.payload;
        },
        
        updateOpacity(state, action:  PayloadAction<number>){
            state.opacity = action.payload;
        },

        updateParts(state, action :  PayloadAction<part[]>){
            state.parts = JSON.parse(JSON.stringify(action.payload));
        },

    }
})

export default materialColorSlice.reducer;

export const { setSelection , updateOpacity , updateShininess, updateParts} = materialColorSlice.actions;