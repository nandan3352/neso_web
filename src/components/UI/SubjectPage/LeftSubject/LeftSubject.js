import React from "react";
import "./LeftSubject.css";
import GetFuel from "../GetFuel/GetFuel";
import SO1Button from "../../Buttons/Secondary/Outline1/Button";
import { fetchFacultiesData } from "../../../../Services/Database";
import { Hidden, useMediaQuery, useTheme } from "@material-ui/core";
import CourseDetails from "../CourseDetails/CourseDetails";
import { Link } from "react-router-dom";
import UserProgress from "../UserProgress/UserProgress";
import UserProgressOverlay from "../UserProgress/UserProgressOverlay";
import { getEndpointForId } from "../../../../Services/Utils";
import { IconButton } from "@material-ui/core";
import { KeyboardArrowRight, Home } from "@material-ui/icons";
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../Ads/AdsContainer";
import { COURSE_LAYOUT } from "../../../../lib/Enums";
import SubjectDetailsLoading from "../SubjectLoading/SubjectDetailsLoading";

function LeftSubject(props) {
  //Utils
  const getFaculties = (faculties_id_string) => {
    return faculties_id_string.split("_");
  };

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(1000));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [faculties, setFaculties] = React.useState(undefined);

  const [hover, setHover] = React.useState(null);

  const progress = props.userProgress;

  const totalItems = progress && progress.lt + progress.ct + (progress.qt || 0);

  const overallProgress =
    progress &&
    Number(
      (
        ((progress.lectures * progress.lt +
          progress.chapters * progress.ct +
          progress.quizzes * (progress.qt || 0)) /
          totalItems) *
        100
      ).toFixed(1)
    );
  const showProgressLayout = progress && Number(overallProgress) !== 0;

  const handlePopoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setHover(null);
  };

  React.useEffect(() => {
    if (props.course.inst_ids) {
      fetchFacultiesData(getFaculties(props.course.inst_ids)).then((f) => {
        setFaculties(f);
      });
    }
  }, [props.course.inst_ids]);

  const isLecturesOnly =
    props.course.course_layout === COURSE_LAYOUT.LAYOUT_LECTURES_ONLY;

  return (
    <div
      className="left-section-div"
      id={props.leftSectionIdValue}
      style={props.styleLeftSection}
    >
      {!props.subscription.isSubscribed ? <GetFuel /> : ""}
      <section className="left-subject">
        <Hidden smUp>
          <AdsContainer
            path="subject"
            hide={props.subscription.isSubscribed}
            varient={AD_VARIENT_BANNER_MINI}
          />
        </Hidden>
        <section className="course-details">
          <div className="course-thumbnail">
            <img src={props.course.img} alt={props.course.name}></img>
          </div>
          <div className="course-name-des">
            <div className="header-path" id="left-section-header">
              <Link to="../home">
                <IconButton>
                  <Home />
                </IconButton>
              </Link>
              <KeyboardArrowRight id="arrow-one" />
              <Link to={`/home/${props.subjectLink.name}`}>
                <span id="first-span">{props.subjectLink.name}</span>
              </Link>
              <KeyboardArrowRight id="arrow-two" />
              <span>{props.courseLink}</span>
            </div>
            <div className="course-name">
              <p>{props.course.name}</p>
            </div>
          </div>
          {!showProgressLayout && (
            <div className="course-start">
              <Link
                to={getEndpointForId(
                  props.firstVideo?.id,
                  props.course.name,
                  props.chapters[1] && props.chapters[1].name,
                  props.firstVideo?.name
                )}
              >
                <SO1Button
                  content="start"
                  style={{ width: "112px", height: "32px" }}
                />
              </Link>
            </div>
          )}
          {showProgressLayout && (
            <UserProgressOverlay
              isMobile={isMobile}
              isTablet={isTablet}
              close={handlePopoverClose}
              anchor={hover}
              userRecord={progress}
            />
          )}
          {showProgressLayout && (
            <div
              onClick={isTablet ? handlePopoverOpen : null}
              onMouseEnter={isTablet ? null : handlePopoverOpen}
              onMouseLeave={isTablet ? null : handlePopoverClose}
              className="progress-main-container"
            >
              <div className="progressContainer">
                <UserProgress
                  lecturePercentage={
                    (progress.lectures * progress.lt) / totalItems
                  }
                  chapterPercentage={
                    (progress.chapters * progress.ct) / totalItems
                  }
                  quizPercentage={(progress.quizzes * progress.qt) / totalItems}
                />
              </div>
              <div className="completionChip">
                {`${overallProgress}% Completed`}
              </div>
            </div>
          )}
        </section>
        {faculties ? (
          <CourseDetails
            isLecturesOnly={isLecturesOnly}
            instructors={faculties}
            type={props.course.type}
            totDur={props.course.totdur}
            contentCount={
              isLecturesOnly
                ? props.lecturesCount
                : props.chapters?.length !== 0
                ? props.chapters?.length - 1
                : 0
            }
            course={props.course}
          />
        ) : (
          <SubjectDetailsLoading />
        )}
        <section className="chapter-names">
          <div className="course-description">
            <h6 className="course-description">{props.course.description}</h6>
          </div>
          {/* <ChaptersName chapterNames={props.chapters.map((element => element.name))} /> */}
        </section>
      </section>
    </div>
  );
}

export default LeftSubject;
