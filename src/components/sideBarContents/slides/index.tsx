import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../icons/back';

import {useAppDispatch, useAppSelector} from '../../../store/storeHooks';

import {goBack} from 'connected-react-router/immutable';

import { selectSlideData, selectRootIds, expandNode, setSlideSelection, createNode, applyView, replaceViewData , deleteNode, SlideType , pasteSlide, downloadFile, downloadParentFolder} from '../../../store/sideBar/slideSlice';

import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../utils/tree';

import { useRef} from 'react';
import useContainer from '../../../customHooks/useContainer';

import GridViewIcon from '../../icons/gridView';
import MuiFormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import ReplaceIcon from '../../icons/replace'
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import OptionContainer from '../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';

import CreateNewFolderIcon from '../../icons/createNewFolder';

import MuiSlideshowIcon from '@material-ui/icons/Slideshow';

import { useState } from 'react';

import ListView from './components/listView';
import GridMode from './components/gridMode'

import sizeCalculator from '../../../customHooks/useSizeCalculator';

export default function Slides (){

  const treeDataRedux = useAppSelector(selectSlideData);
  const treeRootIds = useAppSelector(selectRootIds);

  const selectedSlideId = useAppSelector(state => state.slide.selectedSlide);

  const appliedSlideId = useAppSelector(state => state.slide.appliedSlide);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();

  const [listView, setListView] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const onClickBackIcon = () => {
    dispatch(goBack());
  }

  const handleSwitchView = () => {
    setListView(!listView)
  }

  const handleSwitchFromView = (nodeId : string) => {
    setOpenDelete(false)
    dispatch(setSlideSelection(nodeId));

    dispatch(expandNode({toOpen: true,nodeId})); 
    setListView(false)
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    if(treeDataRedux[nodeId].slideType === SlideType.GROUP){

      if(listView === false)
        dispatch(setSlideSelection(nodeId));
      dispatch(expandNode({toOpen,nodeId})); 
    }
  }    
    
  const handleRowClick = (node : any) => {
    setOpenDelete(false)
    dispatch(setSlideSelection(node.id));
  }
    
  const onHandleCreateGroup = () => {
    dispatch(createNode("-1"));
  }

  const handleCreateNode = (nodeId :string) => {
    dispatch(setSlideSelection("-1"));
    dispatch(createNode(nodeId));
  }

  const onHandleApply = () => {
    dispatch(downloadFile(selectedSlideId))
    dispatch(applyView(selectedSlideId))
  }

  const onHandleDownload = () => {

    const toDownload = (id : string) => {
      treeDataRedux[id].children.map((item: string) => {
        if(treeDataRedux[id].slideType === SlideType.VIEW)
          dispatch(downloadFile(item))
    
        else 
          toDownload(item);
      })
      dispatch(downloadFile(id))
    }
    toDownload(selectedSlideId);
  }


  const onHandleReplace = () => {
    dispatch(replaceViewData(selectedSlideId))
  }


  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  }


  const onHandleDelete = () => {
    dispatch(deleteNode(selectedSlideId))
    setOpenDelete(false)
  }
  
  const onHandleCopy = () => {
    const newCopy = JSON.parse(JSON.stringify(treeDataRedux[selectedSlideId]));
    setCopied(newCopy)
  }

  const onHandlePaste = () => {

    if(selectedSlideId !== "-1"){
      if(treeDataRedux[selectedSlideId].slideType === SlideType.GROUP)
        dispatch(pasteSlide({copied :copied, pid: selectedSlideId}))

      if(treeDataRedux[selectedSlideId].slideType === SlideType.VIEW)
        dispatch(pasteSlide({copied :copied, pid: treeDataRedux[selectedSlideId].pid}))
    }

    else 
      dispatch(pasteSlide({copied :copied, pid: "-1"}))
  }

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={onClickBackIcon} ><BackButton/></MuiIconButton> 
    )
  }

  const getHeaderRightIcon = () => {
    return ( 
      <MuiIconButton onClick={handleSwitchView}>
        { listView 
          ? 
            <GridViewIcon /> 
          : 
            <MuiFormatListBulletedIcon/> 
        }
      </MuiIconButton> 
    )
  }

  const getAction = () => {
    return (
      null
    )
  }

  const getBody = () => {
    return (
      <span>
        { listView 
          ?
            <ListView treeData={treeDataRedux} rootIds={treeRootIds} selectedSlideId={selectedSlideId}
              appliedSlideId={appliedSlideId} handleExpand={handleExpand} handleRowClick={handleRowClick}
              handleCreateNode={handleCreateNode} slideType={SlideType} handleSwitchView = {handleSwitchFromView}
            />
          :
            <GridMode treeData={treeDataRedux} rootIds={treeRootIds} selectedSlideId={selectedSlideId}
              appliedSlideId={appliedSlideId} handleExpand={handleExpand} handleRowClick={handleRowClick}
              handleCreateNode={handleCreateNode} slideType={SlideType}
            />
          }
        </span>  
    )        
  }

  const getFooter = () => {
    return(
      <div>
        { selectedSlideId === "-1"
          ?
            <OptionContainer>
              <Option label="Create"
                icon={<MuiIconButton 
                    onClick={onHandleCreateGroup}
                  >
                    <CreateNewFolderIcon/>
                  </MuiIconButton>
                } 
              />
              <Option label="Paste" 
                icon={ <MuiIconButton 
                    disabled={!copied || copied.slideType === SlideType.VIEW || !Object.keys(treeDataRedux).includes(copied.id)} 
                    onClick={onHandlePaste}
                  > 
                    <MuiPaste/>
                  </MuiIconButton>
                }
              />
              </OptionContainer>
            :          
              !openDelete
                ?
                  <div style={{marginTop:"20px",}}>
                    <MuiGrid container>
                      <MuiGrid item xs={10}>
                        { treeDataRedux[selectedSlideId].slideType === SlideType.GROUP
                          ?
                            <MuiGrid container>
                              <MuiGrid item xs={4}>{treeDataRedux[selectedSlideId].downloaded || treeDataRedux[selectedSlideId].children.length === 0 ? null : `${sizeCalculator(treeDataRedux[selectedSlideId].size)}`}</MuiGrid>
                                { treeDataRedux[selectedSlideId].downloaded === false
                                  ?
                                    <MuiGrid item xs={6}>
                                      <MuiButton style={{backgroundColor:"#5958FF",width:"100%", fontSize:"9px" ,}} 
                                        autoFocus 
                                        disabled={treeDataRedux[selectedSlideId].children.length === 0}
                                        onClick={onHandleDownload} 
                                      >
                                        Download
                                      </MuiButton>
                                    </MuiGrid>  
                                  :
                                    <MuiGrid item xs={2}></MuiGrid>
                                }
                              <MuiGrid item xs={2}>
                                <MuiIconButton style={{marginTop:"-10px"}}
                                  disabled={treeDataRedux[selectedSlideId].downloaded === false }
                                  // onClick={onHandleReplace}
                                >
                                  <MuiSlideshowIcon/>
                                </MuiIconButton>
                              </MuiGrid>
                            </MuiGrid>

                          :
                            <MuiGrid container>
                              <MuiGrid item xs={4}>
                                { treeDataRedux[selectedSlideId].downloaded ? null : `${sizeCalculator(treeDataRedux[selectedSlideId].size)}`}
                              </MuiGrid>
                              <MuiGrid item xs={6}>
                                <MuiButton style={{backgroundColor:"#5958FF",width:"100%", fontSize:"9px" ,}} 
                                  autoFocus 
                                  onClick={onHandleApply} 
                                >
                                  { treeDataRedux[selectedSlideId].downloaded === true 
                                    ?
                                      "Apply" 
                                    :
                                    // `${fileSize(treeDataRedux[selectedSlideId]?.size)}
                                    `Download & Apply`
                                  } 
                                </MuiButton>
                              </MuiGrid>  
                            </MuiGrid>
                        } 
                      </MuiGrid>
                    </MuiGrid>

                <OptionContainer>
                <Option label="Replace"
                  icon={<MuiIconButton 
                    disabled={selectedSlideId === "-1" || treeDataRedux[selectedSlideId].slideType === SlideType.GROUP }
                    onClick={onHandleReplace}
                    >
                          <ReplaceIcon/>

                    </MuiIconButton>
                  } 
                />

                <Option label="Copy" 
                
                  icon={ <MuiIconButton 
                    disabled={selectedSlideId === "-1"}
                    onClick={onHandleCopy}
                    > 
                      <MuiFileCopyOutlinedIcon/>
                    </MuiIconButton>
                  }
                />
                <Option label="Paste" 
                  icon={ <MuiIconButton 
                    disabled={!copied || !Object.keys(treeDataRedux).includes(copied.id)} 
                    onClick={onHandlePaste}
                    > 
                      <MuiPaste/>
                    </MuiIconButton>
                  }
                />
                <Option label="Delete" 
                  icon={ <MuiIconButton 
                    disabled={selectedSlideId === appliedSlideId || selectedSlideId === "-1"}
                    onClick={onHandleDeleteButton}
                    > 
                      <MuiDeleteForeverOutlinedIcon/>
                    </MuiIconButton>
                  }
                />     
              </OptionContainer>
            </div>
          :
              <div>
                <div style={{marginBottom:"5px", marginTop:"5px"}}>
                  <MuiTypography style={{marginBottom:"5px", fontSize:"14px"}}>
                    Are you sure want to delete ?
                  </MuiTypography>
                  <div style={{alignContent:"center",}}>
                    <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      onClick={onHandleDelete} 
                      // color="primary"
                    >
                      Confirm
                    </MuiButton>
                    <MuiButton style={{width:"20%", fontSize:"9px"}}
                      onClick={() => setOpenDelete(false)} 
                      // color="primary"
                    >
                      Cancel
                    </MuiButton>
                  </div>
                </div>
              </div>
          }          
        </div>
      )
    }

    return(
        <SideBarContainer
        headerContent={ <Title text={"3D Slides" } group=""/> }
        headerAction = {getAction()}
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />

    )
}