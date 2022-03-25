import React from 'react'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add';
import {useStyles } from '../../../../../shared/RsTreeTable/styles/TreeNodeStyle'
import ToggleButton  from '@material-ui/lab/ToggleButton';
import Grid from '@material-ui/core/Grid';
import { ITreeNode } from '../../../../../shared/RsTreeTable'
import { makeStyles } from '@material-ui/core';

const Add = (props:any) => {
        const classes = useStyles();
        return <AddIcon fontSize='small' className={clsx({[classes.actionShow]: props.visibility,
                                          [classes.actionHide]: !props.visibility,
                                    })} 
                width='16' height='16' />
}

const useBtnStyles = makeStyles(theme => ({
    toggleBtnSmall : {
        padding: 1
    }
}))
interface AddCellProps {
    node: ITreeNode,
    selected: boolean,
    onToggle : (node:ITreeNode) => void
}

function AddCell(props:AddCellProps) {
    
    const classes = useStyles();
    const toggleBtnClasses = useBtnStyles();
    return (
        <Grid container alignItems='center' className={classes.hideText} style={{height:'100%',width:'100%'}}>
            <Grid item>
                <ToggleButton style={{marginLeft:10}} classes={{sizeSmall:toggleBtnClasses.toggleBtnSmall}} size="small"  
                selected={props.selected}
                onClick = {() => props.onToggle(props.node)}>
                <Add  visibility = {props.node.state.visibility} >
                </Add>
                </ToggleButton>
            </Grid>
        </Grid>
    )
}

export default AddCell;

