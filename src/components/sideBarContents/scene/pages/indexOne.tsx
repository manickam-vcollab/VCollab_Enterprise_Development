// import  {useEffect, useState} from "react";

// import MuiIconButton from '@material-ui/core/IconButton';
// import MuiTypography from '@material-ui/core/Typography';
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MuiGrid from '@material-ui/core/Grid';
// import MuiSnackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import MuiToggleButton from '@material-ui/lab/ToggleButton';
// import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import MuiTabs from '@material-ui/core/Tabs';
// import MuiTab from '@material-ui/core/Tab';
// import MuiPlusIcon from '@material-ui/icons/Add';
// import MuiMinusIcon from '@material-ui/icons/Remove';
// import MuiButton from '@material-ui/core/Button';

// import { SketchPicker } from 'react-color';
// import Dropzone from 'react-dropzone';
// import NumericInput from 'react-numeric-input';
// import styles from '../style';

// import BackButton from '../../../../components/icons/back';
// import { sideBarContentTypes } from '../../../../config';
// import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
// import { setSidebarActiveContent } from '../../../../store/appSlice';

// import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
// import {perspectiveUpdate , orthographicUpdate , updateBackgroundColor , updateBackgroundImage } from "../../../../store/sideBar/sceneSlice";

// export default function Views(){

//     const dispatch = useAppDispatch(); 
    
//     const list = ["Std View", "Camera" , "Background" ];
//     const stdView = useAppSelector((state) => state.scene.stdView);

//     const [backgroundMenu, setBackgroundMenu] = useState<number | null>(0);
//     const colourList = useAppSelector((state) => state.scene.colorList);                                      
//     const [colourSet, setColourSet] = useState( colourList.map(object => ({...object})));
    
//     useEffect(() => {setColourSet(colourList.map(object => ({...object})))},[colourList]);

//     const [selectedColor, setSelectedColor] = useState<any>();

//     const fileRedux = useAppSelector((state) => state.scene.file );
//     const [file, setFile] = useState<any>(fileRedux);

//     useEffect(() => {setFile(fileRedux)},[fileRedux])
    
//     const [projection, setProjection] = useState<string>("perspective");
//     const valuePerspective = useAppSelector((state) => state.scene.valuePerspective);
//     const valueOrthographic = useAppSelector((state) => state.scene.valueOrthographic);

//     const [snackbarContent, setSnackbarContent] = useState<null | string>(null);
//     const [snackbarBoolean, setSnackbarBoolean] = useState(false)

    
                                                        
//     const classes = styles();

    

//     const onHadleView = (item : string) => {
//         setSnackbarContent(item);
//         setSnackbarBoolean(true);
//     };

//     const onHandleTextBox = (value : number,name : string, projection : string) => {
//         const updateValue = {name : name, value : value}
//         switch (projection){
//             case "perspective" :
//                 dispatch(perspectiveUpdate(updateValue))   
//             break;
            
//             case "orthographic" :
//                 dispatch(orthographicUpdate(updateValue))
//             break;        
//         }      
//     }
   
//     const handleProjection = (e: any) => {
//             setProjection(e.currentTarget.value);
//     }

//     const handleChangeTab= (e : any, value : any) => {
//         setBackgroundMenu(value)
//     }

//     const handleChangeComplete = (color : any) => {
//         const index = colourSet.findIndex((item) => item.id === selectedColor.id);
//         const newArray=[...colourSet];
//         newArray[index].color= color.hex;
//         setColourSet(newArray);
//     }

//     const handleAddColor = () => {
//             if(colourSet.length < 3){
//                 const idNew = colourSet.length + 1;
//                 const newArray : any = [...colourSet, {id: idNew , color:"#ffffff"}];
//                 setColourSet(newArray);
//                 setSelectedColor(newArray[newArray.length - 1])
//             }
           
//     }

//     const handleRemoveColor = () => {
//         if ( colourSet.length > 1){
//             const newArray = colourSet.filter((item) => item.id !== colourSet.length)
//             setColourSet(newArray)
//             setSelectedColor(newArray[newArray.length - 1])
//         }
        
//     }

//     const handleColorSelector : (item : any) => any = (item) => {
//         if( selectedColor === item)
//             setSelectedColor(null)
//         else
//             setSelectedColor(item)
//     }

//     const handleReset = () => { 
//             const resetValue = colourList.map(object => ({...object}));
//             setColourSet(resetValue)
//             setSelectedColor(null);

//         if(file !== fileRedux){
//             setFile(fileRedux)
//         }
//     }

//     const onDrop = (acceptedFiles : any , rejected : any) => {
        
//         if (Object.keys(rejected).length !== 0) {
//             setSnackbarBoolean(true)
//             setSnackbarContent("Please select an image file")
//           }
        
//         else{
//             setFile(URL.createObjectURL(acceptedFiles[0]));
//         }
//     }

//     const handleSave = () => {
        
//        if (backgroundMenu === 0) {
//             dispatch(updateBackgroundColor(colourSet));
//             setSnackbarContent("Background Colour Applied");
//             setSnackbarBoolean(true);
//             setSelectedColor(null);
//        }

//        if (backgroundMenu === 1) {{
//            dispatch(updateBackgroundImage(file));
//        }}
//     }

//     const onClickBackIcon = () =>{
//         dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
//     }

//     const getHeaderLeftIcon= () => {
//         return (
//             <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
//         );
//     }

//     const getHeaderContent = () => {
//         return <MuiTypography variant='h1' noWrap>Scene</MuiTypography>;
//     }

//     const getHeaderRightIcon = () => {
//         return (
//             null
//             )
//     }

    
//     const getBody = () => {
//         let backgroundColorChange = false;
//         if ( colourSet.length !== colourList.length )
//             backgroundColorChange = true;
//         else {
//             for (let i = 0; i < colourSet.length; i++) {
//                 if(colourList[i].color !== colourSet[i].color){
//                     backgroundColorChange = true;
//                     break;
//                 }
//             }
//         }

//         let backgroundImageChange = false;
//         if(fileRedux !== file)
//             backgroundImageChange = true;

//         return (
//             <div className={classes.scene}>
//                 <MuiAccordion>
//                     <MuiAccordionSummary
//                         expandIcon={<MuiExpandMoreIcon />}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                     >
//                     <MuiTypography>{list[0]}</MuiTypography>
//                 </MuiAccordionSummary>
//                 <MuiAccordionDetails>
//                     <div className={classes.listClick}>
//                         { stdView.map((item : any, index : number) =>
//                             <div key={ 'divParent_' + index } className={item === snackbarContent ?classes.listItemClicked :classes.listItem} onClick={() => onHadleView(item)}>
//                                 <MuiTypography>
//                                     {item}
//                                 </MuiTypography>
//                             </div>
//                 	    )}
//                     </div>
//                 </MuiAccordionDetails>
//             </MuiAccordion>

//             <MuiAccordion>
//                 <MuiAccordionSummary
//                     expandIcon={<MuiExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                 >
//                     <MuiTypography>{list[2]}</MuiTypography>
//                 </MuiAccordionSummary >
//                 <MuiAccordionDetails>
//                     <div className={classes.appTap}>
//                         <MuiTabs  
//                             value={backgroundMenu}
//                             className={classes.tab}
//                             aria-label="simple tabs example" onChange={handleChangeTab}
//                             TabIndicatorProps={{style:{backgroundColor:"currentColor"}}}
//                         >
//                             <MuiTab style={{textTransform:"none"}} label="Colour"/>
//                             <MuiTab style={{textTransform:"none"}} label="Image"/>
//                         </MuiTabs>
//                         {   backgroundMenu === 0 &&
//                             <div >
//                                 <div ><MuiPlusIcon onClick={handleAddColor} style={{marginLeft:"-240px", marginBottom:"-20px"}} className={classes.circularSliderButton }/></div>
//                                 <MuiGrid container spacing={3} style={{marginLeft:"10px",marginTop:"10px"}}>
//                                     <MuiGrid item xs={12} sm={1}>
//                                         {   colourSet.map((item : any, index : number) => 
//                                                 <div 
//                                                     key={ 'divParent_' + index } 
//                                                     className={selectedColor ? item.id !== selectedColor.id ? classes.colorPicker : classes.active : classes.colorPicker} 
//                                                     style={{height:226/colourSet.length, 
//                                                         width:"30px",
//                                                         backgroundColor:item.color ,
//                                                     }}
//                                                     onClick={() => handleColorSelector(item)}
//                                                 >
//                                                 </div>
//                                         )}
//                                     </MuiGrid>

//                                     <MuiGrid item xs={12} sm={2} style={{marginLeft:"5px"}}>
//                                         <SketchPicker  
//                                             color={selectedColor ? selectedColor.color : "#ffffff"}
//                                             onChangeComplete={selectedColor && handleChangeComplete }
//                                             presetColors={[]}
//                                             disableAlpha ={true}
//                                         />
//                                     </MuiGrid>
//                                 </MuiGrid> 
//                                 <div ><MuiMinusIcon onClick={handleRemoveColor} style={{marginLeft:"-240px", marginTop:"5px"}} className={classes.circularSliderButton}/></div>
//                                 <div style={{marginBottom:"5px", marginTop:"5px",}} >
//                                     <MuiGrid container spacing={3} >
//                                         <MuiGrid item xs={12} sm={2} style={{marginLeft:"60px"}}>
//                                             {backgroundColorChange
//                                                 ?
//                                                     <MuiButton  style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={handleSave}>
//                                                         Save
//                                                     </MuiButton>
//                                                 :
//                                                     <MuiButton disabled  style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary">
//                                                         Save
//                                                     </MuiButton>  
//                                             }
                                            
//                                         </MuiGrid>
//                                         <MuiGrid item xs={12} sm={6} >
//                                             {backgroundColorChange 
//                                                 ?
//                                                     <MuiButton  style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={handleReset}>Reset</MuiButton>
//                                                 :
//                                                     <MuiButton disabled style={{color:"#8C8BFF", zIndex:10}} color="primary">Reset</MuiButton>
//                                             }
//                                         </MuiGrid>
//                                     </MuiGrid>
//                                 </div>  
//                             </div>
//                         }
//                         {   backgroundMenu === 1 &&
//                                 <div style={{marginTop:"40px", marginLeft:"25px"}}>
//                                     <Dropzone onDrop={(acceptedFiles, rejected )=> onDrop(acceptedFiles,rejected)}
//                                         multiple={false}
//                                         accept="image/*"
//                                      >
//                                         {({getRootProps, getInputProps}) => (
//                                             <section>
//                                                 <div {...getRootProps()}  style={{
//                                                     width: "250px",
//                                                     height: "150px",
//                                                     borderRadius: "5%",
//                                                     objectFit: "cover",
//                                                     objectPosition: "center",
//                                                     border: " 1px dashed"
//                                                 }}>
//                                                 <input {...getInputProps()} />
//                                                     {   file 
//                                                         ?
//                                                             <div>
//                                                                 <img 
//                                                                     style={{
//                                                                         width: "250px",
//                                                                         height: "150px",
//                                                                         borderRadius: "5%",
//                                                                         objectFit: "cover",
//                                                                         objectPosition: "center"
//                                                                         }} 
//                                                                     src={file} alt="profile" 
//                                                                 />
//                                                             </div>
//                                                         :
//                                                             <div>
//                                                                 <MuiTypography style={{marginTop:"85px"}}>Drop your image here or</MuiTypography>
//                                                                 <MuiTypography style={{marginTop:"3px", color:"#8C8BFF"}}>Browse</MuiTypography>
//                                                             </div>
//                                                         }
                                                   
//                                                 </div>
//                                             </section>
//                                         )}
//                                     </Dropzone>
//                                     <div style={{marginBottom:"5px", marginTop:"45px",}} >
//                                     <MuiGrid container spacing={3} >
//                                         <MuiGrid item xs={12} sm={2} style={{marginLeft:"60px"}}>
//                                             {   backgroundImageChange 
//                                                 ?
//                                                     <MuiButton  style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={handleSave}>
//                                                         Save
//                                                     </MuiButton>
//                                                 :

//                                                     <MuiButton disabled style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={handleSave}>
//                                                         Save
//                                                     </MuiButton>
//                                             }
//                                         </MuiGrid>
//                                         <MuiGrid item xs={12} sm={6} >
//                                             {backgroundImageChange ?
//                                                 <MuiButton  style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={handleReset}>Reset</MuiButton>
//                                                 :
//                                                 <MuiButton disabled style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={handleReset}>Reset</MuiButton>
//                                             }
                                            
//                                         </MuiGrid>
//                                     </MuiGrid>
//                                 </div>  
//                                 </div>
//                         } 
//                     </div>
//                 </MuiAccordionDetails>
//             </MuiAccordion>

//             <MuiAccordion>
//                 <MuiAccordionSummary
//                     expandIcon={<MuiExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                 >
//                     <MuiTypography>{list[1]}</MuiTypography>
//                 </MuiAccordionSummary >
//                 <MuiAccordionDetails>
//                 <form>
//                     <MuiTypography className={classes.listHead} noWrap>
//                         Projection
//                     </MuiTypography>
//                     <MuiToggleButtonGroup
//                         style={{marginBottom:"20px",}}
//                         size="small" 
//                         value={projection}
//                         exclusive
//                         onChange={handleProjection}
//                         aria-label="text alignment"
//                     >
//                         <MuiToggleButton value="perspective" aria-label="left aligned">
//                             <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Perspective</MuiTypography>
//                         </MuiToggleButton>
//                         <MuiToggleButton value="orthographic" aria-label="left aligned">
//                             <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Orthographic</MuiTypography>
//                         </MuiToggleButton>
//                     </MuiToggleButtonGroup>
            
//                     <MuiTypography className={classes.listHead} noWrap>
//                         View Frustum
//                     </MuiTypography>

//                     <MuiGrid container spacing={3}>
//                         {   (projection === "perspective" 
//                                 ?
//                                     valuePerspective 
//                                 : 
//                                     valueOrthographic)
//                             .map((item) => 
//                                 <MuiGrid item xs={12} sm={6}>
//                                     <MuiTypography className={classes.listSubHead}> 
//                                         {item.name}
//                                     </MuiTypography>
//                                     <NumericInput
//                                         className={classes.inputEquation}
//                                         value={item.value}
//                                         button={"no"}
//                                         margin="dense"
//                                         noStyle
//                                         onChange={(value : any) => onHandleTextBox(value,item.name,projection)} 
//                                     />
//                                 </MuiGrid>
//                         )}
//                     </MuiGrid>  
//                     </form>      
//                 </MuiAccordionDetails>
//             </MuiAccordion>
//         </div>
//     )}

//     const getFooter = () => {
//         return null
//     }
    
//     return ( 
//         <div>
//             <SideBarContainer
//                 headerLeftIcon = { getHeaderLeftIcon() }
//                 headerContent={ getHeaderContent() }
//                 headerRightIcon = { getHeaderRightIcon() }
//                 body ={ getBody() }
//                 footer = { getFooter() }
//             />
       
//             <MuiSnackbar
//                 // className={props.snackBar}
//                 anchorOrigin={{vertical:"top", horizontal:'center'}}
//                 autoHideDuration={1000}
//                 open={snackbarBoolean}
//                 onClose={() => setSnackbarBoolean(false)}
//             >
//                 <MuiAlert icon={false}>
//                     <div style={{display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",}}
//                     >
//                         <MuiTypography color="inherit">{snackbarContent}</MuiTypography>
//                     </div>
//                 </MuiAlert>
//             </MuiSnackbar> 
//         </div>
//     )
// }

export default function Views(){
    return(
        null
    )
}