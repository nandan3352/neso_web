import React from "react";
import "./SmallThumbnail.css";
import { Link } from "react-router-dom";
import { useUser } from "../../../Services/Auth";
import { useDatabase } from "../../../Services/Database";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton } from "@material-ui/core";
import MoreVertRounded from "@material-ui/icons/MoreVertRounded";
import { getDurationOfLectureInSeconds, getEndpointForId } from "../../../Services/Utils";
import NesoFuel from "../../../assets/images/Fuel/NesoFuelStamp.svg";

function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

const SmallThumbnail = (props) => {
  const user = useUser()
  const selectedRef = React.useRef();

  React.useEffect(() => {

    const clear = setTimeout(() => {
      if (props.selected && selectedRef.current && props.scrollingParent) {
        const parent = props.scrollingParent;
        parent.scrollTo({ top: selectedRef.current.offsetTop - 87, behavior: 'smooth' })
      }
    }, 500);
    return () => clearTimeout(clear)
  }, [props.selected, props.scrollingParent])

  const videoPlayedOrNot = useDatabase(
    user ? `/Users/${user.uid}/progress/${props.videoId}` : null
  );

  let percentComplete =
    videoPlayedOrNot.data === null ? 0 : videoPlayedOrNot.data * 100;

  return (
    <Link to={getEndpointForId(props.videoId, props.courseName, props.chapName, props.title)}>
      <div className="SmallThumbnail" id={props.selected ? 'smallthumbnail-selected' : ''} ref={props.selected ? selectedRef : null}>
        <div className="img">
          <img className="Img-SmallThumbnail" src={props.img} alt="" />
          {props.paid && <img className="Nesofuel-overlay" src={NesoFuel} alt=""></img>}
          <div className="video-duration">
            <p>{props.duration}</p>
          </div>
          {user && user.uid && videoPlayedOrNot.data ? (
            <div className="progress-bar">
              <div id="progress" style={{ width: `${percentComplete}%` }}></div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Tooltip title={props.title}>
          <div className="content">{props.title}</div>
        </Tooltip>
        <div class="More-Icon">
          <IconButton
            onClick={props.handleMore}
            style={{ marginTop: "4px", marginRight: "-4px", padding: "4px" }}
          >
            {" "}
            <MoreVertRounded />
          </IconButton>
        </div>
      </div>
    </Link>
  );
};

// && videoPlayedDuration.data
export default SmallThumbnail;
