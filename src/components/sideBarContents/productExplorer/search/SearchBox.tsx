import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Fuse from 'fuse.js';
import { useState, useEffect, useRef } from 'react';
import { getSearchInput} from "../../../utils/search";
import { selectPrevSearches,selectSearchHints, selectProductTreeData,updatePrevSearches, setSearchResults, selectSearchString, setSearchString } from '../../../../store/sideBar/productTreeSlice';
import { useAppDispatch , useAppSelector} from '../../../../store/storeHooks';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(createStyles({
  input: {
    flex: 1
  }
}))

function SearchBox() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const treeData = useAppSelector(selectProductTreeData);
    const treeDataRef = useRef(treeData);
    const prevSearches = useAppSelector(selectPrevSearches);
    const searchHints = useAppSelector(selectSearchHints);
    const searchString = useAppSelector(selectSearchString);
    const [fuse, setFuse] = useState(null);

    const [isOpen, setisOpen] = useState(false);

    const getAttrbKeys = (treeArray:any[]) => {
        let keys = new Set();
        for (let i=0; i< treeArray.length; i++){
          if(treeArray[i].pid){
            let attr = treeArray[i].attributes;
            Object.keys(attr).forEach(key => {
              keys.add("attributes."+key);
            })
          }
        }
        return ['title',...keys] as string[];
    
    }

    const generateOptions = () => {
        let options:any = {};
        prevSearches.forEach((e:string) => {
            options[e] = Object.keys(options).length;
        })
        searchHints.forEach((e:string) => {
            options[e] = Object.keys(options).length;
        })
        return Object.keys(options) as string[]
    }

    const handleSearch = (e:any) => {
        if (!e) {
          return
        } 
        const query = e? e.target.value : "";
         dispatch(setSearchString(query));
     }
     const handleAutoComplete = (e:any) => {
         if(e.key === "Enter")
         return;
         dispatch(setSearchString(e.target.outerText));
     }
     const handleAutoCompleteOpenState = (v:boolean) => {
       setisOpen(v);
     }

     useEffect(() => {
        let options = {
              includeScore: false,
              keys: getAttrbKeys([...Object.values(treeData)]),
              ignoreLocation: true,
              includeMatches:false,
              threshold: 0.2,
              useExtendedSearch: true,
              minMatchCharLength: 2
          }
          let fuse:any = new Fuse([...Object.values(treeData)],options);
          setFuse(fuse);
      }, [dispatch,treeData])
  
      useEffect(() => {
          
          let searchInput = getSearchInput(searchString);
          let r:any[] = (fuse as any)?.search(searchInput);
          if(r)
          dispatch(setSearchResults(r.filter(e => e.item.children.length === 0)));
      },[searchString,fuse])

    return (
        <Grid container item alignItems='center'>
          <Grid item style={{width: "200px"}}>
          <Autocomplete
          size = 'small'
          color = 'inherit'
          disableClearable
          clearOnBlur = {false}
          open = {false}
          forcePopupIcon = {false}
          onOpen = {(e:any) => {handleAutoCompleteOpenState(true)}}
          onClose = {(e:any) => {handleAutoCompleteOpenState(false)}}
          onKeyPress = {(e:any) => {
            if(e.code === 'Enter' || e.code === 'NumpadEnter'){
              setisOpen(false);
            }
          }}
          id="free-solo-search"
          value={searchString}
          options={generateOptions()}
          onChange={handleAutoComplete}
          onInputChange={handleSearch}
          renderOption={(option, { inputValue }) => {
              const matches = match(option, inputValue);
              const parts = parse(option, matches);
      
              return (
                <div>
                  {parts.map((part:any, index:any) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            }}
          renderInput={(params:any) => (
          <>
          <InputBase
              className={classes.input}
              {...params}
              margin="dense"
              placeholder="Search"
              //inputProps={{ ...params.InputProps, type: 'search', endAdornment: false ? null : <IconButton size='small' onClick={() => dispatch(updatePrevSearches(searchString))}> <AddIcon/></IconButton> }}
              
          />
          </>
          )}
          />
          </Grid>
        </Grid>
    )
}

export default SearchBox
