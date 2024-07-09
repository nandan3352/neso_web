import React from "react";
import "./Streams.css";
import Courses from "./Courses/Courses";
import { makeStyles, Typography } from "@material-ui/core";
import AdsContainer, {
  AD_VARIENT_BANNER_MINI,
} from "../../../components/UI/Ads/AdsContainer";

const useStyles = makeStyles((theme) => ({
  course: {
    margin: "32px 0px",
    display: "inline-block",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      margin: "16px 0px",
    },
  },

  courseheader: {
    ...theme.typography.subtitle1,
    fontSize: "24px",
    lineHeight: "24px",
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(0),
  },
  courseTitle: {
    ...theme.typography.h6,
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "0px",
    },
  },
}));

const Streams = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className="Courses">
        <div className="courses-flex">
          <Typography variant="subtitle2" className={classes.courseheader}>
            Courses
          </Typography>
          <div>
            {props.state.streams.map((stream, index) => {
              return (
                <>
                  <div
                    key={index}
                    ref={(ref) => {
                      if (
                        ref &&
                        props.scrollToCourse &&
                        stream.name.toLowerCase() ===
                          props.scrollToCourse.toLowerCase()
                      ) {
                        ref.scrollIntoView({
                          block: "center",
                          behavior: "smooth",
                        });
                      }
                    }}
                    className={classes.course}
                  >
                    <div className={classes.courseTitle}>{stream.name}</div>
                    <Courses
                      faculties={props.state.faculties}
                      streamId={stream.id}
                    />
                  </div>
                  {index === 0 && (
                    <AdsContainer
                      path="home"
                      hide={props.isSubscribed}
                      varient={AD_VARIENT_BANNER_MINI}
                      rootStyle={{ margin: 0 }}
                      rootSmStyles={{ margin: 0 }}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streams;
