import { Button, makeStyles } from "@material-ui/core"
import clsx from "clsx"


const useStyle = makeStyles(theme => (
    {
        root: {
            background: theme.palette.background.surface,
            minHeight: 68,
            [theme.breakpoints.down('xs')]: {
                minHeight: 52,
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
        },

        leftCluster: {
            display: 'flex',
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(2),
            }
        },

        LeftClusterButtonStyle: {
            color: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            [theme.breakpoints.down('xs')]: {
                color: theme.palette.secondary.main,
            },
            marginRight: theme.spacing(2),
        },

        markForReview: {
            display: 'block',
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },

        clearResponse: {

        },

        RightButtonStyle: {
            width: 152,
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            marginRight: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginRight: theme.spacing(1)
            }
        }
    }
))

const QuizBottomButtonGroup = (props) => {

    const classes = useStyle()

    const varient = props.ismobileDisplay ? 'text' : 'outlined';

    return (
        <div className={classes.root}>
            <div className={classes.leftCluster}>
                <Button className={clsx(classes.LeftClusterButtonStyle, classes.markForReview)} variant={varient} onClick={props.handleMarkForReview} >
                    mark for review and next
                </Button>
                <Button className={clsx(classes.LeftClusterButtonStyle, classes.clearResponse)} variant={varient} onClick={props.handleClearResponse} >
                    {props.ismobileDisplay ? "clear" : "Clear response"}
                </Button>
            </div>
            <div >
                <Button className={classes.RightButtonStyle} variant={varient} onClick={props.isTosubmit ? props.submit : props.handleSaveAndNext} >
                    {props.isTosubmit ? "save" : "save and next"}
                </Button>
            </div>
        </div>)
}

export default QuizBottomButtonGroup