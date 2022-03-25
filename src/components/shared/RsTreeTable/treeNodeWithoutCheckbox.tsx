import React from 'react'
import Checkbox from '../checkbox'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {useStyles} from './styles/TreeNodeStyle'
import { ITreeNode } from '.'
interface ITreeNodeProps {
    node: ITreeNode,
    onCheck: (isChecked:boolean,id:string) => void,
    children: any
}

function TreeNodeWithoutCheckbox(props:ITreeNodeProps) {
    const node = props.node;
    const classes = useStyles({});

    return (
        <Grid container className={node.state.visibility ?classes.actionShow:classes.actionHide} alignItems='center'>
            <Grid item>
            <Typography 
                style={{verticalAlign:'middle'}}
                component="span" className={node.state.highlighted ? classes.hightlight : ""}                
            >
                    {node.title}
            </Typography>
            </Grid>
        </Grid>
    )
}

export default TreeNodeWithoutCheckbox
