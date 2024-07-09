import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link1 from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ShareIcon from "@material-ui/icons/Share";
import React, { Component } from "react";
// import ReactHlsPlayer from "react-hls-player";
import {
  SingleLargeLineAnimation,
  SingleSmallLineAnimation,
} from "../Loaders/Loaders";
import FuelOI from "../../../assets/images/Fuel/Icons/FuelOrangeIcon.svg";
import PFButton from "../../../components/UI/Buttons/Primary/Filled/Button";
import { Link } from "react-router-dom";
import "./RightSection.css";
import Tab from "./Tab/Tab";
import { Button, CircularProgress, IconButton } from "@material-ui/core";
import PlayerBookmark from "./PlayerBookmark/playerBookmark";
import VideoPlayer from "../../../components/Player/VideoPlayer";
import { ShareEvent } from "../../../Services/Events";
import { Helmet } from "react-helmet";
import AdsContainer, {
  AD_VARIENT_BANNER_MINI,
} from "../../../components/UI/Ads/AdsContainer";
import { databasefetchHistory, databaseSet } from "../../../Services/Database";
import {
  getFunctions,
  httpsCallableFromURL,
} from "firebase/functions";

function handleClick(event) {
  event.preventDefault();
}

export function handleOverlay(show) {
  const overlayRef = document.querySelector(".Player-overlay");
  if (!overlayRef) {
    return;
  }
  if (show) {
    //overlayRef.style.opacity = 1;
    overlayRef.style.display = "flex";
    overlayRef.style.pointerEvents = "inherit";
  } else {
    //overlayRef.style.opacity = 0;
    overlayRef.style.display = "none";
    overlayRef.style.pointerEvents = "none";
  }
}

class RightSection extends Component {
  constructor(props) {
    super(props);
    this.speedList = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    this.qualList = ["auto", "240p", "360p", "540p", "720p", "1080p"];

    this.state = {
      otp: null,
      playbackInfo: null,
      error: false,
      errorDescription: "",
      ready: false,
      link: "",
      interval: null,
      animationTime: 5,
      courseFinished: false,
      playbackspeed: this.speedList[localStorage.getItem("playback-speed") - 1],
    };
    this.replayUserHandle = this.replayUserHandle.bind(this);
    this.playNextTimerCallback = this.playNextTimerCallback.bind(this);
    this.playNextUserHandle = this.playNextUserHandle.bind(this);
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.title !== this.props.title ||
      (prevProps.user && prevProps.user.uid) !==
        (this.props.user && this.props.user.uid)
    ) {
      this.setState({
        otp: null,
        playbackInfo: null,
        error: false,
        errorDescription: "",
        ready: false,
        notes: null,
        courseFinished: false,
      });
      this.loadVideo();
    }

    if (this.props.videos !== null && this.props.videos[this.props.title])
      document.title =
        this.props.videos[this.props.title].vid_title + " | Neso Academy";

    if (this.props.streamLimit.block !== prevProps.streamLimit.block) {
      handleOverlay(this.props.streamLimit.block);
    }
    this.getUrl();
  }

  componentDidMount() {
    this.loadVideo();
    this.getUrl();
  }

  writeHistory(uid, vid) {
    databasefetchHistory(`/Users/${uid}/history`, "time", 1).then((data) => {
      if (data.val() === null) {
        databaseSet(`/Users/${uid}/history/0`, {
          time: Date.now(),
          vid: vid,
        });
      } else {
        data.forEach((history) => {
          databaseSet(
            `/Users/${uid}/history/${(Number(history.key) + 1) % 10}`,
            {
              time: Date.now().toString(),
              vid: vid,
            }
          );
        });
      }
    });
  }

  share() {
    document.dispatchEvent(
      new CustomEvent(ShareEvent, { detail: { url: window.location.pathname } })
    );
  }

  loadVideo() {
    clearInterval(this.state.interval); // clearing play next timer
    const user = this.props.user;
    httpsCallableFromURL(
      getFunctions(),
      "https://asia-east2-neso-c53c4.cloudfunctions.net/videootp"
    )({
      lectureId: this.props.title,
    })
      .then((response) => {    
        if(user) {
          this.writeHistory(user.uid, this.props.title);
        }       
        this.setState({
          otp: response.data.otp,
          playbackInfo: response.data.playbackInfo,
          ready: true,
        });
      })
      .catch((fail) => {
        console.log(fail.code);
        if (fail.code === "functions/not-found") {
          this.setState({
            ready: true,
            error: true,
            errorDescription:
              "Video not found, kindly check the url and try again",
          });
        } else {
          const message = fail.message === "internal" ? "Network Error" : fail.message
          this.setState({
            ready: true,
            error: fail.code !== "functions/permission-denied",
            errorDescription: `Network error, kindly check your internet and try again\n Reason : ${message}`,
          });
        }
      });
  }

  playNextUserHandle() {
    clearInterval(this.state.interval);
    this.setState({ animationTime: 5, interval: null });
    let finished = this.props.playNextVideo();
    if (Boolean(finished)) {
      this.setState({ courseFinished: finished });
    }
  }

  replayUserHandle() {
    clearInterval(this.state.interval);
    this.setState({ animationTime: 5, interval: null });
    let playerRef = document.querySelector(".player");
    playerRef.style.opacity = 1;
    handleOverlay(false);
    const playerref = document.getElementById("nesovdoplayer");
    if (playerref) {
      const vdoplayer = window.VdoPlayer.getInstance(playerref);
      if (vdoplayer) {
        vdoplayer.video.currentTime = 0;
        vdoplayer.video.play();
      }
    } else {
      console.log("player not found");
    }
  }

  playNextTimerCallback() {
    if (this.state.animationTime > 0) {
      this.setState({ animationTime: this.state.animationTime - 1 });
    } else {
      let finished = this.props.playNextVideo();
      if (Boolean(finished)) {
        this.setState({ courseFinished: finished });
      }
      clearInterval(this.state.interval);
      this.setState({ animationTime: 5, interval: null });
    }
  }

  playNextLecture() {
    if (this.state.interval) {
      return;
    }
    let animationInterval;
    let playerRef = document.querySelector(".player");
    playerRef.style.opacity = 0;
    handleOverlay(true);
    animationInterval = setInterval(() => {
      this.playNextTimerCallback();
    }, 1000);
    this.setState({
      interval: animationInterval,
    });
  }

  getUrl() {
    if (this.props.course && this.props.courseId && this.state.link === "") {
      let url = `/${this.props.courseId.slice(0, 2)}/`;
      url += `${this.props.courseId.slice(
        this.props.courseId.length - 2,
        this.props.courseId.length
      )}-${this.props.course.name.toLowerCase().replace(/\s/g, "")}/`;
      this.setState({ link: url });
    }
  }

  resetMaxLimit() {
    this.props.streamLimit.reset();
    this.retry()
  }

  retry(){
    handleOverlay(false);
    this.setState((prev) => ({
      ...prev,
      ready: false,
      error: false,
      errorDescription: "",
    }));
    this.loadVideo();
    this.getUrl();
  }

  setSpeed(speed) {
    this.setState({ playbackspeed: speed });
  }

  render() {
    let user = this.props.user;

    const maxLimitOverlay = (
      <div
        id="max-lim"
        className="Player-overlay"
        style={{ opacity: 1, pointerEvents: "auto" }}
      >
        <div className="streamlimit-title">Maximum limit reached</div>
        <div className="streamlimit-body">
          Multiple devices are trying to stream simultaneously. Please stop
          streaming from another device.
        </div>
        <Button
          className="streamlimit-btn"
          onClick={this.resetMaxLimit.bind(this)}
          variant="outlined"
          color="primary"
        >
          Watch Here
        </Button>
      </div>
    );

    const errorPrompt = (
      <div
        className="Video-Player2"
        style={{ opacity: 1, pointerEvents: "auto" }}
      >
        <div className="streamlimit-title">Playback Error</div>
        <div className="streamlimit-body">{this.state.errorDescription}</div>
        <Button
          className="streamlimit-btn"
          onClick={this.retry.bind(this)}
          variant="outlined"
          color="primary"
        >
          Retry
        </Button>
      </div>
    );

    /* (
                <div className="Video-Player2">
                  <div className={`player-flex-main player-error-container`}>
                    {this.state.error}
                  </div>
                </div>
              ) */

    const overlayButton = (text, action) => (
      <Button
        style={{ pointerEvents: "auto", marginTop: 8 }}
        variant="text"
        color="primary"
        onClick={action}
      >
        {" "}
        {text}
      </Button>
    );

    const overlay = (
      <div className="Player-overlay">
        {!this.state.courseFinished ? (
          <>
            {/* TODO: Display next lecture thumbnail */}
            {this.state.animationTime === 0
              ? "Playing next lecture"
              : `Playing next lecture in ${this.state.animationTime} seconds`}{" "}
            <div className="overlay-btn-group">
              {overlayButton("replay", this.replayUserHandle)}
              {overlayButton("play next", this.playNextUserHandle)}
            </div>
          </>
        ) : this.state.courseFinished === "incomplete" ? (
          <>
            Remaining lectures will be uploaded soon.
            {overlayButton("go home and browse others", () =>
              this.props.history.push("/")
            )}
          </>
        ) : (
          <>
            You have reached the end of this course.
            {overlayButton("go home", () => this.props.history.push("/"))}
          </>
        )}
      </div>
    );

    const buyFuelPrompt = (
      <div className="Video-Player2">
        <div className="player-flex-main">
          <div className="flex-items">
            <img src={FuelOI} alt="" className="fuel-image" />
          </div>
          <div className="flex-items fuel-title">Neso Fuel</div>
          <div className="flex-items fuel-content">
            Get Neso Fuel to watch this lecture
          </div>
          <div>
            <Link to={{ pathname: "/fuel", state: { refuel: true } }}>
              <PFButton
                onClick={handleClick}
                content="get fuel"
                width="104px"
              />
            </Link>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {this.props.videos !== null &&
        this.props.videos[this.props.title] &&
        this.props.course ? (
          <Helmet>
            <title>
              {this.props.videos[this.props.title].vid_title +
                " | Neso Academy"}
            </title>
            <meta name="description" content={this.props.course.description} />
          </Helmet>
        ) : (
          ""
        )}

        <div className="Right">
          <div className="Right-Container">
            <div className="embedBox"></div>
            {this.state.ready ? (
              this.state.error ? (
                errorPrompt
              ) : (
                <>
                  {!Boolean(this.state.otp) ? (
                    buyFuelPrompt
                  ) : (
                    <div className="Video-Player">
                      {this.props.streamLimit.block && maxLimitOverlay}
                      {overlay}
                      {!this.props.streamLimit.block && (
                        <VideoPlayer
                          sessionPlaybackSpeed={this.state.playbackspeed}
                          setsessionPlspeed={this.setSpeed.bind(this)}
                          otp={this.state.otp}
                          playbackInfo={this.state.playbackInfo}
                          subject={this.props.subject}
                          vid={this.props.title}
                          startAt={this.props.startAt}
                          uid={user && user.uid}
                          playNextVideo={this.playNextLecture.bind(this)}
                        />
                      )}
                    </div>
                  )}
                </>
              )
            ) : (
              <div className="Video-Player2">
                <div className="player-flex-main">
                  <CircularProgress color="secondary" size={48} />
                </div>
              </div>
            )}
            <AdsContainer
              path="player"
              hide={this.props.canAccess}
              varient={AD_VARIENT_BANNER_MINI}
            />

            {/*<div className="LeavesAd" style={{ marginTop: "auto" }} />*/}

            <div className="Tablet-Container">
              <div className="bd">
                <Breadcrumbs
                  className="bread-large-device"
                  style={{ marginBottom: "16px", textSize: "14px" }}
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link1
                    style={{
                      display: "flex",
                      textSize: "14px",
                      height: "24px",
                      width: "24px",
                      margin: "-5px 0 0 0px",
                    }}
                    color="inherit"
                  >
                    <Link to="/">
                      <IconButton style={{ margin: -12 }}>
                        <HomeIcon />
                      </IconButton>
                    </Link>
                  </Link1>
                  <Link1 color="inherit" style={{ textSize: "14px" }}>
                    {this.props.subject !== null ? (
                      <Link
                        style={{
                          textDecoration: "none !important",
                          color: "inherit",
                        }}
                        to={`/home/${this.props.subject.name}`}
                      >
                        {this.props.subject.name}
                      </Link>
                    ) : (
                      <SingleSmallLineAnimation />
                    )}
                  </Link1>
                  <Link1
                    color="inherit"
                    href="/"
                    onClick={handleClick}
                    style={{ textSize: "14px" }}
                  >
                    {this.props.course ? (
                      <Link
                        style={{
                          textDecoration: "none !important",
                          color: "inherit",
                        }}
                        to={this.state.link}
                      >
                        {this.props.course.name}
                      </Link>
                    ) : (
                      <SingleSmallLineAnimation />
                    )}
                  </Link1>
                  <Typography color="textPrimary" style={{ textSize: "14px" }}>
                    {this.props.chapter !== null ? (
                      this.props.chapter.name
                    ) : (
                      <SingleSmallLineAnimation />
                    )}
                  </Typography>
                </Breadcrumbs>
                <div className="trancate"></div>
              </div>

              <Breadcrumbs
                className="bread-small-device"
                style={{ marginBottom: "16px" }}
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link1
                  style={{ display: "flex", margin: "-3px 0px 0 -10px" }}
                  color="inherit"
                  href="/"
                  onClick={handleClick}
                >
                  <HomeIcon />
                </Link1>
                <Typography color="textPrimary">
                  {this.props.chapter !== null ? (
                    this.props.chapter.name
                  ) : (
                    <SingleSmallLineAnimation />
                  )}
                </Typography>
              </Breadcrumbs>

              <div className="Video-Title-container">
                <div className="Video-Title">
                  {this.props.videos !== null &&
                  this.props.videos[this.props.title] ? (
                    this.props.videos[this.props.title].vid_title
                  ) : (
                    <SingleLargeLineAnimation />
                  )}
                </div>
                <PlayerBookmark
                  name={
                    this.props.videos &&
                    this.props.videos[this.props.title] &&
                    this.props.videos[this.props.title].vid_title
                  }
                  id={this.props.id}
                />
                <div>
                  <IconButton onClick={this.share}>
                    <ShareIcon />
                  </IconButton>
                </div>
              </div>

              <div className="tab">
                {this.state.ready ? (
                  <Tab
                    id={this.props.title}
                    course={this.props.course}
                    chapter={this.props.chapter}
                    videos={this.props.videos}
                    nextChapter={this.props.nextChapter}
                    title={this.props.title}
                    canAccess={this.props.canAccess}
                  />
                ) : (
                  <></>
                )}
              </div>

              {/*<div className="LeavesAd" />*/}
            </div>
            <AdsContainer
              path="player"
              hide={this.props.canAccess}
              varient={AD_VARIENT_BANNER_MINI}
              className="adsContainer"
            />
          </div>
        </div>
      </>
    );
  }
}

export default RightSection;
