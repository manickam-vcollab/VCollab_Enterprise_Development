import React, {forwardRef} from 'react'
import AdjustIcon from '@material-ui/icons/Adjust'
import DotIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';
type LabelAnchorProps = {
    pos: [number,number],
    visible: boolean
}

const useStyles = makeStyles(theme => (
    {
        dot: {
            //fontSize: props.size + 'px',
            width: '10px',
            height: '10px',
            transform: `translate(-5px,-12px)`
        }
    }
))

function LabelAnchor(props:LabelAnchorProps, ref:any ) {
    const pos = props.pos;
    const classes = useStyles({size:10});
    return (
        <div ref = {ref} style={{ 
            visibility: props.visible ? 'visible' : 'hidden' , 
            position:'absolute', 
            top:`${pos[1]}px`, 
            left:`${pos[0]}px`, 
            width:0, 
            height:0}}>
            {/* <AdjustIcon classes={{root: classes.root}} /> */}
            <DotIcon classes={{root:classes.dot}}/>
        </div>
    )
}

export default forwardRef(LabelAnchor)
