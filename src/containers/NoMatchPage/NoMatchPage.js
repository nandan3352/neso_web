import React from "react";
import "./NoMatchPage.css";
import Img from "./NoMatchPage.svg";
import SO1Button from "../../components/UI/Buttons/Secondary/Outline1/Button";
import { Link } from "react-router-dom";

const NoMatchPage = (props) => {
  return (
    <div className="NoMatchPage-Main-Container">
      <div className="NoMatchPage-Container">
        <div className="NoMatchPage-Img">
          <img src={Img} alt="" />
        </div>
        <div>
          <p className="NoMatchPage-Text">
            {props.info ? props.info : "Sorry, the page you’re trying to access is not available."}
          </p>
        </div>
        {!props.noButton && <div className="NoMatchPage-Button">
          <Link
            to="/"
            className="NoMatchPage-Button-Link"
            style={{ textDecoration: "none" }}>
            <SO1Button content="take me home" width="147px" />
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default NoMatchPage;
