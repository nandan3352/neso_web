import PlanSummary from "./PlanSummary";
import SecurityIcon from "@material-ui/icons/Security";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as RazorpayLog } from "../../../assets/icons/razorpay_logo.svg";

const usePaymentSummaryStyles = makeStyles((theme) => ({
  subscriptionPlanSummary: {
    flexBasis: "60%",
    height: "100%",

    [theme.breakpoints.down(769)]: {
      width: "100%",
      minWidth: 0,
    },
  },

  securedPaymentconf: {
    marginTop: 23,
    paddingLeft: 0,
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down(469)]: {
      marginTop: 16,
      paddingLeft: 14,
    },
  },
  razorpayIcon: {},
  paymentSecureIcon: {
    height: 24,
    color: theme.palette.text.secondary,

    "& > .MuiSvgIcon-root": {
      height: 24,
      width: 24,
    },

    [theme.breakpoints.down(469)]: {
      height: 16,

      "& > .MuiSvgIcon-root": {
        height: 16,
        width: 16,
      },
    },
  },

  paymentSecureStat: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: 0.15,
    margin: "0px 5px",

    [theme.breakpoints.down(469)]: {
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: 0.4,
      fontWeight: 400,
    },
  },
}));

function PaymentSummary({
  setGstIn,
  gstin,
  fuelData,
  address,
  coupon,
  openCouponDialog,
  removeCoupon,
}) {
  const classes = usePaymentSummaryStyles();

  return (
    <div className={classes.subscriptionPlanSummary}>
      <PlanSummary
        gstinVal={gstin}
        setGstIn={setGstIn}
        fuelData={fuelData}
        removeCoupon={removeCoupon}
        coupon={coupon}
        openCouponDialog={openCouponDialog}
        address={address}
      />
      <div className={classes.securedPaymentconf}>
        <div className={classes.paymentSecureIcon}>
          <SecurityIcon />
        </div>
        <div className={classes.paymentSecureStat}>
          This payment is secured by
        </div>
        <RazorpayLog height={24} width={113} />
      </div>
    </div>
  );
}

export default PaymentSummary;
