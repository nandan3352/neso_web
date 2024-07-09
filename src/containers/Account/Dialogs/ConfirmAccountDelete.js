import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { navigate } from "react-router";
import { signout, useUser } from "../../../Services/Auth";
import { SnackbarEvent, useEventDispatch } from "../../../Services/Events";
import { databaseSet } from "../../../Services/Database";
import { Delete } from "@material-ui/icons";
import { serverTimestamp } from "firebase/database";
import UserProfileImage from "../../../components/ServiceComponent/UserProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    boxSizing: "border-box",
    padding: 32,    
    [theme.breakpoints.down('sm')] : {
      width: "100%"
    }
  },
  title : {
    ...theme.typography.h5,
    fontWeight : 500,
    marginBottom : 16,
    textAlign: "center"
  },
  description : {
    ...theme.typography.body1,
    textAlign: "center"
  },
  profile:{
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    gap: 16,
    marginBottom: 16
  },
  username: {
    ...theme.typography.subtitle1,
    fontWeight : 500
  },
  profileId: {
    ...theme.typography.caption,
    color : theme.palette.text.secondary
  },
  dp : {
    borderRadius : "50%",
    height: 32
  },
  buttons: {
    width: "100%",
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
}));

export default function ConfirmAccountDelete({ show, feedback, onClose }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const dispatchSnackbar = useEventDispatch(SnackbarEvent);

  function cancel(params) {
    setLoading(false)
    onClose()
  }

  const submitRequest = async () => {
    setLoading(true)
    await databaseSet(`DeletionRequests/${user.uid}`, {
      email : user.email,
      mobile : user.phNo,
      feedback,
      timestamp: serverTimestamp(),
    });
    await databaseSet(`Users/${user.uid}/deleteRequested`, true);
    signout()
    dispatchSnackbar({ msg: "Account deletion request has been submitted successfully.", open: true });
  };

  if (!user) {
    return <navigate to={{ pathname: "/" }} />;
  }

  return (
    <div>
      <Dialog
        open={show}
        onClose={cancel}
      >
        <div className={classes.root}>
          <div className={classes.profile}>
          <UserProfileImage img={user.profilePic} width={34} uid={user.uid} name={user.displayName} />
          <div>
            <div className={classes.username}>{user.name}</div>
            <div className={classes.profileId}>{user.email || user.phNo}</div>
          </div>
          </div>
          <div className={classes.title}>Delete this Account?</div>
          <div className={classes.description} >Your account will be deleted in <b>30 days</b>. If you login before, your account will be reactivated automatically.</div>
          <div className={classes.buttons}>
            <Button
              disableElevation={true}
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={!loading && <Delete htmlColor="#FFFFFF" />}
              onClick={submitRequest}
            >
              {loading ? <CircularProgress size={24} color="secondary" /> : "confirm account deletion"}
            </Button>
            <Button
              disableElevation={true}
              disabled={loading}
              variant="outlined"
              onClick={cancel}
            >
              cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
