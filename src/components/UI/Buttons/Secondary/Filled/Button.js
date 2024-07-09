import React from "react";
import {Button} from "@material-ui/core";
import "./Button.css";

const SecondaryFilledButton = (props) => {
  
  return (
        <Button
          {...props}
          href={props.href}
          style={{ ...props.style, width: `${props.width}`, height: `${props.height}`, margin : 0 }}
          color='secondary'
          variant="contained"
          className="Secondary-filled">
          {props.content}
        </Button>
  );
};

export default SecondaryFilledButton;
