import React from "react";
// import PropTypes from "prop-types";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
// import CircularLoader from "../../containers/Home/CircularLoader/CircularLoader";

import "./CourseCardLoader.css";



export function CourseCardPlaceholder() {
  return (<div>
    <div className="Loader-Container-course">
      <div>
        <Skeleton className='placeholder-course-card' variant="rect" width={176} height={176} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </div>
      <div>
        <Skeleton className='placeholder-course-card' variant="rect" width={176} height={176} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </div>
      <div>
        <Skeleton className='placeholder-course-card' variant="rect" width={176} height={176} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </div>
      <div>
        <Skeleton className='placeholder-course-card' variant="rect" width={176} height={176} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </div>
      <div>
        <Skeleton className='placeholder-course-card' variant="rect" width={176} height={176} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </div>
      <div>
        <Skeleton className='placeholder-course-card' variant="rect" width={176} height={176} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </div>
    </div>
  </div>)
}

function Cw() {
  return (
    <div className="cw-loader">
      <Skeleton
        variant="rect"
        width={764}
        height={288}
        className="size-on-sm"
      />
      <Skeleton
        variant="rect"
        width={330}
        height={186}
        className="size-on-md-lg"
      />
      <Skeleton variant="rect" width={328} height={288} className="hide-md" />
    </div>
  );
}

function Rv() {
  return (
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
  );
}

// function Stories() {
//   return (
//     <div className="st-loader">
//       <Skeleton variant="rect" width={176} height={228} />
//       <Skeleton variant="rect" width={176} height={228} />
//       <Skeleton variant="rect" width={176} height={228} />
//       <Skeleton variant="rect" width={176} height={228} />
//       <Skeleton variant="rect" width={176} height={228} />
//     </div>
//   );
// }

export default function YouTube(props) {
  return (
    <div>
      <div className="main-loader">
        {props.user && <Cw />}
        <Skeleton
          className="title-loader"
          variant="rect"
          width={500}
          height={40}
        />
        <Skeleton
          className="title-loader1"
          variant="rect"
          width={200}
          height={20}
        />
        {props.user ? <Rv /> : <CourseCardPlaceholder />}
        <Skeleton
          className="title-loader"
          variant="rect"
          width={500}
          height={40}
        />
        <Skeleton
          className="title-loader1"
          variant="rect"
          width={200}
          height={20}
        />
        {props.user ? <Rv /> : <CourseCardPlaceholder />}
        <Skeleton
          className="title-loader"
          variant="rect"
          width={500}
          height={40}
        />
        <Skeleton
          className="title-loader1"
          variant="rect"
          width={200}
          height={20}
        />
        {/* <Stories /> */}
        <Box overflow="hidden" className="loader-box-main">
          <CourseCardPlaceholder />
          {
            [...Array(7).keys()].map(_ => (
              <> <Skeleton
                className="title-loader"
                variant="rect"
                width={500}
                height={40} />
                <Skeleton
                  className="title-loader1"
                  variant="rect"
                  width={200}
                  height={20} />
                <CourseCardPlaceholder />
              </>))
          }
        </Box>
      </div>
      {/* <div className="main-loader2">
        <CircularLoader color="secondary" />
      </div> */}
    </div>
  );
}
