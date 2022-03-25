import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';



import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style';

import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';

import {editLabel, selectLabelData, selectedLeafNodes, selectCheckedLeafNodes, editLabelBackground} from '../../../../store/sideBar/labelSlice/labelAllSlice'

import MuiButton from '@material-ui/core/Button';
import {useRef, useState} from 'react';
import { ILabel, LabelType } from 'store/sideBar/labelSlice/shared/types';
import Editor from '../components/shared/Editor/SlateEditorSidebar'
import { Typography } from '@material-ui/core';
import { batch } from 'react-redux';
export default function EditLabels2D(){

  const selectedLabels = useAppSelector(selectCheckedLeafNodes)
  const remirrorRef = useRef<any>(null);
  

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleReset = () => {
    //setLabelText(label2D?label2D.label : "");
  }

  const onHandleSave = () => {
    //dispatch(editLabel({id: label2D ? label2D.id : "-1", value: labelText}))
  }

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
      <div>
      </div>
    )
  }
  
  const handleColorChange = (e:any) => {
        batch(() => {
          selectedLabels.forEach(l => {
            dispatch(editLabelBackground({id:l.id, color: e.target.value}));
          });
        });
       
  }

  const getSelectedLabelColor = () => {
    return (selectedLabels[0] as ILabel).bgColor 
  }
  const getBody = () => {
    return (
      <div style={{textAlign: 'initial', width:'100%', height:'100%'}}>
        <Editor selectedLabels={selectedLabels as ILabel[]}/>
        <Typography>
          Background Color
        </Typography>
        <input type="color" id="html5colorpicker" onChange={handleColorChange} value={getSelectedLabelColor()} ></input>
      </div>
        
    )
  }


  const getFooter = () => {

    let change = false;
    // if(label2D?.label !== labelText)
    //   change = true;

    return(
      <div className={classes.editPageFooter}>
        <MuiButton className={classes.saveButton}
          disabled={!change}
          autoFocus 
          onClick={onHandleSave}
          // color="primary"
        >
          Save
        </MuiButton>
     
        <MuiButton className={classes.resetButton}
            autoFocus 
            onClick={onHandleReset} 
            disabled={!change}
            // color="primary"
        >
          Reset
        </MuiButton>
      </div>
    ) 
  }

  const getHeaderContent = () => {
      const type = (selectedLabels[0] as ILabel).labelType;
      const text = selectedLabels.length > 1 ? "..." : selectedLabels[0].title;
      return(<Title text={text} group={`Labels - ${type}`}/>)
  }
  return (
          <SideBarContainer
            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
