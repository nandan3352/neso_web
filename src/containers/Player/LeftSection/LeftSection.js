import React, { useState } from "react";
import SmallThumbnail from "../../../components/UI/SmallThumbnail/SmallThumbnail";
import { SingleSmallLineAnimation } from "../Loaders/Loaders";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./LeftSection.css";
import { useVideosStartEnd } from "../../../Services/Database";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import MoreOverlay from "../../../components/UI/SubjectPage/VideoMore/MoreOverlay";
import {
  getEndpointForId,
  getIdCompsFromId,
  getImgUrl,
} from "../../../Services/Utils";
import AdsContainer, {
  AD_VARIENT_SQUARE,
} from "../../../components/UI/Ads/AdsContainer";
import { useSubscriptionListener } from "../../../Services/Subscription";

const LeftSection = ({ videos, id, chapter, nextChapter, scrollingParent, courseName }) => {
  const { courseId, chapterId } = getIdCompsFromId(id);
  const lec_ids = Object.keys(videos || {});
  const currentLectureNo = !videos ? "" : lec_ids.indexOf(id) + 1;
  const [more, setMore] = useState(null);
  const subscription = useSubscriptionListener();

  const thumbs = useVideosStartEnd(
    `LectureThumbnails`,
    courseId + "_" + chapterId + "_01",
    courseId + "_" + chapterId + "_99"
  ).data;

  const handleMore = (id, url, name) => {
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMore({ target: event.target, id: id, url: url, name: name });
    };
  };

  const renderVideos = (videos) => {
    const currentVideoIndex = Object.keys(videos).indexOf(id);
    //console.log("pp", Object.entries(props.videos));
    return Object.entries(videos).map(([key, videoId], index) => {
      let video = videos[key];
      let thumbnailId = "";
      if (thumbs !== null && thumbs !== undefined) {
        thumbnailId = thumbs[key];
      }
      return (
        <>
          <div>
            {chapter !== null ? (
              <SmallThumbnail
                selected={id === key}
                key={index}
                scrollingParent={scrollingParent}
                courseName={courseName}
                chapName={chapter.name}
                handleMore={handleMore(
                  key,
                  getEndpointForId(
                    key,
                    courseName,
                    chapter.name,
                    video.vid_title
                  ),
                  video.vid_title
                )}
                img={getImgUrl(thumbnailId)}
                title={video.vid_title}
                videoId={key}
                width="10"
                duration={video.dur}
                paid={chapter.cost !== 0 ? true : false}
              />
            ) : (
              <p>Loading</p>
            )}
          </div>
          {(index === currentVideoIndex || index === currentVideoIndex + 4) && (
            <AdsContainer
              rootStyle={{ maxWidth: 336 }}
              path="player"
              hide={subscription.isSubscribed}
              varient={AD_VARIENT_SQUARE}
            />
          )}
        </>
      );
    });
  };

  const renderLoading = () => {
    return (
      <div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <div className="SmallThumbnail">
          <div className="img">
            <Skeleton variant="rect" width={176} height={99} />
          </div>
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
        <Skeleton width={376} height={100} />
      </div>
    );
  };

  return (
    <>
      <div className="chapter-info-panel">
        <div className="Chapter-Num">
          Chapter {chapterId} • {currentLectureNo}/
          {videos ? Object.keys(videos || {}).length : ""}
        </div>
        <div className="Chapter-Name">
          {chapter !== null ? chapter.name : <SingleSmallLineAnimation />}
        </div>
        <div className="Horizontal-Line" />
      </div>

      <div>
        <MoreOverlay
          url={more ? more.url : null}
          close={() => setMore(null)}
          anchorEl={more ? more.target : null}
          id={more ? more.id : null}
          open={Boolean(more)}
          name={more ? more.name : null}
        />
        {videos !== null ? renderVideos(videos) : renderLoading()}

        {nextChapter !== undefined ? (
          <Link
            to={
              nextChapter === null
                ? "/"
                : getEndpointForId(
                    nextChapter.additional.firstVideo.id,
                    courseName,
                    nextChapter.name,
                    nextChapter.additional &&
                    nextChapter.additional.firstVideoName
                  )
            }
          >
            <div className="Next-Container">
              <div className="Sec1">
                <div className="Next-Num">
                  Next:{" "}
                  {nextChapter
                    ? `Chapter ${parseInt(chapterId) + 1}`
                    : ""}
                </div>
                <div className="Next-Name">
                  {nextChapter ? nextChapter.name : "Home"}
                </div>
              </div>
              <div className="Arrow">
                <ArrowForwardIosIcon />
              </div>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default LeftSection;
