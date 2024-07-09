import React, { useState, useEffect } from "react";
import { CircularProgress, Hidden } from "@material-ui/core";
import LatestCard from "../../components/UI/LatestItemCard/LatestItemCard";
import SmallThumbnail from "../../components/UI/SmallThumbnail/SmallThumbnail";
import "./BookmarksHistory.css";
import {
  getEndpointForId,
  useBookmark,
  useQuizDispatchStates,
} from "../../Services/Utils";
import { databaseOnce, fetchData } from "../../Services/Database";
import MoreOverlay from "../../components/UI/SubjectPage/VideoMore/MoreOverlay";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import EmptyState from "./EmptyState/EmptyState";
import { useUser } from "../../Services/Auth";
import BookmarksLoader from "./BookmarksLoader";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QNP from '../../components/UI/QNP/QNP';
import QuizStartDialog from "../Quiz/QuizStartPage/QuizStartDialog";
import { useSubscriptionListener } from "../../Services/Subscription";
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../components/UI/Ads/AdsContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabBar: {
    top: 60,
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      top: 56
    }
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

//TODO : refactor this bookmark : (

const Bookmarks = (props) => {


  const bookmark = useBookmark();
  const subscription = useSubscriptionListener()

  const [empty, setEmpty] = useState(null);
  const [countState, setCountState] = useState({ lect_count: 0, other_count: 0 })
  const [expandArray, setExpand] = useState([]);
  const [fetchDone, setFetchDone] = useState(null);
  const [courseFetchDone, setCourseFetchDone] = useState(null);
  const [value, setValue] = React.useState(0);
  const { userRecordFetchCompleteCallback, choosedQuizIndex, handleQuizChoosed, fetchingUserRecordIndex } = useQuizDispatchStates()

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setEmpty(countState.lect_count === 0)
    } else {
      setEmpty(countState.other_count === 0)
    }
    setValue(newValue);
  };

  const classes = useStyles();

  let bookmarks = [];
  let dept = {
    cs: "Computer Science",
    ee: "Electrical",
    ec: "Electronics & Communication",
    ot: "Others",
  };

  let grouping = {};
  let courseNames = {};
  let sortedBookmarks = [];

  const user = useUser();

  useEffect(() => {
    document.title = "Bookmarks | Neso Academy";
    if (user === null || user.uid === null) {
      setEmpty(true);
      return () => { };
    }

    databaseOnce(`Users/${user.uid}/bookmarks`).then(async (snapshot) => {
      let ff = await snapshot.val();

      const bookmarksDB = ff;

      if (bookmarksDB !== null) {

        bookmarks = Object.values(bookmarksDB);
        sortedBookmarks = bookmarks.sort();

        let courseSplitedArray = [];

        for (let i = 0; i < sortedBookmarks.length; i++) {
          let data = sortedBookmarks[i];
          courseSplitedArray = [...courseSplitedArray, data.split("_")[0]];
        }

        let uniqueCourses = [...new Set(courseSplitedArray)];

        let courseLinks = [];

        for (let i = 0; i < uniqueCourses.length; i++) {
          grouping[uniqueCourses[i]] = [];
          courseLinks.push(
            dept[uniqueCourses[i].slice(0, 2)] + "/" + uniqueCourses[i]
          );
        }

        //Fetching Course Names
        fetchData(courseLinks).then((res) => {
          for (var key in res) {
            courseNames[key.split("/")[1]] = res[key].name;
          }
          setCourseFetchDone(courseNames);
        });

        //Fetching bookmarked item data
        fetchData(sortedBookmarks).then((res) => {

          let lect_count = 0
          let other_count = 0
          for (var key in res) {
            let courseSplit = key.split("_")[0];

            let data = res[key];
            if (!data) {
              continue
            }
            data["id"] = key;
            grouping[courseSplit] = [...grouping[courseSplit], data];
          }

          for (var courseId in grouping) {
            var lec = [];
            var others = [];
            for (var index in grouping[courseId]) {
              var key = grouping[courseId][index]["id"]
              if (key.includes("_q") || key.includes("_p") || key.includes("_n")) {
                others.push(grouping[courseId][index]);
              } else {
                lec.push(grouping[courseId][index]);
              }
            }
            lect_count += lec.length
            other_count += others.length
            var d = {
              "lectures": lec,
              "others": others
            }
            grouping[courseId] = d
          }

          setCountState({ lect_count, other_count })
          if (lect_count === 0 && value === 0) {
            setEmpty(true)
          }

          if (other_count === 0 && value === 1) {
            setEmpty(true)
          }
          setFetchDone(grouping);
        });

      } else {
        setEmpty(true);
      }
    })

  }, []);

  const removeBookmark = (id) => {
    const course = id.split('_')[0]
    setFetchDone(prev => {
      const newData = ({
        ...prev, [course]: { ...prev[course], lectures: prev[course].lectures.filter(p => p.id !== id), others: prev[course].others.filter(p => p.id !== id) }
      })

      if (newData[course].lectures.length === 0 && newData[course].others.length === 0)
        delete newData[course]

      if (Object.keys(newData).length === 0) {
        setEmpty(true)
        return null
      }

      return newData
    })

    if (['q', 'n', 'p'].includes(id.split('_')[2])) {
      setCountState(prev => {
        if (prev.other_count === 1 && value === 1) {
          setEmpty(true)
        }
        return ({ ...prev, other_count: --(prev.other_count) })
      })

    } else {
      setCountState(prev => {
        if (prev.lect_count === 1 && value === 0) {
          setEmpty(true)
        }
        return ({ ...prev, lect_count: --(prev.lect_count) })
      })

    }
  }

  const RenderBookmarksSmall = ({ tabName }) => {


    const [more, setMore] = useState(null)

    const handleMore = (id, url, name) => {
      return (event) => {
        event.preventDefault()
        event.stopPropagation();
        setMore({ target: event.currentTarget, id: id, url: url, name: name });
      };
    };

    if (empty) return <EmptyState page="bookmarks" />;


    return fetchDone && courseFetchDone
      ? (
        <>
          <MoreOverlay
            bookmarkRemoved={removeBookmark}
            bookmarks={bookmark.bookmarks}
            close={() => setMore(null)}
            anchorEl={more ? more.target : null}
            id={more ? more.id : null}
            name={more ? more.name : null}
            url={more ? more.url : null}
            open={Boolean(more)} />
          {Object.keys(fetchDone).map((course, ci) => {
            return fetchDone[course][tabName].length === 0 ? <></> : (
              <div className="bookmarks-content-container">
                <Hidden smUp>
                  {(ci / 4 < 4 && (ci % 2) === 0) && <AdsContainer path="bookmarks" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} />}
                </Hidden>

                <span className="bookmarks-subject-title">
                  {courseFetchDone[course]}
                </span>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto",
                  }}
                  className="bookmarks-subject-course-items"
                >
                  {fetchDone[course][tabName].map((data, i) => {
                    return <>{data.id.includes("_q") || data.id.includes("_p") || data.id.includes("_n") ? (
                      <QNP
                        {...data.additional}
                        handleMore={handleMore(data.id, getEndpointForId(data.id, data.additional.courseName, data.name, data.name), data.name)}
                        canAccess={!data.paid || subscription.isSubscribed}
                        showLoader={fetchingUserRecordIndex !== -1 && (fetchingUserRecordIndex.id === data.id)}
                        onClick={data.id.includes("_q") ? handleQuizChoosed(data) : undefined}
                        id={data.id}
                        title={data.name}
                        nopages={data.pages}
                      />
                    ) : (
                      <div>
                        <SmallThumbnail
                          videoId={data.id}
                          {...data.additional}
                          chapName={data.chapName}
                          handleMore={handleMore(data.id, getEndpointForId(data.id, data.additional.courseName, data.dur ? data.chapName : data.name, data.dur ? data.vid_title : data.additional.firstVideoName), data.name ? data.name : data.vid_title)}
                          img={data.img}
                          title={data.name ? data.name : data.vid_title}
                          duration={data.dur}
                        />
                      </div>
                    )}</>;
                  })}
                </div>
              </div>
            );
          })}
        </>
      )
      : "";
  };

  const RenderBookmarks = ({ tabName }) => {

    const [more, setMore] = useState(null)

    const handleMore = (id, url, name) => {
      return (event) => {
        event.preventDefault()
        event.stopPropagation();
        setMore({ target: event.currentTarget, id: id, url: url, name: name });
      };
    };

    if (empty) return <EmptyState page="bookmarks" />;

    const expandIndicator = (course, count) => {
      if (count > 4) {
        return (
          <>
            {!expandArray.includes(course) ? "Expand " : "Collapse "}
            {!expandArray.includes(course) ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            )}
          </>
        )
      }
      return ""
    }

    return fetchDone && courseFetchDone ? (
      <>
        <MoreOverlay
          bookmarkRemoved={removeBookmark}
          bookmarks={bookmark.bookmarks}
          close={() => setMore(null)}
          url={more ? more.url : null}
          name={more ? more.name : null}
          anchorEl={more ? more.target : null}
          id={more ? more.id : null}
          open={Boolean(more)} />
        {
          Object.keys(fetchDone).map((course, ci) => {
            return (
              <>
                {fetchDone[course][tabName].length !== 0 ? (
                  <>
                    <Hidden xsDown>
                      {(ci / 4 < 4 && (ci % 2) === 0) && <AdsContainer path="bookmarks" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} />}
                    </Hidden>
                    <div className="bookmarks-subject-title-container">
                      <span className="bookmarks-subject-title">
                        {courseFetchDone[course]}
                      </span>
                      <span onClick={handleExpand(course)} className="expand-btn">
                        {expandIndicator(course, fetchDone[course][tabName].length)}
                      </span>
                    </div>

                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: !expandArray.includes(course) ? "220px" : "10080px",
                        transition: "max-height 0.2s ease",
                      }}
                      className={tabName === "lectures" ? "bookmarks-subject-course-items" : "bookmarks-subject-others-items"} >
                      {fetchDone[course][tabName].map((data, i) => {
                        return (
                          <>
                            {data.id.includes("_q") || data.id.includes("_p") || data.id.includes("_n") ? (
                              <QNP
                                {...data.additional}
                                handleMore={handleMore(data.id, getEndpointForId(data.id, data.additional.courseName, data.name, data.name), data.name)}
                                canAccess={!data.paid || subscription.isSubscribed}
                                showLoader={fetchingUserRecordIndex !== -1 && (fetchingUserRecordIndex.id === data.id)}
                                onClick={data.id.includes("_q") ? handleQuizChoosed(data) : undefined}
                                id={data.id}
                                title={data.name}
                                nopages={data.pages}
                              />
                            ) : (
                              <div>
                                <LatestCard
                                  chapName={data.chapName}
                                  {...data.additional}
                                  isPaid={data.isPaid}
                                  handleMore={handleMore(data.id, getEndpointForId(data.id, data.additional.courseName, data.dur ? data.chapName : data.name, data.dur ? data.vid_title : data.additional.firstVideoName), data.name ? data.name : data.vid_title)}
                                  id={data.id}
                                  playlistCount={data.lec_count}
                                  duration={data.dur}
                                  thumb={data.img}
                                  title={data.name ? data.name : data.vid_title} />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>

                  </>
                ) : (
                  <>
                  </>
                )}
              </>
            );
          })
        }
      </>
    ) : (
      <BookmarksLoader />
    );
  };

  const handleExpand = (id) => {
    return () => {
      let updatedExpandArray = [...expandArray];
      if (updatedExpandArray.includes(id)) {
        updatedExpandArray.splice(expandArray.indexOf(id), 1);
      } else {
        updatedExpandArray.push(id);
      }
      setExpand(updatedExpandArray);
    };
  };

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

  const filterQuizId = (id) => {
    const splitted = id.split('_')
    return splitted[0] + '_' + splitted[1]
  }

  return (
    <div className="bookmarksHistory-main">
      <QuizStartDialog userRecordFetchCallback={userRecordFetchCompleteCallback} id={choosedQuizIndex !== -1 && filterQuizId(choosedQuizIndex.id)} level={1} open={choosedQuizIndex !== -1} handleClose={handleQuizChoosed(-1)} data={(choosedQuizIndex !== -1 && choosedQuizIndex) || { tq: '', t: '' }} />

      <div style={{ position: 'relative' }} className="bookmarksHistory-main-container">
        <p className="bookmarks-title">Bookmarks</p>
        { }
        <div className="tabs" style={{ marginTop: "16px" }}>
          <AppBar className={classes.tabBar} position="sticky">
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.root}
              TabIndicatorProps={{
                className: classes.indicator,
              }}
            >
              <Tab
                label="Lectures"
                classes={{
                  selected: classes.selected,
                  root: classes.tabsRoot,
                }}
              />
              <Tab
                label="Others"
                classes={{
                  selected: classes.selected,
                  root: classes.tabsRoot,
                }}
              />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <div className="hide-on-small">
              <div className="bookmarks-content-container">
                <RenderBookmarks tabName="lectures" />
              </div>
              {expandArray !== false ? (
                <div className="bookmarks-content-container">
                  { }
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="visible-on-small">
              <div className="bookmarks-content-container">
                <RenderBookmarksSmall tabName="lectures" />
                { }
              </div>
              { }
            </div>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="hide-on-small">
              <div className="bookmarks-content-container">
                <RenderBookmarks tabName="others" />
              </div>
              {expandArray !== false ? (
                <div className="bookmarks-content-container">
                  { }
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="visible-on-small">
              <div className="bookmarks-content-container">
                <RenderBookmarksSmall tabName="others" />
                { }
              </div>
              { }
            </div>
          </TabPanel>
        </div>


      </div>
    </div>
  );
};

export default Bookmarks;
