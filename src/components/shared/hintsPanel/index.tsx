import MuiTypography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Clear';
import React, { useEffect, useRef, useState } from 'react'

//@ts-ignore
import { Rnd } from 'react-rnd'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { JsxElement } from 'typescript'

const useStyles = makeStyles(theme => ({
    root: {
         overflowY: "hidden",
         overflowX:"hidden",
        // width: "100%",
        // height:"100%",
        // scrollbarColor: "rgba(0,0,0,.3) rgba(0,0,0,0.00) ",
        // scrollbarWidth: 'thin',
        // '&::-webkit-scrollbar': {
        //   width: '0.4em'
        // },
        // '&::-webkit-scrollbar-track': {
        //   boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        //   webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: 'rgba(0,0,0,.3)',
        //   outline: '1px solid slategrey'
        // },
    },
    noResizeHandle: {
        cursor:'unset'
    },
    customHandle: {
        height:2
    },
    dragIcon: {
        width:'20%',
        height:5,
        backgroundColor:theme.palette.grey[500],
        alignSelf: 'center'
    },
    footer: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0
    }
}))

function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
         <span className={clsx(classes.dragIcon,classes.customHandle)}></span>
         <Divider ></Divider>
        </div>
    )
}

function Body(props:SearchHintsProps) {
    const classes = useStyles();
    return(
            props.children ? 
            props.children :
        <List style={props.style} component='div' aria-label="search hints list" >
            {
                props.data && props.data.map((item) => {
                    return(
                        <ListItem onClick={() => props.onClick(item)} button classes={{root:classes.listItem}}>
                        <ListItemText >{item}</ListItemText>
                        {
                            props.showDelete ?
                            <ListItemSecondaryAction>
                            <IconButton onClick={() => props.onDelete(item)} size='small' edge="end" aria-label="delete">
                            <DeleteIcon ></DeleteIcon>
                            </IconButton>
                            </ListItemSecondaryAction>
                            :null
                        }
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

type SearchHintsProps = {
    style?:any,
    data?: any[],
    children?:any,
    showDelete?: boolean,
    onClick: (s:string) => void
    onDelete: (s:string) => void
}
function SearchHints(props:SearchHintsProps) {
    const classes = useStyles();
    const [height,setHeight] = useState(100);
    const [maxHeight, setMaxHeight] = useState(300);
    return (
        <>
        <Rnd 
            disableDragging
            enableResizing={true}
            resizeHandleStyles={
                {
                    top:{cursor:'unset'},
                    topLeft: {cursor:'unset'},
                    topRight: {cursor:'unset'},
                    left: {cursor:'unset'},
                    right: {cursor:'unset'},
                    bottomLeft: {cursor:'unset'},
                    bottomRight: {cursor:'unset'}
                }}
            style={{position:'relative'}}
            size={{width:'100%',height:height+15}}
            onResize={(e, direction, ref, delta, position) => {
                if(ref.offsetHeight < maxHeight)
                setHeight(ref.offsetHeight)
                }
            }
            default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200,
              }}
            >
            <Body style={{height,overflow:'hidden'}} data={props.data} children={props.children} onClick={props.onClick} onDelete={props.onDelete}/>
            <Footer/>
            </Rnd>
        </>
    )
}

export default SearchHints
