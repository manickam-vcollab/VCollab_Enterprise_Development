import React from 'react'
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear'

function BackIcon(props:{onClick:() => void}) {
    
    return (
        <ToolTip title='Close'>
        <IconButton
        onClick={() => props.onClick()}>
        <Clear/>
        </IconButton>
        </ToolTip>
    )
}

export default BackIcon
