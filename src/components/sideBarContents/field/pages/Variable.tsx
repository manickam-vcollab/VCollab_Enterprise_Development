import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SearchBox from '../../../shared/searchBox';
import Body from '../components/variables/Body';
import Footer from '../shared/Footer';
import Back from '../shared/BackIcon';
import Add from '../shared/Add';
import Select from '../shared/SelectModel';
import { addUserFieldState, FieldType, removeUserVariable, selectVariables, Source } from '../../../../store/sideBar/fieldSlice';
import FieldEdit from './FieldEdit'
import { useState, useEffect } from 'react';

function Variable() {
    const dispatch = useAppDispatch();
    const [isEdit,setIsEdit] = useState(false);
    const variables = useAppSelector(selectVariables)
    const selected = Object.values(variables).filter(item => item.state.selected === true);

    useEffect(() => {
        return () => {
            setIsEdit(false)
        }
    },[])
    //header
    const onClickBackIcon = () => {
        dispatch(goBack())
    }
    const getHeaderLeftIcon= () => {
        return (
        <Back onClick={() => onClickBackIcon()}/>
        );
    }
    const handleAdd = () => {
        dispatch(addUserFieldState({fieldType:FieldType.Variable}))
    }
    const getHeaderRightIcon= () => {
        return (
        <Add onClick={() => handleAdd()}/>
        )
    }

    const getHeaderContent = () => {

        return (<Title text="Variables" group="Field"/>)
    }

    const getAction = () => {
        return (<Select></Select>)
    }

    const getBody = () => {
        return <Body/>
    }

    const getFooter = () => {
        return( selected.length === 1 && selected[0].source === Source.USER ?
        <Footer onEdit={handleEdit} onDelete = {handleDelete}/> :
        null)
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleDelete = () => {
        if (selected.length === 1 && selected[0].source === Source.USER ) {
            dispatch(removeUserVariable({nodeId:selected[0].id}));
        }
    }
    return (
        isEdit ?
        <FieldEdit field={variables} fieldType={FieldType.Variable} back={() => setIsEdit(false)}></FieldEdit>
        :
        <SideBarContainer
            headerRightIcon = {false && getHeaderRightIcon()}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {false && getFooter()}
        />
    )
}

export default Variable
