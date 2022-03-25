import Shaded from "../components/icons/shaded";
import ShadedMesh from "../components/icons/shadedMesh";
import BoundingBox from "../components/icons/boundingBox";
import HiddenLine from "../components/icons/hiddenLine";
import Wireframe from "../components/icons/wireframe";
import Point from "../components/icons/point";
import Transparent from "../components/icons/transparent";

export const appBarMinHeight = 300;
export const drawerWidth = 300;
export const topbarHeight = 48;
export const leftbarWidth = 75;

export const sideBarHeaderHeight = topbarHeight;
export const EPSILON = 0.0001;
export const colors = {
  //primary : "rgba(0, 0, 0, 1.0)",
  //primaryTransparent : "rgba(0, 0, 0, 0.8)",
  //primaryHover: "#4F4F68",
  //primaryText: "#DFDEDE",

  //secondary : 'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), #121212',  
  //secondaryTransparent :"rgba(23, 23, 39, 0.8)",
  //secondaryHover: "#4F4F68",
  //secondaryHoverTransparent: "#2D9CDB",
  //secondaryText: "#DFDEDE",

  vcollabColor : "rgba(160,160,255,1)"
}

export const sideBarContentTypes = {
  mainMenu: 'mainMenu',
  productExplorer: 'productExplorer',
  colormaps : 'colormaps',
  clipsPlanes : 'clipsPlanes',
  views : 'views',
  annotations : 'annotations',
  settings : 'settings',
  notifications : 'notifications',
  // scene : "scene",
};


export const popupMenuContentTypes = {
  none:'none',
  displayModes: 'displayModes',
  more: 'more',
};

export const displayMenuItems = [
  { title: "Bounding Box", icon: BoundingBox,id:"DM_1", disabled : false},
  { title: "Feature Edge", icon: Shaded,id:"DM_8", disabled : true },
  { title: "Simplified Mesh", icon: Shaded,id:"DM_9", disabled : true },
  { title: "Shaded", icon: Shaded,id:"DM_5", disabled : false  },
  { title: "Wireframe", icon: Wireframe,id:"DM_3", disabled : false },
  { title: "Shaded Mesh", icon: ShadedMesh,id:"DM_6", disabled : false},  
  { title: "Hidden Line", icon: HiddenLine,id:"DM_4", disabled : false},
  { title: "Transparant", icon: Transparent,id:"DM_7", disabled : false },
  { title: "Point", icon: Point,id:"DM_2", disabled : false },   
];
  