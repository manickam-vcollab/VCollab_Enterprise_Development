import React from 'react'
import TextField from '@material-ui/core/TextField'
import Fuse from 'fuse.js'
import { createStyles, makeStyles } from '@material-ui/core'
import { useEffect } from 'react'
import { useState } from 'react'
import { getSearchInput } from '../../utils/search'
interface SearchProps{
    text:string,
    placeholder:string,
    searchPool:any,
    textBoxWidth?: number,
    getAttribKeys: (data:any) => string[],
    onChange: (text:string,results: any[]) => void
    onClear: () => void
}

const useStyles = makeStyles(createStyles({
    root: {
        margin:5,
        display: 'flex',
        alignItems: 'center',
        
    },
    dense: {
        paddingTop: 5
    },
    input: (props: any) => ({
      width: props.textBoxWidth ? props.textBoxWidth : 220
    })
}
))


function SearchBox(props:SearchProps) {
    const classes = useStyles(props);
    const [fuse,setFuse] = useState<null|any>(null);

    useEffect(() => {
        let options = {
            includeScore: false,
            keys: props.getAttribKeys(props.searchPool),
            findAllMatches:true,
            includeMatches:true,
            threshold: 0.2,
            useExtendedSearch: true,
            minMatchCharLength: 2
        }
        let fuse = new Fuse([...Object.values(props.searchPool)],options)
        setFuse(fuse)
    },[props.searchPool])

    const handleOnChange = (e:any) => {
        let text = e.target.value;
        let searchInput = getSearchInput(text);
        let r:any[] = (fuse as any)?.search(searchInput);
        if(text.length > 2)
        props.onChange(text, r)
        else
        props.onChange(text, [])
    }
    
    useEffect(() => {
        let searchInput = getSearchInput(props.text);
        let r:any[] = (fuse as any)?.search(searchInput) || [];
        if(props.text.length > 2)
        props.onChange(props.text, r)
        else
        props.onChange(props.text, [])
    },[props.text, fuse])
    
    return (
            <div className={classes.root}>
            <TextField
            classes={{root:classes.input}}
            placeholder={props.placeholder}
            margin='dense'
            value={props.text}
            onChange={handleOnChange}
            inputProps={{ 'aria-label': props.placeholder }}
            />
            </div>
           
          
    )
}

export default SearchBox
