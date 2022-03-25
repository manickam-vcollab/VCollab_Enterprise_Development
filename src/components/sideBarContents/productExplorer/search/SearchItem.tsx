import React from 'react'
import Checkbox from "../../../shared/checkbox"
import { useStyles } from "../../../shared/RsTreeTable/styles/TreeNodeStyle"
import clsx from 'clsx'
function SearchItem(props:any) {
    
    const classes = useStyles()
    return (
        <div className={clsx(
            {[classes.actionShow] : props.item.state.visibility,
             [classes.actionHide] : !props.item.state.visibility},
        )}>
            <div>
                <Checkbox onChange = {(e:any) => {props.onChange(e.target.checked,props.item)}} 
                disableRipple={true}
                checked = {props.item.state.checked} 
                indeterminate={props.item.state.partiallyChecked}/>
                {props.item.title}
            </div>
            <div  style = {{paddingLeft: 32}}>
                {
                    props.item.attributes?
                    Object.keys(props.item.attributes).map((attr,index) => {
                        return(<div key={index}>{attr + ": " + props.item.attributes[attr]}</div>)
                    }):
                    null
                }
            </div>
        </div>
    )
}

export default SearchItem
