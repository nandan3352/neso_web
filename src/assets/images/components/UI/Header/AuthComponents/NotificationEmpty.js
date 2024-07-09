import { makeStyles } from "@material-ui/core"
import { NotificationsOff } from "@material-ui/icons"



const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 48,
        marginTop: 64,
    },
    icon: {

    },
    title: {
        ...theme.typography.h6,
        margin: '16px 0px'
    },
    body: {
        ...theme.typography.subtitle1,
    }

}))

const NotificationEmpty = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div>
                <NotificationsOff fontSize='large' className={classes.icon} color='secondary' />
                <div className={classes.title}>No Notifications!</div>
                <div className={classes.body} >Get notified when a new <br /> lecture is uploaded</div>
            </div>
        </div>
    )
}

export default NotificationEmpty