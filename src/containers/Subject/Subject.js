import React, { useEffect, useState } from "react";
import {
  useConditionalFetch,
  useDatabase,
  useVideoDatabase,
} from "../../Services/Database";
import LeftSubject from "../../components/UI/SubjectPage/LeftSubject/LeftSubject";
import SubjectItemsList from "../../components/UI/SubjectPage/Subject/SubjectItemsList";
import SubjectLoading from "../../components/UI/SubjectPage/SubjectLoading/SubjectLoading";
import "./Subject.css";
import { navigate, useLocation, useParams } from "react-router-dom";
import {
  getEndpointForId,
  getnavigateUrl,
  getpaddedidForsubject,
  setCrawableDescription,
  setCrawlableContent,
  useBookmark,
} from "../../Services/Utils";
import { useSubscriptionListener } from "../../Services/Subscription";
import Recommendation from "../Home/Recommendation/Recommendation";
import { useUser } from "../../Services/Auth";
import { Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { COURSE_LAYOUT } from "../../lib/Enums";
import NoMatchPage from "../NoMatchPage/NoMatchPage";

//TODO: may be lazy load lectures, quizzes, PPTs.

function Subject({ match }) {
  let { course_id, sub_id, chapter_id } = useParams();
  let path = useLocation().pathname;
  let qcourse_id = getpaddedidForsubject(sub_id, course_id);
  let subscription = useSubscriptionListener();
  let bookmarks = useBookmark().bookmarks;
  let subjects = useDatabase(
    qcourse_id && `/Streams/${qcourse_id.slice(0, 2)}`
  );
  let courseSnap = useDatabase(
    qcourse_id && `/StreamCourses/${qcourse_id.slice(0, 2)}/${qcourse_id}`
  );
  let course = courseSnap.data;
  let navigateMap = useDatabase(qcourse_id && `navigateMap/${qcourse_id}`);
  let chapters = useDatabase(qcourse_id && `Chapters/${qcourse_id}`);
  let videos = useVideoDatabase(qcourse_id && "Videos", qcourse_id + "_");
  let videoThumbs = useVideoDatabase(
    qcourse_id && "LectureThumbnails",
    qcourse_id
  );
  let quizzes = useDatabase(qcourse_id && `QuizNames/${qcourse_id}`).data;
  let ppts = useVideoDatabase(qcourse_id && "PPTs", qcourse_id).data;
  let notes = useVideoDatabase(qcourse_id && "Notes", qcourse_id).data;
  let user = useUser();
  let videoProgressState = useVideoDatabase(
    qcourse_id && `Users/${user && user.uid}/progress`,
    qcourse_id,
    !user
  );
  let videoProgress = videoProgressState.data;
  const [preFetchedDescription, setPreFetchedDescription] = useState("");

  useEffect(() => {
    setCrawlableContent(
      `/StreamCourses/${qcourse_id.substring(0, 2)}/${qcourse_id}/description`
    ).then((content) => {
      setPreFetchedDescription(content);
    });
  }, [qcourse_id]);

  if (!qcourse_id) return <navigate to="/" />;

  if (
    courseSnap.loading ||
    chapters.loading ||
    subjects.loading ||
    navigateMap.loading ||   
    videos.loading ||
    videoThumbs.loading ||
    videoProgressState.loading
  ) {
    return (
      <SubjectLoading course={course_id} description={preFetchedDescription} />
    );
  }

  if (course == null) {
    if (navigateMap.data) {
      return <navigate to={getnavigateUrl(navigateMap.data, path)} />;
    }
    return <NoMatchPage />;
  }

  const parseProgress = (progress, { vc, cc, qc }) => {
    if (!progress) return;

    //TODO: refactor this algorithm and make it more appropriate.
    const completedContents = Object.entries(progress)
      .filter((p) => p[1] >= 1)
      .map((d) => d[0]);
    const completedChapters = Object.entries(progress).filter(
      (p) => p[0].split("_").length === 2
    );
    const lectureCountFromCompletedChapters = completedChapters.reduce(
      (a, p) => a + p[1],
      0
    );
    const completedChaptersKey = completedChapters.map((e) => e[0]);

    const lectures =
      lectureCountFromCompletedChapters +
      completedContents.reduce((acc, d) => {
        const comps = d.split("_");
        return !completedChaptersKey.includes(comps[0] + "_" + comps[1]) &&
          d.match(/_\d*_\d*$/i)
          ? ++acc
          : acc;
      }, 0);
    const quizzes = completedContents.reduce(
      (acc, d) => (d.match(/_q$/i) ? ++acc : acc),
      0
    );

    return {
      lectures: lectures / vc,
      chapters: completedChapters.length / cc,
      quizzes: quizzes / (qc || 1),
      lt: vc,
      ct: cc,
      qt: qc || 0,
    };
  };

  const firstVideo = Object.entries(videos.data || {})[0]

  return (
    <>
      {!course ? (
        ""
      ) : (
        <Helmet>
          <title>{course.name + " | Neso Academy"}</title>
          <meta name="description" content={course.description} />
        </Helmet>
      )}

      <section className="subject-page">
        <section className="subject-page-section">
          <section className="left-section">
            <LeftSubject
              userProgress={parseProgress(videoProgress, {
                cc: Object.keys(chapters.data || {}).length,
                qc: Object.keys(quizzes || {}).length,
                vc: Object.keys(videos.data || {}).length,
              })}
              subscription={subscription}
              course={course}
              lecturesCount={
                course.course_layout === COURSE_LAYOUT.LAYOUT_LECTURES_ONLY &&
                Object.keys(videos.data || {}).length
              }
              chapters={chapters.data || []}
              subjectLink={subjects.data}
              firstVideo={firstVideo && {
                id : firstVideo[0],
                name : firstVideo[1].vid_title
              }}             
              courseLink={course.name}            
            />
          </section>
          <section className="right-section">
            <SubjectItemsList
              path={path}
              qChapId={chapter_id}
              courseLayout={course.course_layout}
              courseName={course.name}
              subscription={subscription}
              course_id={qcourse_id}
              videosObj={videos.data}
              videoThumb={videoThumbs.data || {}}
              subjectLink={subjects.data}
              courseLink={course.name}
              chapters={chapters.data || []}
              quizzes={quizzes}
              ppts={ppts}
              notes={notes}
              bookmarks={bookmarks}
              videoProgress={videoProgress}
            />
          </section>
        </section>
        {user ? (
          <Container className="recommended-chapters-subject-page">
            <Recommendation chapOnly />
          </Container>
        ) : (
          <div />
        )}
      </section>
    </>
  );
}

export default Subject;
