import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import "./Button.css";

const IconFilledButton = () => {
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
        <Button className="Icon-filled">
          <PlayArrowIcon />
        </Button>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default IconFilledButton;
