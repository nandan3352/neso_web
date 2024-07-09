import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import "./Button.css";

const PrimaryFilledButton = (props) => {
  const theme = createTheme({
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
          variant="contained"
          style={{ width: `${props.width}`, height: `${props.height}` }}
          className="Primary-filled"
        >
          {props.content}
        </Button>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default PrimaryFilledButton;
