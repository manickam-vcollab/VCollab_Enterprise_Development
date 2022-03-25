import React, { useState, useEffect, useCallback } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


interface IContextMenu {

    mousePointer: { mouseX: number, mouseY: number },
    items: contextMenu[],
    onHandleContextMenuClick: (id: string) => void,
    handleOutSideClick: () => void

}

type contextMenu = {

    id: string,
    text: string,
    icon: any,

}

const useContextMenu = (handleOutSideClick: any) => {


    const handleClick = () => {

        handleOutSideClick();

    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

};

export default function ContextMenu(props: IContextMenu) {

    const { mousePointer, items, onHandleContextMenuClick, handleOutSideClick } = props;

    useContextMenu(handleOutSideClick);

    return (

        <div >
            <Menu
                keepMounted
                open={true}
                anchorReference="anchorPosition"
                anchorPosition={
                    { top: mousePointer.mouseY, left: mousePointer.mouseX }
                }
            >

                {items.map((data: contextMenu) => (
                    <MenuItem onClick={() => onHandleContextMenuClick(data.id)}>
                        <ListItemIcon>
                            {data.icon}
                        </ListItemIcon>
                        <ListItemText primary={data.text} />

                    </MenuItem>
                ))}

            </Menu>
        </div>
    );
}