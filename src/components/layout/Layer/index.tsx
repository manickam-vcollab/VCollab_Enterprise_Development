import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useAppSelector } from '../../../store/storeHooks'
import { Layers, selectActiveLayers } from '../../../store/windowMgrSlice'

type LayerProps = {
    id: Layers,
    children:any
}

const useStyles = makeStyles(theme => ({
    root: (props:any) => ({
        position:'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: props.isActive ? 'all' : 'none'
    })
}))
function Layer(props: LayerProps) {
    const activeLayers = useAppSelector(selectActiveLayers);
    const isActive = activeLayers.includes(props.id); 
    const classes = useStyles({isActive})
    return (
        <div id={'windows_container' + props.id} className={classes.root}>
            {
                props.children
            }
        </div>
    )
}

export default Layer
