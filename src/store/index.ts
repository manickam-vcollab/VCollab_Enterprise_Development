import { configureStore,combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import appSlice from './appSlice';
import toastSlice from "./toastSlice";
import productTreeSlice from './sideBar/productTreeSlice';
import fieldSlice from './sideBar/fieldSlice';
import displayModesSlice from './sideBar/displayModesSlice';
import clipSlice from './sideBar/clipSlice';
import colormapSlice from './sideBar/colormapSlice';
import probeSlice from './probeSlice';
import mainMenuSlice  from './mainMenuSlice';
import sceneSlice from './sideBar/sceneSlice';
import materialColorSlice from './sideBar/materialColorSlice';
import settingSlice from './sideBar/settings'
import messageSlice from './sideBar/messageSlice';
import windowMgrSlice from './windowMgrSlice';
import labelAllSlice from './sideBar/labelSlice/labelAllSlice';
import slideSlice from './sideBar/slideSlice';
import moreSlice from './moreSlice';

export const history = createHashHistory({
  hashType: 'slash',
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});
const store = configureStore({
    reducer: combineReducers({
        router: connectRouter(history),
        app: appSlice,
        mainMenu: mainMenuSlice,
        scene: sceneSlice,
        materialColor: materialColorSlice,
        field: fieldSlice,
        clipPlane: clipSlice,
        productTree: productTreeSlice,
        probe: probeSlice,
        displayModes: displayModesSlice,
        toast: toastSlice,
        settings: settingSlice,
        message: messageSlice,
        windowMgr: windowMgrSlice,
        labelAll: labelAllSlice,
        colormap : colormapSlice,
        slide : slideSlice,
        more: moreSlice
      }),
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['router']
      }
    }).concat(routerMiddleware(history))
});


export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


