import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import "./Button.css";

const SecondaryOutline2Button = (props) => {
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
          {...props}
          className='Secondary-outline2'
          style={{ width: `${props.width}`, height: `${props.height}` }}
        >
          {props.content}
        </Button>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default SecondaryOutline2Button;
