import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import { FieldType, selectDerivedTypes, selectSteps, selectVariables, Source, Field } from '../../../../store/sideBar/fieldSlice';
import Formula from '../components/Formula'
import { useState ,useEffect} from 'react';
import {HeaderLeftIcon,HeaderContent,HeaderAction} from '../shared/Header'
import {makeStyles} from '@material-ui/core/styles'

interface FieldEditProps {
    field:{[id:string]:Field}
    fieldType: FieldType,
    back: () => void
}

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    action: {
        margin: theme.spacing(2)
    }
}))

function Action(props:FieldEditProps) {
    const classes = useStyles()

    return(
        <div className={classes.action}>
            <Grid container justify='space-around'>
                <Grid item>
                <Button variant="contained" color="primary">Confirm</Button>
                </Grid>
                <Grid item>
                <Button variant="contained" color="secondary">Cancel</Button>
                </Grid>
            </Grid>
        </div>
    )
}
function FieldEdit(props:FieldEditProps) {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const [userFields, setUserFields] = useState<Field[]>([])
    const [selected, setSelected] = useState<Field[]>([])
    useEffect(() => {

        if(props.field)
        {
            setUserFields(Object.values(props.field).filter( (f) => f.source === Source.USER));
            setSelected(userFields.filter((f) => f.state.selected === true))
        }

    },[props.field])
        //header
        const onClickBackIcon = () => {
            props.back()
        }
    
        const handleSelect = (e:any) => {
            let id:string = e.target.value;
            let changed = userFields.find(item => item.id == id);

            changed ? setSelected([changed]) : setSelected([]);
        }
        const getBody = () => {
            return (
            <>
            <div className={classes.root}>
                <Formula placeholder="formula" options={["Principle Stress","Von Mises Stress"]}/>
            </div>
            </>)
        }
        const handleEdit = () => {
    
        }
    
        const handleDelete = () => {
    
        }
    return (
        <SideBarContainer
            headerContent = {<HeaderContent text="User Defined" group="Field"/>}
            headerAction = {
            <HeaderAction applyTo={selected[0] ? selected[0] : {id:"",name:""}} 
            options={userFields}
            onChange={handleSelect}
            />
            }
            body = {getBody()}
            footer = { <Action {...props}></Action>}
        />
    )
}

export default FieldEdit
