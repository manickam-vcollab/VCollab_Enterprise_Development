import React from 'react'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({

}));

function SelectAction(props:any) {
    
    return (
        <FormControl style={{width:'100%', margin:'auto',padding:2}}>
            <InputLabel>{props.label ?? "Apply To"}</InputLabel>
            <Select
            {...props}
            >
            {props.children}
            </Select>
        </FormControl>

    )
}

export default SelectAction
