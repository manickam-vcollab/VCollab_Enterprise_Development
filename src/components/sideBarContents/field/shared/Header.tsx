import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Back from '../shared/BackIcon';
import Title from '../../../../components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import SelectAction from '../../../../components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction'
const HeaderLeftIcon= (props:{onClick:() => void}) => {
    return (
    <Back onClick={() => props.onClick()}/>
    );
}

const HeaderContent = (props:{text:string, group:string}) => {

    return (<Title text={props.text} group={props.group}/>)
}

const HeaderAction = (props:{applyTo:{id:string, name:string}, 
                        onChange: (e:any) => void,
                        options: {id:string, name:string}[]}
                        ) => {
    return(<SelectAction
        labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
        value={props.applyTo.id}
        onChange={props.onChange}
        MenuProps={{
            disablePortal: true,
            anchorOrigin: {
            vertical:"bottom",
            horizontal:"left",
        },
        getContentAnchorEl: null
        }}
  >
    {props.options.map( opt => <MenuItem value={opt.id}>{opt.name}</MenuItem> )}
    </SelectAction>)
}

export {HeaderLeftIcon, HeaderContent, HeaderAction};
