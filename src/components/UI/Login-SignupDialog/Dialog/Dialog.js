import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import "./dialog.css";
import LogInForm from "../Login/LogInForm";
import Aside from "../Aside/Aside";
import { makeStyles } from "@material-ui/core/styles";
import SignupForm from "../Signup/SignupForm";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { databaseSet } from "../../../../Services/Database";

const useStyles = makeStyles((theme) => ({
  root: {
    /*     width: 960,
         height: 680,
             minHeight: 660,
    */
    display: "flex",
    width: 960,
    overflow: "hidden",

    "& .dialogFormContainer": {
      width: 520,
      padding: "52px 64px 20px 64px",
      boxSizing: "border-box",
      position: "relative",
    },
  },

  paper: {
    margin: 0,
  },

  rightScrollContainer: {
    overflowX: "hidden",
    scrollbarWidth: "thin",
    width: "60%",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.divider,
    },
  },

  dialogCloseButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
}));

function AuthenticationDialog({
  open,
  onClose,
  showLoginForm,
  setShowLoginForm,
  navigate,
}) {
  const classes = useStyles();
  const history = useNavigate();
  const [mobileAuthState, setMobileAuthState] = useState({
    signUp: false,
    signIn: false,
  });

  function handleClose() {
    setMobileAuthState({ signIn: false, signUp: false });
    onClose();
  }

  function postProcess(nonavigate,user) {

    if(user)// clear deletes
    {
      databaseSet(`DeletionRequests/${user.uid}`, null);
      databaseSet(`Users/${user.uid}/deleteRequested`, false)
    }
    handleClose();
    if (navigate && !nonavigate) {
      //if user is new, verification will handle the navigate
      history.push(navigate);
    }
  }

  function setLoginUi(isSignIn) {
    setMobileAuthState({ signIn: false, signUp: false });
    setShowLoginForm(isSignIn);
  }

  function registerMobilePhonenavigate() {
    setMobileAuthState((prev) => ({ ...prev, signUp: true }));
    setShowLoginForm(false);
  }

  function loginMobilePhonenavigate() {
    setMobileAuthState((prev) => ({ ...prev, signIn: true }));
    setShowLoginForm(true);
  }

  return (
    <Dialog
      open={open}
      classes={{
        paper: classes.paper,
      }}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <div style={{ height: 680 }} className={classes.root}>
        <Aside />
        <div className={classes.rightScrollContainer}>
          <div className="dialogFormContainer">
            <IconButton
              aria-label="close"
              className={classes.dialogCloseButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {showLoginForm ? (
              <LogInForm
                navigate={navigate}
                postProcess={postProcess}
                setShowLoginForm={setLoginUi}
                isMobileLogin={mobileAuthState.signIn}
                mobileRegisterCb={registerMobilePhonenavigate}
              />
            ) : (
              <SignupForm
                navigate={navigate}
                postProcess={postProcess}
                setShowLoginForm={setLoginUi}
                isMobileRegister={mobileAuthState.signUp}
                mobileLoginCb={loginMobilePhonenavigate}
              />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AuthenticationDialog;
