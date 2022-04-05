import { createRef, useLayoutEffect, useState } from 'react';

import styles from './style';
import SideBarHeader from './sideBarHeader'
import SideBarBody from './sideBarBody'
import SideBarFooter from './sideBarFooter'
import { sideBarHeaderHeight } from '../../../../config';

export default function SideBarContainer(props : any) {

  const classes = styles();
  const HeaderTargetRef = createRef<any>();
  const FooterTargetRef = createRef<HTMLDivElement>();
  const [bodyHeight, setbodyHeight] = useState(sideBarHeaderHeight)

  useLayoutEffect(() => {
    let headerHeight = sideBarHeaderHeight;
    let footerHeight = 0;
    if(HeaderTargetRef?.current?.clientHeight) {
      headerHeight = HeaderTargetRef.current.clientHeight;
    }
    if (FooterTargetRef?.current?.clientHeight) {
      footerHeight = FooterTargetRef.current.clientHeight;
    }
    setbodyHeight(headerHeight+footerHeight);
  }, [FooterTargetRef, HeaderTargetRef, setbodyHeight] );



  
  return (
    <div className={classes.sideBarContainer}>
      <SideBarHeader targetRef = {HeaderTargetRef} leftIcon = {props.headerLeftIcon}  content = {props.headerContent} rightIcon = {props.headerRightIcon} action = {props.headerAction}/>
      <div className={classes.divider}></div>

      <div  className={classes.sideBarContainer}>
        <SideBarBody height = { bodyHeight } >  {props.body} </SideBarBody>
        <SideBarFooter targetRef = { FooterTargetRef } >{props.footer}</SideBarFooter>
      </div>
      
    </div>
  );
}
