import { PayloadAction } from "@reduxjs/toolkit";
import {TreeNode} from "../../shared/Tree/types";

export enum LabelMode {
    EDIT,
    VIEW
}

export enum LabelType {
    LABEL2D = "LABEL2D",
    LABEL3D = "LABEL3D",
    MEASUREMENT = "MEASUREMENT",
}

export enum Label2DType {
    DEFAULT = 'DEFAULT'
}

export enum Label3DType {
    ANNOTATION = "ANNOTATION", 
    MINMAX = "MINMAX", 
    PROBE = "PROBE",
    DISTANCE = "DISTANCE", 
    ARC = "ARC", 
    EDGE = "EDGE", 
    FACE = "FACE"
}

export interface ILabel extends TreeNode {
    label: string,
    pos: [number, number],
    labelType: LabelType,
    bgColor:string,
    anchor?: [number,number],
    type?: Label3DType,
}

export interface Label2D extends ILabel {
}

export interface Label3D extends ILabel {
    anchor: [number,number],
    probeData: any,
    type: Label3DType,
}


export type LabelSettings = {
    mode: LabelMode
}
