import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from "react";
import DeleteAccountFeedback from "../Dialogs/DeleteAccountFeedback";



const useStyle = makeStyles(theme => (
    {
        innerContainer: {
            paddingTop: 24,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        userDeleteNormalText: {
            width: 140,
            color: theme.palette.text.primary,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 0.15,
        },
        userDeleteSmallText: {
            width: 316,
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: 0.25,
            color: theme.palette.text.secondary,

            [theme.breakpoints.down(600)]: {
                width: '90%',
            },
        },
        userDeleteAccount: {
            paddingLeft: 16,
        },
    }
))

const DeleteAccount = (props) => {
    const classes = useStyle()
    const [showDeleteAccount, setShowDeleteAccount] = useState(false)
    const handleDeleteDialogClose = () => setShowDeleteAccount(false)
    const handleDeleteDialogClick = () => setShowDeleteAccount(true)

    return (
        <div className={classes.userDeleteAccount}>
            <div className={classes.innerContainer}>
                <div>
                    <div className={classes.userDeleteNormalText}>Delete this account</div>
                    <div className={classes.userDeleteSmallText}>
                        Deleting account is not reversible. Account once deleted can not
                        be recovered back.
                    </div>
                </div>
                <div>
                    <Button
                        color='primary'
                        onClick={handleDeleteDialogClick}
                        startIcon={<DeleteIcon color='primary' />}
                    >
                        delete
                    </Button>
                </div>
            </div>
            <DeleteAccountFeedback
                show={showDeleteAccount}
                onClose={handleDeleteDialogClose}
            />
        </div>
    )
}


export default DeleteAccount