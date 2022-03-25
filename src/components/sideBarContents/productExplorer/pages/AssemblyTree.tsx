import {goBack, push} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import SearchIcon from '../shared/SearchIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import {Routes} from "../../../../routes"
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import RTree, { ITreeNode } from '../../../shared/RsTreeTable';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import TreeNode from '../../../shared/RsTreeTable/TreeNode';
import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import InvertCell from '../../../shared/RsTreeTable/Invert';
import { convertListToTree, getTreeData } from '../../../utils/tree';
import {selectProductTreeData, selectRootIds,selectCheckedLeafNodes,invertNode, toggleVisibilityAsync, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode, updatePrevSearches} from '../../../../store/sideBar/productTreeSlice'
import {selectSearchHints, removeSearchHint, selectPrevSearches, setSearchString, selectSearchResults} from "../../../../store/sideBar/productTreeSlice"
import Footer from '../Footer'
import { useEffect, useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { getItem, selectMainMenuItems, setActiveTab } from 'store/mainMenuSlice';
import SearchBox from 'components/shared/searchBox';
import SearchHints from '../../../shared/hintsPanel'
import Clear from '../shared/ClearIcon';


function AssemblyTree(props:any) {
    const treeDataRedux = useAppSelector(selectProductTreeData);
    const treeRootIds = useAppSelector(selectRootIds);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const prevSearches = useAppSelector(selectPrevSearches);
    const searchHints = useAppSelector(selectSearchHints);
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const {roots: treeData, expanded: expandedKeys} = convertListToTree(treeDataRedux,treeRootIds);
    const [data , setData] = useState(treeData);
    const [expanded, setExpanded] = useState(expandedKeys);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(isSearchMode){
        let {treeData, expandedKeys} = getTreeData(treeDataRedux,searchResults)
        if(treeData)
        setData(treeData);
        if(expandedKeys)
        setExpanded(expandedKeys);
      }
      else{
        let {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
        setData(roots);
        setExpanded(expanded);
        dispatch(updatePrevSearches(searchText))
      }
    },[isSearchMode, searchResults, treeDataRedux])

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const onClickSearchIcon = () => {
      setIsSearchMode(true);
    }

    const handleNext = () => {
      dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
    }

    const getHeaderLeftIcon= () => {
        return (
        <BackIcon onClick={onClickBackIcon}/>
        )
    }

    const handleSearchTextChange = (s:string, r: any[]) => {
      setSearchText(s);
      setSearchResults(r);
      handleSearchResult(r);
    }

    const handleSearchResult = (results:any[]) => {
      let filtered = results.map(result => {
          let node =  JSON.parse(JSON.stringify(result.item));
          if(result.matches)
          node.matches =result.matches
          return node
        }
        );
      setSearchResults(filtered);
  }

    const getHeaderContent = () => {

          return (isSearchMode ?
            <SearchBox 
            placeholder="search Tree" 
            text={searchText} 
            onChange={handleSearchTextChange}
            searchPool={treeDataRedux}
            onClear={() => {}}
            getAttribKeys={(data) => ["title"]}
            />
            : <Title text="Product Tree" group="Geometry"/>)
    }
    
    const getHeaderRightIcon = () => {
        return (
          isSearchMode?
          <Clear onClick={() => setIsSearchMode(false)}/>
          :
          <SearchIcon onClick={onClickSearchIcon} />
        )
    }

    const handleExpand = (toOpen:boolean,nodeId:string) => {
      dispatch(expandNode({toOpen,nodeId,undoable:true}));
    }
    const handleCheck = (toCheck:boolean, nodeId:string) => {
      dispatch(setCheckedNodesAsync({toCheck,nodeId, undoable:true}));
    }
    const handleHighlight = (toHighlight:boolean, nodeId:string) => {
      dispatch(setHightLightedNodesAsync({toHighlight,nodeId}))
    }
    const handleVisibility = (toShow:boolean,node:any) => {
      dispatch(toggleVisibilityAsync({toShow, nodeId:node.id, undoable: true}));
    
    }
    const handleInvert = (node:any) => {
      dispatch(invertNode({nodeId:node.id, undoable:true}));
    }

    const generateOptions = () => {
      let options:any = {};
      prevSearches.forEach((e:string) => {
          options[e] = Object.keys(options).length;
      })
      searchHints.forEach((e:string) => {
          options[e] = Object.keys(options).length;
      })
      return Object.keys(options) as string[]
  }

  // const handleCheck = (toCheck:boolean,node:ITreeNode) => {
  //     dispatch(setCheckedNodesAsync({toCheck,nodeId:node.id}));
  // }

  // const handleSelectAll = (state:boolean) => {
  //     if(props.isSearchMode)
  //     result.forEach((data:any) => {
  //         dispatch(setCheckedNodesAsync({toCheck: state, nodeId: data.item.id}));
  //     })
  //     else
  //     Object.values(treeData).forEach(e => {
  //         dispatch(setCheckedNodesAsync({toCheck: state, nodeId: e.id}));
  //     })
  //     setSelectAll(state);
  // }
   const handleHintsClick = (s:string) => {
      setSearchText(s);
  }
  const handleHintsDelete = (s:string) => {
      dispatch(removeSearchHint({data:s}));
  }
    const getBody = () => {
      return(
        <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
          <div ref = {headerRef} >
                {
                    isSearchMode ?
                    <SearchHints data = {generateOptions()} onClick={handleHintsClick} onDelete={handleHintsDelete}></SearchHints>
                    :null
                }
                {/* {
                result.length !== 0 || !props.isSearchMode ?
                <div>
                <Checkbox color="primary" size='small' onChange = {(e:any) => {handleSelectAll(e.target.checked)}} checked = {selectAll} ></Checkbox>
                    Select All
                </div>
                : null
                } */}
                </div>  
          <RTree 
          treeData={data} 
          expandedRowIds = {expanded}
          onExpand={handleExpand}
          onRowClick = {() => {}}
          width = {300}
          height = {containerHeight ? containerHeight - (headerHeight+5): 0}
          renderTreeToggle = {
            (icon,rowData) => {
              if (rowData.children && rowData.children.length === 0) {
                return null;
              }
               let state = treeDataRedux[rowData.id].state;
               return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
            }
          }
          treeNode = {(node) => {
              return (
                <TreeNode 
              node={treeDataRedux[node.id]}
              rowData={node}
              onCheck={handleCheck}
            >
            </TreeNode>
              )
            }
          }
          column1 = {(node) => {
            return <InvertCell node = {treeDataRedux[node.id]} onClick={handleInvert}></InvertCell>
            }
          }
          column2 = {(node) => {
            return <ShowHideCell node = {treeDataRedux[node.id]} onToggle={handleVisibility}></ShowHideCell>
          }

          }
          />
          </div>
      )
    }      

    const getFooter = () => {
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}

export default AssemblyTree;