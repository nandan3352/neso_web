import React, { useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { useDatabase } from "../../Services/Database";
import { navigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, useMediaQuery } from "@material-ui/core";
import WhiteFuelIcon from "../../assets/images/Purchases/WhiteFuelIcon.svg";
import BlackFuelIcon from "../../assets/images/Purchases/BlackFuelIcon.svg";
import Loader from "./Loader/Loader";
import EmptyState from "./EmptyState/EmptyState";
import { useReactToPrint } from "react-to-print";
import { getCurrencySymbol } from "../../Services/Utils";
import { InvoiceClassWrapper } from "../../components/UI/Invoice/Invoice";
import { useUser } from "../../Services/Auth";
import { getAllOrders } from "../../Services/Subscription";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    minHeight: 770,

    "& .puchasesContainer": {
      maxWidth: 764,
      margin: "auto",

      [theme.breakpoints.down(769)]: {
        margin: "0px 32px",
      },

      [theme.breakpoints.down(700)]: {
        margin: 0,
      },

      "& .puchasesSubContainer": {
        border: "1px solid rgba(var(--theme-divider))",
        boxSizing: "border-box",
        display: "flex",

        [theme.breakpoints.down(700)]: {
          border: "none",
          display: "block"
        },
      },
    },
  },

  header: {
    padding: "48px 0px",
    fontSize: 24,
    lineHeight: "24px",
    letterSpacing: 0.18,
    color: theme.palette.text.primary,

    [theme.breakpoints.down(769)]: {
      padding: "32px 0px 24px 0px",
    },

    [theme.breakpoints.down(700)]: {
      padding: 16,
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: 0.15,
      fontWeight: 500,
      borderBottom: "1px solid rgba(var(--theme-divider))",
    },
  },
  packages: {
    padding: "8px 0px",
    width: 361,
    height: "100%",
    display: "flex",
    overflowY: "auto",
    flexDirection: "column",
    [theme.breakpoints.down(769)]: {
      width: 329,
    },

    [theme.breakpoints.down(700)]: {
      width: "100%",
    },
  },
  package: {
    cursor: "pointer",
    "&.selected": {
      background: theme.palette.surface.main,
    },
    "& .purchasedFuelInfoDiv": {
      height: 72,
      display: "flex",
      padding: "8px 0px 0px 16px",
      boxSizing: "border-box",

      [theme.breakpoints.down(700)]: {
        marginTop: 8,
      },

      "& .purchasedFuelInfoDivImgCont": {
        width: 56,
        minWidth: 56,
        height: 56,
        display: "flex",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
      },

      "& .purchasedFuelInfoDivCont": {
        width: "100%",
        marginLeft: 16,
        boxSizing: "border-box",
        paddingRight: 16,
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(var(--theme-divider))",
      },
    },
  },

  purple: { background: "#7000FF" },
  yellow: { background: "#D1FF70" },
  blue: { background: "#0047FF" },

  planInfo: {
    width: 403,
    borderLeft: "1px solid rgba(var(--theme-divider))",

    [theme.breakpoints.down(769)]: {
      width: 375,
    },

    [theme.breakpoints.down(700)]: {
      width: "100%",
    },

    [theme.breakpoints.down(700)]: {
      width: "95%",
      margin: "0px auto",
      border: "1px solid rgba(var(--theme-divider))",
    },
  },

  normalText: {
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: 0.15,
    textTransform: "capitalize",
    color: theme.palette.text.primary,
  },

  normalGreyText: {
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.25,
    color: theme.palette.text.secondary,
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
    color: theme.palette.text.primary,
  },

  getReciept: {
    width: "auto",
    display: "flex",
    position: "absolute",
    right: 24,
    bottom: 36,
    justifyContent: "flex-end",

    "& .MuiButton-root ": {
      color: "var(--theme-secondary-main)",
    },
  },

  mobileBack :{
    display : "none",
    [theme.breakpoints.down(700)]: {
      display : "flex",    
      margin : "8px 12px"
    },
  },

  hidden: {
    display: "none",
  },
}));

export default function Purchases(props) {
  const receiptbody = useRef();
  const handleReceipt = useReactToPrint({
    content: () => receiptbody.current,
  });
  const classes = useStyles();
  const user = useUser();
  const [showPurchaseData, setShowPurchaseData] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const { data, error, loading } = useDatabase(`Subscriptions/${user.uid}`);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(700));
  const [orders, setOrders] = useState([]);
  const [currentOid, setCurrentOid] = useState(null);

  useEffect(() => {
    document.title = "Purchases | Neso Academy";
  }, []);

  useEffect(() => {
    if (!loading && !data) {
      setShowEmptyState(true);
    }

    if (!data) {
      return;
    }

    let orders = new Set([data.neso_oid]);
    if (data.recentTransactions) {
      Object.keys(data.recentTransactions || {}).forEach((oid) => {
        orders.add(oid);
      });
    }

    console.log(orders);

    getAllOrders([...orders]).then((orders) => {
      console.log(orders);
      setOrders(orders);
      setCurrentOid(orders[0].oid);
    });
  }, [data, loading]);

  if ((!data || !Boolean(currentOid)) && !showEmptyState) {
    return <Loader />;
  }

  if (showEmptyState || !data || orders.length === 0) {
    return <EmptyState />;
  }

  if (error) {
    return (
      <navigate
        to={{
          pathname: "home",
        }}
      />
    );
  }

  

  const PurchasedPackage = ({ order }) => {
    const plan = order.purchases.plan;
    const expiry =  moment(order.createdAt).add(Number(order.validity),"milliseconds");
    return (
      <div
        className={`with-border purchaseResult ${classes.planInfo} ${
          isTablet && !showPurchaseData && classes.hidden
        }`}
      >
        <div className="paymentResultHeader">plan summary</div>
        <div className="paymentResultSubscriptionPlanDetails">
          <div className="paymentResultPlanInfo">
            <div className={classes.normalText}>Neso Fuel {plan}</div>
            <div className={classes.smallGreyText}>
              {expiry > Date.now() ? "Expires" : "Expired"} on{" "}
              {expiry.format("MMM D, Y [at] hh:mm A")}
            </div>
          </div>
          <div className="paymentResultPrice">
            <div>
              <span className="paymentResultPriceIcon">
                {" "}
                {getCurrencySymbol(order.currency)}
              </span>
              {parseInt(order.amt / 100)}
            </div>
          </div>
        </div>

        <div className="paymentResultBody">
          <div>
            <div className={classes.transactionHeading}>TRANSACTION ID</div>
            <div className={classes.transactionDetails}>{order.trans_id}</div>
          </div>
          <div>
            <div className={classes.transactionHeading}>NESO ORDER ID</div>
            <div className={classes.transactionDetails}>{order.oid}</div>
          </div>
          <div>
            <div className={classes.transactionHeading}>USER ID</div>
            <div className={classes.transactionDetails}>{user.uid}</div>
          </div>
          {order.discount && (
            <div>
              <div className={classes.transactionHeading}>DISCOUNT</div>
              <div className={classes.transactionDetails}>
                {order.discount * 100}%
              </div>
            </div>
          )}
          <div>
            <div className={classes.transactionHeading}>Date</div>
            <div className={classes.transactionDetails}>
              {order.createdAt.format("MMM D, Y • hh:mm A")}
            </div>
          </div>

          <div className={classes.getReciept}>
            <Button className="no-print" onClick={handleReceipt}>
              get receipt
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const NesoFuelPackage = ({ order }) => {
    const plan = order.purchases.plan;
    return (
      <div
        className={`${classes.package} ${
          order.oid === currentOid && "selected"
        }`}
        onClick={() => {
          if (isTablet) setShowPurchaseData(true);
        }}
      >
        <div className="purchasedFuelInfoDiv">
          <div
            className={`${
              plan === "uranium"
                ? classes.purple
                : plan === "plutonium"
                ? classes.blue
                : classes.yellow
            } purchasedFuelInfoDivImgCont `}
          >
            <img
              src={plan === "radium" ? BlackFuelIcon : WhiteFuelIcon}
              alt=""
            />
          </div>

          <div className="purchasedFuelInfoDivCont">
            <div style={{ width: 186 }}>
              <div className={classes.normalText}>Neso Fuel | {plan}</div>
              <div className={classes.normalGreyText}>
                Purchased on {order.createdAt.format("MMM D, Y")}
              </div>
            </div>
            <div className={classes.normalGreyText}>
              {getCurrencySymbol(order.currency) + parseInt(order.amt / 100)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentOrder = orders.find((order) => order.oid === currentOid);

  function selectPackage(e) {
    console.log(e);
    setCurrentOid(e.currentTarget.id);
  }

  return (
    <div className={classes.root}>
      <div className="puchasesContainer">
        <div className={classes.header}>Purchases</div>
        <div className="puchasesSubContainer">
          {showPurchaseData && <Button className={classes.mobileBack} onClick={() => setShowPurchaseData(false)} startIcon={<ArrowBack/>}>
             Back
          </Button>}
          <div
            className={`${isTablet && showPurchaseData && classes.hidden} ${
              classes.packages
            }`}
          >
            {orders.map((order) => (
              <div id={order.oid} onClick={selectPackage}>
                <NesoFuelPackage order={order} />
              </div>
            ))}
          </div>
          <PurchasedPackage order={currentOrder} />
        </div>
      </div>
      {
        <InvoiceClassWrapper
          ref={receiptbody}
          invoice={{
            ...currentOrder,
          }}
          order_id={currentOrder.oid}
          user={user}
        />
      }
    </div>
  );
}
