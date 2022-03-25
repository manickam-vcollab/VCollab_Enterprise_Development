import React from 'react'
import {useStyles} from "./styles";
type CalloutProps = {
    arrowStartPos: [number,number],
    visible: boolean,
    children: any
}
function Callout(props:CalloutProps) {
    const classes = useStyles({arrowPos: props.arrowStartPos, arrowSize:7, color:"yellow"});
    return (
        <div style={{display: props.visible ? "flex" : "none"}}
            className = {classes.root}
        >
        {props.children}
        </div>
    )
}

export default Callout
