import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BenefitCard from "./BenefitCard/BenefitCard";
import chatSupportIcon from "../../../assets/images/Fuel/chat.svg";
import ChatOverlay from "./Overlay/ChatOverlay";
import Faq from "../../../containers/FAQ/Faq";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    //height: 764,
    padding: "52px 24px",
    position: "relative",
    background:
      theme.palette.type === "dark"
        ? "#000000"
        : theme.palette.background.default,

    [theme.breakpoints.down(769)]: {
      height: 532,
    },

    [theme.breakpoints.down(469)]: {
      padding: "48px 16px",
      height: "fit-content",
    },

    "& .chatIcon": {
      width: 48,
      opacity: 1,
      transition: "opacity 200ms ease-in-out",
      position: "fixed",
      bottom: 40,
      right: 40,
      zIndex: 300,
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        bottom: 68,
      },
    },

    "& #invisible": {
      opacity: 0,
    },
  },

  Header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 400,
    marginBottom: 48,
    color: theme.palette.text.primary,

    [theme.breakpoints.down(469)]: {
      marginBottom: 0,
      fontSize: 20,
      textAlign: "start",
      fontWeight: 500,
    },
  },

  benefitCardContainer: {
    display: "flex",
    gridColumnGap: 20,
    width: "100%",
    maxWidth: 960,
    margin: "auto",

    [theme.breakpoints.down(769)]: {
      maxWidth: 704,
    },

    [theme.breakpoints.down(469)]: {
      flexDirection: "column-reverse",
    },
  },
}));

export default function FuelBenefitContainer(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    const boundary = document.querySelector(".chatIcon");
    const footerB = document.getElementById("footerBoundary");
  
    const callback = () => {
      if (!boundary || !footerB) return;
      if (
        boundary.getBoundingClientRect().y + 48 + 12 + 140 >
        footerB.getBoundingClientRect().y - 62//62
      ) {
        if (showChat) setShowChat(false);
      } else if (!showChat) {
        setShowChat(true);
      }
    };

    window.addEventListener("scroll", callback);

    return () => {
      window.removeEventListener("scroll", callback);
    };
  }, [showChat]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenChatSupport = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div className={classes.root} {...props}>
      <div className={classes.Header}>
        <span>Benefits</span>
      </div>

      <div
        className="chatIcon"
        id={showChat ? "" : "invisible"}
        onClick={handleOpenChatSupport}
      >
        <img src={chatSupportIcon} alt="" />
      </div>
      <ChatOverlay
        anchorEl={anchorEl}
        handleClose={handleClose}
        close={setAnchorEl}
      />

      <div className={classes.benefitCardContainer}>
        <BenefitCard free />
        <BenefitCard />
      </div>

      <Faq container={false} />

    </div>
  );
}
