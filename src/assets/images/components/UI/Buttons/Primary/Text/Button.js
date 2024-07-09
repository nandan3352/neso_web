import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import "./Button.css";

const PrimaryTextButton = (props) => {
  const theme = createMuiTheme({
    props: {
      // Name of the component
      MuiButtonBase: {
        // The properties to apply
        disableRipple: false, // No more ripple, on the whole application!
      },
    },
  });
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Button
          className="Primary-text"
          style={{ width: `${props.width}`, height: `${props.height}` }}
        >
          {props.content}
        </Button>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default PrimaryTextButton;
