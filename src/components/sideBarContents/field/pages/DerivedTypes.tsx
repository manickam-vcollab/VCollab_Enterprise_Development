import React, { useState } from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import Body from '../components/derivedTypes/Body';
import Back from '../shared/BackIcon';
import Select from '../shared/SelectModel';
import Add from '../shared/Add';
import Footer from '../shared/Footer';
import { addUserFieldState, FieldType, removeUserDerivedType, selectDerivedTypes, Source } from '../../../../store/sideBar/fieldSlice';
function Steps() {
    const dispatch = useAppDispatch();
    const [isEdit,setIsEdit] = useState(false);
    const steps = useAppSelector(selectDerivedTypes)
    const selected = Object.values(steps).filter(item => item.state.selected === true);

    //header
    const onClickBackIcon = () => {
        dispatch(goBack())
    }
    const getHeaderLeftIcon= () => {
        return (
        <Back onClick={() => onClickBackIcon()}/>
        );
    }
    const handleAdd=() => {
        dispatch(addUserFieldState({fieldType:FieldType.Derived}))
    }

    const getHeaderContent = () => {

        return (<Title text="Derived Types" group="Field"/>)
    }

    const getAction = () => {
        return (<Select></Select>)
    }

    const getBody = () => {
        return <Body/>
    }
    const handleEdit = () => {

    }

    const handleDelete = () => {
        if (selected.length === 1 && selected[0].source === Source.USER ) {
            dispatch(removeUserDerivedType({nodeId:selected[0].id}));
        }
    }
    const getFooter = () => {
        return( selected.length === 1 && selected[0].source === Source.USER ?
        <Footer onEdit={handleEdit} onDelete = {handleDelete}/> :
        null)
    }
    return (
        <SideBarContainer
            headerRightIcon = {false && <Add onClick={handleAdd} />}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {false && getFooter()}
        />
    )
}

export default Steps
