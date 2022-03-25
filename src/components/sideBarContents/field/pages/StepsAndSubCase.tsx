import React, { useState } from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import Body from '../components/step&subcase/Body';
import Back from '../shared/BackIcon';
import Select from '../shared/SelectModel';
import Add from '../shared/Add';
import Footer from '../shared/Footer';
import { addUserFieldState, FieldType, selectSteps, Source , removeUserStepsAndSubcase } from '../../../../store/sideBar/fieldSlice';

function Steps() {
    const dispatch = useAppDispatch();
    const [isEdit,setIsEdit] = useState(false);
    const steps = useAppSelector(selectSteps)
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
        dispatch(addUserFieldState({fieldType:FieldType.Step}))
    }

    const getHeaderContent = () => {

        return (<Title text="Steps & Subcases" group="Field"/>)
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
            dispatch(removeUserStepsAndSubcase({nodeId:selected[0].id}));
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
