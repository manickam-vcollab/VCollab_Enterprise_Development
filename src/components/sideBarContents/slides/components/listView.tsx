import MuiIconButton from '@material-ui/core/IconButton';

import RTree from '../../../shared/RsTreeTable';
import AddIcon from "@material-ui/icons/Add";

import TreeNodeWithoutCheckbox from '../../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../../utils/tree';

import { useRef } from 'react';
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

    return(
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <RTree 
        treeData={roots} 
        expandedRowIds = {expanded}
        onExpand={props.handleExpand}
        onRowClick = {props.handleRowClick}
        width = {300}
        hover={true}
        selectable={true}
        selected={[selectedSlideId]}
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
            <TreeNodeWithoutCheckbox 
              node={treeDataRedux[node.id]}
              onCheck={() => console.log("sa")}
            >
            </TreeNodeWithoutCheckbox>
          )
        }}
        column1 = {(node) => {
          return (
            <div>
                { treeDataRedux[node.id].slideType === props.slideType.GROUP
                   ?
                    <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                        <MuiGrid item xs={8}>
                            <MuiIconButton size='small' 
                              onClick={() => props.handleSwitchView(node.id)}
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
                <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
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
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
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