import { Button, makeStyles } from "@material-ui/core";
import FaqList from "./FaqList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    height: "502px",
    overflowY: "auto"
  },
  faq: {
    flex: 1,
    overflowY: "auto",
  },
  title: {
    ...theme.typography.h5,
  },
  subtitle: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: 16,
  },
  contactSupport: {
    display: "Flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    margin: "16px 0px",
  },
  contacthead: {
    ...theme.typography.h6,
    [theme.breakpoints.down("sm")] : {
      ...theme.typography.subtitle1,
    }
  },
  contactText: { ...theme.typography.caption },
}));

const FaqEmbeddable = ({switchSupport, btnText, hideSupportLink}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>Frequently Asked Questions</div>
      <div className={classes.subtitle}>
        Quick answers to questions you may have.
      </div>
      <div className={classes.faq}>
        <FaqList />
      </div>
     {!hideSupportLink && <div className={classes.contactSupport}>
        <div>
          <div className={classes.contacthead}>Still have a question?</div>
          <div className={classes.contactText}>
            Contact our chat support team
          </div>
        </div>
        <Button disableElevation variant="contained" color="secondary" onClick={switchSupport}>
          {" "}
          {btnText || "send message"}
        </Button>
      </div>}
    </div>
  );
};

export default FaqEmbeddable;
