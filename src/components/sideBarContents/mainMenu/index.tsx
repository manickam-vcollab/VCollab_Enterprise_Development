import {push} from 'connected-react-router/immutable';
import clsx from 'clsx';
import MuiTypography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Logo from '../../../assets/images/LogoBig.svg';

import styles from './style';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

import SideBarContainer from '../../layout/sideBar/sideBarContainer'

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Routes } from '../../../routes';
import { MainMenu as MainMenuType, MainMenuItem, MainMenuItems, selectMainMenu, togglePanel, getIcon } from '../../../store/mainMenuSlice';
import { useState } from 'react';
import { useEffect } from 'react';




const getMainMenuData = (mainMenu:MainMenuType) => {
    let data:any[] = [];
    mainMenu.menuItems.forEach(item => {
      let newItem = {
        id: item.id,
        title: item.name,
        path: item.path,
        icon: getIcon(item.type),
        expanded: item.expanded,
        list: [] as any[]
      };

      item.children.forEach(child => {
          newItem.list.push(
            {
              id: child.id,
              title: child.name,
              path: child.path,
              disabled: child.disabled,
            }
          )
      })
      data.push(newItem);
    })
    return data;
} 
export default function MainMenu(){

    const classes = styles();
    const dispatch = useAppDispatch();
    const mainMenu = useAppSelector(selectMainMenu);
    const [mainMenuData, setMainMenuData] = useState<any[]>(getMainMenuData(mainMenu));
  
    useEffect(() => {
      setMainMenuData(getMainMenuData(mainMenu))
    },[mainMenu.menuItems])

    const handleOnClick = (path:any) => {
      dispatch(push(path));
    }

    const handleChange = (panelId: string) => {
      dispatch(togglePanel({panelId}));
    }
    const getHeaderContent = () => {
      return <img style={{paddingLeft: '12px', width:'150px'}} src={Logo} alt='VCollab Logo' />;
    }

    const getBody = () => {

      return (  
       <> 
      <Divider className={classes.divider} />
      <List disablePadding className={classes.root}>
      {
        mainMenuData?.map((item:any) => 
          <MuiAccordion 
            key = {item.id}
            expanded = {item.expanded}
            onChange = {() =>  {handleChange(item.id); item.list.length<1 && handleOnClick(item.path)}}
            classes = {{expanded:classes.accordianExpanded}}
            TransitionProps={{ unmountOnExit: true }}>
                    <MuiAccordionSummary
                        classes = {{
                          root: clsx(classes.accordianSummary,{[classes.selected]:item.expanded}),
                          expanded: classes.accordianSummaryExpanded,
                          content: classes.accordianSummaryContent
                        }}
                        expandIcon={<MuiExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Grid container alignContent='center' alignItems='flex-start'>
                      <Grid item xs={3}>
                      {item.icon}
                      </Grid>
                      <Grid item>
                      <MuiTypography noWrap>{item.title}</MuiTypography>
                      </Grid>
                    </Grid>
                </MuiAccordionSummary>
                <MuiAccordionDetails className ={classes.accordianDetails}>
                    <List classes={{root:classes.list}}>
                        { item?.list.map((element : any) =>
                            <ListItem disabled={element.disabled === false ? false : true} alignItems='flex-start' className={classes.listItem} button key={ 'divParent_' + element.id }
                            onClick={() => handleOnClick(element.path)}>
                                 <ListItemText primary={element.title} >
                                 </ListItemText>
                            </ListItem>
                	    )}
                    </List>
                </MuiAccordionDetails>
            </MuiAccordion>
        )
      }
      </List>
      </>
      );
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      body ={ getBody() }
      />)
}