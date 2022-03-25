import React from 'react'
import EyeIcon from '../../icons/eyeIcon';
import EyeSlashIcon from '../../icons/eyeSlashIcon';
import IconButton  from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {useStyles } from './styles/TreeNodeStyle'
import { ITreeNode } from '.';

const VisiblilityIcon = (props:any) => {
    const classes = useStyles();
    if(props.visibility === true){
        return (
            <IconButton style={props.style} size='small' onClick = {() => props.onClick(false,props.node, true)}>
                <EyeIcon fontSize='small' className={props.visibility ? classes.actionShow : classes.actionHide}  width='16' height='16' />
            </IconButton>
        )
    }
    else{
        return (
            <IconButton style={props.style} size='small' onClick = {() => props.onClick(true,props.node, true)}>
                <EyeSlashIcon fontSize='small' className={props.visibility ? classes.actionShow : classes.actionHide}  width='16' height='16'/>
            </IconButton>
        )
    }
}

interface ShowHideProps {
  node: ITreeNode
  onToggle: (toShow:boolean,node:ITreeNode, undoable?: boolean) => void
  selected? : boolean
}

function ShowHide(props:ShowHideProps) {
    const classes = useStyles();
    const node = props.node;
    return (
        <Grid container alignItems='center' className={props.selected ? classes.selectedHideText:classes.hideText} style={{width:'100%',height:'100%'}}>
            <Grid item>
            <VisiblilityIcon 
                style={{marginLeft:10}}
                node = {node} 
                visibility={node.state.visibility} 
                onClick={props.onToggle}></VisiblilityIcon>
            </Grid>
        </Grid>
    )
}

export default ShowHide;

