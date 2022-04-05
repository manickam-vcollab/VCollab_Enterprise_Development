import React, { useState, useEffect, useCallback ,useRef} from 'react';
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


function useOutSideListener(ref:any , handleOutSideClick:any) {
    useEffect(() => {

        function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleOutSideClick();
            }
        }

        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
}

export default function ContextMenu(props: IContextMenu) {

    const { mousePointer, items, onHandleContextMenuClick, handleOutSideClick } = props;

    const wrapperRef = useRef(null);

    useOutSideListener(wrapperRef , handleOutSideClick);

    return (

        <div ref={wrapperRef}>
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