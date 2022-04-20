import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Source } from '../../components/shared/List/List';
import {undoStack} from '../../components/utils/undoStack';
import {setMouseBindings, getMouseData, getSystemMouseMappings} from '../../backend/viewerAPIProxy';
import { identity } from 'ramda';

type Settings = {

  activeTheme: string,
  themes: Theme[],
  Slidervalue: number,
  isMenuItemSelected: boolean,
  isControlReadonly: boolean,
  isItemSave: boolean,
  isResetMouseControlList: boolean,
  idGenerator: number,
  userLabelId: number,
  mouseControlListId: number,
  copyItem: boolean,
  currentPage: string,
  menuItems: MenuItem[],
  defaultSystemMouseControllist: DefaultSystemMouseControlList[],
  defaultMouseControlList: DefaultMouseControlList,
  userProvided: MouseControlList[],
  systemProvided: MouseControlList[],
  controls: Control[],
  actions: Action[],
}

export type Theme = {

  id: string,
  name: string,
  selected: boolean,
  applied: boolean
}

export enum MouseSettingsType {
  SYSTEM,
  USER
}

export type MenuItem = {
  id: any,
  text: string,
  selected: boolean,
  applied: boolean,
  edit: boolean,
  readonly: boolean,
  type: Source
}

export type DefaultMouseControlList = MouseControlList;

export type MouseControlList = {

  id: string,
  list: MouseControlListItem[],

}

export type MouseControlListItem = {

  id: string,
  control: string,
  action: string,
  priority: string,

}

export type DefaultSystemMouseControlList = {

  id: string,
  control: string,
  action: string

}

export type Control = {
  id: string,
  keys: any,
  modifiers: any[],
  icon: boolean,
  priority: string,
  when:string

}

export type Action = {
  id: string,
  name: string,
  icon: boolean,
  priority: string,
  when: string,
}


const initialState: Settings = {

  activeTheme: 'dark',
  isMenuItemSelected: false,
  isResetMouseControlList: false,
  isControlReadonly: false,
  Slidervalue: 15,
  idGenerator: 6,
  userLabelId: 0,
  isItemSave: false,
  mouseControlListId: 5,
  copyItem: false,
  currentPage: "ApplicationSettings",
  themes: [
    { id: '1', name: 'Dark', selected: false, applied: true },
    { id: '2', name: 'Light', selected: false, applied: false },
    { id: '3', name: 'Light +', selected: false, applied: false }],

  menuItems: [],

  systemProvided: [],

  userProvided: [],

  controls: [],

  actions: []
}


const getMouseDataJson = function(state: Settings) : Object | undefined{
  let applied = state.menuItems.filter(item => item.applied);
  if(applied.length !== 1) {
    console.error("no more than 1 item can be applied ");
  }
  else {
    let selected = applied[0];
    let mapData = selected.type === Source.SYSTEM ? state.systemProvided.find(item => item.id === selected.id) : state.userProvided.find(item => item.id === selected.id);
    let json:any = {};
    mapData?.list.forEach( row => {
      let controlId = row.control;
      let actionId = row.action;
      let control = state.controls.find(c => c.id === controlId);
      let action = state.actions.find(e => e.id === actionId);
      if(action && control){
        json[action.name] = {
          keyCombination: [parseInt(control.keys.code)],
          modifiers: control.modifiers.map(modifier => modifier.code),
          when: row.when
        }
      }

    })
    return json;
  }
}

// send data to backend and call applyReducer
export const applyMouseData = createAsyncThunk(
  'settings/applyMouseData',
  async (data:any, {dispatch,getState}) => {

      const {applyID} = data ;
      dispatch(settingsSlice.actions.setApplyItem(applyID))
      let rootState = getState() as RootState;
      let state = rootState.settings;
      let json = getMouseDataJson(state);
      let viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
      setMouseBindings(viewerId,json);
  }
)

// get data from backend and update store
export const fetchMouseData = createAsyncThunk(
  'settings/fetchMouseData',
  async (data, {dispatch, getState}) => {
    let rootState = getState() as RootState;
    let state = rootState.settings;
    let viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    const MouseData:{controls:any [] , actions:any []} = getMouseData(viewerId);
    const SystemMouseData = getSystemMouseMappings(viewerId);
    const control = MouseData.controls;
    const action = MouseData.actions;
    const actions:any[] =[];
    const controls:any[] =[];
    const SystemProvidedData:any[]=[];
    const defaultMouseControl:any[]=[];
    const MenuItem:any[]=[];
    let actioncount = 0;
    let controlcount = 0;
    let systemDataCount = 0;
    let menuItemsconut = 0;
  

// creating default menu 

SystemMouseData.forEach((data)=> {
  
   if(data.default === true) {

    defaultMouseControl.push({id:data.id,list:data.mapping})

   }
  //let itempriority = systemDataCount.toString();
  
  })
    
// creating menu items

SystemMouseData.forEach((data)=> {
menuItemsconut=menuItemsconut+1;
//let itempriority = systemDataCount.toString();
MenuItem.push({id:data.id,selected: false, text: data.name, applied:data.default ?true:false, edit: false, readonly: true, type: Source.SYSTEM })
})

// creating system provided data

SystemMouseData.forEach((data)=>{
  systemDataCount=systemDataCount+1;
  //let itempriority = systemDataCount.toString();
  SystemProvidedData.push({id:data.id,list:data.mapping})
})

action.forEach((data)=>{
  actioncount=actioncount+1;
  let itempriority = actioncount.toString();
  actions.push({id:actioncount.toString(),name:data.name,icon:false,priority:itempriority})
})

control.forEach((data)=> {

  controlcount=controlcount+1;
  let itempriority = controlcount.toString();
  if(data.when == "" ) {
  
  controls.push({id:data.id,keys:data.keys,modifiers:data.modifiers,icon:false,priority:itempriority,when:""})
  }
  else {

  controls.push({id:data.id,keys:data.keys,modifiers:data.modifiers,icon:false,priority:itempriority,when:data.when})
  }
})

dispatch(settingsSlice.actions.setDefaultMouseControl(defaultMouseControl));
dispatch(settingsSlice.actions.setActions(actions));
dispatch(settingsSlice.actions.setControls(controls));
dispatch(settingsSlice.actions.setSystemProvided(SystemProvidedData));
dispatch(settingsSlice.actions.setmenuItems(MenuItem));

  }
)

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {

    setDefaultMouseControl: (state, action: PayloadAction<MouseControlList[]>) => {

      state.defaultMouseControlList = action.payload[0];

    },

    setmenuItems: (state, action: PayloadAction<MenuItem[]>) => {

      state.menuItems = action.payload

    },

    setControls: (state, action: PayloadAction<Control[]>) => {

      state.controls = action.payload;
    },

    setActions: (state, action: PayloadAction<Action[]>) => {

      state.actions = action.payload;
    },

    setSystemProvided :(state, action: PayloadAction<MouseControlList[]>) => {

    state.systemProvided = action.payload;

    },

// set mouse controls only read or edit 
    setControlReadOnly: (state, action: PayloadAction<string>) => {

      state.menuItems.find((item) => {

        if (item.id === action.payload && item.type === Source.SYSTEM) {

          state.isControlReadonly = true;

        }
        else if (item.id === action.payload && item.type === Source.USER)

          state.isControlReadonly = false;

      })

    },

// menulist
    setMenuItemEditable: (state, action: PayloadAction<{ edit: boolean, activeMenuId: string }>) => {

      state.menuItems.map((item) => {

        if (item.id === action.payload.activeMenuId) {

          item.edit = action.payload.edit;
        }

      })

    },

    setMenuItemEditableText: (state, action: PayloadAction<{ text: string, activeMenuId: string }>) => {

      state.menuItems.map((item) => {

        if (item.id === action.payload.activeMenuId) {

          item.text = action.payload.text;

        }

      })

    },

    setMouseControlListReset: (state, action: PayloadAction<boolean>) => {

      state.isResetMouseControlList = action.payload;

    },

    resetControlAction: (state, action: PayloadAction<string>) => {

      state.userProvided.map((item: MouseControlList) => {

        if (item.id === action.payload) {

          item.id = action.payload;
          item.list = JSON.parse(JSON.stringify(state.defaultMouseControlList.list));

        }

      })

      //state.isResetMouseControlList = false;

    },

    addItemToMouseControlsList: (state, action: PayloadAction<{undoable:boolean , activeMenuId:string}>) => {

      const {undoable ,activeMenuId} = action.payload;

      const controlPriority: any[] = [];
      const actionPriority: any[] = [];
      const userPriority: any[] = [];


      state.controls.forEach((item) => {

        controlPriority.push(item.priority);

        if (item.priority != null && item.priority != "") {

          

        }

      })

      state.actions.forEach((item) => {

        actionPriority.push(item.priority);

        if (item.priority != null && item.priority != "") {

        

        }

      })

      state.userProvided.map((item) => {

        if (item.id === activeMenuId) {

          item.list.forEach((list) => {

            userPriority.push(list.priority);

          })
        }
      })

      const controlPriorityCompare = controlPriority.filter(val => !userPriority.includes(val));
      const controlHigherpriority = Math.min.apply(null, controlPriorityCompare);
      const actionPriorityCompare = actionPriority.filter(val => !userPriority.includes(val));
      const actionHigherpriority = Math.min.apply(null, actionPriorityCompare);


      const getControlText = (priority: string) => {

        let controlId: string = '';

        state.controls.map((item: Control) => {

          if (item.priority === priority) {

            controlId = item.id
          }

        })

        return controlId;

      }

      const getActionText = (priority: string) => {

        let actionId: string = '';

        state.actions.map((item: Action) => {

          if (item.priority === priority) {

            actionId = item.id
          }

        })

        return actionId;

      }

      const controlTextId = getControlText(controlHigherpriority.toString());
      const actionTextId = getActionText(actionHigherpriority.toString());

      state.userProvided.map((item) => {

        if (item.list.length <= 5) {
          if (item.id === activeMenuId) {

            let newRowpriority: any = '';

            state.controls.forEach((item) => {

              if (item.id === controlTextId) {

                newRowpriority = item.priority
              }
            })


            const newRowId = (item.list.length + 1).toString();
            const addNewRow = { id: newRowId, control: controlTextId, action: actionTextId, priority: newRowpriority }

            item.list = [...item.list, addNewRow]

            if(undoable) {

              undoStack.add({
      
                undo:{reducer:undoAddItemToMouseControlsList,payload:{newRowId , activeMenuId}},
                redo:{reducer:redoAddItemToMouseControlsList,payload:{newRowId,controlTextId,actionTextId,newRowpriority,activeMenuId}}
              })
            }

          }

        }
        else {


        }

      })


      setItemSave(true);

    },

    redoAddItemToMouseControlsList:(state,action:PayloadAction<{newRowId:string,controlTextId:string,actionTextId:string,newRowpriority:string,activeMenuId:string}>) => {


      const {newRowId,controlTextId,actionTextId,newRowpriority,activeMenuId} = action.payload;

      state.userProvided.forEach((item) => {

         if(item.id === activeMenuId ) {


            const addRow = { id: newRowId, control: controlTextId, action: actionTextId, priority: newRowpriority }

            item.list = [...item.list, addRow]

         }


      })

      setItemSave(true);


    },

    undoAddItemToMouseControlsList:(state ,action:PayloadAction<{newRowId:string , activeMenuId:string}>) => {

      const {newRowId , activeMenuId} = action.payload;
      state.userProvided.map((item: MouseControlList) => {

        if (item.id === activeMenuId) {

          item.list.forEach((listItem: MouseControlListItem) => {

            if (listItem.id === newRowId) {

              var index = item.list.findIndex(listItem => listItem.id === newRowId);

              item.list.splice(index, 1);

            }

          })

        }

      })

      setItemSave(true);

    },

    deleteItemToMouseControlList: (state, action: PayloadAction<{undoable:boolean,rowId: string, activeMenuId: string }>) => {

     const {undoable , rowId ,activeMenuId } = action.payload;

     var controlID:string = '';
     var actionID:string = '';
     var rowID:string = rowId;
     var rowPriority:string = '';
     var deleteItemIndex:any='';

      state.userProvided.map((item: MouseControlList) => {

        if (item.id === action.payload.activeMenuId) {

          item.list.forEach((listItem: MouseControlListItem) => {

            if (listItem.id === action.payload.rowId) {

              controlID = listItem.control;
              actionID = listItem.action;
              rowPriority = listItem.priority;
              deleteItemIndex = item.list.findIndex(listItem => listItem.id === action.payload.rowId);

              item.list.splice(deleteItemIndex, 1);

            }

          })

        }

      })

      if(undoable) {

        undoStack.add({

          undo:{reducer:undoDeleteItemToMouseControlList,payload:{rowId,controlID,actionID,rowPriority,activeMenuId,deleteItemIndex}},
          redo:{reducer:deleteItemToMouseControlList,payload:{undoable:false,rowId,activeMenuId}}
        })
      }

      setItemSave(true);

    },

    undoDeleteItemToMouseControlList:(state,action:PayloadAction<{rowId:string,controlID:string,actionID:string,rowPriority:string,activeMenuId:string,deleteItemIndex:number}>) => {

      const {rowId,controlID,actionID,rowPriority,activeMenuId,deleteItemIndex} = action.payload;

      state.userProvided.forEach((item) => {

         if(item.id === activeMenuId ) {

            const addRow = { id: rowId, control: controlID, action: actionID, priority: rowPriority }

            item.list = [...item.list]
            item.list.splice(deleteItemIndex,0,addRow);

         }


      })

      setItemSave(true);

    },

    setUserControls: (state, action: PayloadAction<{ controlItemId: string, rowId: string, activeMenuId: string }>) => {

      const updateControls = (item: MouseControlListItem[]) => {

        item.forEach((item) => {

          if (item.id == action.payload.rowId) {

            item.control = action.payload.controlItemId;

          }
        })


      }


      state.userProvided.map((item: MouseControlList) => {

        if (item.id === action.payload.activeMenuId) {

          updateControls(item.list);

        }

      })

    },

    setUserActions: (state, action: PayloadAction<{ actionItemId: string, rowId: string, activeMenuId: string }>) => {

      const updateActions = (item: MouseControlListItem[]) => {

        item.forEach((item) => {

          if (item.id == action.payload.rowId) {

            item.action = action.payload.actionItemId;

          }
        })


      }


      state.userProvided.map((item: MouseControlList) => {

        if (item.id === action.payload.activeMenuId) {

          updateActions(item.list);

        }

      })


    },

    setSlidervalue: (state, action: PayloadAction<number>) => {

      state.Slidervalue = action.payload
    },

    setSelectedItem: (state, action: PayloadAction<{ id: string, isSelected: boolean }>) => {


      state.menuItems.forEach((item: MenuItem) => {

        if (item.id === action.payload.id) {

          item.selected = action.payload.isSelected;

        }
        else {

          item.selected = false
        }

      })


    },

    setSelectedMouseControl:(state,action:PayloadAction<{ id:string, isSelected: boolean }>)=> {


      state.menuItems.forEach((item: MenuItem) => {

        if (item.id === action.payload.id) {

          item.selected = action.payload.isSelected;

        }
        else {

          item.selected = false
        }

      })

    },

    setSelectedThemeItem: (state, action: PayloadAction<{ id: string, isSelected: boolean }>) => {

      state.themes.forEach((item: Theme) => {

        if (item.id === action.payload.id) {

          item.selected = action.payload.isSelected

        }
        else {

          item.selected = false
        }
      })


    },

    setThemeApply: (state) => {

      state.themes.forEach((item: Theme) => {

        if (item.selected === true) {

          item.applied = true
          item.selected = false // 

          state.activeTheme = item.id;
        }
        else {

          item.applied = false

        }
      })

    },

    // Mouse Controls list page reducers 

    setApplyItem: (state ,action:PayloadAction<any>) => {

      const applyID:string = action.payload ;
      state.menuItems.forEach((item: MenuItem) => {

        if (item.id === applyID ) {

          item.applied = true ;
          item.selected = false ;
        }
        else {

          item.applied = false;

        }

      })

    },

    addItemToMenuItems: (state ,action:PayloadAction<{undoable:boolean}>) => {

      const undoable = action.payload.undoable;

        state.idGenerator += 1;
        state.userLabelId += 1;

      // add item into menulist
      state.menuItems = [...state.menuItems, {
        id: state.idGenerator.toString(),
        selected: false,
        text: `User ${state.userLabelId}`,
        applied: false,
        edit: false,
        readonly: false,
        type: Source.USER
      }]

      // add item into userprovidedList

      state.userProvided = [...state.userProvided, {
        id: state.idGenerator.toString(),
        list: JSON.parse(JSON.stringify(state.defaultMouseControlList.list)),

      }]


      if(undoable) {

         undoStack.add(
           {
             undo:{reducer:deleteItem,payload:{id:state.idGenerator.toString(),undoable:false}},
             redo:{reducer:redoAddItemToMenuItems,payload:{userID:state.idGenerator.toString(),labelText:`User ${state.userLabelId}`}}
           }
         )

      }

    },

    redoAddItemToMenuItems:(state , action:PayloadAction<{userID:string,labelText:string}>) =>{

      const {userID,labelText} = action.payload ;

            // add item into menulist
            state.menuItems = [...state.menuItems, {
              id: userID,
              selected: false,
              text: labelText,
              applied: false,
              edit: false,
              readonly: false,
              type: Source.USER
            }]
      
            // add item into userprovidedList
      
            state.userProvided = [...state.userProvided, {
              id: userID ,
              list: JSON.parse(JSON.stringify(state.defaultMouseControlList.list)),
      
            }]

    },

    pasteItem: (state, action: PayloadAction<{id:string,undoable:boolean}>) => {

      const undoable = action.payload.undoable;

      state.idGenerator += 1;

      state.menuItems.map((item) => {

        if (item.id === action.payload.id) {

          state.menuItems = [...state.menuItems, {
            id: state.idGenerator.toString(),
            selected: false,
            text: item.text + '' + 'Copy',
            applied: false,
            edit: false,
            readonly: false,
            type: Source.USER
          }]
        }

      });

      state.userProvided.forEach((item)=>{

        if(item.id === action.payload.id) {
          state.userProvided = [...state.userProvided, {
            id:state.idGenerator.toString(),
            list: item.list,
          }]

        }

      })

      if(undoable) {

        undoStack.add({

          undo:{reducer:deleteItem,payload:{id:state.idGenerator}},
          redo:{reducer:pasteItem,payload:{id:action.payload.id}}
        })
      }

    },

    deleteItem: (state, action: PayloadAction<{id:string,undoable:boolean}>) => {

      const undoable = action.payload.undoable;
      var deletedItemID:string = action.payload.id;
      var deletedItemLabel:string = '';
      var deletedItemIndex:number = state.menuItems.findIndex(item=>item.id === action.payload.id);

      state.menuItems.forEach((item)=>{

        if(item.id === action.payload.id) {

          deletedItemLabel = item.text ;

        }

      })

      state.menuItems.splice(state.menuItems.findIndex(item => item.id === action.payload.id), 1);
      state.copyItem = false;

      if(undoable) {

        undoStack.add({

          undo:{reducer:undoDeleteItem,payload:{itemindex:deletedItemIndex,itemid:deletedItemID,itemLabel:deletedItemLabel}},
          redo:{reducer:deleteItem,payload:{id:action.payload.id}}
        })
      }

    },

    undoDeleteItem :(state , action:PayloadAction<{itemindex:number ,itemid:string,itemLabel:string}>) => {

      const { itemid ,itemindex,itemLabel} = action.payload;

      const oldData = {
        id:itemid ,
        selected: false,
        text:itemLabel ,
        applied: false,
        edit: false,
        readonly: false,
        type: Source.USER
      }

      state.menuItems = [...state.menuItems];

      state.menuItems.splice(itemindex , 0 , oldData);

      // add item into userprovidedList

      state.userProvided.forEach((item)=> {

        if(item.id === itemid) {

          let userData = [...state.userProvided ];

          userData.splice(itemindex,0,{
            id:itemid,
            list: item.list,
          })

          // state.userProvided = [...state.userProvided, {
          //   id:itemid,
          //   list: item.list,
          // }]

        }

      })
    },

    setItemSave: (state, action: PayloadAction<boolean>) => {

      state.isItemSave = action.payload;

    },

    setcopyItem: (state, action: PayloadAction<boolean>) => {

      state.copyItem = action.payload
    },
    setcurrentPage: (state, action: PayloadAction<string>) => {

      state.currentPage = action.payload
    }
  },

});

//Define the Reducers  

export const {
  setThemeApply,
  setmenuItems,
  setSlidervalue,
  setSelectedThemeItem,
  setSelectedItem,
  setSelectedMouseControl,
  setControlReadOnly,
  addItemToMenuItems,
  redoAddItemToMenuItems,
  addItemToMouseControlsList,
  undoAddItemToMouseControlsList,
  redoAddItemToMouseControlsList,
  deleteItemToMouseControlList,
  undoDeleteItemToMouseControlList,
  resetControlAction,
  setUserControls,
  setUserActions,
  setcopyItem,
  pasteItem,
  deleteItem,
  undoDeleteItem,
  setcurrentPage,
  setItemSave,
  setMouseControlListReset,
  setMenuItemEditable,
  setMenuItemEditableText

} = settingsSlice.actions;

//Define the Selector

//export const selectisMenuItemSelected = (state:RootState) => state.settings.isMenuItemSelected;
export const selectmenuItems = (state: RootState) => state.settings.menuItems;
export const selectThems = (state: RootState) => state.settings.themes;
export const selectActiveTheme = (state: RootState) => state.settings.activeTheme;
export const selectisResetMouseControlList = (state: RootState) => state.settings.isResetMouseControlList;
export const selectdefaultMouseControlList = (state: RootState) => state.settings.defaultMouseControlList;

export const selectIsControlReadOnly = (state: RootState) => state.settings.isControlReadonly;

export const selectSystemProvided = (state: RootState) => state.settings.systemProvided;
export const selectUserProvided = (state: RootState) => state.settings.userProvided;
export const selectcontrols = (state: RootState) => state.settings.controls;
export const selectactions = (state: RootState) => state.settings.actions;

export const selectSlidervalue = (state: RootState) => state.settings.Slidervalue;
export const selectIdGenerator = (state: RootState) => state.settings.idGenerator;
export const selectcopyItem = (state: RootState) => state.settings.copyItem;
export const selectcurrentPage = (state: RootState) => state.settings.currentPage;

export const selectActiveMenuId = (state: RootState) => {


  const selectedItems = state.settings.menuItems.filter((item) => {

    return item.selected === true

  })

  if (selectedItems.length === 1) {

    return selectedItems[0].id

  }
  else {

    return -1
  }


}

export const selectItemSaved = (state: RootState) => state.settings.isItemSave;

export default settingsSlice.reducer;