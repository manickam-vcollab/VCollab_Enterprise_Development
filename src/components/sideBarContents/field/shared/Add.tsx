import React from 'react'
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'

function AddIcon(props:{onClick:() => void}) {
    
    return (
        <ToolTip title='Add'>
        <IconButton
        onClick={() => props.onClick()}>
        <Add/>
        </IconButton>
        </ToolTip>
    )
}

export default AddIcon
