import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  fuelChatSupport: {
    width: "100%",
    maxWidth: 960,
    margin: "auto",
    marginTop: 48,
    padding: "32px 48px",
    boxSizing: "border-box",
    border: "1px solid rgba(var(--theme-divider))",
    [theme.breakpoints.down("sm")] : {    
      padding: 16,
      marginTop: 16,
    }
  },
  chatSupportheading: {
    color: theme.palette.text.primary,
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 8,
    [theme.breakpoints.down("sm")] : {
      fontSize: 16
    }
  },

  contactus: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    marginBottom: 20,
    [theme.breakpoints.down("sm")] : {
      fontSize: 12,
      marginBottom: 16,
    }
  },
  contactButton: {
    "& .MuiButton-root": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
    },
  },
}));

const SectionCardComponent = ({ title, description, btnText, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.fuelChatSupport}>
      <div className={classes.chatSupportheading}>
        {title}
      </div>
      <div className={classes.contactus}>
        {description}
      </div>
      <div className={classes.contactButton}>
        <Button
          onClick={onClick}
          variant="outlined"
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default SectionCardComponent;
