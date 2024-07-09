import React, { useEffect, useRef, useState } from "react";
import {
  fetchData,
  fetchNextChapter,
  useDatabase,
  useVideosStartEnd,
} from "../../Services/Database";
import "./Player.css";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import Recommendation from "../Home/Recommendation/Recommendation";
import { useUser } from "../../Services/Auth";
import {
  getEndpointForId,
  useStreamLimit,
  getnavigateUrl,
  getIdsFromParams,
} from "../../Services/Utils";
import { Container, Hidden } from "@material-ui/core";
import { useSubscriptionListener } from "../../Services/Subscription";
import { useNavigate } from "react-router-dom";
import NoMatchPage from "../NoMatchPage/NoMatchPage";
import { navigate, useParams } from "react-router-dom/cjs/react-router-dom";

const Player = ({ match, location }) => {
  const history = useNavigate();
  const params = useParams();
  const { courseId, chapterId, contentId } = getIdsFromParams(params);
  const lecture_id = `${courseId}_${chapterId}_${contentId}`;
  const user = useUser();
  const lecture = useDatabase(`/Videos/${lecture_id}`);
  let navigateMap = useDatabase(courseId && `navigateMap/${courseId}`);
  const subject = useDatabase(`/Streams/${courseId.slice(0, 2)}`).data;
  const chapter = useDatabase(`/Chapters/${courseId}/${chapterId}`).data;
  const course = useDatabase(
    `/StreamCourses/${courseId.slice(0, 2)}/${courseId}`
  ).data;
  const videos = useVideosStartEnd(
    `/Videos`,
    courseId + "_" + chapterId + "_01",
    courseId + "_" + chapterId + "_99"
  ).data;
  const subscription = useSubscriptionListener();
  const streamLimit = useStreamLimit();

  /* const parseTitle = (title) => {
    return title.replace(/&/g, 'and').replace(/[^0-9a-zA-Z\s]/g, '').replace(/\s-?\s?/g, '-').toLowerCase()
  } */

  const leftScrollParent = useRef(null);

  const [nextChapter, setNextChapter] = useState(undefined);
  useEffect(() => {
    fetchNextChapter(`${courseId}_${chapterId}`).then((e) => {
      setNextChapter(e);
    });
  }, [chapterId,courseId]);

  const playNextVideo = () => {
    let  videoIds = Object.keys(videos)
    const currentvideoIdx = videoIds.indexOf(lecture_id) 
    if (currentvideoIdx + 1 < videoIds.length) {
      let nextVid = videoIds[currentvideoIdx+1]
      history.push(
        getEndpointForId(
          nextVid,
          course.name,
          chapter.name,
          videos[nextVid].vid_title
        )
      );
    } else if (nextChapter) {
      //pushing next chapter
      history.push(
        getEndpointForId(
          nextChapter.additional.firstVideo.id,
          course && course.name,
          nextChapter.name,
          nextChapter.additional.firstVideo.name
        )
      );
    } else if (course && course.type === "incomplete") {
      return "incomplete";
    } else {
      return true; // course ended
    }
  };

  const pad = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  };

  if (lecture.notFound) {
    if (!navigateMap.loading) {
      if (navigateMap.data) {
        return (
          <navigate
            to={getnavigateUrl(navigateMap.data, window.location.pathname)}
          />
        );
      }
      return <NoMatchPage />;
    }
  }

  return (
    <div className="Player">
      {/* {getVideos()} */}
      <div className="main">
        <div className="sections">
          <div className="Left-Section" ref={leftScrollParent}>
            <Hidden mdDown>
              <LeftSection
                nextChapter={nextChapter}
                scrollingParent={leftScrollParent.current}
                courseName={course && course.name}
                chapter={chapter}
                videos={videos}
                chapterId={chapterId}
                courseId={courseId}
                id={lecture_id}
              />
            </Hidden>
          </div>
          <div className="Vertical-Line" />
          <div className="Right-Section">
            <RightSection
              history={history}
              streamLimit={streamLimit}
              id={lecture_id}
              course={course}
              chapter={chapter}
              videos={videos}
              user={user}
              endPointValue={courseId}
              chapterId={chapterId}
              courseId={courseId}
              title={lecture_id}
              nextChapter={nextChapter}
              subject={subject}
              canAccess={subscription.isSubscribed}
              playNextVideo={playNextVideo}
              startAt={location.hash.substring(3)}
            />
          </div>
        </div>
      </div>

      <Container className="wrapper">
        {user ? (
          <div className="Suggestions">
            <Recommendation chapOnly />
          </div>
        ) : (
          <div />
        )}
      </Container>
    </div>
  );
};

export default Player;
