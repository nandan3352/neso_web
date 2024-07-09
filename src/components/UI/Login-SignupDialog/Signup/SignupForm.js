import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import "./SignupForm.css";
import SLButtons from "./SocialSignupButtons/SLButtons";
import MobileForm from "./MobileSignup/MobileForm";
import RegisterationComplete from "./Feedback/RegisterationComplete";
import { CircularProgress } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { signout, validateEmail } from "../../../../Services/Auth";
import { navigate } from "react-router-dom";
import PasswordField from "../PasswordField";

const useStyles = makeStyles((theme) => ({
  signUpFormContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  root: {
    width: "100%",
    maxWidth: 390,
    margin: "auto",

    "& .signupInputs": {
      display: "grid",
      gridRowGap: 24,
    },

    "& .MuiTextField-root": {
      width: "100%",
      maxWidth: 390,

      "& .MuiOutlinedInput-root": {
        height: 56,
      },

      "& .MuiButtonBase-root": {
        color: theme.palette.text.secondary,
      },

      "& .MuiInputLabel-outlined": {
        color: theme.palette.text.secondary,
      },

      "& .MuiFormLabel-root.Mui-error": {
        color: "#f44336",
      },
    },

    "& .MuiOutlinedInput-input": {
      padding: "16.5px 14px",
    },

    "& .formFooter": {
      textAlign: "center",
      color: theme.palette.text.secondary,

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
        color: theme.palette.text.buttonFilled,
        boxShadow: "none",
        margin: " 24px 0px 20px 0px",

        "&:hover": {
          background: "#026363",
        },

        "& .MuiCircularProgress-root": {
          height: "24px !important",
          width: "24px !important",
          color: "#FFFFFF",
        },
      },
    },
  },

  header: {
    padding: 0,
  },

  formContainer: {
    overflowY: "visible",
    padding: 0,
    marginTop: 32,
  },

  inputStyle: {
    "& > .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },

    "& > .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },

    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336;",
    },
  },
}));

export default function SignupForm({
  navigate,
  setShowLoginForm,
  isMobile,
  postProcess,
  isMobileRegister = false,
  mobileLoginCb,
}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");
  const [showRegSuccess, setshowRegSuccess] = useState(false);
  const [mobileSignup, setMobileSignup] = useState(isMobileRegister);
  const [passVisible, setPassVisible] = useState(false);
  const auth = getAuth();

  if (mobileSignup) {
    return (
      <MobileForm
        navigate={navigate}
        setMobileSignup={setMobileSignup}
        mobileLoginCb={mobileLoginCb}
      />
    );
  }

  if (showRegSuccess) {
    return isMobile ? (
      <navigate to={{ pathname: "/registeration-success", state: { email } }} />
    ) : (
      <RegisterationComplete embeded={true} regEmail={email} />
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email) setEmailErrorText("Enter an email");
    if (!password) setPasswordErrorText("Enter a password");
    if (!name) setNameErrorText("Enter a name");
    if (!email || !password || !name) return;

    if (!validateEmail(email)) {
      setEmailErrorText("Please enter a valid email!");
      return;
    }

    if (password.length < 6) {
      setPasswordErrorText("Password is too short");
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        sendEmailVerification(result.user)
          .then(() => {
            updateProfile(result.user, {
              displayName: name,
            }).then(() => {
              setshowRegSuccess(true);
              signout();
            });
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => {
        setPassword("");
        setEmailErrorText(
          "The email is already in use. Please use another email."
        );
        setLoading(false);
        console.log(error.message);
      });
  };

  function handlePassword(e) {
    if (passwordErrorText) setPasswordErrorText("");
    setPassword(e.target.value);
  }

  return (
    <div className={classes.signUpFormContainer}>
      <div className="signupForm">
        <DialogTitle
          id="form-dialog-title"
          className={`${classes.header} headerQuery`}
        >
          <div>Create an account</div>
        </DialogTitle>
        <DialogContent className={classes.formContainer}>
          <form
            className={`${classes.root} signupFormStyles`}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <div className="signupInputs">
              <div className="inputContainer">
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.inputStyle}
                  error={Boolean(nameErrorText)}
                  helperText={nameErrorText}
                  id="name"
                  label="Name"
                  variant="outlined"
                  spellCheck={false}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    if (nameErrorText) setNameErrorText("");
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="inputContainer">
                <TextField
                  error={Boolean(emailErrorText)}
                  helperText={emailErrorText}
                  InputLabelProps={{ required: false }}
                  id="email"
                  spellCheck={false}
                  className={classes.inputStyle}
                  label="Email"
                  inputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (emailErrorText) setEmailErrorText("");
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="inputContainer">
                <PasswordField
                  newpassword={true}
                  onChange={handlePassword}
                  className={classes.inputStyle}
                  errorText={passwordErrorText}
                  value={password}
                />
              </div>
            </div>

            <div className="formFooter">
              <Button disabled={loading} className="signUpButton" type="submit">
                {loading ? <CircularProgress /> : "SIGN UP"}
              </Button>
            </div>

            <div className="formFooter">
              Already have an account?{" "}
              <span
                className="toggleButton"
                onClick={() => setShowLoginForm(true)}
              >
                LOG IN
              </span>
            </div>
          </form>
        </DialogContent>
      </div>
      <SLButtons
        navigate={navigate}
        signUp
        setMobileSignup={setMobileSignup}
        postProcess={postProcess}
      />
    </div>
  );
}
