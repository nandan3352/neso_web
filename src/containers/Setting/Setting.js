import React, { useState, useEffect } from "react";
// import Switch from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";

import "./Setting.css";
import { SnackbarEvent, useEventDispatch } from "../../Services/Events";
import AlertDialog from "../../components/UI/Quiz/AlertDialog";
import { useUser } from "../../Services/Auth";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import { Done as DoneIcon } from "@material-ui/icons";
import { databaseSet } from "../../Services/Database";


const BootstrapInput = withStyles((theme) => ({
  input: {
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "right",
    letterSpacing: "0.25px",
    overflow: 'hidden',
    color: theme.palette.text.secondary,
  },
}))(InputBase);

const Setting = (props) => {
  const [switchOne, setswitchOne] = useState(false);
  const [quality, setQuality] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [onOpen, setOnOpen] = useState(false)
  const [clearHistory, setclearHistory] = useState(false)
  const [clearNotification, setclearNotif] = useState(false)
  const dispatchSnackbar = useEventDispatch(SnackbarEvent)
  const user = useUser()

  useEffect(() => {
    document.title = "Settings | Neso Academy"
    let quality = localStorage.getItem("playback-quality");
    let speed = localStorage.getItem("playback-speed");
    if (quality === null || speed === null) {
      localStorage.setItem("playback-quality", 1);
      localStorage.setItem("playback-speed", 3);
    }
    quality = localStorage.getItem("playback-quality");
    speed = localStorage.getItem("playback-speed");
    setSpeed(Number(speed));
    setQuality(Number(quality));
  }, []);
  const handleChangeQuality = (e) => {
    setQuality(e.target.value);
    localStorage.setItem("playback-quality", e.target.value);
  };
  const handleChangeSpeed = (e) => {
    setSpeed(e.target.value);
    localStorage.setItem("playback-speed", e.target.value);
  };

  const handleClearHistory = () => {

    setclearHistory(false)

    if (!user)
      return

    databaseSet(`Users/${user.uid}/history`, null).then(e => {
      dispatchSnackbar({ msg: "History has been cleared", open: true })
    })

  }

  const handleClearNotifcation = () => {
    setclearNotif(false)
    databaseSet(`Users/${user.uid}/notifications`, null)
    databaseSet(`Users/${user.uid}/clearNotifTimestamp`, Date.now()).then(e => {
      dispatchSnackbar({ msg: "Notifications has been cleared", open: true })
    })
  }

  const confirmClearHistory = () => setclearHistory(prev => !prev)
  const confirmClearNotification = () => setclearNotif(prev => !prev)

  const speeds = [['0.5x', ' • Slower'], ['0.75x', ' • Slow'], ['1x', ' • Normal'], ['1.25x', ' • Fast'], ['1.5x', ' • Faster'], ['2x', ' • Fastest']]
  const qualities = ['1080p', '720p', '540p', '360p', '240p', 'Auto']

  return (
    <div className='settings'>
      <AlertDialog
        open={clearNotification}
        positive="Accept"
        negative="No"
        negativeHandle={confirmClearNotification}
        positiveHandle={handleClearNotifcation}
        handleClose={confirmClearNotification}
        title="Clear Notifications?"
        body="Your all notifications will be cleared from this app." />
      <AlertDialog
        open={clearHistory}
        positive="Accept"
        negative="No"
        negativeHandle={confirmClearHistory}
        positiveHandle={handleClearHistory}
        handleClose={confirmClearHistory}
        title="Clear history?"
        body="Your all history will be cleared from this app."
      />
      <p className='settingsTitle'>Settings</p>
      <div className='settingCluster'>
        <div className='settingContent'>
          <p className='settingSubTitle'>Basic</p>
          <div className='settingswitch'>
            <div className='settingswitchCluster'>
              <p className='settingPara'>Notifications</p>
              <switch
                checked={switchOne}
                onChange={(e) => setswitchOne(!switchOne)}
                color='rgba(1, 135, 134, 1)'
                name='checked'
                className='settingswitchbtn'
              />
            </div>
            <p
              onClick={confirmClearNotification}
              className='settingPara settingparatop'
              style={{ cursor: "pointer" }}
            >
              Clear Notifications
            </p>
            <p
              className='settingPara settingparatop'
              style={{ cursor: "pointer" }}
              onClick={confirmClearHistory}
            >
              Clear History
            </p>
          </div>
        </div>
        <div className='settingContent'>
          <p className='settingSubTitle'>Theme</p>
          <div className='settingswitch'>
            <div className='settingswitchCluster'>
              <p className='settingPara'>Dark Mode</p>
              <switch
                checked={props.darkMode.enabled}
                onChange={props.darkMode.handle}
                color='rgba(1, 135, 134, 1)'
                name='checked'
                className='settingswitchbtn'
              />
            </div>
          </div>
        </div>
        <div className='settingContent'>
          <p className='settingSubTitle'>Playback</p>
          <div className='settingswitch'>
            <div className='settingDropdownCluster'>
              <p className='settingPara '>Default playback quality</p>
              <Select
                classes={{ root: 'settings-select', }}
                value={quality}
                onChange={handleChangeQuality}
                input={<BootstrapInput />}

                className='menuitem'>
                {qualities.map((v, i) => {
                  return <MenuItem value={qualities.length - i}>
                    <ListItemText primary={v} />
                  </MenuItem>
                })}
              </Select>
            </div>
            <div className='settingDropdownCluster settingparatop'>
              <p className='settingPara'>Playback Speed</p>
              <Select
                value={speed}
                onOpen={() => setOnOpen(true)}
                onClose={() => setOnOpen(false)}
                classes={{ root: 'settings-select', }}
                onChange={handleChangeSpeed}
                input={<BootstrapInput />}>
                {speeds.map((v, i) => {
                  return <MenuItem value={i + 1}>
                    {onOpen && <ListItemIcon>
                      {speed === (i + 1) && <DoneIcon fontSize='small' />}
                    </ListItemIcon>}
                    <ListItemText
                      style={{ textAlign: onOpen ? 'start' : 'center' }}
                      primary={`${v[0]} ${onOpen && speed === (i + 1) ? v[1] : ''}`}
                    />
                  </MenuItem>
                })}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
