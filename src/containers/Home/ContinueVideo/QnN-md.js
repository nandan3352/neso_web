import React from "react";
import "./QnN-md.css";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Img from "./nImh.svg";
import Tick from "../../../assets/images/QnN/tick.svg";
import QnN from "../../../components/UI/QnNMedium/QnN-md";

const QnNMd = () => {
  return (
    <div className="qnn-main-md">
      <div className="qnn-title-row-md">
        <div className="qnn-title-md">Quizzes & Notes</div>
        <div className="qnn-title-grow-md" />
      </div>
      <div className="qnn-lower-section-md">
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

export default QnNMd;
