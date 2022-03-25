import React, {useCallback, useEffect, useRef, useState} from 'react'
import Table, {Cell,Column,ColumnGroup,HeaderCell} from '../RsTable'
import clsx from 'clsx'
import useContainer from '../../../customHooks/useContainer';
import { makeStyles } from '@material-ui/core/styles';

export type {Cell, Column, ColumnGroup};

const useRTreeOverrideStyles = makeStyles((theme) => ({
  row: {
    '& .rs-table-cell-content': {
      display: 'flex !important'
    }
  },
  rowHover: {
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
  },
  rightColumn: {
      '& .rs-table-cell-group-fixed-right': {
        background:'transparent'
      }
    },
    invertCell: {
      zIndex: '10!important' as any,
      left: '10px!important'
    }
})) 

export interface ITreeNodeState {
  checked?: boolean,
  partiallyChecked?: boolean,
  expanded?: boolean,
  highlighted?: boolean,
  visibility?: boolean,
  selected?: boolean
}

export interface ITreeNode {
  id:string,
  pid:string|null,
  title:string,
  children:string[],
  isGroup?:boolean,
  state:ITreeNodeState,
  attributes?:any
}

export interface ITreeTableProps {
  treeData: ITreeNode[],
  selectable?: boolean,
  hover?:boolean,
  expandedRowIds: string[],
  width: number,
  height: number,
  selected?: string[],
  rowHeight?: (rowData : any) => number,
  renderTreeToggle: (icon:any, rowData:any) => any,
  onExpand: (toOpen:boolean,nodeId:string) => void,
  onRowClick: (node:ITreeNode) => void,
  treeNode: (node:ITreeNode) => JSX.Element,
  column1?: (node:ITreeNode) => JSX.Element,
  column2?: (node:ITreeNode) => JSX.Element
}

function RTree(props:ITreeTableProps) {
    // eslint-disable-next-line
    const overrideClasses = useRTreeOverrideStyles();
      return (
         
          <Table
            isTree
            expandedRowKeys = {props.expandedRowIds}
            rowKey="id"
            rowHeight = {(rowData:any) => (props.rowHeight? props.rowHeight(rowData) : 40)}
            onRowClick = {props.onRowClick}
            rowExpandedHeight = { 40}
            width={props.width}
            height={props.height}
            data={props.treeData}
            virtualized={true}
            showHeader={false}
            onExpandChange={(isOpen:boolean, rowData:any) => {
              props.onExpand(isOpen, rowData.id);
            }}
            rowClassName={(rowData:ITreeNode) => clsx({
              [overrideClasses.rightColumn]: true,
              [overrideClasses.row]:!props.hover,
              [overrideClasses.rowHover]: props.hover,
              [overrideClasses.selected]: props.selectable && props.selected?.includes(rowData.id) ? true : false,
             })}
            renderTreeToggle={(icon, rowData:any) => {
              return props.renderTreeToggle(icon,rowData);
            }}
          >
            <Column width={900} treeCol={true} align='left' verticalAlign='middle' >
            {/*
 // @ts-ignore */}
            <HeaderCell>Tree</HeaderCell>
            {/*
 // @ts-ignore */}
            <Cell align='center' verticalAlign='middle' >
              {
                rowData => {
                  return (
                    props.treeNode(rowData as unknown as ITreeNode)
                  )
                }
              }
            </Cell>
            </Column>
            {
              props.column1 || props.column2 ? 
              <ColumnGroup fixed= { 'right'} header="Actions" align='right' verticalAlign='middle' >
              {
                props.column1 ?
                (<Column fixed={'right'} width={30} verticalAlign='middle' align='left'>
                {/*
    // @ts-ignore */}
                <HeaderCell>Invert</HeaderCell>
                {/*
    // @ts-ignore */}
                <Cell className={overrideClasses.invertCell} align='right' verticalAlign='middle' >
                  {
                    rowData => {
                      return props.column1? props.column1(rowData as unknown as ITreeNode):null;
                    }
                  }
                </Cell>
              </Column>) : null
              }
              {
                props.column2 ?
                <Column fixed={'right'} width={40} verticalAlign='middle' align='left'>
                {/*
   // @ts-ignore */}
                <HeaderCell>ShowHide</HeaderCell>
                {/*
   // @ts-ignore */}
                <Cell  align='right' verticalAlign='middle'>
                  {
                    rowData => {
                        return props.column2? props.column2(rowData as unknown as ITreeNode):null;
                    }
                  }
                </Cell>
              </Column> : null
              }
              
              </ColumnGroup>
              :null
            }

 
          </Table>
      );
  }

  export default RTree