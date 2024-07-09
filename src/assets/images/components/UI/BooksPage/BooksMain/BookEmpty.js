import React from "react";
import { Skeleton } from "@material-ui/lab";

const BookEmpty = () => {
  return (
    <section className="book-section" style={{ marginTop: "20px" }}>
      <Skeleton className="book-thumbnail" variant="rect" />
      <div className="book-details">
        <p className="book-author">
          <Skeleton variant="rect" width="50%" />
        </p>
        <br />
        <p className="book-name">
          <Skeleton variant="rect" width="80%" />
        </p>{" "}
        <br />
        <div className="book-rating" style={{ gap: "10px" }}>
          <Skeleton variant="rect" width="10%" />
          {""}
          <Skeleton variant="rect" width="10%" />
          {""}
          <Skeleton variant="rect" width="10%" />
          {""}
          <Skeleton variant="rect" width="10%" />
          {""}
          <Skeleton variant="rect" width="10%" />
        </div>
      </div>
    </section>
  );
};

export default BookEmpty;
