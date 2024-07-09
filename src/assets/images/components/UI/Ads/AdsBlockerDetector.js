import { Button, makeStyles } from "@material-ui/core"
import { AdBlockDetectedWrapper } from "adblock-detect-react"



const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 16,
        maxWidth: 350
    },

    title: {
        marginTop: 8
    },

    body: {
        marginTop: 20,
        marginRight: 16,
        marginBottom: 8,
        ...theme.typography.subtitle2,
        fontWeight: 500,
        color: theme.palette.text.secondary
    },

    empasis: {
        color: theme.palette.text.primary
    },

    link: {
        marginBottom: 8,
        ...theme.typography.body2
    },
}))

const AdsBlockerDetector = () => {

    const classes = useStyles()

    return <AdBlockDetectedWrapper> <div className={classes.root}>
        <div className={classes.title}>
            🙁
        </div>
        <div className={classes.body}>
            Advertisements help us to keep this site running. <span className={classes.empasis} >Please whitelist us.</span>
        </div>
        {/*  <div className={classes.link}>
            Don’t know how to do it? <Button varient="text" color="secondary">SEE HERE</Button>
        </div> */}
    </div>
    </AdBlockDetectedWrapper>
}

export default AdsBlockerDetector