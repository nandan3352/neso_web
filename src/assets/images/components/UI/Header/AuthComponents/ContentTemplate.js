import React from "react";
import Img from "./dot.svg";
import NesoIcon from "../../../../assets/images/Logos/Icons/NesoColoredIcon.svg";
import { getEndpointForId, isNotificationRead, updateNotificationRead } from "../../../../Services/Utils";
import moment from "moment";
import { Link } from "react-router-dom";
import quizicon from "../../../../assets/images/bg_imgs/quiz.png"
import ppticon from "../../../../assets/images/bg_imgs/ppt.png"

const ContentTemplate = (props) => {
  const { body, image, title, type } = props.content;

  const number = body.split(" ")[1]

  function getImg() {
    if (["ppt", "quiz"].includes(image)) {
      return (
        <div style={{ position: "relative" }}>
          <img src={image == "quiz" ? quizicon : ppticon} alt="" width="100px" height="56px" />
          <div className="template-block">
            <div className="template-chapter">CHAPTER {number}</div>
            <div className="template-title" >{props.data.name}</div>
          </div>
        </div>
      )
    }
    return <img src={image} alt="" width="100px" height="56px" />
  }

  function getCategory() {
    if (props.userSpecific)
      return ""
    let comps = type.split("_")
    let category = "";
    if (comps[2] === "q") {
      category = "Quiz";
    } else if (comps[2] === "p") {
      category = "PPT";
    } else if (!isNaN(comps[2])) {
      category = "Lecture";
    } else {
      category = body.split(":")[0]
    }
    return category
  }



  return (
    <Link onClick={() => updateNotificationRead(type)} to={props.endpoint || (props.data && getEndpointForId(type, props.data.additional && props.data.additional.courseName, props.data.name || props.data.chapName, props.data.vid_title))}> {/*|| props.data.additional.firstVideoName)}>*/}
      <div div className="hovering" >
        <div
          className="content-template"
          style={{ display: "flex", alignItems: "center" }}>
          <div class="content-flex">
            <div className="dot-content">
              {!isNotificationRead(type) && <img src={Img} alt="" />}
            </div>
            <div className="nesoIcon-content">
              <img className="nesoIcon-content-img" src={NesoIcon} alt="" />
            </div>
            <div className="right-content">
              <div>
                <div class="one-by-one-flex">
                  <div className="one category">{getCategory()}</div>
                  <div className="one name">{(!props.userSpecific && props.data) ? (props.data.name || props.data.vid_title) : title}</div>
                  <div className="one time">{moment(Number(props.timestamp)).startOf("time").fromNow()}</div>
                </div>
              </div>
              <div className="template-img" style={{ width: 100 }}>
                {getImg()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentTemplate;
