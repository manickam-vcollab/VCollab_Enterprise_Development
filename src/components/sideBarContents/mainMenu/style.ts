import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight } from '../../../config';

export default makeStyles((theme) => ({
      root: {
        overflowY: "auto",
        overflowX:"hidden",
        width:"100%",
        height:"100%",
        scrollbarColor: "rgba(0,0,0,.3) rgba(0,0,0,0.00) ",
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.3)',
          outline: '1px solid slategrey'
        },
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: topbarHeight,
        paddingLeft : 12
      },
      divider: {
        height: 2,
        width: '100%',
      },
      accordianExpanded:{
        margin: '2px 0 !important'
      },
      accordianSummaryExpanded: {
        minHeight: '0px !important',
        height: '48px'
      },
      accordianSummary: {
        paddingLeft: '0px !important',
      },
      selected: {
        backgroundColor: theme.palette.primary.main
      },
      accordianSummaryContent: {
        margin: '0px !important',
      },
      accordianDetails: {
        padding: '0px !important'
      },
      list: {
        width: '100%',
        padding:0
      },
      listItem: {
        paddingLeft: '72px'
      },

      
      listItemText: {
        //color: theme.palette.text.primary,
      },
}));
