import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useAppSelector } from '../../../../../store/storeHooks'
import { selectSearchString } from '../../../../../store/sideBar/productTreeSlice'

const Header = (props:any) => {
        return(
            <Grid item>
            <Typography>
            {props.title}
            </Typography>
            </Grid>
        )   
}

const Body = (props:any) => {
    
    return(
        <Grid container item style={{padding:10}} justify='flex-start'>
            <Grid item>
                <Typography align='left'>
                {props.message}
                </Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag Name"
            value = {props.input}
            onChange = {(e) => props.setInput(e.target.value)}
            type="text"
            fullWidth
          />
            </Grid>
        </Grid>
    )   
}

const Footer = (props:any) => {
    return(
        <Grid container item alignItems='center' justify='space-evenly'>
                <Grid item>
                    <Button color='primary' onClick={() => props.onAdd(props.input)}>Add</Button>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={props.onCancel}>Cancel</Button>
                </Grid>
        </Grid>
    )   
}

function AddTagNoModal(props:any) {
    const [input , setInput] = useState(useAppSelector(selectSearchString));
    return (
        <Grid container direction='column' >
        <Header {...props}/>
        <Body {...props} input = {input} setInput={setInput}/>
        <Footer {...props} input = {input}/>
        </Grid>
    )
}

export default AddTagNoModal
