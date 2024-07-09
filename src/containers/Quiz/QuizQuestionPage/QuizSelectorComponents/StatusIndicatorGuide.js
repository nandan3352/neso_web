import { makeStyles } from "@material-ui/core";
import React from "react";
import StatusIndicator from "./StatusIndicator";


const useStyle = makeStyles(theme => (
  {
    root: {
      display: 'flex',
      alignItems: 'center',
      marginRight : 20
    },

    guideTitle: {
      ...theme.typography.caption,
      marginLeft : theme.spacing(1),
      fontSize : '12px',
      color : theme.palette.text.primary,
    }

  }
))

const StatusIndicatorGuide = (props) => {

  const classes = useStyle(props)
  return (
    <div className={classes.root}>
      <StatusIndicator status={props.status} index={props.index} />
      <div className={classes.guideTitle}>
        {props.body}
      </div>
    </div>
  );
};

export default StatusIndicatorGuide;
