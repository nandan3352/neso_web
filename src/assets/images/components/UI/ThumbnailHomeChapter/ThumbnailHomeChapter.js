import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./ThumbnailHomeChapter.css";
import { Icon, IconButton } from "@material-ui/core";
import  PlaylistPlay  from "@material-ui/icons/PlaylistPlay";

const ThumbnailHome = (props) => {
  return (
    <div onClick={props.onClick} style={{position : 'relative'}} className="thumbnailHome">
      <div>
        <img src={props.image} alt="" className="img-thumbnailHome" />
        <div className="thumbnail-playlist" > {props.playlistCount}
          <Icon style={{ marginLeft: '4px' }}>
            <PlaylistPlay />
          </Icon>
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
