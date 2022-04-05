import React from 'react';
import { Scrollbars } from "react-custom-scrollbars";

import useStyles from './style'

export default function Scrollbar(props:any) {

    const classes = useStyles();
    return(

        <Scrollbars style={{ height:'100%',width:'100%'}}
        
        renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style}} className={classes.Scrollbar}/>
        }
        
        renderThumbHorizontal={({ style, ...props }) =>
            <div {...props} style={{ ...style}} className={classes.Scrollbar}/>
        }>

           {props.children}

        </Scrollbars>

    )
}

