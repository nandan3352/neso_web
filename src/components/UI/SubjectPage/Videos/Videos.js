import React, { useState } from "react";
import Video from "../Video/Video";
import "./videos.css"
import MoreOverlay from "../VideoMore/MoreOverlay";


function Videos(props) {

  const [moreOverlay, setMoreOverlay] = useState({})

  function handleMoreOverlayClose(e) {
    if (e)
      e.stopPropagation();
    setMoreOverlay({});
  }

  function handleMoreoverlay(data) {
    setMoreOverlay(data);
  }


  return (
    <section className="videos-section" style={{ marginLeft: props.isLecturesOnlyCourse ? 0 : 67 }}>
      {props.videos.map((lecture, index) => (
        <Video
          isLecturesOnlyCourse={props.isLecturesOnlyCourse}
          handleMoreOverlay={handleMoreoverlay}
          lec_id={lecture.id}
          courseName={props.courseName}
          chapName={props.chapName}
          user={props.user}
          subscription={props.subscription}
          free={props.free}
          endPointValue={props.endPointValue}
          duration={lecture.dur}
          courseId={props.courseId}
          title={lecture.vid_title}
          chapterId={props.chapterId}
          number={index}
          videoThumbId={lecture.imgUrl}
          videoProgress={props.lectureProgresses[lecture.id]}
        />
      ))}
      <MoreOverlay name={moreOverlay.name} url={moreOverlay.url} anchorEl={moreOverlay.anchorEl} close={handleMoreOverlayClose} id={moreOverlay.id} />
    </section>
  );
}

export default Videos;
