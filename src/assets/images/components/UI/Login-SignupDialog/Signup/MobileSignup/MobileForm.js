import React, { useState } from "react";
import "./MobileForm.css";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router";
import MobileNumberInput from "../../../../MobileNumberInput/MobileNumberInput";
import {
  AuthDialogEvent,
  useEventDispatch,
} from "../../../../../Services/Events";
import { getFunctions, httpsCallable } from "@firebase/functions";

const useStyles = makeStyles((theme) => ({
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
      marginTop: 33,

      "& .signUpButton": {
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
        margin: "6px 0px",

        [theme.breakpoints.down(1441)]: {
          margin: " 15px 0px",
        },

        "&:hover": {
          background: "#026363",
        },
      },
    },
  },

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

      [theme.breakpoints.down(469)]: {
        marginTop: 48,
      },
    },

    "& .MuiDialogContent-root": {
      padding: 0,
    },
  },

  header: {
    paddingLeft: 0,
    maxWidth: 390,
    margin: "auto",
  },

  inputStyle: {
    "& .MuiOutlinedInput-inputAdornedStart": {
      paddingLeft: 14,
    },

    "& > .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },

    "& .MuiFormLabel-root.Mui-error": {
      color: "#f44336",
    },

    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336;",
    },

    "& > .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },
  },
}));

export default function MobileForm({
  setMobileSignup,
  navigate,
  mobileLoginCb,
}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState("+91");
  const [mobileErrorText, setMobileErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const dispatchAuth = useEventDispatch(AuthDialogEvent);

  const blockSpecialCharacter = (e) => {
    let key = e.key;
    let keyCharCode = key.charCodeAt(0);

    if (key === " ") {
      return;
    }
    // 0-9
    if (keyCharCode >= 48 && keyCharCode <= 57) {
      return key;
    }
    // A-Z
    if (keyCharCode >= 65 && keyCharCode <= 90) {
      return key;
    }
    // a-z
    if (keyCharCode >= 97 && keyCharCode <= 122) {
      return key;
    }

    e.preventDefault();
    return false;
  };

  const clickHandler = () => {
    setMobileSignup(false);
  };

  const history = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (name) setNameErrorText("");
    if (!name) setNameErrorText("Enter a name");
    if (!mobileNumber) setMobileErrorText("Enter a mobile number");
    if (!name || !mobileNumber) return;

    if (mobileNumber.length < 8) {
      setMobileErrorText("Please enter a valid mobile number");
      return;
    }

    setLoading(true);

    const isUserAlreadyRegistered = await httpsCallable(
      getFunctions(),
      "getUserDetails"
    )({ phone: `${mobileCountryCode}${mobileNumber}` });

    if (isUserAlreadyRegistered.data !== false) {
      setMobileErrorText(
        "Mobile number is already registered. Please login to continue."
      );
      setLoading(false);
      return;
    }

    dispatchAuth({ auth: false });
    history.push({
      pathname: "user-verification",
      state: {
        navigate: navigate,
        name: name,
        number: `${mobileCountryCode}${mobileNumber}`,
      },
    });
  };

  return (
    <div className={classes.container}>
      <div className="backButton" onClick={clickHandler}>
        <IconButton aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </div>

      <DialogTitle id="form-dialog-title" className="header">
        <div className={classes.header}>
          <div>Sign up with mobile number</div>
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
            <TextField
              error={Boolean(nameErrorText)}
              helperText={nameErrorText}
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onKeyPress={blockSpecialCharacter}
              className={classes.inputStyle}
              onChange={(e) => {
                if (Boolean(nameErrorText)) setNameErrorText("");
                setName(e.target.value);
              }}
            />
          </div>
          <div className="inputContainer" style={{ marginTop: 24 }}>
            <MobileNumberInput
              mobileErrorText={mobileErrorText}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              mobileCountryCode={mobileCountryCode}
              setMobileCountryCode={setMobileCountryCode}
              setMobileErrorText={setMobileErrorText}
            />
          </div>

          <div className="formFooter ">
            <Button
              disabled={loading}
              id="sign-in-button"
              type="submit"
              className="signUpButton"
            >
              {loading ? (
                <CircularProgress style={{ color: "white" }} size={24} />
              ) : (
                "SEND OTP"
              )}
            </Button>
            <div className="formFooter">
              Already have an account?{" "}
              <span
                className="toggleButton"
                onClick={mobileLoginCb}
              >
                LOG IN
              </span>
            </div>
          </div>
        </form>
      </DialogContent>
    </div>
  );
}
