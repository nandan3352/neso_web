import React from "react";
import PFButton from "../../components/UI/Buttons/Primary/Filled/Button";
import PO1Button from "../../components/UI/Buttons/Primary/Outline1/Button";
import PO2Button from "../../components/UI/Buttons/Primary/Outline2/Button";
import PTButton from "../../components/UI/Buttons/Primary/Text/Button";
import SFButton from "../../components/UI/Buttons/Secondary/Filled/Button";
import SO1Button from "../../components/UI/Buttons/Secondary/Outline1/Button";
import SO2Button from "../../components/UI/Buttons/Secondary/Outline2/Button";
import STButton from "../../components/UI/Buttons/Secondary/Text/Button";
import IFButton from "../../components/UI/Buttons/IconButtons/Filled/Button";
import IOButton from "../../components/UI/Buttons/IconButtons/Outline/Button";
import NesoLogo from "../../assets/images/Logos/NesoLogo.svg";
import NesoLogoRadium from "../../assets/images/Logos/NesoLogoRadium.svg";
import NesoLogoPlutonium from "../../assets/images/Logos/NesoLogoPlutonium.svg";
import NesoLogoUranium from "../../assets/images/Logos/NesoLogoUranium.svg";
import NesoColoredIcon from "../../assets/images/Logos/Icons/NesoColoredIcon.svg";
import NesoBWIcon from "../../assets/images/Logos/Icons/NesoBWIcon.svg";
import Awards from "../../assets/images/Awards/Awards.svg";
import FuelBWIcon from "../../assets/images/Fuel/Icons/FuelBWIcon.svg";
import FuelColoredIcon from "../../assets/images/Fuel/Icons/FuelColoredIcon.svg";
import FuelOrangeIcon from "../../assets/images/Fuel/Icons/FuelOrangeIcon.svg";
import NesoFuelEmpty from "../../assets/images/Fuel/NesoFuelEmpty.svg";
import NesoFuelFull from "../../assets/images/Fuel/NesoFuelFull.svg";
import NesoFuelStamp from "../../assets/images/Fuel/NesoFuelStamp.svg";
import NesoFuelMutedTag from "../../assets/images/Fuel/NesoFuelMutedTag.svg";
import NesoFuel from "../../assets/images/Fuel/NesoFuel.svg";
import Plutonium from "../../assets/images/Logos/Plutonium.svg";
import Radium from "../../assets/images/Logos/Radium.svg";
import Uranium from "../../assets/images/Logos/Uranium.svg";
import CourseCard from "../../components/UI/CourseCard/Card";
import ThumbnailHome from "../../components/UI/ThumbnailHome/ThumbnailHome";
import ThumbnailAd1 from "../../components/UI/Ads/ThumbnailAd1/ThumbnailAd1";
import CourseCardLoader from "../../components/Loader/CourseCardLoader";
// import Footer from "../../components/UI/Footer/Footer";
// import Header from "../../components/UI/Header/Header";

const Component = () => {
  return (
    <div>
      <div></div>
      <br />
      <CourseCard />
      <br />
      <CourseCardLoader />
      <br />
      <ThumbnailHome
        content="ThumbnailHome content"
      />
      <br />
      <br />
      <ThumbnailAd1 content="Add content" link="apple.com" />
      <br />
      <PFButton content="button" />
      <PO1Button content="button" />
      <PO2Button content="button" />
      <PTButton content="button" />
      <br />
      <br />
      <SFButton content="button" />
      <SO1Button content="button" />
      <SO2Button content="button" />
      <STButton content="button" />
      <br />
      <br />
      <IFButton />
      <IOButton />
      <br />
      <br />
      <img src={NesoLogo} alt="" />
      <br />
      <br />
      <img src={NesoLogoRadium} alt="" />
      <br />
      <br />
      <img src={NesoLogoPlutonium} alt="" />
      <br />
      <br />
      <img src={NesoLogoUranium} alt="" />
      <br />
      <br />
      <img src={NesoColoredIcon} alt="" /> <img src={NesoBWIcon} alt="" />{" "}
      <img src={Awards} alt="" />
      <br />
      <br />
      <img src={FuelBWIcon} alt="" /> <img src={FuelColoredIcon} alt="" />{" "}
      <img src={NesoFuelMutedTag} alt="" />
      <br />
      <br />
      <img src={NesoFuel} alt="" /> <img src={FuelOrangeIcon} alt="" />{" "}
      <img src={NesoFuelStamp} alt="" />
      <br />
      <br />
      <img src={NesoFuelEmpty} alt="" /> <img src={NesoFuelFull} alt="" />
      <br />
      <br />
      <img src={Plutonium} alt="" />
      <br />
      <br />
      <img src={Radium} alt="" />
      <br />
      <br />
      <img src={Uranium} alt="" />
      <br />
    </div>
  );
};

export default Component;
