import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useUser } from "../../../Services/Auth";
import { Delete } from "@material-ui/icons";
import { navigate } from "react-router-dom";
import ConfirmAccountDelete from "./ConfirmAccountDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 480,  
    boxSizing: "border-box",
    padding: "0px 32px 32px",
    [theme.breakpoints.down('sm')] : {
      width: "100%"
    }
  },
  feedbackField: {
    marginTop: 16,
  },
  counter: {
    color: theme.palette.text.secondary,
    textAlign : "right",
    marginTop : 8
  },
  buttons: {
    width: "100%",
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
}));

export default function DeleteAccountFeedback({ show, onClose }) {
  const classes = useStyles();
  const [confirm, setConfirm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackIndex, setFeedbackIndex] = useState();
  const user = useUser();


  const feedbacks = ["I want to use another account", "Not satisfied with the app", "I no longer need the courses", "Other reason"];

  const deleteAccount = () => {
    setConfirm(true)
  };

  const cancel = () => {
    setFeedback("");
    setFeedbackIndex()
    setConfirm(false);
    onClose();
  };

  const handleFeedbackInput = (e) => {
    setFeedback(e.target.value.substring(0,250));
  };

  const handleFeedbackSelect = (e, value) => {
    console.log(value);
    setFeedback(value < 3 ? feedbacks[value] : "");
    setFeedbackIndex(value);
  };

  if (!user) {
    return <navigate to={{ pathname: "/" }} />;
  }

  return (
    <div>
      <Dialog open={show} onClose={cancel}>
        <DialogTitle>Why did you choose to leave Neso Academy?</DialogTitle>
        <div className={classes.root}>
          <FormControl oncomponent="fieldset">
            <RadioGroup
              aria-label="feedback"
              name="feedback"
              value={feedbackIndex + ""}
              onChange={handleFeedbackSelect}
            >
              {feedbacks.map((text, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    style={{ marginRight: "7px" }}
                    value={index + ""}
                    control={<Radio color="secondary" />}
                    label={text}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>

          {feedbackIndex === "3" && <>
            <TextField
              value={feedback}
              className={classes.feedbackField}
              autoFocus
              multiline
              onChange={handleFeedbackInput}
              rows={4}
              rowsMax={6}
              fullWidth
              variant="outlined"
              label="Feedback"
              placeholder="Write your feedback here..."
              color="secondary"
            ></TextField>
              <div className={classes.counter}>
              {feedback.length}/250
              </div>
            </>
          }

          <div className={classes.buttons}>
            <Button
              disableElevation={true}
              disabled={!Boolean(feedback)}
              color="primary"
              startIcon={
                <Delete
                  color={!Boolean(feedback) ? "disabled" : ""}
                  htmlColor={Boolean(feedback) ?  "#FFFFFF" : ""}
                />
              }
              variant="contained"
              onClick={deleteAccount}
            >
              delete account
            </Button>
            <Button disableElevation={true} variant="outlined" onClick={cancel}>
              cancel
            </Button>
          </div>
        </div>
      </Dialog>
      <ConfirmAccountDelete feedback={feedback} show={confirm} onClose={cancel} />
    </div>
  );
}
