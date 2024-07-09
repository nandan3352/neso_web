import React, { useState } from "react";
import "./NotificationContent.css";
import ContentTemplate from "./ContentTemplate";
import { databaseSet } from "../../../../Services/Database";
import NotificationEmpty from "./NotificationEmpty";
import { CircularProgress, IconButton, useMediaQuery, useTheme } from "@material-ui/core";
import { navigate } from "react-router-dom";
import { useUser } from "../../../../Services/Auth";
import { Delete } from "@material-ui/icons";
import AlertDialog from "../../Quiz/AlertDialog";

const NotificationContent = ({ embed, notifications, notificationData = {} }) => {
  const user = useUser()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  const [confirm, setConfirm] = useState(false)


  const isNotuserSpecific = (p) => !(p.type.includes("comment") || p.type.includes("support"))

  const getCommentLectureData = (type) => {
    return notificationData[type.split("split")[1]]
  }

  const getNavId = (type) => type.split("split")[1]

  if (isDesktop && !embed) {
    return <navigate to='/' />
  }


  const toggleConfirmation = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setConfirm(prev => !prev)
  }

  const handleClearNotifcation = () => {
    databaseSet(`Users/${user.uid}/notifications`, null)
    databaseSet(`Users/${user.uid}/clearNotifTimestamp`, Date.now())
    setConfirm(false)
  }

  const isEmpty = () => Object.keys(notifications || {}).length === 0

  const wasDatafetched = () => Object.values(notifications || {}).filter((p) => (!p.type.includes("support"))).length !== 0 && Object.keys(notificationData || {}).length !== 0


  const renderNotifications = () => {
    return !isEmpty() && wasDatafetched() ? Object.keys(notifications).sort().reverse().map((key) => {
      if (isNotuserSpecific(notifications[key])) {
        return <ContentTemplate timestamp={key} data={notificationData[notifications[key].type] || {}} content={notifications[key]} />
      } else {
        return <ContentTemplate 
        userSpecific 
        endpoint={notifications[key].type.includes("support") ? "/support" : undefined} 
        data={getCommentLectureData(notifications[key].type)} 
        timestamp={key} 
        content={{ ...notifications[key], type: getNavId(notifications[key].type) }} />
      }
    }) : <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '360px', alignItems: 'center' }}> <CircularProgress color='secondary' /></div>
  };

  return (
    <div className="notification-content" style={{ height: embed ? '480px' : 'auto', width: embed ? '380px' : '100%' }}>
      <AlertDialog
        open={confirm}
        positive="Accept"
        negative="No"
        negativeHandle={toggleConfirmation}
        positiveHandle={handleClearNotifcation}
        handleClose={toggleConfirmation}
        title="Clear Notifications?"
        body="Your all notifications will be cleared from this app." />
      <div className="notification-topbar">
        <div className="notification-title ">Notifications</div>
        {user && !isEmpty() && <IconButton className="notification-delete" onClick={toggleConfirmation} >
          <Delete />
        </IconButton>}
      </div>
      <div className="hori-line" />
      {notifications === null && <NotificationEmpty />}
      <div className="">{notifications !== null && renderNotifications()}</div>
    </div>
  );
};

export default NotificationContent;
