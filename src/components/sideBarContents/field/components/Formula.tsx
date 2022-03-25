import React from 'react'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const filter = createFilterOptions<any>();

interface FormulaProps {
    options:any[],
    placeholder:string
}

const useStyles = makeStyles( theme => ({
    root: {
        margin: theme.spacing(2)
    }
}))
function Formula(props:FormulaProps) {
        const classes = useStyles()
        const [value, setValue] = useState<string>("")

        const handleInputChange = (event:any, newValue:any, reason:any) => {
            setValue(newValue)
        }
        const handleOptionsChange = (event:any,newValue:any,reason:any) => {
            if(newValue === null)
            {
                if(reason === 'clear') {
                    setValue("");
                }
                return
            }
            if (typeof newValue === 'string') {
                let index = value.lastIndexOf("$")
                if(index === -1)
                setValue(value + " " + newValue);
                else{
                    let beforeDollar = value.substr(0,index);
                    setValue(beforeDollar + newValue)
                }
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue(value + " " + newValue.inputValue);
              } else {
                setValue(value + " " + newValue);
              }
            
        }
        return(
        <div className={classes.root}>
        <Autocomplete
            freeSolo
            id="formula-autocomplete"
            value={value}
            onChange={handleOptionsChange}
            onInputChange={handleInputChange}
            options={props.options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option;
              }}
            filterOptions={(options, params) => {
                let split =value.split("$")
                let newParams = {...params, inputValue: (split[split.length-1] || "")}
                const filtered = filter(options, newParams);
        
                return filtered;
              }}
            renderInput={(params) => {
              console.log(params)
              return(<TextField
                {...params}
                multiline
                variant="standard"
                label="Formula"
                placeholder={props.placeholder}
              />)
            }}
        />
        </div>

        )
}

export default Formula
