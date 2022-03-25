import React, { useEffect, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
function AutoSize(props:any) {
    
    return (
        <AutoSizer>
            {
              ({width,height}) => props.children({width,height})
            }
        </AutoSizer>
            
    )
}

export default AutoSize
