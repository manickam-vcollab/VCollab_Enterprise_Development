import MuiIconButton from '@material-ui/core/IconButton';

import RTree from '../../../shared/RsTreeTable';
import AddIcon from "@material-ui/icons/Add";

import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../../utils/tree';

import { useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';

import GridViewIcon from '../../../icons/gridView';
import MuiCheckIcon from '@material-ui/icons/Check';

import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuicloudDoneIcon from '@material-ui/icons/CloudDone';

export default function ListView (props : any){

  const treeDataRedux = props.treeData;
  const treeRootIds = props.rootIds;
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const selectedSlideId = props.selectedSlideId;
  const appliedSlideId = props.appliedSlideId;

  const imageViewGenerator = ( data : any, height: number, width: number, border: number) => {

    if(data.slideType === props.slideType.VIEW){
      return(
        <img src={data.data.image} width={`${width}px`} height={`${height}px`}></img>
      )
    }

    if(data.slideType === props.slideType.GROUP){
      const childrenImages : any[] = [];
      Object.keys(treeDataRedux).map(key => {
        if(treeDataRedux[key].pid === data.id)
          childrenImages.push(treeDataRedux[key])
      })
      const toRenderImages = childrenImages.slice(0, 4) 
      return(
        <div style={{width:`${width}px`, height:`${height}px`,border: `${border}px solid`, borderColor:"white" }}>
          <MuiGrid container >
            <MuiGrid container item>
              { toRenderImages.map(element =>
                <MuiGrid item xs={6} style={{marginBottom: "-5px"}}>
                  { (element.slideType === props.slideType.VIEW) 
                    ?
                      <img src={element.data.image} width={`${width*0.49}px`} height={`${height*0.49}px`}></img>
                    :
                      imageViewGenerator(element, height/2, width/2, 0)
                  }
                </MuiGrid>
              )}
            </MuiGrid>
          </MuiGrid>
        </div>
      )
    }
  }

  const rowHeightGenerator = (data : any) => {

    if(data.slideType === props.slideType.VIEW)
      return(160)
    
    else{
      if (data.state.expanded === false)
        return(160)
      else
        return(40) 
    }
  }

    return(
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
    <RTree 
      treeData={roots} 
      expandedRowIds = {expanded}
      onExpand={() => {}}
      onRowClick = {props.handleRowClick}
      width = {300}
      hover={true}
      selectable={true}
      selected={[selectedSlideId]}
      rowHeight={(rowData) => rowHeightGenerator(treeDataRedux[rowData.id])}
      height = {containerHeight ? containerHeight - 5: 0}
      renderTreeToggle = {
        (icon,rowData) => {
          if (rowData.children && rowData.children.length === 0) {
            return null;
          }
          let state = treeDataRedux[rowData.id].state;
          return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
        }
      }
      treeNode = {(node) => {
        return (
            <div>
              <MuiGrid container direction='column' spacing={1}>
                <MuiGrid item style={{marginTop:"8px"}}>
                            {treeDataRedux[node.id].title }
                          </MuiGrid>
                {
                    treeDataRedux[node.id].state.expanded === true
                    ?
                      null
                    :
                          <MuiGrid item>
                            {imageViewGenerator(treeDataRedux[node.id], 100, 150,1)}
                          </MuiGrid>
                }
               </MuiGrid>
            </div>
          
        )
      }}
      column1 = {(node) => {
        return (
          <div>
              { treeDataRedux[node.id].slideType === props.slideType.GROUP
                 ?
                  <MuiGrid container alignItems='center' style={{width:'100%',height:`${treeDataRedux[node.id].state.expanded ? "100%" : "20%"}`,}}>
                      <MuiGrid item xs={8}>
                          <MuiIconButton size='small' 
                            onClick={() => props.handleExpand( !treeDataRedux[node.id].state.expanded ,node.id) }
                            disabled={treeDataRedux[node.id].children.length === 0}
                          >
                              <GridViewIcon /> 
                          </MuiIconButton> 
                      </MuiGrid>
                  </MuiGrid>
                 :
                  null
              }
          </div>
        )
      }}
      column2 = {(node) => {
        return (
          <div>
            { treeDataRedux[node.id].slideType === props.slideType.VIEW
              ?
              <MuiGrid container alignItems='center' style={{width:'100%',height:'25%'}}>
                  <MuiGrid item xs={9}></MuiGrid>
                  <MuiGrid item xs={3}>
              { appliedSlideId === node.id
                ?
                    <MuiCheckIcon fontSize='small'/>
                :
                  treeDataRedux[node.id].pid !== "-1"
                    ?
                      treeDataRedux[node.id].downloaded === true 
                        ?
                          <MuicloudDoneIcon fontSize='small'/>
                        :
                          <MuiDownloadIcon fontSize='small'/>
                    :
                      null
              }
              </MuiGrid>
            </MuiGrid>
              :        
                <MuiGrid container alignItems='center' style={{width:'100%',height:`${treeDataRedux[node.id].state.expanded ? "100%" : "20%"}`,}}>
                  <MuiGrid item xs={4}></MuiGrid>
                  <MuiGrid item xs={6}>
                    <MuiIconButton size='small' 
                    onClick={() => props.handleCreateNode(node.id)}
                    >
                      <AddIcon fontSize='default'/> 
                    </MuiIconButton> 
                  </MuiGrid>
                </MuiGrid>
            }    
          </div>
        )
      }}
    />  
  </div>
    )
}