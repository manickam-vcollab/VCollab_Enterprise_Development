import React from 'react'
import clsx from 'clsx'
import SwapIcon from '@material-ui/icons/SwapHoriz';
import {useStyles } from './styles/TreeNodeStyle'
import IconButton  from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { ITreeNode } from '.';

const InvertIcon = (props:any) => {
        const classes = useStyles();

        return <SwapIcon fontSize='small' className={clsx({[classes.actionShow]: props.visibility,
                                          [classes.actionHide]: !props.visibility,
                                    })} 
                width='16' height='16' />
}

interface InvertCellProps {
    node: ITreeNode,
    onClick : (node:ITreeNode, undoable?: boolean) => void,
    selected? : boolean,
}

function InvertCell(props:InvertCellProps) {
    
    const classes = useStyles();
    return (
        props.node.children.length > 0 ? 
        <Grid container alignItems='center' className={props.selected ? classes.selectedHideText : classes.hideText} style={{height:'100%',width:'100%'}}>
            <Grid item>
                <IconButton size="small"  onClick = {() => props.onClick(props.node, true)}>
                <InvertIcon visibility = {props.node.state.visibility} >
                </InvertIcon>
                </IconButton>
            </Grid>
        </Grid>
        :null
    )
}

export default InvertCell;

