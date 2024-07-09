import React from "react";
import { ReactComponent as FuelImg } from "../../../assets/images/Fuel/NesoFuelFullC.svg";
import PFButton from "../../../components/UI/Buttons/Primary/Filled/Button";
import "./NesoFuel.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.surface,
  },
  fuelIcon: {
    "-webkit-filter": `invert(${theme.palette.type === "dark" ? "100" : "0"}%)`,
    "-moz-filter": `invert(${theme.palette.type === "dark" ? "100" : "0"}%)`,
    "-ms-filter": `invert(${theme.palette.type === "dark" ? "100" : "0"}%)`,
    "-o-filter": `invert(${theme.palette.type === "dark" ? "100" : "0"}%)`,
    filter: `invert(${theme.palette.type === "dark" ? "100" : "0"}%)`,
    width: 64,
  },
}));

const handleClick = () => {
  // history.push("/fuel");
};

const NesoFuel = () => {
  const classes = useStyle();
  return (
    <div className="flex-container-nesofuel">
      <div className={clsx("nesoFuel", classes.root)}>
        <div className="art-container">
          <div className="left-art-container">
            <FuelImg />
            <p className="nesoFuel-title">Neso Fuel</p>
            <p className="nesoFuel-description">
              With Neso Fuel get access to all the paid content with Ad-free
              experience
            </p>
            <Link to={{pathname : "/fuel" , state : {refuel : true}}}>
              <PFButton
                onClick={handleClick}
                content="get fuel"
                width="104px"
              />
            </Link>
          </div>
          <div className="right-art-container only-large">
          </div>
        </div>
      </div>
    </div>
  );
};

export default NesoFuel;
