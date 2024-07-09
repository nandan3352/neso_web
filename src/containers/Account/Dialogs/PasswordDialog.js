import {
  Button,
  CircularProgress,
  Dialog,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useUser } from "../../../Services/Auth";
import { SnackbarEvent, useEventDispatch } from "../../../Services/Events";
import {
  signInWithEmailAndPassword,
  getAuth,
  updatePassword,
  EmailAuthProvider,
  linkWithCredential,
  reauthenticateWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  ChangeDialog: {
    width: 424,
    height: 340,
    padding: "32px 48px 36px 48px",
    display: "flex",
    flexDirection: "column",
    gridRowGap: 32,
    boxSizing: "border-box",

    [theme.breakpoints.down(469)]: {
      width: "90vw",
      padding: "20px 24px",
      height: 316,
    },

    "& .MuiButton-root": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      width: 91,
    },

    "& .MuiTextField-root": {
      width: "100%",

      "& .MuiFormLabel-root.Mui-focused": {
        color: theme.palette.secondary.main,
      },

      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
      },

      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.divider,
      },
    },

    "& .ChangeUpdateButton": {
      marginTop: 5,
      textAlign: "center",
    },
  },

  header: {
    fontSize: 20,
    lineHeight: "24px",
    letterSpacing: 0.15,
    fontWeight: 500,
  },

  dialog: {
    "& .MuiDialog-paper": {
      [theme.breakpoints.down(469)]: {
        margin: 15,
      },
    },
  },
}));

export default function PasswordDialog({ onClose, show, isAddPassword }) {
  const classes = useStyles();
  const user = useUser();
  const [error, setError] = useState("");
  const [wrongPassword, setWrongPassword] = useState("");
  const dispatchSnack = useEventDispatch(SnackbarEvent);
  const [loading, setLoading] = useState(false);
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const auth = getAuth();

  const passwordChangeHandler = (e) => {
    if (error || wrongPassword) {
      setError("");
      setWrongPassword("");
    }

    const { name, value } = e.target;

    setPasswordChange((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  

  const handleAddPasswordRequest = () => {
    const provider = auth.currentUser.providerData[0].providerId;
    
    reauthenticateWithPopup(
      auth.currentUser,
      provider === GoogleAuthProvider.PROVIDER_ID
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider()
    ).then(userCred => {
      console.log(userCred.operationType);
      let cred = EmailAuthProvider.credential(
        userCred.user.email,
        passwordChange.newPassword
      );
      linkWithCredential(userCred.user, cred)
        .then((res) => {
          setLoading(false);
          dispatchSnack({
            msg: `Password has been added to ${res.user.email} successfully.`,
            open: true,
          });
          setPasswordChange((prev) => ({
            ...prev,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }));
          onClose();
        })
        .catch((err) => {
          setLoading(false);
          dispatchSnack({
            msg: `Something went wrong`,
            open: true,
          });
          console.log(err);
        });
      
    }).catch((err) => {
      setLoading(false);
        dispatchSnack({
          msg: `Invalid credentials.`,
          open: true,
        });
        setPasswordChange((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
    });
  };
  const handlePasswordChangeRequest = () => {
    signInWithEmailAndPassword(auth, user.email, passwordChange.oldPassword)
      .then((res) => {
        updatePassword(res.user, passwordChange.newPassword)
          .then(() => {
            setLoading(false);
            dispatchSnack({
              msg: `Password has been updated successfully.`,
              open: true,
            });
            setPasswordChange((prev) => ({
              ...prev,
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }));
            onClose();
          })
          .catch((err) => {
            setLoading(false);
            dispatchSnack({
              msg: `Something went wrong`,
              open: true,
            });
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setWrongPassword("Password you have entered is incorrect");
      });
  };

  function handleSubmit() {
    if (
      passwordChange.newPassword === passwordChange.confirmNewPassword &&
      passwordChange.newPassword.length >= 8
    ) {
      setLoading(true);
      if (isAddPassword) {
        handleAddPasswordRequest();
      } else {
        handlePasswordChangeRequest();
      }
    } else {
      setError(
        passwordChange.newPassword.length < 8
          ? "password length much be greater than or equal to 8 "
          : "New Password does not match with confirm password"
      );
    }
  }

  return (
    <>
      <Dialog open={show} onClose={onClose} className={classes.dialog}>
        <div className={classes.ChangeDialog} style={{ height: "auto" }}>
          <div>
            <div className={classes.header}>
              {isAddPassword ? "Add" : "Change"} password
            </div>
          </div>

          {!isAddPassword && (
            <div>
              <TextField
                error={Boolean(wrongPassword)}
                helperText={wrongPassword}
                label="Current password"
                InputLabelProps={{ required: false }}
                variant="outlined"
                name="oldPassword"
                type="password"
                value={passwordChange.oldPassword}
                onChange={passwordChangeHandler}
                required
              />
            </div>
          )}
          <div>
            <TextField
              label="New password"
              error={Boolean(error)}
              helperText={error}
              InputLabelProps={{ required: false }}
              variant="outlined"
              name="newPassword"
              type="password"
              onChange={passwordChangeHandler}
              value={passwordChange.newPassword}
              required
            />
          </div>
          <div>
            <TextField
              label="Confirm new password"
              InputLabelProps={{ required: false }}
              variant="outlined"
              name="confirmNewPassword"
              type="password"
              onChange={passwordChangeHandler}
              value={passwordChange.confirmNewPassword}
              required
            />
          </div>

          <div className="ChangeUpdateButton" style={{ marginTop: 17 }}>
            <Button
              disabled={loading || !Boolean(passwordChange.newPassword)}
              variant="outlined"
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress color="secondary" size={24} />
              ) : isAddPassword ? (
                "Add"
              ) : (
                "update"
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
