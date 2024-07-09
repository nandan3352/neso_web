import React from "react";
import "./SubjectLoading.css";
import { Skeleton } from "@material-ui/lab";
import { firstCaps } from "../../../../Services/Utils";
import Helmet from "react-helmet";

function SubjectLoading(props) {
  function getTitleFromUrlId(course) {
    try {
      let title = course.split("-").slice(1);
      return title.map(firstCaps).join(" ");
    } catch (e) {
      return "";
    }
  }
  return (
    <section className="subject-loading-page">
      <Helmet>
        <title>{getTitleFromUrlId(props.course) + " | Neso Academy"}</title>
        <meta name="description" content={props.description} />
      </Helmet>
      <div className="subject-loading-left">
        <div className="subject-loading-left-section">
          <div className="loading-left-section-one">
            <Skeleton variant="rect" className="loading-thumbnail" />
            <div className="loading-name-des">
              <Skeleton variant="rect" className="loading-course-name" />
              <Skeleton variant="rect" className="loading-message" />
            </div>
            <Skeleton variant="rect" className="loading-start-btn" />
          </div>
          <div className="loading-left-section-two">
            <div className="loading-other">
              <Skeleton variant="rect" className="loading-detail" />
              <Skeleton variant="rect" className="loading-detail" />
              <Skeleton variant="rect" className="loading-detail" />
              <Skeleton variant="rect" className="loading-detail" />
              <Skeleton variant="rect" className="loading-detail" />
              <Skeleton variant="rect" className="loading-detail" />
            </div>
          </div>
          <div className="loading-left-section-three">
            <Skeleton variant="rect" className="loading-description" />
            <Skeleton variant="rect" className="loading-chapter-names" />
          </div>
        </div>
      </div>
      <div className="subject-loading-right">
        <div className="loading-right-header">
          <div style={{ position: "absolute", opacity: 0 }}>
            {props.description}
          </div>
          <Skeleton
            style={{ margin: 0 }}
            variant="rect"
            className="loading-description"
          />
        </div>
        <div className="loading-chapters">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((element) => {
            return (
              <div className="loading-chapter-section" key={element}>
                <div className="loading-arrow-img"></div>
                <Skeleton
                  variant="rect"
                  className="loading-chapter-thumbnail"
                />
                <div className="loading-chapter-details">
                  <Skeleton variant="rect" className="loading-chapter-number" />
                  <Skeleton variant="rect" className="loading-chapter-name" />
                  <Skeleton variant="rect" className="loading-paid" />
                </div>
                <Skeleton variant="rect" className="loading-chapter-play-btn" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SubjectLoading;
