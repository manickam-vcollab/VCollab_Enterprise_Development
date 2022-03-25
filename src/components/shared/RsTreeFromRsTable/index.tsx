import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Table, {Cell, Column, ColumnGroup, HeaderCell} from '../RsTable'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useRef } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../store/storeHooks';
import { useEffect } from 'react';
import { ITreeNode, ITreeNodeState } from '../RsTreeTable';

export interface TreeProps {
    rowKey:string,
    rowClassName?: (rowData:any) => string,
    defaultExpandedRowKeys?:string[],
    onExpandChange?:(expanded:boolean, rowData:object) => void,
    onRowClick?:(rowData:any) => void,
    data: any,
    renderNode?: (rowData:any) => any,
    shouldUpdateScroll?:boolean
    setNodeStateReducer?: ActionCreatorWithPayload<{nodeId:string, nodeState:ITreeNodeState},string>,
    selectOnlyLeaf?:boolean,
    width:number,
    height:number
}

const useStyles = makeStyles(theme => ({
    root: {
      
    },
    row: {
        '& .rs-table-cell-content': {
          display: 'flex !important',
          '&:hover':{
            background: theme.palette.action.hover
          }
        },
      },
    selected: {
      '& .rs-table-cell-content': {
          background: theme.palette.action.selected,
          '&:hover': {
            background: theme.palette.action.selected, 
          }
      },
    }
}))
function RsTree(props:TreeProps) {
    const classes = useStyles();
    const dispatch = useAppDispatch()
    const lastSelected= useRef<ITreeNode | null>(null);
    const scrollPos = useRef<{x:number,y:number} | null>(null)

    useEffect(() => {
      // console.log("tree mounted")
      return () => {
        if(lastSelected.current !== null && props.setNodeStateReducer) {
          let lastSelectedState = {...lastSelected.current.state};
          lastSelectedState.selected = false;
          dispatch(props.setNodeStateReducer({nodeId:lastSelected.current.id, nodeState: lastSelectedState}))
        }
      }
    },[])

    useEffect(() => {
      // console.log("tree data changed")
    },[props.data])

    const handleExpand = (expanded:boolean, rowData: ITreeNode) => {
        if(rowData.state && rowData.children.length > 0) {
          let nodeState = {...rowData.state}
          nodeState.expanded = expanded;
          if(props.setNodeStateReducer)
          dispatch(props.setNodeStateReducer({nodeId:rowData.id, nodeState}))
        }
        
        if(props.onExpandChange)
        {
          props.onExpandChange(expanded,rowData)
        }
    }

    const handleClick = (rowData:any) => {
       if(rowData.state)
       handleSelection(rowData);
       if(props.onRowClick)
       props.onRowClick(rowData)
    }

    const handleSelection = (rowData: ITreeNode) => {
      if(props.setNodeStateReducer) {
        let nodeState = {...rowData.state};
        if(props.selectOnlyLeaf ) {
          if(rowData.children.length === 0 && (rowData as any)._parent)
          nodeState.selected = !nodeState.selected;
        }
        else{
          nodeState.selected = !nodeState.selected;
        }
        if(lastSelected.current !== null) {
          let lastSelectedState = {...lastSelected.current.state};
          lastSelectedState.selected = false;
          dispatch(props.setNodeStateReducer({nodeId:lastSelected.current.id, nodeState: lastSelectedState}))
        }
        lastSelected.current=rowData;
        dispatch(props.setNodeStateReducer({nodeId:rowData.id, nodeState}))
      }
    }

    return (

        <Table 
         {...props} 
         rowClassName = { (rowData:any) => clsx({
           [props.rowClassName? props.rowClassName(rowData): "" ]:props.rowClassName,
           [classes.row]:true,
           [classes.selected]: rowData.state?.selected?true:false
          }
         )}
         hover={false}
         height = {props.height-5}
         isTree
         virtualized={true}
         showHeader={false}
         rowHeight = {(rowData:any) => 40}
         rowExpandedHeight = { 40}
         onExpandChange = {handleExpand}
         onRowClick = {handleClick}
         defaultExpandedRowKeys = {props.defaultExpandedRowKeys ? props.defaultExpandedRowKeys : []}
         renderTreeToggle={(icon:any, rowData:any,expanded:boolean) => {
            if (rowData.children && rowData.children.length === 0) {
              return <TreeExpandedIcon style={{visibility:'hidden'}}/>;
            }
            return expanded? <TreeExpandedIcon viewBox="0 -7 24 24"/>:<TreeCollapseIcon viewBox="0 -7 24 24"/>
          }}
        >
            <Column width={900} treeCol={true}>
        {/*
 // @ts-ignore */}
                <HeaderCell>RTree</HeaderCell>
                   {/*
 // @ts-ignore */}
                <Cell>
                    {
                      rowData => {
                          return props.renderNode ? props.renderNode(rowData) :
                          <Grid container alignItems='center'>
                              <Grid item>
                              <div style={{width:10}}></div>
                              </Grid>
                              <Grid item>
                                <Typography>{
                                    rowData.title? rowData.title :
                                    rowData.label? rowData.label :
                                    rowData.name ? rowData.name :
                                    null}</Typography>
                              </Grid>
                          </Grid>
                      }
                    }
                </Cell>
            </Column>
        </Table>
    )
}

export default RsTree
