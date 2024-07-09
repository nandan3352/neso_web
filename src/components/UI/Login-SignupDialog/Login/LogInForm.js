import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Button, DialogContentText } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import "./LogInForm.css";
import MobileForm from "./MobileLogin/MobileForm";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import SLButtons from "../Signup/SocialSignupButtons/SLButtons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  checkIfNewUser,
  signout,
  validateEmail,
} from "../../../../Services/Auth";
import PasswordField from "../PasswordField";

const useStyles = makeStyles((theme) => ({
  loginFormContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  root: {
    "&": {
      width: "100%",
      maxWidth: 390,
    },

    "& .loginInputs": {
      display: "grid",
      gridRowGap: 24,
    },

    "& .MuiTextField-root": {
      width: "100%",
      maxWidth: 390,

      "& .MuiButtonBase-root": {
        color: theme.palette.text.secondary,
      },
    },

    "& .MuiInputLabel-outlined": {
      color: theme.palette.text.secondary,
    },

    "& .MuiFormLabel-root.Mui-error": {
      color: "#f44336",
    },

    "& .formFooter": {
      marginTop: 22,
      textAlign: "center",
      color: theme.palette.text.secondary,

      "& .forgetPassword": {
        float: "right",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        letterSpacing: 1.25,
        textTransform: "uppercase",
        marginRight: -8,
        color: theme.palette.secondary.main,
      },

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
        color: theme.palette.text.buttonFilled,
        boxShadow: "none",
        margin: "6px 0px",

        [theme.breakpoints.down(1441)]: {
          margin: " 18px 0px",
        },

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

  header: {
    padding: 0,
  },

  formContainer: {
    overflowY: "visible",
    padding: 0,
    marginTop: 32,
  },

  alertStyles: {
    width: "390px !important",
  },
}));

export default function LoginForm({
  setShowLoginForm,
  postProcess,
  navigate,
  mobileRegisterCb,
  isMobileLogin = false,
}) {
  const classes = useStyles();
  const history = useNavigate();
  const [mobileLogin, setMobileLogin] = useState(isMobileLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const auth = getAuth();

  if (mobileLogin) {
    return (
      <MobileForm
        mobileRegisterCb={mobileRegisterCb}
        postProcess={postProcess}
        setMobileLogin={setMobileLogin}
      />
    );
  }

  if (showForgotPassword) {
    return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email) setEmailErrorText("Enter an email");
    if (!password) setPasswordErrorText("Enter a password");

    if (!email || !password) {
      return;
    }

    if (!validateEmail(email)) {
      setEmailErrorText("Please enter a valid email!");
      return;
    }

    setEmailErrorText("");
    setPasswordErrorText("");

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        if (!res.user.emailVerified) {
          setLoading(false);
          setPassword("");
          setEmailErrorText("Verify your email to continue");
          signout();
        } else {
          postProcess(
            await checkIfNewUser(
              res,
              {
                name: res.user.displayName,
                mail: res.user.email,
              },
              history,
              navigate
            ),
            res.user
          );
        }
      })
      .catch((error) => {
        setPassword("");
        setLoading(false);
        if (error.code === "auth/user-not-found") {
          setEmailErrorText("Please register your email to continue.");
        } else setEmailErrorText("Your email or password is incorrect");
        console.log(error);
      });
  };

  const handlePasswordChange = (e) => {
    if (passwordErrorText || emailErrorText) {
      setPasswordErrorText("");
      setEmailErrorText("");
    }
    setPassword(e.target.value);
  };

  return (
    <div className={classes.loginFormContainer}>
      <div>
        <DialogTitle
          id="form-dialog-title"
          className={`${classes.header} headerQuery`}
        >
          <div>Log in</div>
        </DialogTitle>
        <DialogContent className={classes.formContainer}>
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitHandler}
            noValidate
          >
            <div className="loginInputs">
              <div className="inputContainer">
                <TextField
                  InputLabelProps={{ required: false }}
                  id="loginEmail"
                  spellCheck={false}
                  label="Email"
                  error={Boolean(emailErrorText)}
                  helperText={emailErrorText}
                  variant="outlined"
                  type="email"
                  value={email}
                  className={classes.inputStyle}
                  onChange={(e) => {
                    if (passwordErrorText || emailErrorText) {
                      setPasswordErrorText("");
                      setEmailErrorText("");
                    }
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="inputContainer">
                <PasswordField
                  onChange={handlePasswordChange}
                  className={classes.inputStyle}
                  errorText={passwordErrorText}
                  value={password}
                />
              </div>
            </div>

            <div className="formFooter">
              <Button
                className="forgetPassword"
                onClick={() => setShowForgotPassword(true)}
              >
                FORGOT PASSWORD?
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="logInButton"
                variant="contained"
              >
                {loading ? <CircularProgress /> : "LOG IN"}
              </Button>

              <DialogContentText>
                <div style={{ marginTop: 6 }}>
                  Don't have an account?{" "}
                  <span
                    className="toggleButton"
                    onClick={() => setShowLoginForm(false)}
                  >
                    SIGN UP
                  </span>
                </div>
              </DialogContentText>
            </div>
          </form>
        </DialogContent>
      </div>

      <SLButtons
        navigate={navigate}
        setMobileLogin={setMobileLogin}
        postProcess={postProcess}
      />
    </div>
  );
}
