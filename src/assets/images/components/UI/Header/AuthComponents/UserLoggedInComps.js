import { Badge, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Notifications from "@material-ui/icons/Notifications";

import { memo, useState } from "react";
import React from "react";
import UserAccountOverlay from "../Overlay/UserAccountOverlay";
import MediumScreenOverlay from "../OverlayMediumScreen/MediumScreenOverlay";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import NotificationContent from "./NotificationContent";
import UserProfileImage from "../../../ServiceComponent/UserProfileImage";
import {  updateNotifcationTimeStamp, useNotification } from "../../../../Services/Utils";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  notifications: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  profileIcon: {
    height: 24,
    width: 24,
    borderRadius: "50%",
  },
  badge: {
    height: 20,
    width: 20,
    border: `1.35px solid ${theme.palette.background.default}`,
    borderRadius: '50%',
  },
}));

const UserLoggedInComps = (props) => {
  const notifications = useNotification();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElOverlay, setAnchorElOverlay] = useState(null);

  const handleClick = (event) => {
    setAnchorElOverlay(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElOverlay(null);
  };

  const handleClickNotifi = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      updateNotifcationTimeStamp()
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseNotofi = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const ProfileIcon = (props) => (
    <IconButton
      style={{ marginRight: -12 }}
      {...props}
      aria-label="show 17 new notifications"
      color="inherit">
      <div className={classes.profileIcon}>
        <UserProfileImage setImg={props.setImg} img={props.user.profilePic ? props.user.profilePic : props.img} name={props.user.name} uid={props.user.uid} />
      </div>
    </IconButton>
  )

  return (
    <>
      <div style={{ display: "flex" }}>
        <IconButton className={classes.notifications}
          onClick={handleClickNotifi}
          aria-label="show 17 new notifications" color="inherit">
          <Badge
            classes={{
              badge: classes.badge,
            }}
            badgeContent={notifications.count}
            max={9}
            color="primary"
          >
            <Notifications
              aria-describedby={id}
              variant="contained"
            />
            <Popover
              id={id}
              PaperProps={{
                style: {
                  boxShadow: "none",
                  borderColor: "rgba(var(--theme-overlay-border))",
                  borderStyle: "solid",
                  borderWidth: "1px 1px 1px 1px",
                },
              }}
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseNotofi}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              style={{ top: "5px" }}
            >
              <NotificationContent notificationData={notifications.contentData} embed notifications={notifications.notifications} />
            </Popover>
          </Badge>
        </IconButton>
        {!props.tabletScreen ? (ProfileIcon({ ...props, onClick: handleClick })) : (
          <MediumScreenOverlay
            darkMode={props.darkMode}
            loggedIn
            childProps={{ user: props.user }}
            children={ProfileIcon}
            mobileScreen={props.mobileScreen}
            navigator={props.navigator}
            tabletScreen={props.tabletScreen}
          />
        )}
      </div>

      <UserAccountOverlay
        darkMode={props.darkMode}
        anchorEl={anchorElOverlay && !props.tabletScreen}
        handleClose={handleClose}
      />
    </>
  );
};

export default memo(UserLoggedInComps);
