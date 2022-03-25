import {makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles(
    {
        displayModeList: {
            width: '100%',
        },
        accordian: {
            background: 'transparent'
        },
        accordianSummaryIcon: {
            order: -1,
            paddingTop: 0,
            paddingBottom: 0
        },
        accordianSummaryExpanded: {
            minHeight: '0 !important',
        },
        accordianSummaryContent: {
            '&.Mui-expanded':{
                margin: '10px 0'
            }
        },
        accordianDetails: {
            flexDirection: 'column',
            paddingTop: 0
        },
        selectedButton: {
            marginTop: 5,
            textTransform: 'none'
        }
    }
))

export default useStyles;