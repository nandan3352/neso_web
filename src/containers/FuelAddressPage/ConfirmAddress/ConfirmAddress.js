import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Services/Auth";
import { databaseUpdate } from "../../../Services/Database";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    margin: "auto",
    marginTop: 20,
    width: "100%",
    maxWidth: 508,
    minHeight: 420,
    padding: "36px 20px 0px 20px",
    boxSizing: "border-box",

    "& .confirmAddressHeading": {
      fontSize: 20,
      lineHeight: "24px",
      fontWeight: 500,
      letterSpacing: 0.15,
      color: theme.palette.text.primary,
      textAlign: "center",
    },

    "& .userAddressBody": {
      margin: "auto",
      marginTop: 36,
      width: "100%",
      height: "84%",
      maxWidth: 410,
      position: "relative",

      "& .userAddressFullName": {
        fontSize: 20,
        lineHeight: "24px",
        fontWeight: 500,
        letterSpacing: 0.15,
        color: theme.palette.text.primary,
        textTransform: "capitalize",
      },

      "& .confirmAddressDetails": {
        marginTop: 24,
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: 132,
        wordBreak: "break-word",

        "& .userDetails": {
          width: 290,
          minHeight: 144,
          lineHeight: "24px",
          letterSpacing: 0.15,
          fontWeight: 400,
          textTransform: "capitalize",
          color: theme.palette.text.secondary,
          overflowWrap: "break-word",
        },

        "& .userAddressEditButton": {
          width: 66,
          height: 36,

          "& > .MuiButton-root": {
            color: theme.palette.secondary.main,
          },
        },
      },

      // button
      "& .confirmAddressButton": {
        position: "absolute",
        bottom: 48,
        left: 0,
        right: 0,

        "& > .MuiButtonBase-root": {
          width: "100%",
          color: theme.palette.text.buttonFilled,
          background: theme.palette.secondary.main,
          height: 48,
        },
      },
    },
  },
}));

export default function ConfirmAddress({
  subscriptionData,
  name,
  userAddress,
  setConfirmAddress,
  setEditAddress,
}) {
  const classes = useStyles();
  const history = useNavigate();
  const user = useUser();
  const clickHandler = () => {
    setConfirmAddress(false);
    setEditAddress(true);
  };

  const handleConfirm = () => {
    databaseUpdate(`Users/${user.uid}`, {
      billaddress: userAddress,
    })
      .then(() => {
        history.push({
          pathname: "/payment",
          state: {
            name: name,
            subscriptionData: subscriptionData,
            userAddress: userAddress,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <div className="confirmAddressHeading">Confirm address</div>

      <div className="userAddressBody">
        <div className="userAddressFullName">{userAddress.name}</div>

        <div className="confirmAddressDetails">
          <div className="userDetails">
            {userAddress.number} <br />
            {userAddress.address}, <br />
            {userAddress.city}, {userAddress.state} <br />
            {userAddress.country} {userAddress.pincode}        
          </div>
          <div className="userAddressEditButton">
            <Button variant="outlined" onClick={clickHandler}>
              edit
            </Button>
          </div>
        </div>

        <div className="confirmAddressButton">
          <Button disableElevation variant="contained" onClick={handleConfirm}>
            confirm and next
          </Button>
        </div>
      </div>
    </div>
  );
}
