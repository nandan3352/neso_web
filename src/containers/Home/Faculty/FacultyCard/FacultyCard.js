import React from "react";
import "./FacultyCard.css";

const FacultyCard = (props) => {
  //TODO fetch from db
  let deptColors = {
    CSE: {
      color: "#2D9CDB",
      backgroundColor: "rgba(45, 156, 219, 0.16)",
    },
    ECE: {
      color: "#F2994A",
      backgroundColor: "rgba(255, 122, 0, 0.16)",
    },
    EEE: {
      color: "#F2994A",
      backgroundColor: "rgba(255, 122, 0, 0.16)",
    },
    OTHERS: {
      color: "#FF5B83",
      backgroundColor: "rgba(255, 91, 131, 0.16)",
    },
    LANGUAGES: {
      color: "linear-gradient(90deg, #EF4B4B 0.69%, #FF6E68 14.74%, #FD953A 28.93%, #F0C044 43.23%, #D5D784 54.88%, #88C9C5 64.5%, #23A0BB 74.12%, #2F6FEB 85.26%, #3C1FEC 97.92%)",
      backgroundColor: "linear-gradient(90deg, rgba(239, 75, 75, 0.16) -25%, rgba(255, 110, 104, 0.16) -3.42%, rgba(253, 149, 58, 0.16) 18.39%, rgba(240, 192, 68, 0.16) 40.36%, rgba(213, 215, 132, 0.16) 58.26%, rgba(136, 201, 197, 0.16) 73.3%, rgba(35, 160, 187, 0.16) 87.83%, rgba(47, 111, 235, 0.16) 104.95%, rgba(60, 31, 236, 0.16) 124.4%)",
      isGradient: true
    }
  };

  const backgroundColor = deptColors[props.facutyDept]?.backgroundColor;
  const textColor = deptColors[props.facutyDept]?.color;
  const isGradient = deptColors[props.facutyDept]?.isGradient;

  const gradientStyle = {
    background: textColor,
    backgroundClip: "text"
  }

  return (
    <div {...props}>
      <div className="facultyCard-main">
        <img src={props.facultyImg} alt="hi" className="faculty-img" />
        <p className="faculty-name">{props.facultyName.split(" ").map(name => <span>{name}</span>)}</p>
        <p
          className="dept"
          style={{
            background: backgroundColor,
          }}>
          <span className={isGradient && "gradient-label"} style={isGradient ? gradientStyle : { color: textColor }} >
            {props.facutyDept}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FacultyCard;
