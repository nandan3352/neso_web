import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const BookmarksLoader = () => {
  return (
    <div style={{ padding: "0 10px 0 10px" }}>
      <Skeleton
        className="title-loader"
        variant="rect"
        width="80%"
        height={40}
      />
      <Skeleton
        className="title-loader"
        variant="rect"
        width="60%"
        height={40}
      />

      <div className="rv-loader">
        <div>
          <Skeleton variant="rect" width={254} height={142} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
        <div>
          <Skeleton variant="rect" width={254} height={142} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
      <Skeleton
        className="title-loader"
        variant="rect"
        width="60%"
        height={40}
      />
      <div className="rv-loader">
        <div>
          <Skeleton variant="rect" width={254} height={142} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
        <div>
          <Skeleton variant="rect" width={254} height={142} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
      <Skeleton
        className="title-loader"
        variant="rect"
        width="60%"
        height={40}
      />
      <div className="rv-loader">
        <div>
          <Skeleton variant="rect" width={254} height={142} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
        <div>
          <Skeleton variant="rect" width={254} height={142} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </div>
  );
};

export default BookmarksLoader;
