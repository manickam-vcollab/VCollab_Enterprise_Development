import { useState, useEffect } from 'react'

import MuiGrid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MuiTooltip from '@material-ui/core/Tooltip';
//import MuiButton from '@material-ui/core/Button';


//icons

import ZoomOut from '../../../../../src/components/icons/zoomout';
import ZoomIn from '../../../../../src/components/icons/zoomin';
import Highlight from '../../../../../src/components/icons/heighlight';
import Rotate from '../../../../../src/components/icons/rotate';
import Pan from '../../../../../src/components/icons/pan';
import MuiCloseIcon from '@material-ui/icons/Close';


import { createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useStyle from './EditPageStyle'
import InputBase from '@material-ui/core/InputBase';

import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';

import {
    selectactions,
    selectcontrols,
    setUserControls,
    setUserActions,
    deleteItemToMouseControlList,
    selectActiveMenuId,
    Control,
    Action,
    setMouseControlListReset,
    setItemSave,
    selectmenuItems,
    selectIsControlReadOnly,


} from '../../../../store/sideBar/settings';

const CustomizedInput = withStyles((theme: Theme) =>
    createStyles({

        input: {
            border: 'none'
        },


    }),
)(InputBase);



export default function Input(props: { item: { rowId: string, control: Control, action: Action }, save: boolean, reset: boolean }) {

    const dispatch = useAppDispatch();
    const controls = useAppSelector(selectcontrols);
    const actions = useAppSelector(selectactions);
    const activeMenuId = useAppSelector(selectActiveMenuId);
    const menuItemList = useAppSelector(selectmenuItems);
    const isControlReadyOnly = useAppSelector(selectIsControlReadOnly);



    const [controlItem, setControlItem] = useState(props.item.control.id);

    const [actionItem, setActionItem] = useState(props.item.action.id);

    const [leftItemOpen, setleftItemOpen] = useState(false);

    const [RightItemOpen, setRightItemOpen] = useState(false);

    const [controlMouseOver, setControlMouseOver] = useState(false);
    const [actionMouseOver, setActionMouseOver] = useState(false);

    const classes = useStyle();



    useEffect(() => {

        setControlItem(props.item.control.id);
        setActionItem(props.item.action.id);

    }, [props.item.control.id, props.item.action.id])



    useEffect(() => {

        if (props.save === true) {

            const rowId = props.item.rowId
            const controlItemId = controlItem;
            const actionItemId = actionItem;

            dispatch(setUserControls({ controlItemId, rowId, activeMenuId }));

            dispatch(setUserActions({ actionItemId, rowId, activeMenuId }));

            dispatch(setItemSave(false));

        }

    }, [props.save])


    useEffect(() => {

        if (props.reset === true) {

            setControlItem(props.item.control.id);
            setActionItem(props.item.action.id);

            dispatch(setMouseControlListReset(false));

        }

    }, [props.reset])


    //  const selectIcon=(item:Action) => {

    //     switch(item.text) {

    //         case 'Pan':

    //          return <Pan/>;

    //         case 'Rotate':

    //          return <Rotate/>;

    //         case 'Zoom in':

    //          return <ZoomIn/>;

    //         case 'Zoom out' :

    //           return <ZoomOut/>;

    //         case 'Highlight' :

    //           return <Highlight/>;

    //         default:

    //         return null; 
    //     }
    //  }

    const handleControlChange = (event: React.ChangeEvent<{ value: unknown }>, rowId: string) => {


        setControlItem(event.target.value as string);

        dispatch(setItemSave(true));


    };

    const handleActionsChange = (event: React.ChangeEvent<{ value: unknown }>, id: string) => {

        setActionItem(event.target.value as string);
        dispatch(setItemSave(true));

    };

    const handleMouseControlListDelete = (undoable: boolean, rowId: string, activeMenuId: string) => {


        dispatch(deleteItemToMouseControlList({ undoable, rowId, activeMenuId }));

    }


    const handleLeftClose = () => {
        setleftItemOpen(false);
    };

    const handleLeftOpen = () => {
        setleftItemOpen(true);
    };

    const handleRightClose = () => {
        setRightItemOpen(false);
    };

    const handleRightOpen = () => {
        setRightItemOpen(true);
    };

    const EmpetyDiv = () => {

        return (

            <div></div>
        )
    }


    return (
        isControlReadyOnly ?
            (<div >

                <MuiList className={classes.listItem}
                >
                    <MuiGrid container  >
                        <MuiListItem button dense={true} >
                            <MuiGrid item xs={6} >

                                {controls?.map((item) => {

                                    if (item.id === controlItem) {

                                        let displayText = ''

                                        item.modifiers.map((keyNames) => {

                                            displayText = displayText + keyNames.name + "+"

                                        })

                                        const text = displayText + item.keys.name;
                                        let short = text.slice(0, 10);

                                        if (short.length >= 10) {

                                            short = short.slice(0, 10) + ".."


                                        }
                                        else {
                                            short = short.slice(0, 10)

                                        }

                                        return (

                                            <MuiTooltip title={text} placement="top">
                                                <MuiListItemText primary={short}></MuiListItemText>
                                            </MuiTooltip>

                                        )


                                    }
                                }

                                )}

                            </MuiGrid>

                            <MuiGrid item xs={6} >

                                {actions?.map((item) => {

                                    if (item.id === actionItem) {

                                        const text = item.name;
                                        let short = text.slice(0, 8);

                                        if (short.length >= 8) {

                                            short = short.slice(0, 8) + ".."


                                        }
                                        else {
                                            short = short.slice(0, 10)

                                        }

                                        return (
                                            <MuiTooltip title={item.name} placement="top">
                                                <MuiListItemText style={{ marginLeft: '50px' }} primary={short}></MuiListItemText>
                                            </MuiTooltip>
                                        )

                                    }
                                }
                                )}

                            </MuiGrid>
                        </MuiListItem>

                    </MuiGrid>
                </MuiList>
            </div>) : (<div>
                <MuiList className={classes.listItem}>
                    <MuiListItem button dense >
                        <MuiGrid container alignItems={'center'} spacing={6}>
                            <MuiGrid item xs={6} >
                                <MuiSelect
                                    open={leftItemOpen}
                                    onClose={handleLeftClose}
                                    onOpen={handleLeftOpen}
                                    input={<CustomizedInput />}
                                    value={controlItem}
                                    renderValue={() => <div>{controls?.map((item) => {

                                        if (item.id === controlItem) {

                                            let displayText = ''

                                            item.modifiers.map((keyNames) => {

                                                displayText = displayText + keyNames.name + "+"

                                            })


                                            const text = displayText + item.keys.name;
                                            let short = text.slice(0, 10);

                                            if (short.length >= 10) {

                                                short = short.slice(0, 10) + ".."


                                            }
                                            else {
                                                short = short.slice(0, 10)

                                            }

                                            return (

                                                short

                                            )
                                        }

                                    }


                                    )}</div>}
                                    onChange={(e) => handleControlChange(e, props.item.rowId)}
                                    IconComponent={controlMouseOver ? MuiArrowDropDownIcon : EmpetyDiv}
                                    onMouseOver={() => setControlMouseOver(true)}
                                    onMouseOut={() => setControlMouseOver(false)}
                                    classes={{ root: classes.selectDropDown }}
                                    MenuProps={{
                                        disablePortal: true,
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left",
                                        },
                                        getContentAnchorEl: null
                                    }}

                                >
                                    {controls?.map((item) => {

                                        let displayText = ''

                                        item.modifiers.map((keyNames) => {

                                            displayText = displayText + keyNames.name + "+"

                                        })

                                        return (
                                            <MuiMenuItem value={item.id}
                                            >{displayText + item.keys.name}</MuiMenuItem>

                                        )
                                    }


                                    )}

                                </MuiSelect>
                            </MuiGrid>

                            <MuiGrid item xs={3}  >

                                <MuiSelect
                                    open={RightItemOpen}
                                    onClose={handleRightClose}
                                    onOpen={handleRightOpen}
                                    input={<CustomizedInput />}
                                    value={actionItem}
                                    renderValue={() => <div>{actions?.map((item) => {

                                        if (item.id === actionItem) {

                                            let short = item.name.slice(0, 8);

                                            if (short.length >= 8) {

                                                short = short.slice(0, 10) + ".."


                                            }
                                            else {
                                                short = short.slice(0, 10)

                                            }

                                            return (

                                                short

                                            )

                                        }

                                    }


                                    )}</div>}
                                    onChange={(e) => handleActionsChange(e, props.item.rowId)}
                                    IconComponent={actionMouseOver ? MuiArrowDropDownIcon : EmpetyDiv}
                                    onMouseOver={() => setActionMouseOver(true)}
                                    onMouseOut={() => setActionMouseOver(false)}
                                    classes={{ root: classes.selectDropDown }}
                                    MenuProps={{
                                        disablePortal: true,
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left",
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >
                                    {actions?.map((item) =>

                                        <MuiMenuItem value={item.id}>
                                            <div className={classes.alignMenuItem}>
                                                <div >{item.name}</div>
                                            </div>

                                        </MuiMenuItem>

                                    )}

                                </MuiSelect>

                            </MuiGrid>

                            <MuiGrid item xs={3}>
                                <div style={{ float: 'right', marginRight: '-10px' }} onClick={() => handleMouseControlListDelete(true, props.item.rowId, activeMenuId)}><MuiCloseIcon fontSize='small'></MuiCloseIcon></div>
                            </MuiGrid>
                        </MuiGrid>
                    </MuiListItem>
                </MuiList>

            </div>)
    )


}