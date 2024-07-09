import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export function SingleSmallLineAnimation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton animation="wave" />
    </div>
  );
}

export function SingleLargeLineAnimation() {
  return (
    <div>
      <Skeleton animation="wave" width={400} height={50} />
    </div>
  );
}

export function SmallthumbnailHomeAnimation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton variant="rect" width={210} height={118} />
    </div>
  );
}
