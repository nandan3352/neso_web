import React, { useEffect } from "react";
import Chapters from "../Chapters/Chapters";
import Quizzes from "../QuizSection/QuizSection"
import PPTs from "../PPTs/PPTs";
import { Link, useNavigate } from "react-router-dom";
import { Home, KeyboardArrowRight } from "@material-ui/icons";
import { Tabs, Tab, AppBar, IconButton, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Subject.css";
import "../RightHeader/RightHeader.css";
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../Ads/AdsContainer";
import { COURSE_LAYOUT } from "../../../../lib/Enums";
import SubjectLecturesList from "./SubjectLecturesList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabsRoot: {
    minWidth: "120px",
    textTransform: "Capitalize",
    color: theme.palette.text.primary,
    boxShadow: "none",
    "&$selected": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "100px",
    },
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
  selected: {},
}));


function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      hidden={value !== index}
    >
      {value === index && children}
    </div>
  );
}

function SubjectItemsList(props) {

  const classes = useStyles();
  const history = useNavigate();

  const [value, setValue] = React.useState(0);

  useEffect(() => {

    if (props.path.includes('quiz')) {
      setValue(1)
    } else if (props.path.includes('ppts')) {
      setValue(2)
    } else if (props.path.includes('notes')) {
      setValue(3)
    }
  }, [props.path])

  const findPath = (path => {
    let arr = path.split("/")
    if (arr.length > 3) {
      return arr.slice(0, -1).join("/")
    }
    return arr.join("/")
  })


  const handleChange = (event, newValue) => {
    if (newValue === 0 && (props.path.includes('quiz') || props.path.includes('ppts') || props.path.includes('notes'))) {
      history.replace(findPath(props.path))
    } else if (newValue === 1 && !props.path.includes('quiz')) {
      history.replace(findPath(props.path) + "/quiz")
    } else if (newValue === 2 && !props.path.includes('ppts')) {
      history.replace(findPath(props.path) + "/ppts")
    } else if (newValue === 3 && !props.path.includes('notes')) {
      history.replace(findPath(props.path) + "/notes")
    }

    setValue(newValue);
  };

  const layout = props.courseLayout || COURSE_LAYOUT.LAYOUT_NORMAL

  const tabs = [layout === COURSE_LAYOUT.LAYOUT_LECTURES_ONLY ? "Lectures" : "Chapters", "Quizzes", "PPTs"]

  const tabpanels = [
    layout === COURSE_LAYOUT.LAYOUT_LECTURES_ONLY ?
      Object.values(props.chapters || {}).map(chapter =>
        <SubjectLecturesList
          course_id={props.course_id}
          chapter_name={props.courseName}
          courseName={props.courseName}
          subscription={props.subscription}
          lectures_obj={props.videosObj}
          lec_thumbnail_obj={props.videoThumb}
          lectureProgresses={props.videoProgress}
          user={props.user}
          isFree={chapter.cost === 0}
        />)
      : <Chapters
        courseName={props.courseName}
        endPointValue={props.course_id}
        subscription={props.subscription}
        videos={props.videosObj}
        videoThumb={props.videoThumb}
        chapters={props.chapters}
        bookmarks={props.bookmarks}
        videoProgress={props.videoProgress}
      />,
    <Quizzes
      path={props.path}
      nav={history}
      openId={props.qChapId}
      subscription={props.subscription}
      bookmarks={props.bookmarks}
      id={props.course_id}
      quizzes={props.quizzes}
    />,
    <PPTs
      path={props.path}
      subscription={props.subscription}
      ppts={props.ppts}
      endPointValue={props.course_id}
    />,
  ]

  return (
    <section className="right-subject">
      <Hidden smDown >
        <AdsContainer path="subject" slot="1234324" hide={props.subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} rootStyle={{ border: "none" }} />
      </Hidden>
      <div
        className="right-header"
        id={props.headerFixed}
        style={props.headerFixedStyle}>
        <div className="header-path" id="right-section-header">
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
        <div className="right-heading">
          <p>Course content</p>
        </div>
      </div>
      <div className="tabs">
        <AppBar position="sticky">
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.root}
            TabIndicatorProps={{
              className: classes.indicator,
            }}>
            {tabs.map(tab => (
              <Tab
                label={tab}
                classes={{
                  selected: classes.selected,
                  root: classes.tabsRoot,
                }} />
            ))}
          </Tabs>
        </AppBar>

        {tabpanels.map((component, i) => (
          <TabPanel value={value} index={i}>
            {component}
          </TabPanel>
        ))}
      </div>
    </section>
  );
}

export default SubjectItemsList;
