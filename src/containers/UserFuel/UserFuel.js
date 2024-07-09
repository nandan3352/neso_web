import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FuelBenefitContainer from "../../components/UI/FuelBenefitContainer/FuelBenefitContainer";
import FuelStatusCard from "./FuelStatusCard/FuelStatusCard";
import Badges from "./BadgesContainer/Badges";
import { useMediaQuery, useTheme } from "@material-ui/core";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import { navigate } from "react-router";
import { useDatabase } from "../../Services/Database";

const useStyles = makeStyles((theme) => ({
  fuelStroke: {
    fill: theme.palette.divider,
  },

  root: {
    "& > .userFuelContainer": {
      margin: "auto",
      marginBottom: 4,
      minHeight: 491,
      width: "100%",
      maxWidth: 960,
      gridColumnGap: 40,
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "space-between",
      padding: "48px 20px 56px 71px",
      borderBottom: "1px solid rgba(var(--theme-divider))",

      [theme.breakpoints.down(769)]: {
        padding: "39px 32px 56px 32px",
        gridColumnGap: 34,
      },

      [theme.breakpoints.down(650)]: {
        flexWrap: "wrap",
        justifyContent: "center",
        gridRowGap: 50,
      },

      [theme.breakpoints.down(469)]: {
        flexDirection: "column",
        gridRowGap: 32,
        padding: "24px 16px 0px 16px",
        border: 0,
      },

      "& .userFuelBoldHeader": {
        fontSize: 20,
        lineHeight: "24px",
        fontWeight: 500,
        letterSpacing: 0.15,
        color: theme.palette.text.primary,
      },

      "& > .FuelInfoContainer": {
        minWidth: 304,
        width: 328,
        display: "flex",
        flexDirection: "column",
        gridRowGap: 35,

        [theme.breakpoints.down(469)]: {
          margin: "auto",
        },

        [theme.breakpoints.down(650)]: {
          width: "100%",
        },

        "& > .fuelInfo": {
          margin: "0px auto",
          height: 136,
          width: "fit-content",
          display: "flex",
          gridColumnGap: 32,

          "& img": {
            height: 136,
          },

          "& .userFuelRemDays": {
            marginTop: 9,
            fontSize: 60,
            lineHeight: "72px",
            letterSpacing: -0.5,
            color: "#F2994A",
          },

          "& .userFuelExpired": {
            marginTop: 9,
            fontSize: 60,
            lineHeight: "72px",
            letterSpacing: -0.5,
            color: theme.palette.text.disabled,
          },

          "& .userFuelTotalDays": {
            marginTop: 8,
            fontSize: 14,
            lineHeight: "16px",
            letterSpacing: 1.25,
            fontWeight: 500,
            textTransform: "uppercase",
            color: theme.palette.text.secondary,
          },
        },
      },

      "& > .OtherUtilityContainer": {
        width: "100%",
        maxWidth: 428,

        "& .badgesSubHeading": {
          marginTop: 4,
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: 0.25,
          color: theme.palette.text.disabled,
        },

        "& .userFuelUserInfo": {
          marginTop: 48,

          "& .userFuelExpiryText": {
            marginTop: 3,
            marginBottom: 4,
            fontSize: 14,
            lineHeight: "20px",
            letterSpacing: 0.25,
            color: theme.palette.text.secondary,
          },

          "& .userFuelUserPreview": {
            display: "flex",
            marginTop: 20,

            "& .userFuelUserPreviewImg": {
              marginTop: 5,
              height: 40,
              width: 40,
              minWidth: 40,

              "& > img": {
                height: "100%",
                width: "100%",
                borderRadius: 100,
              },
            },

            "& .userFuelPreviewData": {
              marginLeft: 15,
              width: "100%",
              maxWidth: 336,

              [theme.breakpoints.down(769)]: {
                maxWidth: 225,
              },

              "& .userFuelPreviewName": {
                fontSize: 16,
                lineHeight: "24px",
                color: theme.palette.text.primary,
                letterSpacing: 0.15,
                display: "flex",
                alignItems: "center",

                "& > img": {
                  marginLeft: 8,
                  height: 18,
                  width: 18,
                },
              },

              "& .userFuelPreviewTimestamp": {
                fontSize: 12,
                lineHeight: "16px",
                color: theme.palette.text.secondary,
                letterSpacing: 0.4,
              },

              "& .userFuelPreviewSkeleton": {
                marginTop: 16,
              },
            },
          },
        },
      },
    },

    "& .chatIcon, .fuelChatSupport": {
      display: "none",
    },
  },
}));

export default function UserFuel(props) {
  const classes = useStyles();
  const [fuelData, setFuelData] = useState({});
  const plan = useDatabase("/SubscriptionPlans/" + props.data.plan);
  const [selectedBadge, setSelectedBadge] = useState({
    badge: null,
    number: "",
  });
  const user = props.user;
  const data = props.data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(469));

  const setData = (subscription, validity) => {
    let expiryDate = moment(subscription.nextpay);
    let currentDate = moment(new Date());
    let purchasedDate = moment(
      parseInt(
        subscription.neso_oid.substring(4, subscription.neso_oid.length - 3)
      )
    );
    let daysLeft = Math.ceil(expiryDate.diff(currentDate, "days", true));
    setFuelData((prevState) => ({
      ...prevState,
      daysLeft: daysLeft,
      expiryDate: expiryDate.format("MMM, D Y (h:mm A)"),
      purchasedDate: purchasedDate.format("MMM, D Y"),
      totalDays: validity * 30,
    }));
  };

  useEffect(() => {
    document.title = "Fuel | Neso Academy";
    if (!data || !plan.data || plan.loading) {
      return null;
    }
    setData(data, plan.data.validity);
  }, [plan.loading, data, plan.data]);

  if (!user) {
    return <navigate to={{ pathname: "/" }} />;
  }

  const getPercent = () => (1 - fuelData.daysLeft / fuelData.totalDays) * 100;

  return (
    <div className={classes.root}>
      <div className="userFuelContainer">
        <div className="FuelInfoContainer">
          <div className="fuelInfo">
            <div>
              {data.isSubscribed ? (
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M76.5985 23.4033L96.583 43.3878L92.8605 47.1107L72.876 27.1262L76.5985 23.4033Z"
                    className={classes.fuelStroke}
                  />
                  <path
                    d="M78.2321 11.7673C79.2086 10.791 80.7916 10.791 81.7681 11.7673L108.232 38.2318C109.209 39.2081 109.209 40.791 108.232 41.7673L104.697 45.3028C103.721 46.2791 102.138 46.2791 101.161 45.3028L74.6966 18.8384C73.7206 17.862 73.7206 16.2791 74.6966 15.3028L78.2321 11.7673Z"
                    className={classes.fuelStroke}
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.4997 15.0003C26.119 15.0003 24.9997 16.1196 24.9997 17.5003V25.0003H19.9998V17.5003C19.9998 13.3582 23.3576 10.0003 27.4997 10.0003H52.4997C56.6417 10.0003 59.9997 13.3582 59.9997 17.5003V25.0003H54.9997V17.5003C54.9997 16.1196 53.8802 15.0003 52.4997 15.0003H27.4997Z"
                    className={classes.fuelStroke}
                  />
                  <path
                    className={classes.fuelStroke}
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 25C14.4772 25 10 29.4772 10 35V100C10 105.523 14.4772 110 20 110H85C90.523 110 95 105.523 95 100V55.715C95 53.0645 93.948 50.5225 92.0745 48.6473L81.719 38.2813L71.3665 27.929C69.491 26.0536 66.9475 25 64.2955 25H20ZM60.0001 45L35 75H45L40 95L65.0001 65H55L60.0001 45Z"
                    fill="url(#paint0_radial)"
                  />
                  <path
                    clipPath={`polygon(0 ${getPercent()}%, 100% ${getPercent()}%, 100% 100%, 0% 100%)`}
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 25C14.4772 25 10 29.4772 10 35V100C10 105.523 14.4772 110 20 110H85C90.523 110 95 105.523 95 100V55.715C95 53.0645 93.948 50.5225 92.0745 48.6473L81.719 38.2813L71.3665 27.929C69.491 26.0536 66.9475 25 64.2955 25H20ZM60.0001 45L35 75H45L40 95L65.0001 65H55L60.0001 45Z"
                    fill="url(#paint0_radial)"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(61.2048 58.3199) rotate(129.037) scale(66.6658 56.9668)"
                    >
                      <stop stop-color="#FFC700" />
                      <stop offset="1" stop-color="#FF7A00" />
                    </radialGradient>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M76.5985 23.4033L96.583 43.3878L92.8605 47.1107L72.876 27.1262L76.5985 23.4033Z"
                    className={classes.fuelStroke}
                  />
                  <path
                    d="M78.2321 11.7673C79.2086 10.791 80.7916 10.791 81.7681 11.7673L108.232 38.2318C109.209 39.2081 109.209 40.791 108.232 41.7673L104.697 45.3028C103.721 46.2791 102.138 46.2791 101.161 45.3028L74.6966 18.8384C73.7206 17.862 73.7206 16.2791 74.6966 15.3028L78.2321 11.7673Z"
                    className={classes.fuelStroke}
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.4997 15.0003C26.119 15.0003 24.9997 16.1196 24.9997 17.5003V25.0003H19.9998V17.5003C19.9998 13.3582 23.3576 10.0003 27.4997 10.0003H52.4997C56.6417 10.0003 59.9997 13.3582 59.9997 17.5003V25.0003H54.9997V17.5003C54.9997 16.1196 53.8802 15.0003 52.4997 15.0003H27.4997Z"
                    className={classes.fuelStroke}
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 25C14.4772 25 10 29.4772 10 35V100C10 105.523 14.4772 110 20 110H85C90.523 110 95 105.523 95 100V55.715C95 53.0645 93.948 50.5225 92.0745 48.6473L81.719 38.2813L71.3665 27.929C69.491 26.0536 66.9475 25 64.2955 25H20ZM60.0001 45L35 75H45L40 95L65.0001 65H55L60.0001 45Z"
                    className={classes.fuelStroke}
                  />
                </svg>
              )}
            </div>
            <div>
              <div className="userFuelBoldHeader">Fuel remaining</div>
              {data.isSubscribed ? (
                <div className="userFuelRemDays">{fuelData.daysLeft}</div>
              ) : (
                <div className="userFuelExpired">00</div>
              )}
              <div className="userFuelTotalDays">
                days / {fuelData.totalDays} days
              </div>
            </div>
          </div>
          {fuelData.expiryDate && fuelData.purchasedDate ? (
            <FuelStatusCard
              running={data.isSubscribed}
              name={data.plan}
              fuelData={fuelData}
            />
          ) : (
            <> </>
          )}
        </div>

        <div className="OtherUtilityContainer">
          <div>
            <div className="userFuelBoldHeader">Choose your Badge </div>
            <div className="badgesSubHeading">
              Badge will be displayed in the comment section
            </div>
            <Badges
              selectedBadge={selectedBadge}
              setSelectedBadge={setSelectedBadge}
              uid={user.uid}
            />
          </div>
          <div className="userFuelUserInfo">
            <div className="userFuelBoldHeader">Preview</div>
            {!data.isSubscribed && (
              <div className="userFuelExpiryText">
                Your Neso Fuel subscription has expired. Please purchase again
                to use this feature.
              </div>
            )}

            <div className="userFuelUserPreview">
              <div className="userFuelUserPreviewImg">
                <img src={user.profilePic} alt="" srcset="" />
              </div>
              <div className="userFuelPreviewData">
                <div className="userFuelPreviewName">
                  {user.name}
                  {data.isSubscribed && selectedBadge.badge ? (
                    <img src={selectedBadge.badge} alt="" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="userFuelPreviewTimestamp">3 months ago</div>
                <div className="userFuelPreviewSkeleton">
                  <Skeleton variant="text" animation="" />
                  <Skeleton variant="text" animation="" width={179} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FuelBenefitContainer />
    </div>
  );
}
