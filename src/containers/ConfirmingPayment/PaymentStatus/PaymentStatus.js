import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import success from "../../../assets/images/Payment/Status/success.svg";
import failure from "../../../assets/images/Payment/Status/failure.svg";
import { Button } from "@material-ui/core";
import moment from "moment";
import { useNavigate } from "react-router";
import { useReactToPrint } from "react-to-print";
import { InvoiceClassWrapper } from "../../../components/UI/Invoice/Invoice";

const useStyles = makeStyles((theme) => ({
  normalText: {
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: 0.15,
    textTransform: "capitalize",
  },

  smallGreyText: {
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
    color: theme.palette.text.secondary,
  },

  transactionHeading: {
    fontWeight: 500,
    fontSize: 10,
    lineHeight: "16px",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
  },

  transactionDetails: {
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.25,
  },

  paymentStatusHeading: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: "24px",
    textTransform: "capitalize",
    letterSpacing: 0.15,
    textAlign: "center",
  },

  paymentStatusSubHeading: {
    width: 176,
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    lineHeight: "20px",
    letterSpacing: 0.25,
    color: theme.palette.text.secondary,
  },

  paymentStatusImage: {
    marginTop: 86,
    textAlign: "center",
  },

  failure: {
    color: "#FFFFFF !important",
  },

  homeButton: {
    position: "relative",
    top: 78,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      top: 0,
      marginTop: 32,
    },
    "& .MuiButton-root": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
    },
  },
}));

export default function PaymentStatus({ data }) {
  const classes = useStyles();
  const {
    transaction_id,
    order_id,
    user_id,
    fuel,
    error,
    user,
    invoice,
    nextpay,
    coupon,
  } = data ? data : { fuel: {}, error: true };
  const receiptbody = useRef();
  const handleReceipt = useReactToPrint({
    documentTitle: transaction_id,
    content: () => receiptbody.current,
  });
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setIsPaymentSuccess(!error);
  }, [error]);

  const PaymentSuccess = () => {
    const clickHandler = () => {
      history.push({
        pathname: "/home",
        state: {
          intent: "fuelActivated",
          name: fuel.name,
        },
      });
    };

    return (
      <>
        <div className={classes.paymentStatusHeading}>Payment Successful</div>

        <div className={classes.paymentStatusSubHeading}>
          Thank you for purchasing Neso Fuel
        </div>

        <div className={classes.paymentStatusImage}>
          <img src={success} alt="" />
        </div>

        <div className={classes.homeButton}>
          <Button variant="outlined" onClick={clickHandler}>
            Home
          </Button>
        </div>
      </>
    );
  };

  const PaymentFailure = () => {
    return (
      <>
        <div className={classes.paymentStatusHeading}>Payment Unsuccessful</div>

        <div className={classes.paymentStatusSubHeading}>
          {(data && data.reason) || "Something went wrong"}. Please try again.
        </div>

        <div className={classes.paymentStatusImage}>
          <img src={failure} alt="" />
        </div>

        <div className={classes.homeButton}>
          <Button variant="outlined" onClick={() => history.push("/")}>
            Home
          </Button>
        </div>
      </>
    );
  };

  const retry = (e) => {
    if (data.retryData) {
      history.push({
        pathname: "/payment",
        state: {
          ...data.retryData,
        },
      });
    } else {
      history.push("/fuel");
    }
  };

  const createdAt = parseInt(order_id.substring(4, order_id.length - 3));
  const validity = nextpay - createdAt;
  const duration = Math.ceil(validity / 2592000000);

  const getPurchasesDate = () => moment(createdAt).format("MMM D, Y • hh:mm A");

  const getExpiry = () => moment(nextpay).format("MMM D, Y [at] hh:mm A");

  const getGstPrice = (p) => p + p * 0.18;

  const getFinalPrice = (p) => {
    let gstPrice = getGstPrice(p);
    if (data.coupon) {
      return (gstPrice - gstPrice * data.coupon.discount).toFixed(2);
    }
    return gstPrice.toFixed(2);
  };

  return (
    <>
      <div className="paymentResultContainer">
        <div ref={receiptbody} className="paymentResult">
          <div className="paymentResultHeader">plan summary</div>

          <div className="paymentResultSubscriptionPlanDetails">
            <div className="paymentResultPlanInfo">
              <div className={classes.normalText}>Neso Fuel {fuel.name}</div>
              {isPaymentSuccess && (
                <div className={classes.smallGreyText}>
                  Expires on {getExpiry()}
                </div>
              )}
            </div>
            <div className="paymentResultPrice">
              <div>
                <span className="paymentResultPriceIcon">{fuel.symbol}</span>
                {getFinalPrice(fuel.price)}
              </div>
            </div>
          </div>

          <div className="paymentResultBody">
            {isPaymentSuccess && (
              <>
                <div>
                  <div className={classes.transactionHeading}>
                    TRANSACTION ID
                  </div>
                  <div className={classes.transactionDetails}>
                    {transaction_id}
                  </div>
                </div>
                <div>
                  <div className={classes.transactionHeading}>
                    NESO ORDER ID
                  </div>
                  <div className={classes.transactionDetails}>{order_id}</div>
                </div>
                <div>
                  <div className={classes.transactionHeading}>USER ID</div>
                  <div className={classes.transactionDetails}>{user_id}</div>
                </div>
              </>
            )}
            <div>
              <div className={classes.transactionHeading}>Date</div>
              <div className={classes.transactionDetails}>
                {getPurchasesDate()}
              </div>
            </div>

            <div className="GetReceiptButton">
              {isPaymentSuccess ? (
                <Button
                  className="successStatusButton no-print"
                  onClick={handleReceipt}
                >
                  get receipt
                </Button>
              ) : (
                <Button
                  disableElevation
                  className={classes.failure}
                  variant="contained"
                  color="secondary"
                  onClick={retry}
                >
                  retry
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="paymentStatus">
          {isPaymentSuccess ? <PaymentSuccess /> : <PaymentFailure />}
        </div>
      </div>
      {isPaymentSuccess && (
        <InvoiceClassWrapper
          ref={receiptbody}
          invoice={{
            ...invoice,
            validity,
            duration,
            discount: data.coupon?.discount || 0,
            amt: getFinalPrice(fuel.price) * 100,
          }}
          coupon={coupon}
          order_id={order_id}
          plans={{ [fuel.name]: fuel }}
          user={user}
        />
      )}
    </>
  );
}
