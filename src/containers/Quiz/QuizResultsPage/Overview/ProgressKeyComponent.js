import { makeStyles } from "@material-ui/core"




const useStyle = makeStyles(theme => (
    {
        root : {
            display : 'flex',
            flexDirection :'column',
            alignItems : 'center',
            justifyContent : 'center',
            width : '100px',
            height : theme.spacing(9)
        },

        topPortion : {
            display : 'inline-flex',
            alignItems : 'center',
            marginBottom : 10,
            marginTop : 11,
        },

        keyIndicator : props => ({
            backgroundColor : props.color ? props.color : theme.palette.surface.main ,
            height : '12px',
            width : '12px',
            borderRadius : '2px',
        }),

        keyText : {
            marginLeft : theme.spacing(1),
            ...theme.typography.caption,
            lineHeight : '16px',
            color : theme.palette.text.secondary,
        },
        count : props => ({
            ...theme.typography.h5,
            color : props.color ? props.color : theme.palette.text.disabled,
            
        })
        
    }
))

const ProgressKeyComponent = (props) => {
    
    const classes = useStyle(props)

    return(
    <div className={classes.root}>
        <div className={classes.topPortion}>
            <div className={classes.keyIndicator}/>
            <div className={classes.keyText}>
                {props.title}
            </div>
        </div>
        <div className={classes.count}>
            {props.count}
        </div>
    </div>)
}


export default ProgressKeyComponent