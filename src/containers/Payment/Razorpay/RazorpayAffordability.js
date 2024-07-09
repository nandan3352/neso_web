import { makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "16px 0px",
  },
}));

const RazorpayAffordabity = ({ amount }) => {
  const classes = useStyles();
  
  const renderWidget = useCallback((amount) => {
    const key = /* "rzp_test_YNzWS79mC1j4AC"; // */"rzp_live_M7rPonMwH4hsba";
    const widgetConfig = {
      key: key,
      amount: amount,
      theme: {
        color: "#BF232D",
      },
    };
    const rzpAffordabilitySuite = new window.RazorpayAffordabilitySuite(
      widgetConfig
    );
    console.log("render", widgetConfig);
    rzpAffordabilitySuite.render();
  }, []);
  
  useEffect(() => {
    renderWidget(amount);
  }, [ amount, renderWidget])

  return (
    <div className={classes.container}>
      <div id="razorpay-affordability-widget"> </div>
    </div>
  );
};

export default RazorpayAffordabity;
