import React from "react";
import "./Chapters.css";
import ChaptersSection from "../ChaptersSection/ChaptersSection";
import EmptyPageHolder from "../EmptyPPTs/EmptyPPTs";

function Chapters(props) {
  let freeChapters = props.chapters.filter((element) => element.cost === 0);
  let paidChapters = props.chapters.filter((element) => element.cost !== 0);
  let chapter_count = freeChapters.length + paidChapters.length;

  const sectionProps = {
    totalChapterCount: chapter_count,
    paidChaptersLength: paidChapters.length,
    freeChaptersCount: freeChapters.length,
    courseName: props.courseName,
    endPointValue: props.endPointValue,
    videos: props.videos,
    videoThumb: props.videoThumb,
    bookmarks: props.bookmarks,
    videoProgress: props.videoProgress,
    subscription: props.subscription,
  };

  if (chapter_count === 0) {
    return <EmptyPageHolder name="Chapters" />;
  }

  return (
    <section className="right-chapters">
      <ChaptersSection
        chapters={freeChapters}
        {...sectionProps}
        isPaidSection={false}
      />
      {paidChapters.length > 0 && (
        <ChaptersSection
          chapters={paidChapters}
          {...sectionProps}
          isPaidSection={true}
        />
      )}
    </section>
  );
}

export default Chapters;
