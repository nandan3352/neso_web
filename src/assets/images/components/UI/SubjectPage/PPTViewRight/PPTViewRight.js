import React from "react";
import "./PPTViewRight.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { useBookmark, useIsCompleted } from "../../../../Services/Utils";
import { useNavigate } from "react-router-dom";
import PageNumberTracker from "../PageNumberTracker/PageNumberTracker";
import HomeRounded from "@material-ui/icons/HomeRounded";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Container from "@material-ui/core/Container";
import PPTLoading from "../PPTLoading/PPTLoading";
import PPTLoadingDumb from "../PPTLoading/PPTLoadingDumb";
import {
  IconButton,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import { Link } from "react-router-dom";
import { useSubscriptionListener } from "../../../../Services/Subscription";
import { useEventDispatch, SnackbarEvent } from "../../../../Services/Events";
import { navigate } from "react-router-dom";
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../Ads/AdsContainer";
// import "firebase/storage";
import MarkComplete from "./MarkCompleteIcon";
import ChapterDropDown from "./ChapterDropDown";

function PPTViewRight(props) {
  function getChapterId(id) {
    let tmp = id.slice(id.length - 2);
    if (tmp[0] == "_") {
      tmp = tmp.slice(1);
    }
    return tmp;
  }
  const history = useNavigate();
  const dispatchSnackBar = useEventDispatch(SnackbarEvent);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const id = `${props.endPointValue}_p`;
  const chapterid = parseInt(getChapterId(props.endPointValue));
  const subscription = useSubscriptionListener();
  getChapterId(props.endPointValue);

  const [iobserver, setIobserver] = React.useState(null);
  const [pages, setPages] = React.useState(0);
  const [pagesArr, setPagesArr] = React.useState([]);
  const [pdfRendered, setPdfRendered] = React.useState(false);
  const [pdfScale, setPdfScale] = React.useState(1.0);
  const [pdfPageWidth, setPdfPageWidth] = React.useState(72);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [bookmarkSrc, setBookmarkSrc] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [hideCrumbs, setHideCrumbs] = React.useState(false);
  const [canPan, setCanPan] = React.useState(false);
  const [pageLimit, setPageLimit] = React.useState(10);
  const outerContainer = React.useRef();
  const canvasRef = React.useRef(null);
  const scaleLimit = React.useRef({ max: 2, min: 0.75 });

  const useBookmarkFunction = useBookmark();
  const completed = useIsCompleted(`${props.endPointValue}_p`);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  let pageRefs;
  let previousScrollValue;
  // let currentZoomLevel = React.useRef(1)
  let pptsArr = getPptArr();

  function getPptArr() {
    let ordered = [];
    if (props.ppts) {
      ordered = Object.keys(props.ppts)
        .sort((a, b) => parseInt(getChapterId(a)) - parseInt(getChapterId(b)))
        .map((element) => props.ppts[element]);
    }
    return ordered;
  }

  React.useEffect(() => {
    setPdfPageWidth(newSetStyle());
    // findScaleLimits();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handlePptScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handlePptScroll);
      window.removeEventListener("scroll", handlePptScroll);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handlePptScroll);
    return () => {
      window.removeEventListener("scroll", handlePptScroll);
    };
  });

  React.useEffect(() => {
    setBookmarkSrc(useBookmarkFunction.bookmarks.includes(id));
  }, [useBookmarkFunction.bookmarks, props.endPointValue]);

  React.useEffect(() => {
    setIsComplete(completed.isComplete);
  }, [completed.isComplete, props.endPointValue]);

  // React.useEffect(() => {
  //   findScaleLimits()
  // }, [pdfRendered])

  //page refs
  React.useEffect(() => {
    if (pages <= 0) {
      return;
    }

    const options = {
      threshold: [0.75],
    };

    const callback = (e, o) => {
      const intersectedPages = e.filter((p) => p.isIntersecting);
      const visiblePages = intersectedPages.map((e) => e.target.id);
      const bestMiddleElement = visiblePages[0]; //Math.floor(visiblePages.length / 2)]
      if (bestMiddleElement) setCurrentPage(bestMiddleElement);
      if (bestMiddleElement && Number(bestMiddleElement) > pageLimit - 3) {
        console.log("change page limit");
        setPageLimit((i) => i + 10);
      }
      if (bestMiddleElement + "" === pages + "" && !isComplete) {
        completed.setComplete();
      }
    };

    const iObserver = new IntersectionObserver(callback, options);

    setIobserver(iObserver);

    return () => {
      iObserver.disconnect();
    };
  }, [pages]);

  React.useEffect(() => {
    let pdfDoc = document.querySelector(".pdf-document");
    if (
      pdfDoc.offsetWidth >= outerContainer.current.offsetWidth &&
      !pdfDoc.classList.contains("change-cursor")
    ) {
      pdfDoc.classList.add("change-cursor");
      setCanPan(true);
    } else if (pdfDoc.offsetWidth < outerContainer.current.offsetWidth) {
      setCanPan(false);
      pdfDoc.classList.remove("change-cursor");
    }
  }, [pdfScale]);

  function handlePptScroll(e) {
    let yOffset = window.pageYOffset || document.documentElement.scrollTop;

    if (yOffset > previousScrollValue) {
      if (!hideCrumbs) {
        setHideCrumbs(true);
      }
    } else if (yOffset < previousScrollValue) {
      if (hideCrumbs) setHideCrumbs(false);
    }
    previousScrollValue = yOffset;
  }

  const findScaleLimits = () => {
    // let elWidth = document.querySelector(".pdf-document").offsetWidth;
    if (window.screen.width > 768) {
      let elWidth = pdfPageWidth;
      let screenWidth = 0.8 * window.screen.width;
      scaleLimit.current = { max: 1 + elWidth / screenWidth, min: 0.5 };
    } else {
      scaleLimit.current = { max: 1.45, min: 0.5 };
    }
  };

  function handleInputPageChange(value) {
    if (value <= pages && 1 <= value && pageRefs) {
      if (value < pageRefs.length) {
        pageRefs[value].scrollIntoView({ block: "center" });
      } else {
        setPageLimit(pages);
        setTimeout(() => {
          if (pageRefs[value]) {
            pageRefs[value].scrollIntoView({ block: "center" });
          }
        }, 600);
      }
    }
  }

  const handleChapterChange = (event, index) => {
    if (chapterid - 1 !== index)
      if (!pptsArr[index].paid || subscription.isSubscribed) {
        setPdfRendered(false);
        history.push(
          `/${props.sub_id}/${props.course_id}/ppts/${
            index + 1 < 10 ? "0" + (index + 1).toString() : index + 1
          }-${pptsArr[index].name.toLowerCase().replace(/\s/g, "")}`
        );
      } else {
        dispatchSnackBar({
          open: true,
          msg: "Get fuel to access the entire Neso library",
          button: { nav: "/fuel", text: "Get fuel" },
        });
      }
  };

  function newSetStyle() {
    let w = window.innerWidth;
    if (w < 800) {
      return w - 30;
    } else {
      return 720;
    }
  }

  function handleResize() {
    setPdfPageWidth((prev) => {
      if (window.innerWidth < 768) {
        return newSetStyle();
      } else {
        return prev;
      }
    });
  }

  function onLoadSuccess(param) {
    setPages(param.numPages);
    const numArr = [];
    for (let num = 1; num <= param.numPages; num++) {
      numArr.push(num);
    }
    setPagesArr(numArr);
    setPdfRendered(true);
    document.querySelector(".ppt-view-pdf").style.marginTop = "144px";
    // findScaleLimits()
  }

  function handleZoominIcon() {
    // let elementWidth = document.querySelector(".pdf-document").offsetWidth;
    setPdfScale((prev) => {
      return prev + 0.15 > scaleLimit.current.max
        ? scaleLimit.current.max
        : prev + 0.15;
    });

    // IDEA: For faster Zoom in and out: using the scale or zoom, problem: scale relative to each page so pages overlap
    /*
        setZoom(true)
        if (pdfPages.length === 0) {
            pdfPages = document.querySelectorAll(".pdf-page")
        }

        currentZoomLevel.current = currentZoomLevel.current + 0.15
        for (let el of pdfPages) {
            el.style.transform = `scale(${currentZoomLevel.current})`
        }

        currentZoomLevel.current = currentZoomLevel.current + 0.15
        document.querySelector(".pdf-document").style.transform = `scale(${currentZoomLevel.current})`
        */
  }

  function handleZoomoutIcon() {
    setPdfScale((prev) => {
      if (prev - 0.15 < scaleLimit.current.min) {
        return scaleLimit.current.min;
      } else {
        return prev - 0.15;
      }
    });

    // setZoom(false)
    // if (pdfPages.length === 0) {
    //     pdfPages = document.querySelectorAll(".pdf-page")
    // }
    // currentZoomLevel.current = currentZoomLevel.current - 0.15
    // for (let el of pdfPages) {
    //     el.style.transform = `scale(${currentZoomLevel.current})`
    // }
  }

  const referenceUpdate = (element) => (ref) => {
    if (!ref) return;
    if (pageRefs) pageRefs[element] = ref;
    else pageRefs = { [element]: ref };
    if (iobserver) iobserver.observe(ref);
  };

  async function toggleBookmark() {
    if (
      await useBookmarkFunction.setbookmark(
        id,
        !bookmarkSrc,
        props.PPTData.name
      )
    ) {
      setBookmarkSrc(!bookmarkSrc);
    }
  }

  return !subscription.isSubscribed &&
    !subscription.loading &&
    props.PPT.paid ? (
    <navigate to="/fuel" />
  ) : (
    <section section className="ppt-view-right">
      <section className="ppt-view-header">
        <Container fluid maxWidth="lg">
          <Collapse in={!hideCrumbs} style={{ maxHeight: "60px" }}>
            <div className="header-path" id="pptview-section-header">
              <Link to="/">
                <IconButton>
                  <HomeRounded />
                </IconButton>
              </Link>
              <KeyboardArrowRight id="arrow-one" />
              <Link to={`/home/${props.subjectLink}`}>
                <span id="first-span">{props.subjectLink}</span>
              </Link>
              <KeyboardArrowRight id="arrow-two" />
              <span>{props.PPTData.name} (PPT)</span>
            </div>
          </Collapse>
          <div className="ppt-view-details">
            <ChapterDropDown
              handleChapterChange={handleChapterChange}
              chapterid={chapterid}
              pptsArr={pptsArr}
            />
            <div className="ppt-page-tracker2">
              {pdfRendered && (
                <PageNumberTracker
                  pages={pages}
                  currentPage={currentPage}
                  handleInputPageChange={handleInputPageChange}
                />
              )}
            </div>
            <div className="ppt-icons">
              <IconButton
                className="ppt-zoom-in"
                onClick={handleZoominIcon}
                disabled={pdfScale == scaleLimit.current.max}
              >
                <ZoomInIcon />
              </IconButton>
              <IconButton
                className="ppt-zoom-out"
                onClick={(event) => {
                  //resetTransform();
                  handleZoomoutIcon();
                }}
                disabled={pdfScale == scaleLimit.current.min}
              >
                <ZoomOutIcon />
              </IconButton>
              <div className="ppt-mark-complete">
                <MarkComplete isComplete={isComplete} />
              </div>
              <IconButton className="ppt-bookmark" onClick={toggleBookmark}>
                <SvgIcon>
                  {bookmarkSrc ? (
                    <BookmarkIcon color="primary" />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </SvgIcon>
              </IconButton>
            </div>
          </div>
          <div className="ppt-page-tracker">
            {pdfRendered && (
              <PageNumberTracker
                pages={pages}
                currentPage={currentPage}
                handleInputPageChange={handleInputPageChange}
              />
            )}
          </div>
        </Container>
      </section>
      <section className="ppt-view-pdf">
        {!pdfRendered && (
          <Container>
            <PPTLoading></PPTLoading>
          </Container>
        )}
        <div className="outer-container" ref={outerContainer}>
          <Document
            file={props.PPT}
            onLoadSuccess={onLoadSuccess}
            loading=""
            className="pdf-document"
          >
            {iobserver &&
              pagesArr.slice(0, pageLimit).map((element, i) => {
                return (
                  <div
                    ref={referenceUpdate(element)}
                    className="pdf-page"
                    id={element}
                    key={element}
                  >
                    {i % 2 === 0 && i < 8 && (
                      <AdsContainer
                        path="ppt"
                        hide={subscription.isSubscribed}
                        varient={AD_VARIENT_BANNER_MINI}
                      />
                    )}
                    <Page
                      ref={canvasRef}
                      className="pdf-canvas"
                      pageNumber={element}
                      scale={pdfScale}
                      width={pdfPageWidth}
                      loading={PPTLoadingDumb}
                    />
                  </div>
                );
              })}
          </Document>
        </div>
      </section>
    </section>
  );
}

export default PPTViewRight;

/** <TransformWrapper
      id="pdf-documnet-wrapper"
      wheel={{ disabled: true }}
      pan={{ disabled: !canPan }}
      options={{
        disabled: isMobile,
        limitToBounds: true,
        centerContent: !canPan ? true : false,
      }}
      doubleClick={{ mode: "reset" }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        
      )}
    </TransformWrapper> */
