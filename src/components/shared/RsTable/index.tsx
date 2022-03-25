import React from 'react'
import { Table,Cell,Column,ColumnGroup,HeaderCell } from 'rsuite-table';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

    '@global': {
        '.rs-table-scrollbar-pressed .rs-table-scrollbar-handle':{
          backgroundColor:theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.6)':'rgba(25, 25, 25, 0.05)',
        },
        '.rs-table-scrollbar': {
          background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.05)':'rgba(25, 25, 25, 0.05)',
          position: 'absolute'
        },
        '.rs-table-scrollbar-active': {
          background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.1)':'rgba(25, 25, 25, 0.1)'
        },
        '.rs-table-scrollbar-handle': {
          position: 'absolute',
          background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.5)':'rgba(25, 25, 25, 0.5)',
          borderRadius: '4px'
        },
        '.rs-table-cell-group-right-shadow': {
          boxShadow: 'none'
        } 
    },
}))

//@ts-ignore
export class TableWrapper extends Table {
  componentDidUpdate(prevProps:any, prevState:any) {
    const { data, height } = prevProps;
//@ts-ignore
    if (data !== this.props.data) {
      //@ts-ignore
      this.calculateRowMaxHeight();
      //@ts-ignore
      this.props.onDataUpdated?.(this.props.data, this.scrollTo);

    } else {
      //@ts-ignore
      this.updatePosition();
    }

    if (
      //@ts-ignore
      data !== this.props.data ||
      //@ts-ignore
      height !== this.props.height ||
      //@ts-ignore
      prevState.contentHeight !== this.state.contentHeight ||
      //@ts-ignore
      prevState.expandedRowKeys !== this.state.expandedRowKeys ||
      //@ts-ignore
      prevProps.expandedRowKeys !== this.props.expandedRowKeys
    ) {
      //@ts-ignore
      this.calculateTableContextHeight(prevProps);
    }
    //@ts-ignore
    this.calculateTableContentWidth(prevProps);
  }
}

function RsTable(props:any) {
    const classes = useStyles();
    return (
      //@ts-ignore
        <TableWrapper {...props} bordered={false} cellBordered={false} hover={false}>
            { 
                props.children
            }
        </TableWrapper>
    )
}

export {Cell,ColumnGroup,Column,HeaderCell};
export default RsTable
