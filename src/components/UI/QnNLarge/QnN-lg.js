import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Tick from "../../../assets/images/QnN/tick.svg";

const QnN = ({ title, nopages, completed, img }) => {
  return (
    <div className="qnn-content-border">
      <img src={img} alt="" className="qnn-img" />
      <div className="qnn-content-inside">
        <div className="qnn-content-title">{title}</div>
        <div className="qnn-content-pg-no">{nopages} pages</div>
      </div>
      <div style={{ flexGrow: "1" }} />
      <div className="qnn-content-arrow">
        {completed === false ? (
          <KeyboardArrowRight />
        ) : (
          <img src={Tick} alt="" />
        )}
      </div>
    </div>
  );
};

export default QnN;
