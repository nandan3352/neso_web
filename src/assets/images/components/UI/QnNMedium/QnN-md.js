import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Tick from "../../../assets/images/QnN/tick.svg";

const QnN = ({ title, nopages, completed, img }) => {
  return (
    <div className="qnn-content-border-md">
      <div>
        <img src={img} alt="" className="qnn-img-md" />
      </div>
      <div className="qnn-content-inside-md">
        <div className="qnn-content-title-md">{title}</div>
        <div className="qnn-content-pg-no-md">{nopages} pages</div>
      </div>
      <div style={{ flexGrow: "1" }} />
      <div className="qnn-content-arrow-md">
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
