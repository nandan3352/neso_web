import { Dialog } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NesoLogo from "../../assets/images/Logos/NesoLogo.svg";
import Timeline from "../../components/UI/Timeline/Timeline";
import React, { useEffect, useState } from "react";
import PaymentMethods from "./PaymentComponents/PaymentMethods";
import "./Payment.css";
import Logo from "../../assets/images/Logos/NesoLogo.svg";
import darkLogo from "../../assets/images/Logos/NesoLogoDark.svg";
import { useNavigate } from "react-router";
import PaymentSummary from "./PaymentComponents/PaymentSummary";
import CouponDialog from "./Coupon/CouponDialog";
import { loadScript } from "../../Services/Utils";
// import { navigate } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";

const useStyles = makeStyles((theme) => ({
  dialogBackground: {
    height: "100vh",
    position: "relative",
    zIndex: 1200,
    marginTop: -60,
    background: "#FFFFFF",
  },
  root: {
    padding: "28px 32px 32px 32px",
    overflow: "auto",
    scrollbarWidth: "auto",
    "&::-webkit-scrollbar": {
      display: "block",
    },
    [theme.breakpoints.down(469)]: {
      padding: "24px 17px 20px 17px",
    },

    "& .fuelAddressTimeline": {
      "& .transitionLine > div": {
        margin: "0px 12px",
      },
    },
  },

  paymentWindow: {
    margin: "auto",
    marginTop: 20,
    width: "100%",
    maxWidth: 960,
    display: "flex",
    gridColumnGap: 20,
    boxSizing: "border-box",
    justifyContent: "space-between",

    [theme.breakpoints.down(769)]: {
      flexDirection: "column-reverse",
      gridRowGap: 48,
    },

    [theme.breakpoints.down(469)]: {
      gridRowGap: 33,
    },
  },
}));

const Payment = (props) => {
  const classes = useStyles();
  const user = props.user;
  const [paymentMethod, setMethod] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponDialog, setCouponDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const [gstIn, setGstIn] = useState(null);

  const theme = useTheme();
  const history = useNavigate();

  //preload razorpay client
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
     console.log("Hllo")
  }, []);

  useEffect(() => {
    if (paymentMethod && paymentMethod.length !== 0) {
      setloading(true);
      createOrder(paymentMethod);
    } else {
      setloading(false);
    }
  }, [paymentMethod]);

  if (!props.location.state) {
    return <navigate to="/fuel" />;
  }
  const { subscriptionData, name, userAddress } = props.location.state;

  const setPaymentMethod = (mode) => async () => {
    if (paymentMethod.length === 0) {
      setMethod(mode);
    }
  };
  const displayRazorpay = async (nesoOrderId, oid, mode) => {
    setloading(false);

    if (!window.Razorpay) {
      alert("Razorpay failed to load. Are you online?");
      return;
    }

    var options = {
      key: "rzp_live_M7rPonMwH4hsba",
      name: "Neso Academy",
      description: nesoOrderId,
      image: { Logo },
      order_id: oid,
      handler: function (response) {
        history.push({
          pathname: "/confirmingpayment",
          state: {
            transaction_id: response.razorpay_payment_id,
            order_id: nesoOrderId,
            user_id: user.uid,
            user: {
              name: userAddress.name || user.displayName,
            },
            coupon: Object.keys(coupon).length === 0 ? undefined : coupon,
            invoice: {
              address: `${userAddress.address},\n${userAddress.city}, ${
                userAddress.state
              },\n${userAddress.country} ${
                userAddress.pincode || userAddress.zipcode
              }`,
              purchases: {
                plan: name,
              },
              name: userAddress.name || user.displayName,
              email: user.email || null,
              mobile: userAddress.number,
              gstn: gstIn,
              trans_id: response.razorpay_payment_id,
              currency: subscriptionData.symbol,
            },
            fuel: {
              name: name,
              price: subscriptionData.price,
              symbol: subscriptionData.symbol,
              duration: subscriptionData.duration,
            },
          },
        });
      },
      prefill: {
        name: userAddress.name || user.displayName,
        email: user.email || null,
        contact: userAddress.number || null,
        method: mode,
      },
      notes: {
        address: `${userAddress.address},\n${userAddress.city}, ${
          userAddress.state
        },\n${userAddress.country} ${
          userAddress.pincode || userAddress.zipcode
        }`,
      },
      modal: {
        ondismiss: function () {
          history.push({
            pathname: "/confirmingpayment",
            state: {
              error: true,
              reason: "Cancelled by customer",
              order_id: nesoOrderId,
              retryData: props.location.state,
              fuel: {
                name: name,
                price: subscriptionData.price,
                symbol: subscriptionData.symbol,
              },
            },
          });
        },
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      history.push({
        pathname: "/confirmingpayment",
        state: {
          error: true,
          reason: response.error.reason,
          order_id: nesoOrderId,
          retryData: props.location.state,
          fuel: {
            name: name,
            price: subscriptionData.price,
            symbol: subscriptionData.symbol,
          },
        },
      });
    });

    rzp1.open();
  };

  const getState = () => {
    return userAddress.country.toLowerCase().includes("india")
      ? userAddress.state.toUpperCase()
      : "INTERNATIONAL";
  };

  const toggleCouponDialog = () => {
    setCouponDialog((prev) => !prev);
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const createOrder = async (mode) => {
    const data = {
      plan: name,
      coupon: coupon,
      user: {
        state: getState(),
        name: userAddress.name || user.displayName,
        address: `${userAddress.address}\n${userAddress.city}, ${
          userAddress.state
        },\n${userAddress.country} ${
          userAddress.pincode || userAddress.zipcode
        }`,
        mobileNo: userAddress.number,
      },
      gstn: gstIn,
      platform: "web",
    };
    try {
      const response = await httpsCallable(getFunctions(), "createorder")(data);
      const orderResponse = response.data;
      const orderId = orderResponse.orderId;
      const nesoOrderId = orderResponse.nesoOrderId
      displayRazorpay(nesoOrderId, orderId, mode);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.dialogBackground}>
      <Dialog fullScreen open disableEnforceFocus={true}>
        <div className={classes.root}>
          <div className="nesoLogo">
            <img
              src={theme.palette.type === "dark" ? darkLogo : NesoLogo}
              alt=""
            />
          </div>

          <div className="fuelAddressTimeline">
            <Timeline done payment two first="Address" second="Pay" />
          </div>

          <div className={classes.paymentWindow}>
            <div>
              <PaymentMethods
                paymentLoading={loading}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            <PaymentSummary
              coupon={coupon}
              openCouponDialog={toggleCouponDialog}
              removeCoupon={removeCoupon}
              gstin={gstIn}
              setGstIn={setGstIn}
              fuelData={{ ...subscriptionData, name }}
              address={userAddress}
            />
          </div>
        </div>
      </Dialog>
      <CouponDialog
        open={couponDialog}
        close={toggleCouponDialog}
        setCoupon={setCoupon}
      />
    </div>
  );
};

export default Payment;
