import React from "react";
import { ReactComponent as LogoIcon } from "./NesoColoredIcon.svg";
import { CircularProgress, Dialog, TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./ResetPassword.css";
import { confirmPasswordReset, getAuth } from "firebase/auth";

const useStyle = makeStyles(theme => ({
    titleRoot: {
        marginTop: "33px",
    },
    contentRoot: {
        marginTop: "11px",
        color: theme.palette.text.secondary,
    },
    newPassRoot: {
        marginTop: "49px",
        "& .MuiFormControl-root": {
            width: "100%"
        },
        "& .MuiFormControl-root:nth-child(2)": {
            marginTop: "25px",
        }
    },
    captionRoot: {
        marginTop: "33px",
        color: theme.palette.text.disabled,

    },
    buttonRoot: {
        marginTop: "24px",
        width: "100%",
    }
}))


const ResetPassword = (props) => {
    const styles = useStyle();
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passVisible, setPassVisible] = React.useState(false);
    const [newPasswordError, setNewPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
    const [loading, setLoading] = React.useState(false)

    const setStatusDone = props.statusState;

    const clickHandler = () => {
        setPassVisible(!passVisible);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        passwordValidator()
    }

    return (
        <Dialog fullScreen open={true}>
            <div className="top-container">
                <div className="reset-container">
                    <LogoIcon className="logo" />
                    <Typography className={styles.titleRoot} variant="h6">Reset your password</Typography>
                    <Typography className={styles.contentRoot} variant="subtitle1">Create a new password here, then log in to your account</Typography>
                    <form className={styles.newPassRoot}>
                        <TextField
                            variant="outlined"
                            label="New password"
                            color="secondary"
                            type="password"
                            error={Boolean(newPasswordError)}
                            helperText={newPasswordError}
                            onChange={(e) => {
                                if (Boolean(newPasswordError) || Boolean(confirmPasswordError)) {
                                    setNewPasswordError('')
                                    setConfirmPasswordError('')
                                }
                                setNewPassword(e.target.value)
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Confirm new password"
                            type={passVisible ? "default" : "password"}
                            color="secondary"
                            onChange={(e) => {
                                if (Boolean(newPasswordError) || Boolean(confirmPasswordError)) {
                                    setNewPasswordError('')
                                    setConfirmPasswordError('')
                                }
                                setConfirmPassword(e.target.value)
                            }}
                            error={Boolean(confirmPasswordError)}
                            helperText={confirmPasswordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={clickHandler}
                                            edge='end'>
                                            <Visibility color={passVisible ? 'secondary' : 'default'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                    <Typography className={styles.captionRoot} variant="caption" >Changing your password will log out of all your browsers on your device(s).</Typography>
                    <Button disabled={loading} disableElevation className={styles.buttonRoot} type='submit' color="secondary" variant="contained" onClick={submitHandler}>{loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Set Password'}</Button>
                </div>
            </div>
        </Dialog>
    )

    function passwordValidator() {
        if (newPassword.length < 8) {
            setNewPasswordError("Password length must be more than 7 characters")
            return;
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Password does not match")
            return;
        }
        resetPassword(props.actionCode, confirmPassword);
    }

    function resetPassword(actionCode, newPassword) {

        //var accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.

        // Save the new password.

        setLoading(true)
        confirmPasswordReset(getAuth(), actionCode, newPassword).then((resp) => {
            setLoading(false)
            setStatusDone(true);
            console.log("Password Reset Successful")
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);

            // TODO: If a continue URL is available, display a button which on
            // click navigates the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
            console.log(error.message);
            setLoading(false)
        });
    }
}

export default ResetPassword;