import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Facebook from "../../../assets/images/SocialLoginButtonIcons/facebook.svg";
import { Button } from "@material-ui/core";
import NameChangeDialog from "../Dialogs/NameChangeDialog";
import { EmailAuthProvider, FacebookAuthProvider } from "firebase/auth";
import PasswordDialog from "../Dialogs/PasswordDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,

    "& .loginProvider": {
      display: "flex",
      marginLeft: 10,

      "& img": {
        height: 24,
        width: 24,
      },

      "& .loginProviderText": {
        marginLeft: 8,
        fontSize: 16,
        lineHeight: "24px",
        letterSpacing: 0.15,
        color: theme.palette.text.secondary,
      },
    },

    "& .userInfoItem": {
      paddingBottom: 16,
      marginTop: 24,
      height: 64,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      "& .MuiButton-root": {
        width: 95,
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      },

      "& .PersonalUserInfo": {
        height: "100%",
        width: 360,
        boxSizing: "border-box",
        padding: "9px 0px 12px 16px",

        "& .userInfoNormalText": {
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: 0.15,
        },

        "& .userInfoSmallText": {
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: 0.25,
          color: theme.palette.text.secondary,
        },
      },
    },
  },
}));

export default function PersonalInfoFacebook({ user }) {
  const classes = useStyles();

  const [showNameChange, setShowNameChange] = useState(false);
  const [showAddPassword, setShowAddPassword] = useState(false);

  const handleNameDilaogClose = () => setShowNameChange(false);
  const handleNameDialogClick = () => setShowNameChange(true);
  const handleAddPassword = () => setShowAddPassword(true);
  const handleAddPasswordClose = () => setShowAddPassword(false);
  const hasPassword = user.providerData.find(
    (p) => p.providerId === EmailAuthProvider.PROVIDER_ID
  );

  return (
    <div className={classes.root}>
      <div className="loginProvider">
        <div>
          <img src={Facebook} alt="" />
        </div>
        <div className="loginProviderText">Logged in as Facebook</div>
      </div>

      <div className="userInfoItem">
        <div className="PersonalUserInfo">
          <div className="userInfoNormalText">Name</div>
          <div className="userInfoSmallText">{user.displayName}</div>
        </div>
        <div>
          <Button variant="outlined" onClick={handleNameDialogClick}>
            update
          </Button>
        </div>
      </div>
      <div style={{marginTop: 0}}  className="userInfoItem">
        <div className="PersonalUserInfo">
          <div className="userInfoNormalText">Password</div>
          <div className="userInfoSmallText">••••••••</div>
        </div>
        <div>
          <Button variant="outlined" onClick={handleAddPassword}>
            {hasPassword ? "Update" : "Add"}
          </Button>
        </div>
      </div>

      <PasswordDialog
        isAddPassword={!hasPassword}
        onClose={handleAddPasswordClose}
        show={showAddPassword}
      />
      <NameChangeDialog
        showNameChange={showNameChange}
        onClose={handleNameDilaogClose}
      />
    </div>
  );
}
