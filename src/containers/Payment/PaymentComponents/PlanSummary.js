import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Plutonium from "../../../assets/images/Logos/Plutonium.svg";
import Radium from "../../../assets/images/Logos/Radium.svg";
import Uranium from "../../../assets/images/Logos/Uranium.svg";
import { ReactComponent as CouponIcon } from "../../../assets/icons/CouponIcon.svg";
import { SnackbarEvent, useEventDispatch } from "../../../Services/Events";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  SvgIcon,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { KeyboardArrowRight, Done, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    border: "1px solid rgba(var(--theme-divider))",
    height: "auto",
    paddingBottom: 20,

    [theme.breakpoints.down(769)]: {
      minHeight: 275,
      height: "fit-content",
    },
  },
  noBorder: {
    border: "none",
  },
  gstinlable: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  },
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "1px solid #4A90E2",
    },
  },
  notchedOutline: {},

  planSummaryHeading: {
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

  paymentPackageBody: {
    padding: "26px 24px 0px 24px",

    [theme.breakpoints.down(769)]: {
      display: "flex",
      gridColumnGap: 30,
      gridRowGap: 20,
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "18px 32px 21px 39px",

      "& .packageContainer": {
        width: 393,
      },
    },

    [theme.breakpoints.down(469)]: {
      padding: "16px 12px 16px 12px",
    },

    "& .paymentFuelImage": {
      textAlign: "center",

      [theme.breakpoints.down(469)]: {
        display: "none",
      },

      "& > img": {
        height: 95.5,
      },
    },

    "& .SummaryBlock": {
      marginTop: 32,
      display: "flex",
      justifyContent: "space-between",

      [theme.breakpoints.down(769)]: {
        marginTop: 0,
      },

      "& .planSummaryText": {
        fontSize: 16,
        lineHeight: "24px",
        letterSpacing: 0.15,
        textTransform: "capitalize",
      },

      "& .validityText": {
        marginTop: 4,
        fontSize: 14,
        lineHeight: "20px",
        letterSpacing: 0.25,
        color: theme.palette.text.secondary,
      },

      "& .packagePackagePrice": {
        fontSize: 16,
        lineHeight: "24px",
        letterSpacing: 0.15,
      },
    },

    "& .couponCode": {
      display: "flex",
      alignItems: "center",
    },

    "& .couponTxt": {
      ...theme.typography.subtitle1,
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
    },

    "& .tfCoupon": {
      paddingLeft: 0,
    },

    "& .tfContainer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      columnGap: 29,
      marginTop: 16,
      width: "100%",
      fontSize: 16,
      lineHeight: "24px",
      color: "rgba(0, 0, 0, 0.38)",
      [theme.breakpoints.down("sm")]: {
        columnGap: 12,
      },
      "& .tfInnerContainer": {
        paddingLeft: 16,
        height: 40,
        flexGrow: 1,
        borderRadius: 4,
        background: theme.palette.container.footer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",

        "& .hint": {
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: 0.25,
        },

        "& .tfBtn": {
          lineHeight: "16px",

          "& .MuiButton-root": {
            padding: 0,
            fontSize: 14,
            color: theme.palette.secondary.main,
            letterSpacing: 1.25,
          },
        },
      },
    },

    "& .gstBlockHeader": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
      },
      "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
      },
    },

    "& .subgst": {
      ...theme.typography.caption,
      marginTop: 4,
      fontSize: 12,
      lineHeight: "20px",
      letterSpacing: 0.25,
      color: theme.palette.text.secondary,
    },

    "& .discount": {
      ...theme.typography.subtitle1,
      whiteSpace: "nowrap",
    },

    "& .paymentSubscriptionBodyFooter": {
      ...theme.typography.h6,
      borderTop: "1px dashed rgba(0, 0, 0, 0.12)",
      marginTop: 20,
      boxSizing: "border-box",
      paddingTop: 12,
      display: "flex",
      justifyContent: "space-between",
      letterSpacing: 0.15,
    },
  },

  gstSubBlockRoot: {
    padding: "0px 0px 0px 0px",
    display: "block",
  },

  amountFlow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: theme.spacing(2),
    boxSizing: "border-box",
  },

  gstBlockExpanded: {},

  gstBlock: {
    marginTop: theme.spacing(2),
    marginBottom: 8,
    "&$gstBlockExpanded": {
      marginBottom: 8,
    },
    "&::before": {
      display: "none",
    },
  },

  gstBlockHeaderExpanded: {},

  gstBlockHeader: {
    flexDirection: "row-reverse",
    minHeight: "auto",
    padding: 0,
    "&$gstBlockHeaderExpanded": {
      minHeight: "auto",
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-expandIcon": {
      padding: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: "0px 0px 0px 16px",
      justifyContent: "space-between",
    },
  },

  btn: {
    padding: "6px 16px",
  },

  couponClosebtn: {
    color: "#EB5757",
  },
}));

export default function PlanSummary({
  gstinVal,
  setGstIn,
  fuelData,
  address,
  coupon,
  openCouponDialog,
  removeCoupon,
}) {
  const classes = useStyles();
  const [gstin, changegstIn] = useState(null);
  const [gstinError, setGstInError] = useState(false);
  const [subGstExpand, setSubGstExpand] = useState(false);

  const isStateGST = address.state.toLowerCase().includes("uttar pradesh");
  const isIGST = !address.country.toLowerCase().includes("india");
  const theme = useTheme();
  let isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const getDays = (month) => parseInt(month) * 30;

  const getGST = (price) => Number(price * 0.18).toFixed(2);

  const getSubGST = (price) => getGST(price) / 2;

  const getGstAddedPrice = (price) =>
    parseInt(price) + parseFloat(getGST(price));

  const getDiscountAmount = (price) =>
    Number(
      (coupon ? getGstAddedPrice(price) * coupon.discount : 0).toFixed(2)
    );

  const getDiscountedPrice = (price) =>
    Number((getGstAddedPrice(price) - getDiscountAmount(price)).toFixed(2));

  const showSnackbar = useEventDispatch(SnackbarEvent);

  function checksum(g) {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/g.test(g);
  }

  const handleChangeGSTIN = (e) => {
    if (gstinError) {
      setGstInError(null);
    }

    changegstIn(e.target.value);
  };

  const handleGSTIN = (e) => {
    if (!checksum(gstin)) {
      setGstInError("GSTIN is incorrect.");
      return;
    }

    setGstIn(gstin);
    showSnackbar({ open: true, msg: "GSTIN number has been added." });
  };

  function applyCoupon(e) {
    openCouponDialog();
  }

  function getPlanImg(plan) {
    return plan === "radium"
      ? Radium
      : plan === "plutonium"
      ? Plutonium
      : Uranium;
  }

  const handleGstAccordion = (e) => {
    setSubGstExpand((prev) => !prev);
  };

  if (!fuelData) {
    return null;
  }

  const GSTINElement = (
    <div className="tfContainer">
      <div className="tfInnerContainer">
        <TextField
          error={Boolean(gstinError)}
          variant="standard"
          size="small"
          margin="normal"
          fullWidth
          classes={{
            root: {
              margin: 1,
            },
          }}
          InputLabelProps={{
            className: classes.gstinlable,
          }}
          className={classes.gstinField}
          onChange={handleChangeGSTIN}
          placeholder="Have GSTIN?"
          onFocus={() => setGstInError(false)}
          label={Boolean(gstinError) ? gstinError : ""}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <div>
          <Button
            className={classes.btn}
            color="secondary"
            onClick={handleGSTIN}
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );

  const RemoveBtn = isDesktop ? (
    <Button
      className={classes.couponClosebtn + " " + classes.btn}
      onClick={removeCoupon}
    >
      REMOVE
    </Button>
  ) : (
    <IconButton onClick={removeCoupon}>
      <Close />
    </IconButton>
  );

  return (
    <div className={classes.root}>
      <div className={classes.planSummaryHeading}>plan summary</div>
      <div className={classes.paymentPackageBody}>
        <div className="paymentFuelImage">
          <img src={getPlanImg(fuelData.name)} alt="" />
        </div>

        <div className="packageContainer">
          <div className="SummaryBlock">
            <div>
              <div className="planSummaryText">{fuelData.name}</div>
              <div className="validityText">
                Validity {getDays(fuelData.duration)} days ({fuelData.duration}{" "}
                month
                {fuelData.duration > 1 && "s"})
              </div>
            </div>
            <div className="packagePackagePrice">
              {fuelData.symbol + fuelData.price}
            </div>
          </div>

          <Accordion
            classes={{ expanded: classes.gstBlockExpanded }}
            className={classes.gstBlock}
            disableGutters
            elevation={0}
            expanded={subGstExpand}
            onChange={handleGstAccordion}
          >
            <AccordionSummary
              classes={{ expanded: classes.gstBlockHeaderExpanded }}
              className={classes.gstBlockHeader}
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<KeyboardArrowRight />}
            >
              <div className="planSummaryText">{isIGST && "I"}GST (18%)</div>
              <div className="packagePackagePrice">
                {fuelData.symbol + getGST(fuelData.price)}
              </div>
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.gstSubBlockRoot }}>
              <div>
                {isStateGST && (
                  <div className={classes.amountFlow}>
                    <div>
                      <div className="subgst">CGST (9%)</div>
                      <div className="subgst">SGST (9%)</div>
                    </div>
                    <div>
                      <div className="subgst">
                        {fuelData.symbol + getSubGST(fuelData.price)}
                      </div>
                      {
                        <div className="subgst">
                          {fuelData.symbol + getSubGST(fuelData.price)}
                        </div>
                      }
                    </div>
                  </div>
                )}
                {GSTINElement}
              </div>
            </AccordionDetails>
          </Accordion>
          <div className={classes.amountFlow + " tfCoupon"}>
            <div className="tfContainer">
              <div className="tfInnerContainer">
                <div className="couponCode">
                  {!coupon && (
                    <SvgIcon
                      style={{
                        marginRight: 10,
                      }}
                    >
                      <CouponIcon />
                    </SvgIcon>
                  )}
                  <span className="couponTxt">
                    {coupon ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {coupon.code}
                        <Done
                          style={{ marginLeft: 8 }}
                          htmlColor="#27AE60"
                        />{" "}
                      </span>
                    ) : (
                      "Use coupons"
                    )}
                  </span>
                </div>
                <div className="addGstIN">
                  {coupon ? (
                    RemoveBtn
                  ) : (
                    <Button
                      className={classes.btn}
                      color="secondary"
                      onClick={applyCoupon}
                    >
                      SELECT
                    </Button>
                  )}
                </div>
              </div>
              {coupon && (
                <div className="discount">
                  {"-" + fuelData.symbol + getDiscountAmount(fuelData.price)}
                </div>
              )}
            </div>
          </div>
          <div className="paymentSubscriptionBodyFooter">
            <div>Total amount</div>
            <div>{fuelData.symbol + getDiscountedPrice(fuelData.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
