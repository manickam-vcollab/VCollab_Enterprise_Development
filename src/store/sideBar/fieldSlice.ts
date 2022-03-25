import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDisplayResult } from '../../backend/viewerAPIProxy';
import type { RootState } from '../index';
import {ITreeNode, ITreeNodeState} from '../../components/shared/RsTreeWithSearch';
import { expandNodeReducer, selectNodeReducer, addNodeReducer, deleteNodeReducer, toggleVisibilityReducer } from './shared/Tree/reducers';
import { addColorMap, Colormap } from './colormapSlice';

type FieldState = {
    data: FieldData,
    defaultSelection: {
        variableIds: string[],
        stepIds: string[],
        derivedIds: string[],
        sectionIds: string[]
    }
}

export enum Source {
    SYSTEM,
    USER
}

export enum FieldType {
    Variable,
    Step,
    Derived,
    Section
}

export interface Field extends ITreeNode {
    source:Source
}
export interface Variable extends Field {
    derivedIds: string[],
    sectionIds: string[]
}

export interface Step extends Field {
    varibleIds: string[]
}

export interface DerivedType extends Field {
    
}

export interface Sections extends Field {

}

type FieldData = {
    idGenerator: number,
    variables: {[id:string]:Variable},
    variablesRoot: string[],
    stepsAndSubCases: {[id:string]:Step},
    stepsAndSubCasesRoot: string[],
    derivedTypes: {[id:string]:DerivedType},
    derivedTypesRoot: string[],
    sections: {[id:string]:Sections},
    sectionsRoot: string[]

}

export const getDependantVariableIds = (
    steps:{[id:string]:Step},
    selectedStepIds:string[]): string[] => 
{
    let out:string[] = [];
    let selected = selectedStepIds.map(e => steps[e]);
    selected.forEach(s => {
        out = [...out,...s.varibleIds];
    });
    return out;
}

export const getDependantStepIds = (
    steps:{[id:string]:Step}, 
    selectedVariableIds:string[]): string[] => {
    
    let out:string[] = [];
    Object.values(steps).forEach(step => {
        selectedVariableIds.forEach(e => {
            if(step.varibleIds.includes(e)){
                out.push(step.id);
            }
        })
    })
    return out;

}

export const getDependantDerivedTypeIds = (
    variables:{[id:string]:Variable}, 
    selectedVariableIds:string[]): string[] => {
    let out:string[] = [];
    let selected = selectedVariableIds.map(e => variables[e]);
    selected.forEach(s => {
        out = [...out,...s.derivedIds];
    });
    return out;
}

export const getDependantSectionIds = (
    variables:{[id:string]:Variable},
    selectedVariableIds:string[]
): string[] => {
    let out:string[] = []
    let selected = selectedVariableIds.map(e => variables[e]);
    selected.forEach(s => {
        out = [...out,...s.sectionIds];
    });
    return out;
}

export const fetchFieldData = createAsyncThunk(
    "fieldSlice/fetchFieldData",
    async (data:{data:string},{dispatch,getState}) => {
       let root = (getState() as RootState)
       let viewerId = root.app.viewers[root.app.activeViewer || ""];
       let r = getDisplayResult(viewerId);
       dispatch(setFieldData({data:{}}))
       let selection = (getState() as RootState).field.defaultSelection;
       dispatch(addColorMap({
           modelName: "bracket",
           data: {
               title: "System",
               variableId: selection.variableIds.length > 0 ? selection.variableIds[0] : "-1",
               derivedId: selection.derivedIds.length > 0 ? selection.derivedIds[0] : "-1",
               stepId: selection.stepIds.length > 0 ? selection.stepIds[0] : "-1",
               sectionId: selection.sectionIds.length > 0 ? selection.sectionIds[0] : "-1",
               
           }
       }))
       dispatch(addColorMap({
        modelName: "head",
        data: {
            title: "System",
            variableId: "v21",
            derivedId: "d21",
            stepId: "s21",
            sectionId: "-1",
            
        }
    }))
       if(r instanceof Object) {
            return Promise.resolve(r); 
       }
       else {
           return Promise.reject("unable to fetch field data")
       }
    }
  )

const initialState : FieldState = {
    data: {
        idGenerator: 1000,
        variables: {},
        variablesRoot: [],
        stepsAndSubCases: {},
        stepsAndSubCasesRoot: [],
        derivedTypes: {},
        derivedTypesRoot: [],
        sections: {
            "0" : {
                id: "0",
                pid: "-1",
                source: Source.SYSTEM,
                children: ["01","02"],
                title: "Shell",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "01" : {
                id: "01",
                pid: "0",
                source: Source.SYSTEM,
                children: [],
                title: "Top",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "02" : {
                id: "02",
                pid: "0",
                source: Source.SYSTEM,
                children: [],
                title: "Bottom",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "1" : {
                id: "1",
                pid: "-1",
                source: Source.SYSTEM,
                children: ["11","12"],
                title: "Aggregates",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "11" : {
                id: "11",
                pid: "1",
                source: Source.SYSTEM,
                children: [],
                title: "Top",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "12" : {
                id: "12",
                pid: "1",
                source: Source.SYSTEM,
                children: [],
                title: "Bottom",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
        },
        sectionsRoot: ["0" , "1"]
    },
    defaultSelection: {
        variableIds: [],
        stepIds: [],
        derivedIds: [],
        sectionIds:[]
    }
}

export const addUserFieldState = createAsyncThunk(
    "fieldSlice/setNodeState",
    async (data:{fieldType:FieldType}, {dispatch,getState}) => {
        dispatch(fieldSlice.actions.incrementId());
        let state = (getState() as RootState ).field
        let id = state.data.idGenerator.toString();
            let user =  {
                id,
                title: "User Defined " + id,
                children: [],
                pid: "userDefined",
                state: {expanded:true, selected:false},
                source: Source.USER
            }
        switch (data.fieldType) {
            case FieldType.Variable:
                dispatch(addUserVariable({userVariable:{...user,derivedIds:[],sectionIds:[]}}))
                break;
            case FieldType.Step:
                dispatch(addUserStepsAndSubcase({userStepAndSubcase:{...user,varibleIds:[]}}))
                break;
            case FieldType.Derived:
                dispatch(addUserDerivedType({userDerived:user}))
                break;
            case FieldType.Section:
                dispatch(addUserSection({userSection:user}))
                break;
            default:
                break;
        }
    }
) 
export const fieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {
        incrementId: (state:FieldState) => {
            state.data.idGenerator+=1;
        },
        setFieldData: (state:FieldState, action:PayloadAction<{data:any}>) => {
            //temporarily done here, should come from api
            const traverse = (data:any,pid:string,cbk:(treeNode:any,pid:string)=>void) => {
                cbk(data,pid);
                if(data.children) {
                    data.children.forEach((c:any) => {
                        traverse(c,data.id,cbk);
                    })
                }
            }
            let derived = [
                {
                    id: "d1",
                    title: "Vector",
                    children: [
                        {
                            id: "d11",
                            title: "X Component",
                            children: []
                        },
                        {
                            id: "d12",
                            title: "Y Component",
                            children: []
                        },
                        {
                            id: "d13",
                            title: "Z Component",
                            children: []
                        },
                        {
                            id: "d14",
                            title: "Magnitude",
                            children: []
                        },
                    ]
                },
                {
                    id: "d2",
                    title: "Stress Tensor",
                    children: [
                        {
                            id: "d21",
                            title: "Normal stress",
                            children: []
                        },
                        {
                            id: "d22",
                            title: "Shear stress",
                            children: []
                        },
                        {
                            id: "d23",
                            title: "Tensor Mean",
                            children: []
                        }
                    ]
                }
            ]
            let variables = [
                {
                    id: "v1",
                    title: "Input",
                    children: [
                        {
                            id: "v11",
                            title: "Material ID",
                            children:[],
                            derivedIds: ["d14"]
                        }
                    ],
                    derivedIds: [],
                    sectionIds: []
                },
                {
                    id: "v2",
                    title: "Result",
                    children: [
                        {
                            id: "v21",
                            title: "Displacement",
                            children: [],
                            derivedIds: ["d14"],
                            sectionIds: ["01"]
                        },
                        {
                            id: "v22",
                            title: "Stress",
                            children: [],
                            derivedIds: ["d2"],
                            sectionIds: []
                        }
                    ],
                    derivedIds: [],
                    sectionIds: []
                }
            ];
            let steps = [
                {
                    id: "s1",
                    title:"Subcase 1: Modal Transient",
                    children: [
                        {
                            id: "s11",
                            title: "Time: 01",
                            children: [],
                            variableIds: ["v11", "v21"]
                        }, 
                        {
                            id: "s12",
                            title:  "Time: 02",
                            children: [],
                            variableIds: ["v21"]
                        }],
                    variableIds:[]
                },
                {
                    id: "s2",
                    title:"Subcase 2: Modal Frequency",
                    children: [
                        {
                            id: "s21",
                            title: "Time: 01",
                            children: [],
                            variableIds: ["v11", "v22"]
                        }, 
                        {
                            id: "s22",
                            title:  "Time: 02",
                            children: [],
                            variableIds: ["v11", "v22"]
                        }],
                    variableIds:[]
                },
            ]
            let derivedNodes:{[id:string]:DerivedType} = {};
            let derivedRoots:string[]  = [];
            derived.forEach((e:any) => {
                derivedRoots.push(e.id);
                traverse(e,"-1",(node,pid) => {
                    derivedNodes[node.id] = {
                        id: node.id,
                        pid: pid,
                        title: node.title,
                        children: node.children.map((c:any) => c.id),
                        source: Source.SYSTEM,
                        state: {
                            expanded: true,
                            selected: false,
                            visibility: true
                        }
                    }
                });
            });
            let stepNodes: {[id:string]:Step} = {};
            let stepRoots:string[]  = [];
            steps.forEach((e:any) => {
                stepRoots.push(e.id);
                traverse(e,"-1",(node,pid) => {
                    stepNodes[node.id] = {
                        id: node.id,
                        pid: pid,
                        title: node.title,
                        children: node.children.map((c:any) => c.id),
                        source: Source.SYSTEM,
                        state: {
                            expanded: true,
                            selected: false,
                            visibility: true
                        },
                        varibleIds: node.variableIds
                    }
                });
            });
            let variableNodes: {[id:string]:Variable} = {};
            let variableRoots:string[] = [];
            variables.forEach((e:any) => {
                variableRoots.push(e.id);
                traverse(e,"-1",(node,pid) => {
                    variableNodes[node.id] = {
                        id: node.id,
                        pid: pid,
                        title: node.title,
                        children: node.children.map((c:any) => c.id),
                        source: Source.SYSTEM,
                        state: {
                            expanded: true,
                            selected: false,
                            visibility: true
                        },
                        derivedIds: node.derivedIds,
                        sectionIds: []
                    }
                });
            });
            state.data.variables = variableNodes;
            state.data.variablesRoot = variableRoots;
            state.data.derivedTypes = derivedNodes;
            state.data.derivedTypesRoot = derivedRoots;
            state.data.stepsAndSubCases = stepNodes;
            state.data.stepsAndSubCasesRoot = stepRoots;

            state.defaultSelection.stepIds = ["s11"];
            state.defaultSelection.variableIds = ["v11"];
            state.defaultSelection.derivedIds = ["d11"];
            state.defaultSelection.sectionIds = ["01"];

            fieldSlice.caseReducers.setSelectStepsAndSubcase(state, {
                payload: {
                    leafOnly: true,
                    nodeId: state.defaultSelection.stepIds[0]
                },
                type: "fieldSlice/setSelectStepsAndSubcase"
            })
            fieldSlice.caseReducers.setSelectVariable(state, {
                payload: {
                    leafOnly: true,
                    nodeId: state.defaultSelection.variableIds[0]
                },
                type: "fieldSlice/setSelectVariable"
            })
            fieldSlice.caseReducers.setSelectDerivedTypes(state, {
                payload: {
                    leafOnly: true,
                    nodeId: state.defaultSelection.derivedIds[0]
                },
                type: "fieldSlice/setSelectDerivedTypes"
            })
            fieldSlice.caseReducers.setSelectSection(state, {
                payload: {
                    leafOnly: true,
                    nodeId: state.defaultSelection.sectionIds[0]
                },
                type: "fieldSlice/setSelectSection"
            })

        },
        //variables
        expandVariable: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
           expandNodeReducer({data:state.data.variables, rootIds: state.data.variablesRoot},action)
        },
        setSelectVariable: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
           selectNodeReducer({data:state.data.variables, rootIds: state.data.variablesRoot},action)
        },
        setVisibleVariable: (state:FieldState, action:PayloadAction<{nodeId:string, toShow:boolean}>) => {
            toggleVisibilityReducer({data:state.data.variables,rootIds:state.data.variablesRoot},action);
        },
        addUserVariable: (state:FieldState, action:PayloadAction<{userVariable:Variable}>) => {

            if(state.data.variables["userDefined"] === undefined) {
                addNodeReducer({data:state.data.variables,rootIds:state.data.variablesRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserVariable"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.variables,rootIds:state.data.variablesRoot},
                {payload: action.payload.userVariable,
                    type: "fieldSlice/addUserVariable"
                })
            
            
        },
        removeUserVariable: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.variables,
                rootIds:state.data.variablesRoot
            },
            action
            );    
        },

        //derived types
        expandDerivedTypes: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
           return expandNodeReducer({data:state.data.derivedTypes, rootIds: state.data.derivedTypesRoot},action)
        },
        setSelectDerivedTypes: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
            return selectNodeReducer({data:state.data.derivedTypes, rootIds: state.data.derivedTypesRoot},action)
        },
        setVisibleDerivedTypes: (state:FieldState, action:PayloadAction<{nodeId:string, toShow:boolean}>) => {
            toggleVisibilityReducer({data:state.data.derivedTypes,rootIds:state.data.derivedTypesRoot},action);
        },
        addUserDerivedType: (state:FieldState, action:PayloadAction<{userDerived:DerivedType}>) => {
            if(state.data.derivedTypes["userDefined"] === undefined) {
                addNodeReducer({data:state.data.derivedTypes,rootIds:state.data.derivedTypesRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserDerivedType"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.derivedTypes,rootIds:state.data.derivedTypesRoot},
                {payload: action.payload.userDerived,
                    type: "fieldSlice/addUserDerivedType"
                })
        },
        removeUserDerivedType: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.derivedTypes,
                rootIds:state.data.derivedTypesRoot
            },
            action
            );    
        },
        //subcase and steps
        expandStepsAndSubcase: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
            return expandNodeReducer({data:state.data.stepsAndSubCases, rootIds: state.data.stepsAndSubCasesRoot},action)
         },
        setSelectStepsAndSubcase: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
            return selectNodeReducer({data:state.data.stepsAndSubCases, rootIds: state.data.stepsAndSubCasesRoot},action)
        },
        setVisibleStepsAndSubcase: (state:FieldState, action:PayloadAction<{nodeId:string, toShow:boolean}>) => {
            toggleVisibilityReducer({data:state.data.stepsAndSubCases,rootIds:state.data.stepsAndSubCasesRoot},action);
        },
        addUserStepsAndSubcase: (state:FieldState, action:PayloadAction<{userStepAndSubcase:Step}>) => {
            if(state.data.stepsAndSubCases["userDefined"] === undefined) {
                addNodeReducer({data:state.data.stepsAndSubCases,rootIds:state.data.stepsAndSubCasesRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserStepsAndSubcase"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.stepsAndSubCases,rootIds:state.data.stepsAndSubCasesRoot},
                {payload: action.payload.userStepAndSubcase,
                    type: "fieldSlice/addUserStepsAndSubcase"
                })
        },
        removeUserStepsAndSubcase: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.stepsAndSubCases,
                rootIds:state.data.stepsAndSubCasesRoot
            },
            action
            );    
        },
        //section & layers
        expandSection: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
            return expandNodeReducer({data:state.data.sections, rootIds: state.data.sectionsRoot},action)
         },
        setSelectSection: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
            return selectNodeReducer({data:state.data.sections, rootIds: state.data.sectionsRoot},action)
        },
        setVisibleSection: (state:FieldState, action:PayloadAction<{nodeId:string, toShow:boolean}>) => {
            toggleVisibilityReducer({data:state.data.sections,rootIds:state.data.sectionsRoot},action);
        },
        addUserSection: (state:FieldState, action:PayloadAction<{userSection:Sections}>) => {
            if(state.data.sections["userDefined"] === undefined) {
                addNodeReducer({data:state.data.sections,rootIds:state.data.sectionsRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserSection"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.sections,rootIds:state.data.sectionsRoot},
                {payload: action.payload.userSection,
                    type: "fieldSlice/addUserSection"
                })
        },
        removeUserSection: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.sections,
                rootIds:state.data.sectionsRoot
            },
            action
            );    
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchFieldData.fulfilled, (state:FieldState, action:PayloadAction<any>) => {
            //let result = action.payload
            // if(result) {
            //     state.data.variables = {...result.variables, source: Source.SYSTEM};
            //     state.data.steps = {...result.stepVariables, source: Source.SYSTEM};
            //     state.data.derivedTypes = {...result.derivedTypes, source: Source.SYSTEM};
            // }
        })
    }
})
export const {
    setFieldData,

    expandVariable, 
    setSelectVariable,
    setVisibleVariable,
    addUserVariable, 
    removeUserVariable,
    
    expandStepsAndSubcase,
    setSelectStepsAndSubcase,
    setVisibleStepsAndSubcase,
    addUserStepsAndSubcase,
    removeUserStepsAndSubcase,

    expandDerivedTypes,
    setSelectDerivedTypes,
    setVisibleDerivedTypes,
    addUserDerivedType,
    removeUserDerivedType,

    expandSection,
    setSelectSection,
    setVisibleSection,
    addUserSection,
    removeUserSection
} = fieldSlice.actions;
// selectors
export const selectVariables = (root:RootState) => (root.field.data.variables)
export const getSelectedVariableIds = (root:RootState) => {
    let steps = root.field.data.variables;
    return Object.values(steps).filter(e => e.state.selected).map(e => e.id)
}
export const selectSteps = (root:RootState) => root.field.data.stepsAndSubCases
export const getSelectedStepIds = (root:RootState) => {
    let steps = root.field.data.stepsAndSubCases;
    return Object.values(steps).filter(e => e.state.selected).map(e => e.id)
}
export const selectDerivedTypes = (root:RootState) => root.field.data.derivedTypes
export const getSelectedDerivedTypeIds = (root:RootState) => {
    let steps = root.field.data.derivedTypes;
    return Object.values(steps).filter(e => e.state.selected).map(e => e.id)
}
export const selectSections = (root:RootState) => root.field.data.sections
export default fieldSlice.reducer;