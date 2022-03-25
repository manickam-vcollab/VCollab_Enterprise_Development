import { PayloadAction } from "@reduxjs/toolkit";
import {LabelMode, LabelSettings} from "./types";

export const setLabelModeReducer = (state:LabelSettings, action:PayloadAction<LabelMode>) => {
    state.mode = action.payload;
}