import React from 'react'
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Back from '@material-ui/icons/ArrowBack'

function BackIcon(props:{onClick:() => void}) {
    
    return (
        <ToolTip title='Back'>
        <IconButton
        onClick={() => props.onClick()}>
        <Back/>
        </IconButton>
        </ToolTip>
    )
}

export default BackIcon
