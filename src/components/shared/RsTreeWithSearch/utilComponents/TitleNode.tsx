import Typography from '@material-ui/core/Typography'
import { getHighlightText } from '../../../utils/search'
import { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme => ({
    highlight: {
        color: theme.palette.getContrastText(theme.palette.info.main),
        backgroundColor: theme.palette.info.main
    },
}))


const Title = (props:{rowData:any}) => {

        const classes = useStyles();
        let [parts, setParts] = useState([] as any[]);

        useEffect(() => {
            if(props.rowData?.matches)
            setParts(getHighlightText(props.rowData.matches, "title"));
        },[props.rowData?.matches])

          return(
          props.rowData?.matches ? 
          <Typography>
              {
                parts.map( (part:{text:string,isMatch:boolean} ) => {
                    if(part.isMatch) {
                        return <span className={classes.highlight}>{part.text}</span>
                    }
                    else{
                        return part.text
                    }
                } )
              }
          </Typography>
          :
          <Typography>
            {
            props.rowData?.title? props.rowData.title:null
            }
          </Typography>
          )
}

export default Title