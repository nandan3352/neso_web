import React, { useState, useEffect, useRef } from "react";
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import "./LatestSection.css";
import debounce from "lodash/debounce";
import GeneralContentCard from "../../../components/UI/LatestItemCard/LatestItemCard";
import { fetchData, useDatabase } from "../../../Services/Database";
import {
  getEndpointForId,
} from "../../../Services/Utils";
import MoreOverlay from "../../../components/UI/SubjectPage/VideoMore/MoreOverlay";

const useStyles = makeStyles((theme) => {
  return {
    latestSectionHeader: {
      ...theme.typography.h6,
      textAlign: "left",
      paddingTop: theme.spacing(4),
      paddingBottom: 22,

      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(1),
        paddingBottom: 6,
        marginLeft: 0,
      },

      [theme.breakpoints.down("xs")]: {
        ...theme.typography.subtitle2,
        paddingBottom: 8,
      },
    },
    desktopScrollIcon: {
      borderRadius: "50%",
      height: 36,
      width: 36,
      position: "absolute",
      display: "flex",
      zIndex: 10,
      marginLeft: -18,
      top: "calc(50% - 48px - 18px)",
      alignSelf: "flex-start",
      background: theme.palette.background.surface,
      boxShadow: "0px 0px 7px 4px rgba(0, 0, 0, 0.06)",
      "&:hover": {
        backgroundColor: theme.palette.background.paper,
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
        top: "calc(50% - 32px - 18px)",
      },
    },
    rightIcon: {
      right: 0,
      marginRight: -14,
    },
    scrollableContainer: {
      display: "flex",
      position: "relative",
      paddingBottom: 48,
      [theme.breakpoints.down("sm")]: {
        paddingBottom: 32,
      },
    },
    latestItemList: {
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      display: "grid",
      position: "relative",
      zindex: 2,
      overflowX: "scroll",
      overflowY: "hidden",
      scrollBehavior: "smooth",
      marginLeft: "-8px",
      scrollbarWidth: "none",
      gridTemplateColumns: `repeat(var(--items-count, 8), 290px)`,
      /* gridTemplateColumns: `repeat(var(--items-count, 8), calc(100% / 4))`,
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: `repeat(var(--items-count, 8), calc(100% / 2.4))`,
      },

      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: `repeat(var(--items-count, 8), calc(100% / 1.3))`,
      }, */
    },
    latestItem: {},
    progress: {
      position: "absolute",
      right: "50%",
      justifySelf: "center",
      alignSelf: "center",
    },
  };
});

const LatestSection = (props) => {
  const latestItemsIds = useDatabase("Latest/lectures").data;

  const [more, setMore] = useState(null);
  const [latestItemsdata, setLatestItemData] = useState(undefined);

  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: false,
  });

  const classes = useStyles();

  const scrollableContainerRef = useRef();

  //TODO: use firebase custom Hooks
  useEffect(() => {
    if (!latestItemsIds || scrollableContainerRef.current === null) return;

    const updateScroll = (initial = false) => {

      if (!scrollableContainerRef.current) {
        return
      }

      const {
        scrollWidth,
        clientWidth,
        scrollLeft,
      } = scrollableContainerRef.current;

      setScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: initial || scrollLeft !== scrollWidth - clientWidth,
        hasOverflow: scrollWidth > clientWidth,
      });
    };

    const scrollListen = debounce(() => updateScroll(), 200);

    //latestItemsIds are sorted ascending by timestamp in db.
    fetchData(Object.values(latestItemsIds).reverse()).then((data) => {
      setLatestItemData(data);
      updateScroll(true);
    });

    scrollableContainerRef.current.addEventListener("scroll", scrollListen);

    const currentRef = scrollableContainerRef.current;

    return () => {
      currentRef.removeEventListener("scroll", scrollListen);
    };
  }, [latestItemsIds]);

  function scrollContainerBy(distance) {
    scrollableContainerRef.current.scrollLeft += distance + 100;
  }


  const handleMore = (id, url, name) => {
    return (event) => {
      event.preventDefault()
      event.stopPropagation();
      setMore({ target: event.target, id: id, url: url, name: name });
    };
  };

  const scrollIndicator = (isLeft) => {
    const distance = 1200;
    const visible =
      (isLeft && scrollState.canScrollLeft) ||
      (!isLeft && scrollState.canScrollRight);
    return (
      <IconButton
        style={{ display: visible ? "" : "none" }}
        onClick={() =>
          scrollContainerBy(isLeft ? -(distance + 200) : distance + 100)
        }
        className={[
          classes.desktopScrollIcon,
          isLeft ? "" : classes.rightIcon,
        ].join(" ")}
      >
        {isLeft ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    );
  };

  const latestItemsArray = latestItemsdata
    ? Object.entries(latestItemsdata)
    : null;

  if (latestItemsArray) {
    scrollableContainerRef.current.style.setProperty(
      "--items-count",
      latestItemsArray.length
    );
  }

  return (
    <Container>
      <div className={classes.latestSectionHeader}>Latest</div>
      <div className={classes.scrollableContainer}>
        {scrollIndicator(true, classes)}
        <div style={{ overflow: "hidden" }}>
          <div ref={scrollableContainerRef} className={classes.latestItemList}>
            <MoreOverlay
              close={() => setMore(null)}
              anchorEl={more ? more.target : null}
              id={more ? more.id : null}
              url={more ? more.url : null}
              name={more ? more.name : null}
              open={Boolean(more)}
            />
            {latestItemsArray ? (
              latestItemsArray.map(([key, value], index) => {
                return (
                  <div key={key} className={classes.latestItem}>
                    <GeneralContentCard
                      i={index}
                      id={key}
                      isPaid={value.isPaid}
                      handleMore={handleMore(key, getEndpointForId(key, value.additional.courseName, value.dur ? value.chapName : value.name, value.dur ? value.vid_title : value.additional.firstVideoName), value.name ? value.name : value.vid_title)}
                      playlistCount={value.lec_count}
                      duration={value.dur}
                      thumb={value.img}
                      chapName={value.chapName}
                      {...value.additional}
                      title={value.name ? value.name : value.vid_title}
                    />
                  </div>
                );
              })
            ) : (
              <CircularProgress className={classes.progress} />
            )}
          </div>
        </div>
        {scrollIndicator(false, classes)}
      </div>
    </Container>
  );
};

export default LatestSection;
