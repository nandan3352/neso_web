import React, { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, DialogContentText } from "@material-ui/core";
import OTPForm from "../../../MobileOTPVerification/OTPForm";
import MobileNumberInput from "../../../../MobileNumberInput/MobileNumberInput";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { httpsCallable, getFunctions } from "firebase/functions";

const useStyles = makeStyles((theme) => ({
  container: {
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

    "& .MuiDialogTitle-root": {
      padding: 0,
      marginTop: 76,
    },

    "& .MuiDialogContent-root": {
      padding: 0,
    },
  },

  root: {
    marginTop: 56,

    [theme.breakpoints.down(469)]: {
      marginTop: 32,
    },

    "& .MuiTextField-root": {
      width: 390,
      caretColor: theme.palette.secondary.main,
    },

    "& .MuiInputLabel-outlined": {
      color: theme.palette.text.secondary,
    },

    "& .formFooter": {
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginTop: 48,

      "& .logInButton": {
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
        color: "#ffffff",
        boxShadow: "none",

        "&:hover": {
          background: "#026363",
        },
      },
    },
  },

  header: {
    paddingLeft: 0,
    maxWidth: 390,
    margin: "auto",
    display: "grid",
    gridRowGap: 3,
  },

  otpWrapper: {
    height: "100%",
    display: "flex",

    [theme.breakpoints.down(469)]: {
      marginTop: 82,
    },
  },
}));
/* global grecaptcha */
export default function MobileForm({
  setMobileLogin,
  postProcess,
  mobileRegisterCb,
}) {
  const classes = useStyles();

  const [user, setUser] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState("+91");
  const [mobileErrorText, setMobileErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  function registerUser() {
    mobileRegisterCb();
  }

  if (showOTPForm) {
    return (
      <div className={classes.otpWrapper}>
        <OTPForm
          loginPostProcess={postProcess}
          number={`${mobileCountryCode}${mobileNumber}`}
          user={user}
          setShowOTPForm={setShowOTPForm}
          showBackButton
        />
      </div>
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!mobileNumber) {
      setMobileErrorText("Enter a mobile number");
      return;
    }

    if (mobileNumber.length < 8) {
      setMobileErrorText("please enter a valid mobile number");
      return;
    }

    setLoading(true);

    const isUserAlreadyRegistered = await httpsCallable(
      getFunctions(),
      "getUserDetails"
    )({ phone: `${mobileCountryCode}${mobileNumber}` });

    if (isUserAlreadyRegistered.data !== true) {
      setMobileErrorText("Please register your mobile number");
      setLoading(false);
      return;
    }

    window.appVerifier = new RecaptchaVerifier(
      auth,
      "invisible-recatcha-container",
      {
        size: "invisible",
      }
    );

    signInWithPhoneNumber(
      auth,
      `${mobileCountryCode}${mobileNumber}`,
      window.appVerifier
    )
      .then((e) => {
        setUser(e);
        setLoading(false);
        setShowOTPForm(true);
        try {
          window.appVerifier
            .render()
            .then(function (widgetId) {
              grecaptcha.reset(widgetId);
            })
            .catch((e) => {});
        } catch (e) {}
      })
      .catch((error) => {
        try {
          window.appVerifier
            .render()
            .then(function (widgetId) {
              grecaptcha.reset(widgetId);
            })
            .catch((e) => {});
        } catch (e) {}
        setLoading(false);
        console.log(error);
        if ((error.code = "auth/invalid-phone-number")) {
          setMobileErrorText("Please enter a valid mobile number");
        } else {
          setMobileErrorText("Something went wrong , CODE : " + error.code);
        }
      });
  };

  const clickHandler = () => {
    setMobileLogin(false);
  };

  return (
    <div className={classes.container}>
      <div className="backButton" onClick={clickHandler}>
        <IconButton style={{ marginRight: -12 }} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </div>

      <DialogTitle id="form-dialog-title">
        <div className={classes.header}>
          <div>Log in</div>
          <div className="subHeading">Enter your mobile number</div>
        </div>
      </DialogTitle>
      <DialogContent>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={submitHandler}
          noValidate
        >
          <div className="inputContainer">
            <MobileNumberInput
              mobileErrorText={mobileErrorText}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              setMobileErrorText={setMobileErrorText}
              mobileCountryCode={mobileCountryCode}
              setMobileCountryCode={setMobileCountryCode}
            />
          </div>

          <span id="invisible-recatcha-container"></span>

          <div className="formFooter">
            <Button disabled={loading} type="submit" className="logInButton">
              {loading ? (
                <CircularProgress style={{ color: "#FFFFFF" }} size={24} />
              ) : (
                "SEND OTP"
              )}
            </Button>
            <DialogContentText>
              <div style={{ marginTop: 16 }}>
                Don't have an account?{" "}
                <span
                  className="toggleButton"
                  onClick={registerUser}
                >
                  REGISTER
                </span>
              </div>
            </DialogContentText>
          </div>
        </form>
      </DialogContent>
    </div>
  );
}
