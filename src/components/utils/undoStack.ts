type Payload = {reducer:any, payload:any};
type Data = {undo: Payload | Function, redo: Payload | Function};
type Function = () => void;
export enum UndoEvents {
    UPDATE = 'UPDATE'
}
class UndoStack {
    private data: Data[]
    private stackPointer: number;
    private listeners: Map<UndoEvents, (e:any) => void>;
    constructor() {
        this.data = [];
        this.stackPointer = -1;
        this.listeners = new Map();
    }
    public add(data: Data){
        if(this.data.length > 0 && this.stackPointer < this.data.length-1 ){
            this.data.splice(this.stackPointer+1,this.data.length-this.stackPointer+1);
        }
        this.data.push(data);
        this.stackPointer +=1;
        const cbk = this.listeners.get(UndoEvents.UPDATE);
        if(cbk){
            cbk({})
        }
    }
    public undo(dispatch:any){
        
        if(this.stackPointer >= 0) {
            const {undo} = this.data[this.stackPointer];

            if( (typeof undo) === "object"){
                let X = undo as Payload;
                dispatch(X.reducer(X.payload));
            }
            else {
                let X = undo as Function;
                X();
            }

            this.stackPointer -=1;
        }
        const cbk = this.listeners.get(UndoEvents.UPDATE);
        if(cbk){
            cbk({})
        }
    }
    public redo(dispatch:any){
        this.stackPointer +=1;
        if(this.stackPointer < this.data.length) {
            const {redo} = this.data[this.stackPointer];
            if( (typeof redo) === "object"){
                let X = redo as Payload;
                dispatch(X.reducer(X.payload));
            }
            else {
                let X = redo as Function;
                X();
            }
        }
        else{
            this.stackPointer -=1;
        }
        const cbk = this.listeners.get(UndoEvents.UPDATE);
        if(cbk){
            cbk({})
        }
    } 
    public isUndoable():boolean{
        return this.stackPointer > -1
    }
    public isRedoable():boolean{
        return this.stackPointer < this.data.length -1 && this.data.length > 0
    } 
    public addEventListener(name:UndoEvents, cbk: (e:any) => void) {
        this.listeners.set(name,cbk);
    }
    public removeEventListener(name:UndoEvents){
        this.listeners.delete(name);
    }
}

export const undoStack = new UndoStack();

export const undo = (dispatch:any) => {
    undoStack.undo(dispatch);
}

export const redo = (dispatch:any) => {
    undoStack.redo(dispatch);
}