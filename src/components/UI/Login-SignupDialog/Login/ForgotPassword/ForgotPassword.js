import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
import { FireBaseContext } from "../../../../../context/firebase";
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .backButton": {
      position: "absolute",
      top: 12,
      left: 52,

      [theme.breakpoints.down("sm")]: {
        left: -17,
      },

      [theme.breakpoints.down("xs")]: {
        left: 0,
        top: 4,
      },
    },

    "& .forgotPasswordSubText": {
      marginTop: 11,
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: 0.15,
      fontWeight: 400,
      color: theme.palette.text.secondary,
    },

    "& .emailInputForgotPass": {
      width: "100%",
      maxWidth: 390,
      marginTop: 56,

      "& .MuiTextField-root": {
        width: "100%",

        "& > .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: theme.palette.secondary.main,
          },
      },
    },

    "& .forgotPassButton": {
      width: "100%",
      maxWidth: 392,
      height: 48,
      background: theme.palette.secondary.main,
      borderRadius: 4,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "16px",
      letterSpacing: 1.25,
      textTransform: "uppercase",
      color: theme.palette.text.buttonFilled,
      boxShadow: "none",
      margin: " 48px 0px 32px 0px",

      "&:hover": {
        background: "#026363",
      },

      "& .MuiCircularProgress-root": {
        height: "24px !important",
        width: "24px !important",
        color: "#FFFFFF",
      },

      "& .MuiSvgIcon-root": {
        height: 40,
        width: 40,
        color: "#FFFFFF",
      },
    },

    "& .emailSentSuccess": {
      maxWidth: 364,
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: 0.15,
      color: theme.palette.secondary.main,
    },
  },

  header: {
    marginTop: 76,
    fontSize: 20,
    lineHeight: "24px",
    letterSpacing: 0.15,
    fontWeight: 500,
  },
}));

export default function ForgotPassword({ setShowForgotPassword }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [state, setState] = useState(0);
  const [emailErrorText, setEmailErrorText] = useState("");
  const auth = getAuth();

  const clickHandler = () => {
    setShowForgotPassword(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const forgetPasswordHandler = () => {
    if (!email) {
      setEmailErrorText("Enter an email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailErrorText("Please enter a valid email");
      return;
    }

    setState(1);
    fetchSignInMethodsForEmail(auth,email)
      .then((res) => {
        const hasEmail = res.find(prov => prov === EmailAuthProvider.PROVIDER_ID || FacebookAuthProvider.PROVIDER_ID)
        if(hasEmail){
          sendPasswordResetEmail(auth, email)
          .then(() => {
            setState(2);
          })
          .catch((err) => {});
        }else{
          setEmailErrorText(`The Account was created using Google Login method. kindly login with ${res[0]}`);
          setState(0);
        }
      })
      .catch((err) => {
        console.log(err);
        setEmailErrorText("Email was not registered. kindly check your email address.");
        setState(0);
      });
  };

  return (
    <div className={classes.root}>
      <div className="backButton" onClick={clickHandler}>
        <IconButton aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </div>

      <div className={classes.header}>Forgot password</div>
      <div className="forgotPasswordSubText">
        Enter your email address, and we’ll send you an email with a link to
        reset your password.
      </div>

      <div className="emailInputForgotPass">
        <TextField
          error={Boolean(emailErrorText)}
          helperText={emailErrorText}
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmailErrorText("");
            setEmail(e.target.value);
          }}
          type="email"
        />
      </div>

      <div>
        <Button
          disableElevation
          disabled={state === 2 || state === 1}
          className="forgotPassButton"
          variant="contained"
          onClick={forgetPasswordHandler}
        >
          {state === 0 ? (
            "reset password"
          ) : state === 1 ? (
            <CircularProgress />
          ) : (
            <DoneIcon />
          )}
        </Button>
      </div>

      {state === 2 ? (
        <div className="emailSentSuccess">
          Thanks! An email with a link to reset your password has been sent to
          your email.
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
