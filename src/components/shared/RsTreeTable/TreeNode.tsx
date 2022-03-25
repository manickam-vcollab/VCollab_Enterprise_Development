import React from 'react'
import Checkbox from '../checkbox'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {useStyles} from './styles/TreeNodeStyle'
import { ITreeNode } from '.'
import Title from '../RsTreeWithSearch/utilComponents/TitleNode'
interface ITreeNodeProps {
    node: ITreeNode,
    rowData?: any,
    onCheck: (isChecked:boolean,id:string, undoable?:boolean) => void,
    children: any
}

function TreeNode(props:ITreeNodeProps) {
    const node = props.node;
    const classes = useStyles({});

    return (
        <Grid container className={node.state.visibility ?classes.actionShow:classes.actionHide} alignItems='center'>
            <Grid item>
            <Checkbox style={{opacity:node.state.visibility ? 1.0 : 0.5}} size='small' checked= {node.state.checked} indeterminate={node.state.partiallyChecked} disableRipple onChange = {(e:any) => props.onCheck(e.target.checked,node.id, true)}></Checkbox>
            </Grid>
            <Grid item>
            <Title rowData={props.rowData ? props.rowData : props.node}/>
            </Grid>
        </Grid>
    )
}

export default TreeNode
