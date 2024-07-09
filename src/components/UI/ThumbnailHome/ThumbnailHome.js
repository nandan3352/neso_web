import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./ThumbnailHome.css";
import { IconButton } from "@material-ui/core";

const ThumbnailHome = (props) => {

  return (
    <div className="thumbnailHome-main">
      <div onClick={props.onClick}  className="thumbnailHome">
        <img src={props.image} alt="" className="img-thumbnailHome" />
        <div className="video-duration-home">
          <p style={{ color: "white" }}>{props.duration}</p>
        </div>
      </div>
      <div className="flex-thumbnailHome">
        <div className="thumbnailHome-content">
          <p>{props.content}</p>
        </div>
        <div className="flex-grow-thumbnailHome" />
        <IconButton style={{ height : 40, width : 40 , marginRight : -8, padding : 8}} onClick={props.handleMore} className="more-dots-thumbnailHome">
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ThumbnailHome;
