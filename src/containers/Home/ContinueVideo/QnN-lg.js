import React, { useRef } from "react";
import "./QnN-lg.css";
import "./QnN-md.css";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import QNP from "../../../components/UI/QNP/QNP";
import { databaseOnValue, fetchData } from "../../../Services/Database";
import { useState, useEffect } from "react";
import {
  getEndpointForId,
  useQuizDispatchStates,
} from "../../../Services/Utils";
import QuizStartDialog from "../../Quiz/QuizStartPage/QuizStartDialog";
import { IconButton } from "@material-ui/core";
import MoreOverlay from "../../../components/UI/SubjectPage/VideoMore/MoreOverlay";

const QnNLg = (props) => {
  const [qnp, setQnp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [more, setMore] = useState(null);
  const {
    userRecordFetchCompleteCallback,
    choosedQuizIndex,
    handleQuizChoosed,
    fetchingUserRecordIndex,
  } = useQuizDispatchStates();
  const scrollref = useRef(null);

  const handleMore = (id, url, name) => {
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMore({ target: event.target, id: id, url: url, name: name });
    };
  };
  useEffect(() => {
    if (!qnp) {
      return databaseOnValue("Latest/others", async (snapshot) => {
        if (!snapshot) return;

        const qnpList = snapshot.val();
        fetchData(
          Object.entries(qnpList)
            .sort(([i, _], [j, __]) => j - i)
            .map(([_, v]) => v)
        ).then((res) => {
          setQnp(Object.values(res));
        });
      });
    }
  }, []);

  useEffect(() => {
    const listenCurrentPage = (e) => {
      if (!scrollref.current) return;
      const newPage =
        Math.round(
          scrollref.current.scrollLeft / (scrollref.current.scrollWidth / 2)
        ) + 1;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    };

    let ref = scrollref.current;
    if (scrollref.current) {
      scrollref.current.addEventListener("scroll", listenCurrentPage, {
        passive: true,
      });
    }
    return () => {
      try {
        ref.removeEventListener("scroll", listenCurrentPage);
      } catch (e) {}
    };
  }, [currentPage]);

  const scroll = (dir) => (e) => {
    setCurrentPage((i) => i + dir);
    if (!scrollref.current) return;
    scrollref.current.scrollBy({
      left: dir > 0 ? 300 : -300,
      behavior: "smooth",
    });
  };

  const getDisabled = (dir) => {
    const noOfPage = (qnp && qnp.length / 4) || 1;
    if (dir === "l") {
      return currentPage === 1;
    } else {
      return noOfPage < currentPage;
    }
  };

  const renderQNP = () => {
    return qnp
      ? qnp.map((item, i) => {
          return (
            <QNP
              handleMore={handleMore(
                item.id,
                getEndpointForId(
                  item.id,
                  item.additional.courseName,
                  item.name,
                  item.name
                ),
                item.name
              )}
              canAccess={!item.paid || props.isSubscribed}
              showLoader={fetchingUserRecordIndex === i}
              onClick={item.id.includes("q") ? handleQuizChoosed(i) : undefined}
              id={item.id}
              title={item.name}
              nopages={""}
              {...item.additional}
            />
          );
        })
      : "";
  };

  const filterQuiz = (id) => {
    const comps = id.split("_");
    return comps[0] + "_" + comps[1];
  };

  return (
    <div className="qnn-main">
      <QuizStartDialog
        userRecordFetchCallback={userRecordFetchCompleteCallback}
        id={choosedQuizIndex !== -1 && filterQuiz(qnp[choosedQuizIndex].id)}
        level={1}
        open={choosedQuizIndex !== -1}
        handleClose={handleQuizChoosed(-1)}
        data={
          (choosedQuizIndex !== -1 && qnp[choosedQuizIndex]) || {
            tq: "",
            t: "",
          }
        }
      />
      <MoreOverlay
        close={() => setMore(null)}
        anchorEl={more ? more.target : null}
        id={more ? more.id : null}
        url={more ? more.url : null}
        name={more ? more.name : null}
        open={Boolean(more)}
      />
      <div className="qnn-title-row">
        <div className="qnn-title">Quizzes & Notes</div>
        <div className="qnn-title-grow" />
        <IconButton
          disabled={getDisabled("l")}
          className="qnn-arrow-left"
          onClick={scroll(-1)}
          style={{ padding: 0 }}
        >
          <KeyboardArrowLeft
            color={getDisabled("l") ? "disabled" : "inherit"}
          />
        </IconButton>
        <IconButton
          disabled={getDisabled("r")}
          className="qnn-arrow-right"
          onClick={scroll(1)}
          style={{ padding: 0 }}
        >
          <KeyboardArrowRight
            color={getDisabled("r") ? "disabled" : "inherit"}
          />
        </IconButton>
      </div>

      <div className="qnn-lower-section" ref={scrollref}>
        {renderQNP()}
      </div>
    </div>
  );
};

export default QnNLg;
