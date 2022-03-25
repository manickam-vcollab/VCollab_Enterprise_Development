import React from 'react'
import BackgroundLayer from './BackgroundContainer'
import ViewerBackLayer from './ViewerBackContainer'
import ViewerLayer from './ViewerContainer'
import Label3DLayer from './LabelsContainer'
type Props = {
    parentRef:any
}
function LayerStack(props:Props) {
    return (
        <>
            <BackgroundLayer parentRef={props.parentRef}/>
            <ViewerBackLayer parentRef={props.parentRef}/>
            <ViewerLayer parentRef={props.parentRef}/>
            <Label3DLayer parentRef={props.parentRef}/>
        </>
    )
}

export default LayerStack
