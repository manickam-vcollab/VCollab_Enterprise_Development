import {useStyles} from '../../../shared/RsTreeTable/styles/TreeNodeStyle'
import Grid from '@material-ui/core/Grid'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import TitleTree from '../../../shared/RsTreeWithSearch/utilComponents/TitleNode'
import RsTreeSearch, {RsTreeSearchProps} from '../../../shared/RsTreeWithSearch'

type LimitedTreeTableProps = Omit<RsTreeSearchProps, "renderTreeToggle" | "treeNode">;

interface SharedTreeProps extends LimitedTreeTableProps {
    visibleIds : string[],
}

export default function TreeSearchRelated (props : SharedTreeProps) {

    const classes = useStyles();

    return(
        <RsTreeSearch {...props}
        treeNode={
          rowData =>
          <Grid container alignItems='center' className={ props.visibleIds.includes(rowData.id) ?classes.actionShow:classes.actionHide}>
              <Grid item>
              <div style={{width:10}}></div>
              </Grid>
              <Grid item>
              <TitleTree rowData = {rowData}></TitleTree>
              </Grid>
          </Grid>
      }
      renderTreeToggle = {(icon,rowData) => {
                  if (rowData.children && rowData.children.length === 0) {
                  return null;
                  }
                  let state = props.data[rowData.id]?.state;
                  return state.expanded? <TreeExpandedIcon style={ props.visibleIds.includes(rowData.id) ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
              }
      }
          
      />
    )
}