import { ReactComponent as GraphicDesigner } from "../../assets/images/Recruit/GraphicDesigner.svg";
import { ReactComponent as AppDeveloper } from "../../assets/images/Recruit/AppDeveloper.svg";
import { ReactComponent as AD } from "../../assets/images/Recruit/AD.svg";
import { ReactComponent as CW } from "../../assets/images/Recruit/CW.svg";
import { ReactComponent as SME } from "../../assets/images/Recruit/SME.svg";
import { ReactComponent as Teacher } from "../../assets/images/Recruit/teacher.svg";
import { ReactComponent as VE } from "../../assets/images/Recruit/VE.svg";
import { ReactComponent as WD } from "../../assets/images/Recruit/WD.svg";
import { SvgIcon } from "@material-ui/core";
const CareerIcon = ({ type, enabled }) => {
  const color = enabled ? "secondary" : "disabled";
  switch (type) {
    case "graphic_designer":
      return (
        <SvgIcon color={color}>
          <GraphicDesigner></GraphicDesigner>
        </SvgIcon>
      );
    case "app_developer":
      return (
        <SvgIcon style={{width: 48}} viewBox="0 0 48 24" width={48} color={color}>
          <AppDeveloper></AppDeveloper>
        </SvgIcon>
      );
    case "android_developer":
      return (
        <SvgIcon color={color}>
          <AD></AD>
        </SvgIcon>
      );
    case "content_writer":
      return (
        <SvgIcon color={color}>
          {" "}
          <CW></CW>
        </SvgIcon>
      );
    case "subject_matter_expert":
      return (
        <SvgIcon color={color}>
          <SME></SME>
        </SvgIcon>
      );
    case "teacher":
      return (
        <SvgIcon color={color}>
          <Teacher></Teacher>
        </SvgIcon>
      );
    case "video_editor":
      return (
        <SvgIcon color={color}>
          <VE></VE>
        </SvgIcon>
      );
    case "web_developer":
      return (
        <SvgIcon color={color}>
          <WD></WD>
        </SvgIcon>
      );
    default:
      break;
  }
};

export default CareerIcon;
