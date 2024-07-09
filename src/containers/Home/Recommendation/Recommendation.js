import React, { useState, useEffect, useRef } from "react";
import "./Recommendation.css";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import {
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import debounce from "lodash/debounce";
import Box from "@material-ui/core/Box";
import { fetchData } from "../../../Services/Database";
import MoreOverlay from "../../../components/UI/SubjectPage/VideoMore/MoreOverlay";
import { cachedFetch, getEndpointForId } from "../../../Services/Utils";
import LatestCard from "../../../components/UI/LatestItemCard/LatestItemCard";
import RecommendationLoader from "./Loader/RecommendationLoader.js";
//TODO: make the horizontal scroll as separate component
const useStyles = makeStyles((theme) => {
  return {

    root: {
      width: '100%',
      marginTop: 32,
      display: "inline-block",
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        display: "block",
      }
    },

    recommendationHeader: {
      textAlign: "left",
      paddingTop: theme.spacing(0),
      paddingBottom: 32,

      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingBottom: 6,
        marginLeft: 0,
      },
    },
    desktopScrollIcon: {
      borderRadius: "50%",
      height: 36,
      width: 36,
      position: "absolute",
      display: "flex",
      zIndex: 10,
      marginLeft: 5,
      marginTop: 61,
      alignSelf: "flex-start",
      background: theme.palette.background.surface,
      boxShadow: "0px 0px 7px 4px rgba(0, 0, 0, 0.06)",
      "&:hover": {
        background: theme.palette.background.surface,
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    rightIcon: {
      right: "0px",
      marginRight: -5,
    },
    scrollableContainer: {
      display: "flex",
      position: "relative",
      marginLeft: "-20px",
    },
    recommendationItemsList: {
      minHeight: 200,
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      display: "grid",
      position: "relative",
      zindex: 2,
      width: "100%",
      //height: "240px",
      overflowX: "scroll",
      marginLeft: "10px",
      overflowY: "hidden",
      scrollBehavior: "smooth",
      scrollbarWidth: "none",
    },
    latestItem: {
      minWidth: 274,
    },

    progress: {
      position: "absolute",
      right: "50%",
      justifySelf: "center",
      alignSelf: "center",
    },
  };
});

//TODO: remove unused codes
const Recommendation = (props) => {
  const [lectures, setLectures] = useState(null);


  const [lectureScrollState, setLectureScrollState] = useState({
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: true,
  });


  const [more, setMore] = useState(null);

  const classes = useStyles();

  const scrollableContainerRef1 = useRef();

  function scrollContainerBy1(distance) {
    scrollableContainerRef1.current.scrollLeft += distance;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    cachedFetch(
      `https://us-central1-neso-c53c4.cloudfunctions.net/recommendations/uFOxNC2oQqYHTXjA6aSIME7ohgF3`
    )
      .then((res) => {
        res.json().then((lectures) => {
          const chaptersRaw = new Set(
            lectures.map((lecId) => {
              const comps = lecId.split("_");
              return comps[0] + "_" + comps[1];
            })
          );

          const chapters = [...chaptersRaw];

          let lecs = lectures.filter(p => !isNaN((p.split("_")[2]))).splice(0, 3);
          let chaplis = chapters.splice(0, 6 - lecs.length);

          let recommendedList = lecs.concat(chaplis);

          shuffleArray(recommendedList);

          fetchData(recommendedList.splice(0, 6)).then((res) => {
            setLectures(res);
          });
        });
      })
      .catch((e) => console.log(e));

    window.onbeforeunload = function () {
      sessionStorage.clear();
    };

    return () => { };
  }, []);

  //lecture

  useEffect(() => {
    const updateScroll = (initial = false) => {
      const {
        scrollWidth,
        clientWidth,
        scrollLeft,
      } = scrollableContainerRef1.current;

      setLectureScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: initial || scrollLeft !== scrollWidth - clientWidth,
        hasOverflow: scrollWidth > clientWidth,
      });
    };

    const scrollListen = debounce(() => updateScroll(), 200);

    scrollableContainerRef1.current.addEventListener("scroll", scrollListen);

    const currentRef = scrollableContainerRef1.current;

    return () => {
      currentRef.removeEventListener("scroll", scrollListen);
    };
  }, []);



  //TODO: refactor these

  const distance = 1200;

  const scrollIndicator1 = (isLeft) => {
    const visible =
      (isLeft && lectureScrollState.canScrollLeft) ||
      (!isLeft && lectureScrollState.canScrollRight);
    return (
      <IconButton
        style={{ display: visible ? "flex" : "none" }}
        onClick={() => scrollContainerBy1(isLeft ? -distance : distance)}
        className={[
          classes.desktopScrollIcon,
          isLeft ? "" : classes.rightIcon,
        ].join(" ")}
      >
        {isLeft ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    );
  };

  //event handlers

  const handleMore = (id, url, name) => {
    return (event) => {
      event.stopPropagation();
      event.preventDefault()
      setMore({ target: event.target, id: id, url: url, name: name });
    };
  };


  const lecturesArray = lectures
    ? Object.entries(JSON.parse(JSON.stringify(lectures)))
    : null;

  const renderRecommendedList = (lectures) => {
    return lectures ? (
      lectures.map(([key, data], i) =>
        key.split("_").length === 3 ? (
          <LatestCard
            i={i}
            id={key}
            isPaid={data.isPaid}
            handleMore={handleMore(key, getEndpointForId(key, data.additional.courseName, data.dur ? data.chapName : data.name, data.dur ? data.vid_title : data.additional.firstVideoName), data.vid_title)}
            duration={data.dur}
            thumb={data.img}
            title={data.vid_title}
            chapName={data.chapName}
            {...data.additional}
          />
        ) : (
          <LatestCard
            i={i}
            id={key}
            isPaid={data.isPaid}
            handleMore={handleMore(key, getEndpointForId(key, data.additional.courseName, data.dur ? data.chapName : data.name, data.dur ? data.vid_title : data.additional.firstVideoName), data.name)}
            playlistCount={data.lec_count}
            thumb={data.img}
            title={data.name}
            chapName={data.chapName}
            {...data.additional}
          />
        )
      )
    ) :  (<RecommendationLoader />
      //  <CircularProgress color='secondary' className={classes.progress} />
    );
  };


  const lectureLarge = (
    <>
      <div className={classes.recommendationHeader}>
        <Typography variant="h6">Recommendations</Typography>
      </div>
      <div className={classes.scrollableContainer}>
        {scrollIndicator1(true, classes)}
        <div
          ref={scrollableContainerRef1}
          style={{
            gridTemplateColumns: `repeat(${lecturesArray ? lecturesArray.length : 0
              }, calc(24.9%))`,
          }}
          className={classes.recommendationItemsList}
        >
          {renderRecommendedList(lecturesArray)}
        </div>
        {scrollIndicator1(false, classes)}
      </div>
    </>
  );

  const lectureSmall = (
    <>
      <p className="recommendation-title">Recommendations</p>
      <div className="first-div">
        <div className="grid-container-recommendation" id="con">
          {renderRecommendedList(lecturesArray)}
        </div>
      </div>
    </>
  );

  return (
    <div className={classes.root} >
      <MoreOverlay
        close={() => setMore(null)}
        anchorEl={more ? more.target : null}
        id={more ? more.id : null}
        url={more ? more.url : null}
        open={Boolean(more)}
        name={more ? more.name : null}
      />
      <Box className="hideonMdSm">
        <div style={{ margin: 0 }} className="grid-container-recommendation">
          {lectureLarge}
        </div>
      </Box>
      <Box className="hide-large">
        <div className="recommendation">
          <div>{lectureSmall}</div>
        </div>
      </Box>
    </div>
  );
};

export default Recommendation;
