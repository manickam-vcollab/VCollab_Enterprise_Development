import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import styles from './style';

import {useEffect} from 'react';

import {goBack} from 'connected-react-router/immutable';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SelectAction from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { useState} from "react";
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import {editPause, editCancel, editCollapse, editSearch, sortedNotification,NotificationType,NotificationList, selectTags, addMessage} from "../../../store/sideBar/messageSlice";

import BackButton from '../../../components/icons/back';
import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiCollapse from '@material-ui/core/Collapse';
import MuiExpandMore from '@material-ui/icons/ExpandMore';

import CardSimple from './components/cardSimple';
import CardTransfer from './components/cardTransfer';
import MuiIconButton from '@material-ui/core/IconButton';

export default function Annotations(){

    const dispatch = useAppDispatch(); 
    const classes = styles();

    const notificationList= useAppSelector(sortedNotification )
    const [allTagId,setAllTagId] = useState<number>(-1);
    const [customTagId,setCustomTagId] = useState<number>(-1);
    const tags = useAppSelector(selectTags);
    const [activeId, setActiveId] = useState(-1);

    useEffect(() => {
        const openedList = notificationList.filter(item => item.collapsed).map(item => item.id);
        let allTag = tags.find(e => e[1] === "All");
        let customTag = tags.find(e => e[1] === "Custom");
        if(allTag && customTag) {
            setAllTagId(allTag[0]);
            setCustomTagId(customTag[0]);
        }
        if (openedList.length === notificationList.length && allTag)
        setActiveId(allTagId);
        else if(customTag)
        setActiveId(customTag[0]);
    },[])
    useEffect(() => {
        const openedList = notificationList.filter(item => item.collapsed).map(item => item.id);
        let all = tags.find(e => e[1] === "All");
        let custom = tags.find(e => e[1] === "Custom");
        if(all && custom) {
            setAllTagId(all[0]);
            setCustomTagId(custom[0]);
        }
        if (openedList.length === notificationList.length && all)
        setActiveId(all[0]);
        
      },[notificationList]);

    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const onHandleSelect = (id : number) => {
        setActiveId(id);
        let tag = tags.find( t => t[0] === id);
        if(tag)
        dispatch(editSearch(tag[1]));
    }

    const getHeaderLeftIcon= () => {
        return (
         <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
    }

    const onHandlePause = (id : string, pause : boolean) => {
        // console.log(id,pause)
        if(pause)
            dispatch(editPause({id:id, value: false}));
        else
            dispatch(editPause({id:id, value: true}));
    }

    const onHandleCollapse = (id : string, boolean: boolean) => {
        setActiveId(customTagId);
        if(boolean)
        dispatch(editCollapse({id, value: false}))

        else
        dispatch(editCollapse({id, value: true}))
    }

    const onHandleCancel = (id: string) => {
       dispatch(editCancel(id));
    }

    const getAction = () => {
        return (
            <SelectAction
                labelId="messages-selection-label-id"
                id="messages-selection-id"
                value={activeId}
                onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
                MenuProps={{
                    disablePortal: true,
                    anchorOrigin: {
                        vertical:"bottom",
                        horizontal:"left",
                    },
                    getContentAnchorEl: null
                }}
            >
                { 
                    tags.filter(e => activeId !== customTagId ? e[0] !== customTagId : true).map((item) => 
                        <MuiMenuItem value={item[0]}>{item[1]}</MuiMenuItem> )
                }
            </SelectAction>
        );
    }
  
  
    const getHeaderRightIcon = () => {
        return null;
    }

    const newCollapse = (id : string) => {

        let countHide = 1;
        let hiddenId = [id];
        const index = notificationList.findIndex(item => item.id === id);

        if( index >= 0){
            for(let i = index+1; i<notificationList.length;i++){
                if(notificationList[i].collapsed === false){
                    countHide= countHide+1;
                    hiddenId = [...hiddenId, notificationList[i].id]
                }
                else
                    break;
            }
        
            if(index > 0 && notificationList[index -1].collapsed === false){
                return(null);
            }

            return(
                <div className={classes.card}>
                    <MuiGrid container onClick={() => { countHide === 1 ? onHandleCollapse(id,false) :hiddenId.map(item => onHandleCollapse(item,false))}}>
                        <MuiGrid item xs={1}></MuiGrid>
                        <MuiGrid item xs={9} className={classes.notification}>
                            <MuiTypography >
                                {`${countHide} Notification`} 
                            </MuiTypography>
                        </MuiGrid>
                        <MuiGrid item>
                            <MuiIconButton size="small">
                                <MuiExpandMore />
                            </MuiIconButton>
                        </MuiGrid>
                    </MuiGrid>
                </div>
            )
        }
    }

    const getCard = (item : NotificationList) => {
        switch(item.card.type){
            case(NotificationType.SIMPLE_MESSAGE):
                return(
                    <CardSimple item={item} handleCollapse={onHandleCollapse}/>
                )
            case(NotificationType.NETWORK_TRANSFER_MESSAGE):
                return(
                    <CardTransfer item={item} handleCollapse={onHandleCollapse} handlePause={onHandlePause} handleCancel={onHandleCancel}/>
                )
        }
    }

    const getBody = () => {
        console.log("baei",notificationList)
        return (
            <div className={classes.scrollBar}>
                {notificationList.map((item: any,index:number) => 
                    <span key={'divParent_' + item.id}>
                        {   !item.collapsed
                            && 
                                newCollapse(item.id)
                        }
                        <MuiCollapse in={item.collapsed} >
                            <div className={classes.card}>
                            {getCard(item)}
                            </div>
                        </MuiCollapse>
                    </span>
                )}
            </div>
        )
    }      
  
    const getFooter = () => {
        return null;  
    }

    return (<SideBarContainer
        headerContent={ <Title text="Messages" group=""/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
        />)
}