import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {descend, prop, sortWith} from "ramda";

export enum NotificationType {
    NETWORK_TRANSFER_MESSAGE = 0,
    SIMPLE_MESSAGE = 1,
}

export enum IconType {
    TRANSFERING = 0,
    PAUSE = 1,
    CANCELLED = 2,
    APPLIED = 3,
    COMPLETED = 4,
}

export type NetworkData = {
    totalSize: number,
    transfferedSize: number,
    timeLeft: string,
    pause: boolean,
    cancel: boolean,
}

export type SimpleData = {
    body: string[],
}

export type NotificationList= {
    id: string,
    time: string,
    card:{
        icon:IconType,
        type:NotificationType,
        title: string,
        data: SimpleData | NetworkData,
    },
    collapsed:boolean,
    tags: string[],
}

type messages = {
    notificationLists : NotificationList[],
}

const initialState : messages = {
    notificationLists : [
        // {
        //     id: "xyz",
        //     time: new Date(),
        //     tags: ["Colormap"],
        //     collapsed: true,
        //     card: {
        //         title: "Applied Color map 1",
        //         icon: IconType.APPLIED,
        //         data: {
        //             body: ["Hello"]
        //         },
        //         type: NotificationType.SIMPLE_MESSAGE
        //     }
        // }
    ],
}

export const messageSlice = createSlice({
    name: "message",
    initialState : initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<
            {id:string, 
             type:NotificationType, 
             title: string, 
             data: SimpleData | NetworkData,
             tags: string[] }>) => {
            let {id, type, title, data, tags} = action.payload;

            const date = () => {
                const time = new Date();
                return(JSON.stringify(time));
            };
            
                state.notificationLists.push(
                    {
                        id,
                        tags,
                        time: date(),
                        collapsed: true,
                        card: {
                            data,
                            icon: type === NotificationType.NETWORK_TRANSFER_MESSAGE ? IconType.TRANSFERING : IconType.APPLIED,
                            title,
                            type
                        }
                    }
                )
        },
        updateMessage: (state, action: PayloadAction<{id:string, transferredSize:number}>) => {
            let {id,transferredSize} = action.payload;
            let element = state.notificationLists.find(e => e.id === id);
            if(element){
                let data = element.card.data as NetworkData;
                data.transfferedSize = transferredSize;
            }
        },
        finishMessage: (state, action: PayloadAction<{id:string}>) => {
            let {id} = action.payload;
            let element = state.notificationLists.find(e => e.id === id);
            if(element){
                element.card.icon = IconType.COMPLETED
            }
        },
        editPause: (state,action: PayloadAction<{id:string, value:boolean}>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload.id);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                if(changeItem.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE){
                    (changeItem.card.data as NetworkData).pause = action.payload.value;
                    if(action.payload.value === true)
                        changeItem.card.icon = IconType.PAUSE;
                    else
                        changeItem.card.icon = IconType.TRANSFERING;
                        
                    state.notificationLists[index] = changeItem;
                }
               
            }
        },
        
        editCancel: (state,action: PayloadAction<string>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                if(changeItem.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE){
                    (changeItem.card.data as NetworkData).cancel = true;
                    changeItem.card.icon = IconType.CANCELLED;
                    state.notificationLists[index] = changeItem;
                }
            }
        },

        editCollapse:(state,action: PayloadAction<{id:string, value:boolean}>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload.id);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                changeItem.collapsed = action.payload.value;
                state.notificationLists[index] = changeItem;
            }
        },

        editSearch :(state,action : PayloadAction<string>) => {
            if(action.payload === "All"){
                state.notificationLists.forEach( (item, index) => {
                    item.collapsed = true;
                    state.notificationLists[index] = item;
                })
            }

            else{
                if(action.payload === "Network Transfer"){
                    state.notificationLists.forEach( (item, index) => {
                        const data = item.card.data as NetworkData;
                        if(item.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE && data.cancel === false && data.totalSize !== data.transfferedSize){
                            item.collapsed = true;
                            state.notificationLists[index] = item;
                        }

                        else{
                            item.collapsed = false;
                            state.notificationLists[index] = item;
                        }
                    })
                }
                else{ 
                    state.notificationLists.forEach( (item, index) => {
                        if(item.tags.includes(action.payload)){
                            item.collapsed = true;
                            state.notificationLists[index] = item;
                        }
                        else{
                            item.collapsed = false;
                            state.notificationLists[index] = item;
                        }
                    })
                }
            }
        },
    }
})


export default messageSlice.reducer;
export const {addMessage, updateMessage, finishMessage, editPause , editCancel , editCollapse, editSearch, fileTransferUpdate} = messageSlice.actions;

//selectors

export const sortedNotification = (state : RootState):NotificationList[] => {

    const sortedNotificationList = sortWith([descend(prop("time"))], state.message.notificationLists);
    return(sortedNotificationList)
  }

export const selectTags = (state: RootState): [number,string][] => {
    let set = new Set<string>(["All","Custom"]);
    state.message.notificationLists.forEach(e => {
        e.tags.forEach(tag => set.add(tag));
    })
    return [...set.values()].map((e,i) => [i,e]);
}