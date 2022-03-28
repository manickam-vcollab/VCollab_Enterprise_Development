import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import  {useEffect, useState} from "react";

import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
import MuiPlusIcon from '@material-ui/icons/Add';
import ColorPicker from '../../../shared/colorPicker';
import { SketchPicker } from 'react-color';
import MuiMinusIcon from '@material-ui/icons/Remove';
import Dropzone from 'react-dropzone';
import MuiTypography from '@material-ui/core/Typography';

import { setBackgroundColorAsync , setBackgroundImageAsync, ColorList } from "../../../../store/sideBar/sceneSlice";

import styles from '../style';

import {undoStack} from "../../../utils/undoStack";

export default function Background (){

    const classes = styles();

    const [backgroundMenu, setBackgroundMenu] = useState<number | null>(0);
    const colourList = useAppSelector((state) => state.scene.colorList); 
    
    const fileRedux = useAppSelector((state) => state.scene.file );
;
    // const [snackbarContent, setSnackbarContent] = useState<null | string>(null);
    // const [snackbarBoolean, setSnackbarBoolean] = useState(false)
    

    const [selectedColor, setSelectedColor] = useState<any>(-1);
    const dispatch = useAppDispatch();

    useEffect(() => {setSelectedColor(colourList.find((item : ColorList) => item.id === selectedColor.id))},[colourList]);

    const isBackgroundImage = useAppSelector((state) => state.scene.isImageActive)

    const handleChangeTab= (e : any, value : any) => {
        setBackgroundMenu(value)
    }

    const handleUndoAdd = (newArray : ColorList[]) => {
        let newArrayOne= [...newArray];

        newArrayOne.pop();
        dispatch(setBackgroundColorAsync(newArrayOne));
        setSelectedColor(-1)

    }

    const handleAddColor = (undoable?: boolean) => {
        if(colourList.length < 3){
            const idNew = colourList.length + 1;
            const newArray : any = [...colourList, {id: idNew , color:{r:255,g:255,b:255,a:1}}];
            dispatch(setBackgroundColorAsync(newArray));
            setSelectedColor(newArray[newArray.length - 1])

            if(undoable){
                undoStack.add(
                    {
                      undo: () => handleUndoAdd(newArray),
                      redo: () => handleAddColor(),
                    }
                )
            }
        }
    }

    const handleColorSelector : (item : any) => any = (item) => {
        if( selectedColor === item)
            setSelectedColor(-1)
        else
            setSelectedColor(item)
    }

    const handleChangeComplete = (color : {r : number , g:number, b:number, a?:number},  undoable?: boolean) => {
        const index = colourList.findIndex((item) => item.id === selectedColor.id);
        let newArray= JSON.parse(JSON.stringify(colourList));

        const oldValue = newArray[index].color;

        newArray[index].color= color;
        dispatch(setBackgroundColorAsync(newArray));
        setSelectedColor( colourList.find((item) => item.id === selectedColor.id))

        if(undoable){
            undoStack.add(
                {
                  undo: () => handleChangeComplete(oldValue),
                  redo: () => handleChangeComplete( color),
                }
            )
        }
    }

    const undoRemoveColor = (removedColor: ColorList, newArray : ColorList[]) => {
        console.log(colourList)
        const newArrayOne= [...newArray, removedColor];

        if(newArray)
            dispatch(setBackgroundColorAsync(newArrayOne));
        setSelectedColor(-1);
    }

    const handleRemoveColor = (undoable?: boolean) => {

        if ( colourList.length > 1){

            const removedColor = JSON.parse(JSON.stringify(colourList.find((item) => item.id === colourList.length)));
            const newArray = colourList.filter((item) => item.id !== colourList.length)
            // console.log(newArray);
            const ApiColor = [...newArray]  
            // if(ApiColor.length >= 1)
            // {
            //     let firstcolor = ApiColor[0]
            //     ApiColor.push(firstcolor); 
            // }
            dispatch(setBackgroundColorAsync(ApiColor));
            setSelectedColor(ApiColor[ApiColor.length - 1])

            if(undoable && colourList.length > 1){
                undoStack.add(
                    {
                      undo: () => undoRemoveColor(removedColor, newArray),
                      redo: () => handleRemoveColor(),
                    }
                )
            }
        }

        
        
    }

    const handleUndo = (oldData : any) => {

        if (typeof(oldData) === 'object') {
            dispatch(setBackgroundImageAsync(null));
             dispatch(setBackgroundColorAsync(oldData));

             setSelectedColor(-1);
        }

        if (typeof(oldData) === 'string') {
            dispatch(setBackgroundImageAsync(oldData));
        }

 
    }

    const handleSave = ( newData :{newColorList? : ColorList[], newFile? : any ,undoable? : boolean}) => {    

        if (backgroundMenu === 0 && newData.newColorList) {
            let oldData : any;
            if(isBackgroundImage)
                oldData = fileRedux;
            else 
                oldData = colourList

            dispatch(setBackgroundColorAsync(newData.newColorList));
            setSelectedColor(null);

            if(newData.undoable && oldData){
                undoStack.add(
                    {
                      undo: () => handleUndo(oldData),
                      redo: () => handleSave({newColorList : newData.newColorList}),
                    }
                )
            }
        }

       if (backgroundMenu === 1) {

            let oldData : any;
            if(!fileRedux)
                oldData = colourList;
            else
                oldData = fileRedux;

           dispatch(setBackgroundImageAsync(newData.newFile));

           if(newData.undoable){
                undoStack.add(
                    {
                      undo: () => handleUndo(oldData),
                      redo: () => handleSave( {newFile: newData.newFile}),
                    }
                )
            }
        }

       
    }

    const updateFile = (file : any, undoable?: boolean) => {
        
        let oldData : any;

            if(!fileRedux)
                oldData = colourList;
            else
                oldData = fileRedux;

        dispatch(setBackgroundImageAsync(file));

        if(undoable){
            undoStack.add(
                {
                  undo: () => handleUndo(oldData),
                  redo: () => updateFile(file),
                }
            )
        }
    }


    const onDrop = (acceptedFiles : any , rejected : any) => {

        console.log(acceptedFiles)
        
        if (Object.keys(rejected).length !== 0) {
            return;
        }
        
        else{

            updateFile(URL.createObjectURL(acceptedFiles[0]), true);
        }
    }
    

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(
            null
        )
    }

    const getAction = () => {
        return(
            <div>
            <MuiTabs  
            value={backgroundMenu}
            aria-label="simple tabs example"
             onChange={handleChangeTab}
            TabIndicatorProps={{style:{backgroundColor:"currentColor"}}}
        >
            <MuiTab style={{textTransform:"none",}} label="Colour"/>
            <MuiTab style={{textTransform:"none"}} label="Image"/>
        </MuiTabs>
        </div>
        )
    }

    const getBody = () => {

        return(
            <div className={classes.scrollBar}>
                {   backgroundMenu === 0 &&
                    <div style={{marginTop:"20px"}}>
                        <div className={classes.buttonContainer}>
                            <MuiPlusIcon onClick={() => handleAddColor(true)} className={classes.buttonComponent }/>
                        </div>
                        <MuiGrid container spacing={3} style={{marginLeft:"10px",marginTop:"10px"}}>
                            <MuiGrid item xs={12} sm={1} style={{zIndex:10,}}>
                                {colourList.map((item : any, index : number) => 
                                    <div 
                                        key={ 'divParent_' + index } 
                                        className={selectedColor ? item.id !== selectedColor.id ? classes.colorPicker : classes.active : classes.colorPicker} 
                                        style={{height:226/colourList.length, 
                                            width:"30px",
                                            backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                                            
                                        }}
                                        onClick={() => handleColorSelector(item)}
                                    >
                                    </div>
                                )}
                            </MuiGrid>
                            <MuiGrid item xs={12} sm={2} style={{marginLeft:"5px"}}>
                                <ColorPicker
                                    color={selectedColor ? selectedColor.color : {r:255, g:255, b:255, a:1}}
                                    onChangeComplete={selectedColor && handleChangeComplete }
                                />
                               
                            </MuiGrid>
                        </MuiGrid> 
                        <div className={classes.buttonContainer}>
                            <MuiMinusIcon  onClick={() => handleRemoveColor(true)} className={classes.buttonComponent}/>
                        </div>                      
                    </div>
                }

                {   backgroundMenu === 1 &&
                        <div style={{marginTop:"40px", marginLeft:"25px"}}>
                            <Dropzone onDrop={(acceptedFiles, rejected )=> onDrop(acceptedFiles,rejected)}
                                multiple={false}
                                accept="image/*"
                             >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}  style={{
                                            width: "250px",
                                            height: "150px",
                                            borderRadius: "5%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                            border: " 1px dashed"
                                        }}>
                                            <input {...getInputProps()} />
                                            {   fileRedux
                                                ?
                                                    <div>
                                                        <img 
                                                            style={{
                                                                width: "250px",
                                                                height: "150px",
                                                                borderRadius: "5%",
                                                                objectFit: "cover",
                                                                objectPosition: "center"
                                                            }} 
                                                            src={fileRedux} alt="profile" 
                                                        />
                                                    </div>
                                                :
                                                    <div>
                                                        <MuiTypography style={{marginTop:"85px"}}>Drop your image here or</MuiTypography>
                                                        <MuiTypography style={{marginTop:"3px", color:"#8C8BFF"}}>Browse</MuiTypography>
                                                    </div>
                                            }                                           
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                } 
            </div>
        )
    }

    const getFooter = () => {
        return(
            null
        )
    }

    return(
        <SideBarContainer
        headerContent={ <Title text="Backgound" group="Scene"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
      />
       
    )
}