import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { Routes } from '../routes';
import type { RootState } from './index';
import GeometryIcon from 'components/icons/geometry';
import { MainMenuItem, MainMenuItems } from './mainMenuSlice';
export type SearchItem = {
    id:string,
    name: string,
    path: Routes,
    type: MainMenuItems,
    icon?: any,
    disabled: boolean,
}

export type SearchState = {
    prevSearches: string[],
    prevSearchesLimit: number
}

export const getSearchItems = (mainMenuItems:MainMenuItem[], withGroup?:boolean): SearchItem[] => {
    let items:SearchItem[] = [];
    let excludeTypes = [MainMenuItems.MORE,MainMenuItems.ADD_GROUP];
    mainMenuItems.forEach(e => {
        if(!excludeTypes.includes(e.type)){
            let item = {
                id: e.id,
                type: e.type,
                name: e.name,
                path: e.path,
                disabled: e.disabled,
            }
            
            if(e.children.length > 0){
                if(withGroup)
                items.push(item);
                items.push(...getSearchItems(e.children));
            }
            else {
                items.push(item);
            }
        }
    })
    return items;
}
const initialState: SearchState ={
    prevSearches: [],
    prevSearchesLimit: 3
}

export const moreSlice = createSlice({
    name: 'more',
    initialState,
    reducers: {
        addPrevSearchItem: (state , action: PayloadAction<string>) => {
            if(action.payload === "" || state.prevSearches.includes(action.payload))
            {

            }
            else{
                state.prevSearches.push(action.payload);
                if(state.prevSearches.length > state.prevSearchesLimit)
                state.prevSearches.shift();
            }
        }
    },

})
export const {addPrevSearchItem} = moreSlice.actions;
//selectors
export const selectList = (state:RootState) => state.more.items; 
export const selectPrevSearches = (state:RootState) => state.more.prevSearches;

export default moreSlice.reducer;