import React from "react";
import Img from "./Error.svg";
import SO1Button from "../../components/UI/Buttons/Secondary/Outline1/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => (
    {
        mainContainer : {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },

        container : {

        },

        img : {
            width: '100%',
            height: '244px',
            display: 'flex',
            justifyContent: 'center',
            margin: '32px 0'
        },

        text : {
            width: '480px',
            height: '97px',
            left: '480px',
            top: '497px',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '32px',
            lineHeight: '48px',
            textAlign: 'center',
            color: theme.palette.text.primary,
            marginBottom: '48px'
        },

        button :{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20vh'
        },

        buttonLink : {

        }
    }
))

const NetworkError = (props) => {
    const classes = useStyles()
  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.img}>
          <img src={Img} alt="" />
        </div>
        <div>
          <p className={classes.text}>
            {props.info}
          </p>
        </div>
        <div className={classes.button}>
          <Link
          to="/"
            onClick={() => props.handle()}
            className={classes.buttonLink}
            style={{ textDecoration: "none" }}>
            <SO1Button content="Try again" width="147px" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
