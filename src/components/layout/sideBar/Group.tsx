import React from 'react';
import {push} from 'connected-react-router/immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import  ListItemText  from '@material-ui/core/ListItemText';
import  IconButton from '@material-ui/core/IconButton';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

import SideBarContainer from '../../layout/sideBar/sideBarContainer'

import { getIcon, MainMenu as MainMenuType, MainMenuItem, MainMenuItems, selectMainMenu, setActiveTab, togglePanel, updateMenuItem } from '../../../store/mainMenuSlice';
import { Typography } from '@material-ui/core';
import GeometryIcon from 'components/icons/geometry';
import EditIcon from '@material-ui/icons/Edit'

import AddGroup from '../../sideBarContents/addGroup'
import { useState } from 'react';
import Title from './sideBarContainer/sideBarHeader/utilComponents/Title';

type GroupProps = {
    selectedItem: MainMenuItem,
}
export default function Group(props:GroupProps){
    const dispatch = useAppDispatch();
    const handleListItemClick = (event:any,item:MainMenuItem) => {
      dispatch(setActiveTab({menuItem:item}));
      dispatch(push(item.path));
    }

    const getHeaderContent = () => {
      return <Title text={props.selectedItem?.name}></Title>;
    }

    const getHeaderRightIcon = () => {
      return( 
        props.selectedItem.type === MainMenuItems.CUSTOM_GROUP ?
        <IconButton aria-label="search" onClick={() => {
          let menuItem = {
            ...props.selectedItem,
            isEditMode: !props.selectedItem.isEditMode  
          }
          dispatch(updateMenuItem({menuItem}))
          dispatch(setActiveTab({menuItem}));
        }}>
          <EditIcon/>
        </IconButton>
        :null
        )
    }

    const getBody = () => {
      return (  
       <> 
      <List disablePadding >
      {
        props.selectedItem?.children.map((item:any) => 
          <ListItem
          disabled={item.disabled}
          button
          onClick={(event) => handleListItemClick(event, item)}
        >
          <ListItemIcon>
            {React.createElement(getIcon(item.type))}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
        )
      }
      </List>
      </>
      );
    }

    return (
      props.selectedItem.isEditMode ?
      <AddGroup disabled={false} onClickEdit={() => {}} selectedGroup={props.selectedItem}/>
      :
      <SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon={ getHeaderRightIcon()}
      body ={ getBody() }
      />)
}