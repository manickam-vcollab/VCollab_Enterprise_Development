import React from 'react'
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
function SearchIcon(props:{onClick:() => void}) {
    
    return (
        <ToolTip title='Search'>
        <IconButton
        onClick={() => props.onClick()}>
            <Search/>
        </IconButton>
      </ToolTip>
    )
}

export default SearchIcon
