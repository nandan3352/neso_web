import React from "react";
import "./QnN-sm.css";
import Img from "./nImh.svg";
import QnN from "../../../components/UI/QnNSmall/QnN-sm";

const QnNSm = () => {
  return (
    <div className="qnn-main-sm">
      <div className="qnn-title-row-sm">
        <div className="qnn-title-sm">Quizzes & Notes</div>
        <div className="qnn-title-grow-sm" />
      </div>
      <div className="qnn-lower-section-sm">
        <QnN
          img={Img}
          title="Process Synchronization"
          nopages={34}
          completed={false}
        />
        <QnN
          img={Img}
          title="Process Synchronization"
          nopages={34}
          completed={false}
        />
        <QnN
          img={Img}
          title="Process Synchronization"
          nopages={34}
          completed={true}
        />
        <QnN
          img={Img}
          title="Process Synchronization"
          nopages={34}
          completed={false}
        />
      </div>
    </div>
  );
};

export default QnNSm;
