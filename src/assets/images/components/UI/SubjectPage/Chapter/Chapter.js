import React from "react";
import NumVid from "./numvid.svg";
import "./Chapter.css";
import Videos from "../Videos/Videos";
import Bookmark from "./bookmark.svg";
import Bookmarked from "./bookmarked.svg";
import { Link } from "react-router-dom";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import IOButton from "../../Buttons/IconButtons/Outline/Button";
import {
  createLecturesMergedArray,
  filterUserProgress,
  getEndpointForId,
  useBookmark,
} from "../../../../Services/Utils";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareRounded from "@material-ui/icons/ShareRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as NesoFuel } from "../../../../assets/images/Fuel/NesoFuelStamp.svg";
import { ShareEvent, useEventDispatch } from "../../../../Services/Events";

const useAccordianSummaryStyles = makeStyles((theme) => ({
  root: {
    padding: "0px",
    marginBottom: 5,
  },

  content: {
    marginTop: "16px",
    marginBottom: "0px",
    borderStyle: "none",
    "&$expanded": {
      margin: "16px 0px 0px 0px",
    },
  },

  expanded: {},
}));

const accordianDetailStyles = makeStyles({
  root: {
    padding: 0,
    marginBottom: "10px",
  },
});

function Chapter(props) {
  const share = useEventDispatch(ShareEvent);
  const useAccordianStyles = makeStyles((theme) => ({
    root: {
      boxShadow: "none",
      backgroundColor: props.free
        ? theme.palette.background.default
        : "transparent",
    },
  }));
  const accordianDetail = accordianDetailStyles();
  const chapterRef = React.useRef();

  const accordianSummarystyles = useAccordianSummaryStyles();
  const accordianStyles = useAccordianStyles();

  const chapterId = `${props.endPointValue}_${props.number}_`;

  const [rotateVal, setRotateVal] = React.useState("");
  const [lecturesByChapterId, setLecturesByChapterid] = React.useState([]);

  const id = `${props.endPointValue}_${props.number}`;

  const [bookmarkSrc, setBookmarkSrc] = React.useState(Bookmark);
  const [lectureProgresses, setLectureProgresses] = React.useState({});
  const [progressWidth, setProgressWidth] = React.useState(0);

  const useBookmarkFunction = useBookmark();

  React.useEffect(() => {
    setLecturesByChapterid(
      createLecturesMergedArray(props.videos || {}, props.videoThumb, id + "_")
    );
  }, [id, props.endPointValue, props.videoThumb, props.videos]);

  React.useEffect(() => {
    if (lecturesByChapterId.length > 0) {
      const lecture_progress_res = filterUserProgress(
        props.videoProgress,
        chapterId
      );
      setLectureProgresses(lecture_progress_res);
      const progressEntries = Object.values(lecture_progress_res);
      calculateProgressWidth(
        progressEntries.reduce((a, e) => a + e, 0),
        lecturesByChapterId.length
      );
    }
  }, [props.videoProgress, lecturesByChapterId.length, chapterId]);

  React.useEffect(() => {
    checkForBookmarks();
  });

  React.useEffect(() => {
    if (props.expand) setRotateVal("rotate-arrow");
    else setRotateVal("");
  }, [props.expand]);

  function calculateProgressWidth(totProgress, totEntries) {
    const totPercentage = (totProgress * 100) / totEntries;
    setProgressWidth(totPercentage);
  }

  function checkForBookmarks() {
    const bookmarks = useBookmarkFunction.bookmarks;

    const include = bookmarks.includes(id);
    setBookmarkSrc(() => {
      if (include) {
        return Bookmarked;
      } else {
        return Bookmark;
      }
    });
  }

  async function toggleBookmark(e) {
    e.stopPropagation();
    if (bookmarkSrc === Bookmark) {
      useBookmarkFunction.setbookmark(id, true, props.name);
    } else {
      useBookmarkFunction.setbookmark(id, false, props.name);
    }
    setBookmarkSrc((prev) => {
      if (Boolean(props.user)) {
        if (prev === Bookmark) {
          return Bookmarked;
        } else {
          return Bookmark;
        }
      } else {
        return Bookmark;
      }
    });
  }

  function rotateArrow() {
    props.setExpand(props.number, chapterRef);
    setRotateVal((prev) => {
      if (prev === "rotate-arrow") {
        return "";
      } else {
        return "rotate-arrow";
      }
    });
  }

  return (
    <section
      className="chapter-video-section"
      ref={chapterRef}
      id={`chapter-section-${props.number}`}
    >
      <Accordion
        expanded={props.expand}
        TransitionProps={{ unmountOnExit: true }}
        classes={accordianStyles}
      >
        <AccordionSummary
          classes={{
            root: accordianSummarystyles.root,
            content: accordianSummarystyles.content,
            expanded: accordianSummarystyles.expanded,
          }}
        >
          <section className="chapter-section" onClick={rotateArrow}>
            <div className="chapter-container">
              <div
                className="arrow-img"
                style={{ transform: `rotate(${rotateVal})` }}
                id={rotateVal}
              >
                <KeyboardArrowDown />
              </div>
              <div className="mobile-chapter-number">
                <p>{props.number}</p>
              </div>
              <Link
                to={() =>
                  lecturesByChapterId.length !== 0 &&
                  getEndpointForId(
                    lecturesByChapterId[0].id,
                    props.courseName,
                    props.name,
                    lecturesByChapterId[0].vid_title
                  )
                }
              >
                <div className="chapter-thumbnail">
                  <img src={props.img} alt={props.name}></img>
                  {!props.free && <NesoFuel className="fuel-img" />}
                  <div className="video-count">
                    <span>
                       {lecturesByChapterId.length}
                    </span>
                    <img src={NumVid} alt="lecCount"></img>
                  </div>
                  {progressWidth > 0 && (
                    <div className="subject-progress-bar">
                      <div
                        id="subject-progress"
                        style={{ width: `${progressWidth}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
            <div className="chapter-wrapper">
              <div className="chapter-details">
                <p>Chapter {props.number}</p>
                <p>{props.name}</p>
                {props.subscription.isSubscribed ? (
                  <div id="subscribed-user-subject-page"></div>
                ) : (
                  <p>{props.free ? "Free" : "Neso Fuel"}</p>
                )}
                <div
                  className="arrow-img-mobile"
                  style={{ transform: `rotate(${rotateVal})` }}
                  id={rotateVal}
                >
                  <KeyboardArrowDown />
                </div>
                {(props.free || props.subscription.isSubscribed) && (
                  <div className="share-btn">
                    {bookmarkSrc === Bookmark ? (
                      <IconButton onClick={toggleBookmark}>
                        <BookmarkBorder />
                      </IconButton>
                    ) : (
                      <IconButton onClick={toggleBookmark}>
                        <BookmarkIcon color="primary" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        share({
                          url: getEndpointForId(
                            lecturesByChapterId[0].id,
                            props.courseName,
                            props.name,
                            lecturesByChapterId[0].vid_title
                          ),
                        });
                      }}
                    >
                      <ShareRounded />
                    </IconButton>
                  </div>
                )}
              </div>
              <div id="mobile-video-number">
                <p>{lecturesByChapterId.length} lectures</p>
              </div>
            </div>
            <div className="play-button">
              <Link
                to={() =>
                  lecturesByChapterId.length !== 0 &&
                  getEndpointForId(
                    lecturesByChapterId[0].id,
                    props.courseName,
                    props.name,
                    lecturesByChapterId[0].vid_title
                  )
                }
              >
                <IOButton />
              </Link>
            </div>
          </section>
        </AccordionSummary>
        {/* {rotateVal === "rotate-arrow" && ( */}
        <AccordionDetails classes={accordianDetail}>
          <Videos
            courseName={props.courseName}
            chapName={props.name}
            user={props.user}
            subscription={props.subscription}
            lectureProgresses={lectureProgresses}
            free={props.free}
            endPointValue={props.endPointValue}
            videos={lecturesByChapterId}
            chapterId={props.number}
          />
        </AccordionDetails>
        {/* )} */}
      </Accordion>
    </section>
  );
}

export default Chapter;
