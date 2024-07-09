import {
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  makeStyles,
  SvgIcon,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import { useAvailableCoupons } from "../../../Services/Coupon";
import { ReactComponent as CouponIcon } from "../../../assets/icons/CouponIcon.svg";
import { getFunctions, httpsCallable } from "firebase/functions";

const useCouponDialogStyles = makeStyles((theme) => ({
  root: {
    zIndex: 3000,
  },

  dialogPaper: {
    width: 480,
    height: 574,
  },

  content: {
    padding: "24px 32px 32px",
    [theme.breakpoints.down("sm")]: {
      padding: 16,
    },
  },

  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  closeBtn: {
    padding: theme.spacing(1),
  },

  dialogHeader: {
    ...theme.typography.h6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  emptymsg: {
    ...theme.typography.subtitle1,
    color: theme.palette.text.secondary,
    marginTop: "25%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    height: "100%",
  },

  divider: {
    margin: "12px 0px 20px",
  },

  successOutlineTxStyle: {
    "& > .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#27AE60",
    },
    "& > .MuiFormHelperText-root": {
      color: "#27AE60",
    },
  },

  OutlineTxStyle: {
    "& > .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },
  },

  inputStyle: {
    width: "100%",
    "& > .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },

    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336;",
    },
  },

  acouponTitle: {
    ...theme.typography.subtitle1,
    color: theme.palette.text.secondary,
    margin: "20px 0px",
  },

  acoupons: {},

  acoupon: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 16px",
    background: "rgba(248, 249, 251, 0.74)",
    border: `1px dashed ${theme.palette.secondary.main}`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      padding: "8px 0px 8px 12px",
    },
  },

  discountCode: {
    ...theme.typography.subtitle1,
    color: theme.palette.secondary.main,
    letterSpacing: "8px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      letterSpacing: "4px",
    },
  },

  applyBtn: {
    marginTop: "-8px",
  },

  couponDesc: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    marginTop: 4,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
}));
function CouponDialog({ open, close, setCoupon }) {
  const classes = useCouponDialogStyles();
  const [errorText, setErrorText] = useState();
  const [code, setCode] = useState("");
  const [specialCoupon, setSpecialCoupon] = useState(null);
  const [isValid, setIsValid] = useState(false);
  let availableCoupons = useAvailableCoupons();
  const [validityChecking, setValidityChecking] = useState(false);

  function onCouponChange(e) {
    let newVal = e.target.value.trim();
    if (newVal === code) {
      return;
    }
    if (Boolean(errorText)) {
      setErrorText(undefined);
    }
    setIsValid(false);
    setCode(newVal);
  }

  async function checkCoupon(e) {
    if (code.length === 0) {
      setErrorText("Invalid coupon code. Please try another code");
      return;
    }
    setErrorText(undefined);
    setValidityChecking(true);

    let correctedCode = code.trim().toUpperCase();
    const data = {
      couponCode: correctedCode,
    };

    try {
      const response = await httpsCallable(
        getFunctions(),
        "validatecoupon"
      )(data);
      setValidityChecking(false);
      setSpecialCoupon(response.data);
      setIsValid(true);
      setCode(correctedCode);
    } catch (error) {
      setValidityChecking(false);
      console.log(error);
      let reason = error.message;
      setErrorText(
        reason?.includes("expired") || reason?.includes("ordered")
          ? "Coupon code expired. Please use another code"
          : "Invalid coupon code. Please try another code"
      );
      setIsValid(false);
    }
  }

  const applyCouponAndClose = (data, nullData) => {
    setCoupon(data);
    setCode("");
    setErrorText(undefined);
    setIsValid(false);
    setSpecialCoupon(null);
    close();
  };

  const applyCoupon = () => {
    applyCouponAndClose(specialCoupon);
  };

  const applyACoupon = (i) => (e) => {
    const code = availableCoupons[i].code;
    const discount = availableCoupons[i].discount;
    applyCouponAndClose({ code: code, discount: discount, type: "AVAILABLE" });
  };

  return (
    <Dialog
      classes={{
        paper: classes.dialogPaper,
      }}
      className={classes.root}
      open={open}
      onClose={close}
    >
      <div className={classes.content}>
        <div className={classes.dialogHeader}>
          <span>Coupons</span>
          <IconButton
            className={classes.closeBtn}
            onClick={() =>
              applyCouponAndClose(isValid ? specialCoupon || null : null)
            }
          >
            <Close />
          </IconButton>
        </div>
        <Divider className={classes.divider} />
        <TextField
          spellCheck={false}
          error={Boolean(errorText)}
          helperText={
            isValid
              ? `Congratulations! You will get ${
                  specialCoupon.discount * 100
                }% discount with this code`
              : errorText
          }
          InputLabelProps={{ required: false }}
          variant="outlined"
          placeholder="Enter a coupon"
          type="text"
          value={code}
          onChange={onCouponChange}
          required
          className={
            classes.inputStyle +
            " " +
            (isValid ? classes.successOutlineTxStyle : classes.OutlineTxStyle)
          }
          inputProps={{
            autocomplete: "new-password",
            form: {
              autocomplete: "off",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {validityChecking ? (
                  <Button disabled>
                    <CircularProgress color="secondary" size={24} />
                  </Button>
                ) : isValid ? (
                  <Button color="secondary" onClick={applyCoupon}>
                    APPLY
                  </Button>
                ) : (
                  <Button color="secondary" onClick={checkCoupon}>
                    CHECK
                  </Button>
                )}
              </InputAdornment>
            ),
          }}
        />

        <div>
          <div className={classes.acouponTitle}>Available coupons</div>
          <div className={classes.acoupons}>
            {!availableCoupons ? (
              <div className={classes.loader}>
                <CircularProgress color="secondary" />
              </div>
            ) : availableCoupons.length === 0 ? (
              <div className={classes.emptymsg}>
                <SvgIcon width={36} height={36}>
                  <CouponIcon />
                </SvgIcon>
                <div>
                  No available <br></br>
                  coupons
                </div>
              </div>
            ) : (
              availableCoupons.map((coupon, i) => (
                <div className={classes.acoupon}>
                  <div>
                    <div className={classes.discountCode}>{coupon.code}</div>
                    <div className={classes.couponDesc}>
                      {coupon.description}
                    </div>
                  </div>
                  <Button
                    className={classes.applyBtn}
                    color="secondary"
                    onClick={applyACoupon(i)}
                  >
                    APPLY
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CouponDialog;
