import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type SnackbarMessage = {
    message: string ;
    severity: string | undefined;
    key: number;
  }

export enum MsgSeverity {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success"
}

// Define a type for the slice state
type toastState = {
   messageInfo: SnackbarMessage | undefined,
   open:boolean
}

// Define the initial state using that type
const initialState: toastState = {
    messageInfo: undefined,
    open: false
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setOpen: (state, action:PayloadAction<{isOpen:boolean}>) => {
        state.open = action.payload.isOpen;
    },
    clearMsg: (state) => {
        state.messageInfo = undefined;
    },
    toastMsg: (state, action: PayloadAction<{msg:string,severity?:MsgSeverity | undefined}>) => {
        state.messageInfo = { message: action.payload.msg, key: new Date().getTime() ,severity: action.payload.severity};
        state.open = true;
    }
  },
});

//Define the Reducers
export const { toastMsg, clearMsg, setOpen } = toastSlice.actions;

//Define selector
export const selectMsg = (state: RootState) => state.toast.messageInfo;
export const selectOpen = (state:RootState) => state.toast.open;

export default toastSlice.reducer;