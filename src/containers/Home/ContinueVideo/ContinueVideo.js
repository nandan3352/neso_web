import React, { useEffect, useState } from "react";
import "./ContinueVideo.css";
import playIcon from "./play-icon.svg";
import { ReactComponent as SmallScreenPlayIcon } from "./small-screen-play-icon.svg";
import {
  databaseOnValue,
  databaseOnce,
  useDatabase,
  useDatabaseOnce,
} from "../../../Services/Database";
import { Link } from "react-router-dom";
import {
  Button,
  Hidden,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import QnNLg from "./QnN-lg";
import { useUser } from "../../../Services/Auth";
import { getEndpointForId, getImgUrl } from "../../../Services/Utils";
import AdsContainer, {
  AD_VARIENT_BANNER_MINI,
} from "../../../components/UI/Ads/AdsContainer";

const ContinueVideo = (props) => {
  const user = useUser();
  const theme = useTheme();
  const istabletDisplay = useMediaQuery(theme.breakpoints.down("xs"));
  const [continueWatch, setContinueWatch] = useState({ data: undefined });
  const [videoData, setVideoData] = useState(null);
  const [chapName, setChapName] = useState(null);
  const [videothumb, setThumb] = useState(null);
  useEffect(() => {
    if (continueWatch.data?.id) {
      console.log("called");
      databaseOnce(`/Videos/${continueWatch.data.id}`).then((d) => {
        setVideoData(d.val());
      });
      databaseOnce(
        `/Chapters/${
          continueWatch.data.id.split("_")[0] +
          "/" +
          continueWatch.data.id.split("_")[1]
        }/name`
      ).then((c) => {
        setChapName(c.val());
      });
      databaseOnce(`/LectureThumbnails/${continueWatch.data.id}`).then((c) => {
        setThumb(c.val());
      });
    }
  }, [continueWatch.data?.id]);

  useEffect(() => {
    if (!user) {
      return;
    }

    return databaseOnValue(
      user ? `/Users/${user.uid}/cw` : null,
      (snapShot) => {
        if (snapShot) setContinueWatch({ data: snapShot.val() });
      }
    );
  }, [user]);

  const gradient = istabletDisplay
    ? ""
    : "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 50.83%, #000000 100%), ";

  function getMinsRemaining() {
    const vid_time_split = videoData.dur.split(":");
    const vid_dur_sec =
      parseInt(vid_time_split[0]) * 60 + parseInt(vid_time_split[1]);
    const difference = vid_dur_sec - continueWatch.data.start / 1000;
    return Number(Math.floor(difference / 60));
  }

  function getStartTime() {
    return Number(Math.floor(continueWatch.data.start / 1000));
  }

  const welcomeUser = (
    <div className="welcome-user-container">
      {continueWatch.data === undefined ? (
        <></>
      ) : (
        <div className="welcome-user-inner-container">
          <div className="welcome-user-title">Welcome, {user.name}!</div>
          <div className="welcome-user-description">
            Let’s learn something <br /> new today
          </div>
          <Link to="/home/Computer Science">
            <Button
              color="secondary"
              className="welcome-user-button"
              variant="text"
            >
              Browse Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="continueVideo-flex">
      <div className="setting-width">
        <div className="continueVideo-container">
          {continueWatch.data && chapName ? (
            <Link
              style={{ flexGrow: 1 }}
              to={`${getEndpointForId(
                continueWatch.data.id,
                continueWatch.data.subject,
                chapName,
                videoData && videoData.vid_title
              )}#t=${getStartTime()}`}
            >
              <div className="continueVideo">
                <div
                  className="continueVideo-background"
                  style={{
                    backgroundImage: `${gradient} url(${getImgUrl(
                      videothumb,
                      istabletDisplay ? 480 : 720
                    )})`,
                  }}
                >
                  <p className="heading-cv">Continue from where you left</p>
                  <div style={{ flexGrow: 1 }} />
                  <p className="chapter-title">
                    {continueWatch.data !== null
                      ? continueWatch.data.subject
                      : ""}
                  </p>
                  <div className="continueVideo-description">
                    <div className="grow-description">
                      <p className="chapter-description">
                        {videoData != null ? videoData.vid_title : ""}
                      </p>
                    </div>
                    <p className="remaining-time">
                      {videoData ? getMinsRemaining() : "... "} minutes
                      remaining
                    </p>
                    <img src={playIcon} alt="" className="play-icon" />
                  </div>
                </div>
              </div>
              <div className="small-screen-flex">
                <div className="flex-grow-small-screen">
                  <p className="small-screen-remain-time">
                    {(videoData && getMinsRemaining()) || "... "} minutes left
                  </p>
                  <p className="small-screen-remain-title">
                    {videoData ? videoData.vid_title : ""}
                  </p>
                </div>
                <SvgIcon
                  color="secondary"
                  viewBox="0 0 36 36"
                  className="small-screen-play-icon"
                >
                  <SmallScreenPlayIcon />
                </SvgIcon>
              </div>
            </Link>
          ) : (
            welcomeUser
          )}
          <Hidden mdUp>
            <AdsContainer
              path="home"
              hide={props.isSubscribed}
              varient={AD_VARIENT_BANNER_MINI}
              rootSmStyles={{ margin: "24px 0px" }}
            />
          </Hidden>
          <QnNLg isSubscribed={props.isSubscribed} />
        </div>
      </div>
    </div>
  );
};

export default ContinueVideo;
