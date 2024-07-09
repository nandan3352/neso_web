import React from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Services/Auth";
import { AuthDialogEvent, useEventDispatch } from "../../Services/Events";
import FaqList from "./FaqList";
import SectionCardComponent from "../../components/UI/Shared/SectionCardComponent";

const useStyles = makeStyles((theme) => ({
  root: ({ container }) => ({
    padding: container ? 16 : 0,
    maxWidth: 960,
    margin: "auto",
    marginTop: 48,
    [theme.breakpoints.down("sm")]: {
      marginTop: 32,
    },
  }),
  heading: ({container}) => ({
    ...theme.typography.h3,
    fontSize : container ? "3rem" : 24,
    textAlign: container? "left" : "center",
    marginBottom: 8,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h5,
      textAlign: "left",
      fontWeight: 500,
    },
  }),
  subtitle: ({container}) => ({
    ...theme.typography.subtitle1,
    textAlign: container ? "left" : "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      textAlign: "left",      
    },
  }),
  qgrid: {
    margin: "32px auto",
    [theme.breakpoints.down("sm")]: {
      margin: "16px auto",
    },
  },
  chatSection: {
    margin: "16px 0px",
  },
}));

const Faq = ({ container = true }) => {
  const classes = useStyles({ container });
  const history = useNavigate();
  const user = useUser();
  const dispatchAuth = useEventDispatch(AuthDialogEvent);

  const handleSupport = () => {
    if (user) history.push("support");
    else {
      dispatchAuth({ open: true, msg: "Kindly Login to get support." });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.heading}>Frequently Asked Questions</div>
      <div className={classes.subtitle}>
        Quick answers to questions you may have.
      </div>
      <div className={classes.qgrid}>
        <FaqList />
      </div>
      <div className={classes.chatSection}>
        <SectionCardComponent
          title="Still have a question?"
          description="Get in touch with our customer support team."
          btnText="Message us"
          onClick={handleSupport}
        />
      </div>
    </div>
  );
};

export default Faq;
