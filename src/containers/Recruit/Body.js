import React from "react";
import Btn from "../../components/UI/Buttons/Secondary/Outline1/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./body.css";
import SvgIcon from "@material-ui/core/SvgIcon";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflowY: 'auto'
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "40%",
    height: 632,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "90%",
    },
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // margin: "56px 50px",
  },
}));
const Body = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div className={classes.paper} style={modalStyle}>
      <div className='recruitModal'>
        <h5 className='recruitModalTitle'>Resume</h5>
        <div className='recruitModalPara'>
          <SvgIcon>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </SvgIcon>
          <p>Accepted file formats: pdf, doc, docx, and txt.</p>
        </div>
        <div className='recruitModalPara'>
          <SvgIcon>
            <svg focusable="false" viewBox="0 0 24 24" color="#F2994A" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </SvgIcon>
          <p style={{ color: "#F2994A" }}>Resume without sample lecture will be rejected.</p>
        </div>
        <div className='recruitModalBtn'>
          <a href="https://www.dropbox.com/request/GjvhVlApO4MZ5g4ForRg" target="_blank" rel="noopener noreferrer">

            <Btn width='150px' content='UPLOAD RESUME' />
          </a>
        </div>
        <h5 className='recruitModalTitle'>Sample Lecture</h5>
        <div className='recruitModalPara Long'>
          <SvgIcon>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </SvgIcon>
          <p>
            Sample lecture is a small duration lecture. Just select any one
            topic of your choice and explain. You may record sample lecture using
            paper & pen, board & marker etc.
          </p>
        </div>
        <div className='recruitModalPara Long'>
          <SvgIcon>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </SvgIcon>
          <p>
            If your video file has the size more than 1GB, consider uploading it
            to your Google Drive and share the link with us. Our email is{" "}
            <span style={{ color: "blue" }}>admin@nesoacademy.org</span>
          </p>
        </div>
        <div className='recruitModalPara'>
          <SvgIcon>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </SvgIcon>
          <p>
            Sample lecture must not exceed the 10 minutes mark.
          </p>
        </div>
        <div className='recruitModalBtn'>
          <a href="https://www.dropbox.com/request/sqfSUFZGo3qhcQ28M8p1" target="_blank" rel="noopener noreferrer">

            <Btn width='250px' content='UPLOAD SAMPLE LECTURE' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Body;
