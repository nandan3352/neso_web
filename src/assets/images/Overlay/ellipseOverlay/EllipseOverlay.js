import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import DoneIcon from "@material-ui/icons/Done";
import { useNavigate } from "react-router";
import {
  Fade,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Switch,
} from "@material-ui/core";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import SettingsIcon from "@material-ui/icons/Settings";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import WorkIcon from "@material-ui/icons/Work";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { KeyboardArrowRight, QuestionAnswer } from "@material-ui/icons";
import { Link } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    transition: "all 225ms ease-in !important",
    width: 320,
    height: "auto",
    border: "1px solid rgba(var(--theme-divider))",
    top: "59px !important",
    left: "52% !important",
    right: 152,
    borderRadius: "0px 0px 4px 4px",
    boxSizing: "border-box",
    overflow: "hidden",
    "& > ul": {
      padding: "20px 0px 0px 0px !important",
      boxSizing: "border-box",

      "& li": {
        padding: "8px 20px",
        height: "auto",
        maxHeight: 40,
      },
    },
  },
})((props) => (
  <Menu
    disableScrollLock
    elevation={0}
    TransitionComponent={Fade}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  header: {
    paddingLeft: 20,
    paddingBottom: 16,
    borderBottom: "1px solid rgba(var(--theme-divider))",
    fontSize: 14,
    lineHeight: "24px",
    fontWeight: 500,
    textTransform: "capitalize",
    letterSpacing: 0.1,
  },

  subMenupaper: {
    border: "1px solid rgba(var(--theme-divider))",
  },
  block: {
    padding: "8px 0px",

    "& li": {
      height: 24,

      "& .MuiSvgIcon-root": {
        height: 24,
        width: 24,
        alignItems: "center",

        "& .MuiSvgIcon-root": {
          height: 20,
          width: 20,
        },
      },

      "& .MuiListItemText-root": {
        margin: 0,
      },
    },
  },
  rightArrow: {
    minWidth: 32,
  },
  playbackMenu: {
    "& .MuiPaper-elevation8": {
      border: "1px solid rgba(var(--theme-divider))",
    },
    "& .MuiPaper-root": {
      height: "fit-content",
      width: 216,
      "& ul": {
        paddingTop: 10,
      },

      "& .MuiListItem-root": {
        height: 24,
        boxSizing: "content-box",
        padding: "8px 16px",
      },
    },
  },

  videoQuality: {
    "& .MuiPaper-elevation8": {
      border: "1px solid rgba(var(--theme-divider))",
    },
    "& .MuiPaper-root": {
      height: "fit-content",
      width: 216,
      "& ul": {
        paddingTop: 10,
      },

      "& .MuiListItem-root": {
        height: 24,
        boxSizing: "content-box",
        padding: "8px 16px",
      },
    },
  },
}));

export default function EllipseOverlay({ anchorEl, handleClose, darkMode }) {
  const [playbackAnchorEl, setPlaybackAnchorEl] = useState(null);
  const [playBackSpeed, setPlayBackSpeed] = useState("1");
  const [videoQualityAnchorEl, setVideoQualityAnchorEl] = useState(null);
  const [videoQuality, setVideoQuality] = useState("auto");
  const closePlaybackMenu = () => setPlaybackAnchorEl(null);
  const closeVideoQualityMenu = () => setVideoQualityAnchorEl(null);

  useEffect(() => {
    let quality = localStorage.getItem("playback-quality");
    let speed = localStorage.getItem("playback-speed");
    if (quality === null || speed === null) {
      localStorage.setItem("playback-quality", 1);
      localStorage.setItem("playback-speed", 3);
    }
    quality = localStorage.getItem("playback-quality");
    speed = localStorage.getItem("playback-speed");
    setPlayBackSpeed(Number(speed));
    setVideoQuality(Number(quality));
  }, []);

  const handleSpeed = (e) => {
    setPlayBackSpeed(e.currentTarget.value);
    localStorage.setItem("playback-speed", e.currentTarget.value);
  };

  const handleQuality = (e) => {
    setVideoQuality(e.currentTarget.value);
    localStorage.setItem("playback-quality", e.currentTarget.value);
  };

  const classes = useStyles();

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.header}>settings</div>

        <div
          className={classes.block}
          style={{ borderBottom: "1px solid rgba(var(--theme-divider))" }}
        >
          <MenuItem onClick={(e) => setPlaybackAnchorEl(e.currentTarget)}>
            <ListItemIcon>
              <SlowMotionVideoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Default speed" />
            <ListItemIcon className={classes.rightArrow}>
              <KeyboardArrowRight fontSize="small" />
            </ListItemIcon>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setVideoQualityAnchorEl(e.currentTarget);
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Default quality" />
            <ListItemIcon className={classes.rightArrow}>
              <KeyboardArrowRight fontSize="small" />
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <WbSunnyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dark mode" />
            <switch
              checked={darkMode.enabled}
              onChange={darkMode.handle}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </MenuItem>
        </div>
        <div className={classes.block}>          
          <Link to="/careers" onClick={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <WorkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="We’re Hiring" />
            </MenuItem>
          </Link>
          <Link to="/about" onClick={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <AnnouncementIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="About us" />
            </MenuItem>
          </Link>
        </div>
      </StyledMenu>

      <Menu
        anchorEl={playbackAnchorEl}
        onClose={closePlaybackMenu}
        open={Boolean(playbackAnchorEl)}
        elevation={0}
        style={{ marginLeft: -20 }}
        classes={{ paper: classes.subMenupaper }}
        className={classes.playbackMenu}
        anchorOrigin={{
          vertical: "left",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "right",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleSpeed} value={1}>
          <ListItemIcon>
            {playBackSpeed === 1 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={`0.5x ${playBackSpeed === 1 ? " • Slower" : ""}`}
          />
        </MenuItem>
        <MenuItem onClick={handleSpeed} value={2}>
          <ListItemIcon>
            {playBackSpeed === 2 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={`0.75x ${playBackSpeed === 2 ? " • Slow" : ""}`}
          />
        </MenuItem>
        <MenuItem onClick={handleSpeed} value={3}>
          <ListItemIcon>
            {playBackSpeed === 3 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={`1x ${playBackSpeed === 3 ? " • Normal" : ""}`}
          />
        </MenuItem>
        <MenuItem onClick={handleSpeed} value={4}>
          <ListItemIcon>
            {playBackSpeed === 4 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={`1.25x ${playBackSpeed === 4 ? " • Fast" : ""}`}
          />
        </MenuItem>
        <MenuItem onClick={handleSpeed} value={5}>
          <ListItemIcon>
            {playBackSpeed === 5 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={`1.5x ${playBackSpeed === 5 ? " • Faster" : ""}`}
          />
        </MenuItem>
        <MenuItem onClick={handleSpeed} value={6}>
          <ListItemIcon>
            {playBackSpeed === 6 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={`2x ${playBackSpeed === 6 ? " • Fastest" : ""}`}
          />
        </MenuItem>
      </Menu>

      <Menu
        elevation={0}
        classes={{ paper: classes.subMenupaper }}
        anchorEl={videoQualityAnchorEl}
        style={{ marginLeft: -20 }}
        onClose={closeVideoQualityMenu}
        open={Boolean(videoQualityAnchorEl)}
        className={classes.videoQuality}
        anchorOrigin={{
          vertical: "left",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "right",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleQuality} value={6}>
          <ListItemIcon>
            {videoQuality === 6 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="1080p" />
        </MenuItem>
        <MenuItem onClick={handleQuality} value={5}>
          <ListItemIcon>
            {videoQuality === 5 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="720p" />
        </MenuItem>
        <MenuItem onClick={handleQuality} value={4}>
          <ListItemIcon>
            {videoQuality === 4 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="540p" />
        </MenuItem>
        <MenuItem onClick={handleQuality} value={3}>
          <ListItemIcon>
            {videoQuality === 3 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="360p" />
        </MenuItem>
        <MenuItem onClick={handleQuality} value={2}>
          <ListItemIcon>
            {videoQuality === 2 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="240p" />
        </MenuItem>
        <MenuItem onClick={handleQuality} value={1}>
          <ListItemIcon>
            {videoQuality === 1 && <DoneIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="Auto" />
        </MenuItem>
      </Menu>
    </div>
  );
}
