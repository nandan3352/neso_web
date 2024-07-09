import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core"


export const getSubmissionAlertBody = (unansweredQuestions) => {
    return unansweredQuestions ? "You still have unanswered questions" : "Your responses will be submitted"
}

const useAlertStyle = makeStyles(theme => (
    {
        root: {
            minWidth: 280,
            maxWidth: 356,
        },

        bodyText: {
            marginBottom: 10,
        },
        title: {
            padding: '24px 24px 8px 24px'
        },
    }
))

const AlertDialog = (props) => {
    const classes = useAlertStyle()
    return (
        <Dialog
            style={{ zIndex: 1600 }}
            classes={{
                paper: classes.root
            }}
            container={props.container}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle className={classes.title} id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.bodyText} id="alert-dialog-description">
                    {props.body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.negative && <Button onClick={props.negativeHandle} color="secondary" autoFocus>
                    {props.negative}
                </Button>}
                <Button onClick={props.positiveHandle} color="secondary">
                    {props.positive}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default AlertDialog