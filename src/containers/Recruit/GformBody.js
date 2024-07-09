import React from "react";
import Btn from "../../components/UI/Buttons/Secondary/Outline1/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./body.css";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
  },
  iframeContainer: {
    scrollbarWidth: 'none',
    overflow: 'hidden'
  },
  closeBtn : {
    position : 'absolute',
    top : 0,
    right : 0,
    marginRight : 16,
    [theme.breakpoints.down('xs')] : {
      marginRight : 0,
    }
  },
  paper: {
    position: "absolute",
    width: "95vw",
    height: "95vh",
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
const Body = ({ link, title, close }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [loading, setLoading] = React.useState(true)

  return (
    <div className={classes.paper} style={modalStyle}>
      <IconButton className={classes.closeBtn} onClick={close} ><Close /></IconButton> 
      <iframe
        className={classes.iframeContainer}
        src={link}
        title={title}
        width='100%'
        height={loading ? '0px' : '100%'}        
        frameborder='0'
        onLoad={e => setLoading(false)}
        marginheight='0'
        marginwidth='0'>
        Loading…
      </iframe>
      <div className={classes.loadingContainer}>
        {loading && <CircularProgress color='secondary' />}
      </div>
    </div>
  );
};

export default Body;
