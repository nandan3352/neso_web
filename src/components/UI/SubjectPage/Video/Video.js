import React from "react";
import "./Video.css";
import { Link, useParams } from "react-router-dom";
import {
  getDurationOfLectureInSeconds,
  getEndpointForId,
  getImgUrl,
  getpaddedidForsubject,
} from "../../../../Services/Utils";
import MoreVert from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { SvgIcon } from "@material-ui/core";
import NesoFuel /*  { ReactComponent as NesoFuel } */ from "../../../../assets/images/Fuel/NesoFuelStamp.svg";

function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

function Video(props) {
  const getLectureId = (props) => {
    return props.lec_id;
  };

  const [videoProgress, setVideoProgress] = React.useState(0);

  React.useEffect(() => {
    const totPercentage = (props.videoProgress || 0) * 100;
    setVideoProgress(totPercentage);
  }, [props.lec_id, props.videoProgress]);

  function handleMoreOverlayClick(data) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      props.handleMoreOverlay({ ...data, anchorEl: e.currentTarget });
    };
  }

  const thumbnailOverlayIcon = (
    <SvgIcon className="video-thumbnail-overlay-icon">
      <svg
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 320.001 320.001"
        fill="#ffffff"
      >
        <path
          d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
	              c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
	              c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"
        />
      </svg>
    </SvgIcon>
  );

  return (
    <Link
      key={props.number}
      to={getEndpointForId(
        getLectureId(props),
        props.courseName,
        props.chapName,
        props.title,    
      )}
    >
      <section
        className="video-section"
        style={{ marginLeft: props.isLecturesOnlyCourse ? 24 : 0 }}
      >
        <div className="video-container">
          <div className="video-number">
            <p>{props.number + 1}</p>
          </div>
          <div className="video-thumbnail">
            <div className="video-thumbnail-overlay"></div>
            {thumbnailOverlayIcon}
            <img
              className="video-thumbnail-img"
              src={getImgUrl(props.videoThumbId)}
              alt={props.title}
            ></img>
            {!props.free && (
              <img src={NesoFuel} alt="" className="fuel-img video-fuel-img" />
            )}
            <div className="video-duration-subject">
              <p>{props.duration}</p>
            </div>
            {videoProgress > 0 && (
              <div className="subject-progress-bar">
                <div
                  style={{ width: `${videoProgress}%` }}
                  id="subject-progress"
                ></div>
              </div>
            )}
          </div>
        </div>
        <div className="video-title">
          <p>{props.title}</p>
        </div>
        {/* <div style={{ flexGrow: 1 }} /> */}
        <div
          className="video-more"
          onClick={handleMoreOverlayClick({
            name: props.title,
            id: getLectureId(props),
            url: getEndpointForId(
              getLectureId(props),
              props.courseName,
              props.chapName,
              props.title
            ),
          })}
        >
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        {/* More overlay legecy <MoreOverlay name={props.title} url={getEndpointForId(, props.courseName, props.chapName, props.title)} anchorEl={videoMoreAnchorEl} close={handleMoreClickClose} id={getLectureId(props)} vidClose={() => setVideoMoreAnchorEl(null)} /> */}
      </section>
    </Link>
  );
}

export default Video;
