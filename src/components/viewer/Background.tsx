import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { selectIsImageActive, selectColor, selectImage } from '../../store/sideBar/sceneSlice'
import {useAppSelector} from '../../store/storeHooks'

const useStyles = makeStyles((theme) => (
{
    root: (props:any) => ({
        position:'absolute', 
        backgroundImage: 'linear-gradient(to bottom,' + props.colorString+')', 
        width:'100%',
        height:'100%'
    })
}))

function Background(props:any) {
    const isImageActive = useAppSelector(selectIsImageActive);
    const colors = useAppSelector(selectColor);
    const file = useAppSelector(selectImage);
    const [colorString, setColorString] = useState('');
    const classes = useStyles({colorString});
    useEffect(() => {
        let s = '';
        colors.forEach((e,i) => {
            if(i === colors.length-1) {
                let c = e.color;
                s += `rgba(${c.r},${c.g},${c.b},${c.a})`
            }
            else
            s += `rgba(${e.color.r},${e.color.g},${e.color.b},${e.color.a}), ` 
        });
        setColorString(s);
    },[colors])
        
    return (
        isImageActive ?
        <img src={file} style={{position:'absolute', width:'100%', height:'100%'}}>
        </img>
        :
        <div className={classes.root}>
            
        </div>
    )
}

export default Background
