import React from "react";
import {
  Accordion,
  AccordionSummary,
  CircularProgress,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import card from "../../../assets/images/Payment/card.svg";
import netbanking from "../../../assets/images/Payment/netbanking.svg";
import wallet from "../../../assets/images/Payment/wallet.svg";
import UPI from "../../../assets/images/Payment/UPI.svg";
import paypal from "../../../assets/images/Payment/paypal.svg";

const useStyles = makeStyles((theme) => ({
  paymentMethodsRootHeader: {
    borderBottom: "1px solid rgba(var(--theme-divider))",
    height: 48,
    padding: "16px 24px",
    fontWeight: 500,
    fontSize: 10,
    lineHeight: "16px",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
    boxSizing: "border-box",

    [theme.breakpoints.down(469)]: {
      padding: 12,
      height: 40,
    },
  },

  paymentMethods: {
    border: "1px solid rgba(var(--theme-divider))",
    borderBottom: 0,
    width: 568,
    //height: '100%',

    [theme.breakpoints.down(769)]: {
      width: "100%",
    },

    "& .MuiAccordionSummary-content": {
      alignItems: "center",
    },

    "& .MuiTypography-root": {
      marginLeft: 8,
    },

    "& .MuiAccordion-root": {
      boxShadow: "none",
      borderRadius: 0,

      "& .Mui-checked": {
        "& .MuiIconButton-label": {
          color: theme.palette.secondary.main,
        },
      },

      "& .MuiIconButton-label ": {
        color: theme.palette.text.secondary,
      },

      "& > .MuiButtonBase-root ": {
        padding: "0px 24px",

        [theme.breakpoints.down(469)]: {
          padding: "0px 12px",
        },
      },

      "& .MuiFormControlLabel-root": {
        marginRight: 0,
      },

      "& .MuiAccordionSummary-root": {
        borderBottom: "1px solid rgba(var(--theme-divider))",
        height: 72,
      },
    },
  },
}));

export default function PaymentMethods({
  paymentMethod,
  paymentLoading,
  setPaymentMethod,
}) {
  const classes = useStyles();

  const PaymentLoadingIcon = (mode) => {
    return (
      paymentLoading &&
      paymentMethod === mode && (
        <>
          <div style={{ flexGrow: 1 }} />
          <CircularProgress color="secondary" size={24} />
        </>
      )
    );
  };

  const paymentMethods = [
    {
      id: "card",
      methodName: "Card",
      icon: card,
    },
    {
      id: "netbanking",
      methodName: "Netbanking",
      icon: netbanking,
    },
    {
      id: "wallet",
      methodName: "Wallet",
      icon: wallet,
    },
    {
      id: "upi",
      methodName: "UPI ID",
      icon: UPI,
    },

    {
      id: "paypal",
      methodName: "PayPal",
      icon: paypal,
    },
  ];

  return (
    <div className={classes.paymentMethods}>
      <div className={classes.paymentMethodsRootHeader}>payment method</div>
      {paymentMethods.map((paymentMethodData) => (
        <div>
          <Accordion onClick={setPaymentMethod(paymentMethodData.id)}>
            <AccordionSummary>
              <FormControlLabel
                aria-label="Acknowledge"
                control={
                  <Radio
                    color="secondary"
                    checked={paymentMethodData === paymentMethodData.id}
                  />
                }
              />
              {typeof paymentMethodData.icon !== "string" ? (
                paymentMethodData.icon
              ) : (
                <img src={paymentMethodData.icon} alt="" />
              )}
              <Typography>{paymentMethodData.methodName}</Typography>
              {PaymentLoadingIcon(paymentMethodData.id)}
            </AccordionSummary>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
