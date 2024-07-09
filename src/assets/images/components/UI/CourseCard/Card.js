import React, { useEffect, useRef, useState } from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { IconButton, Popover } from "@material-ui/core";
import { databaseCount } from "../../../Services/Database";
import "./Card.css";
import CourseDetails from "../SubjectPage/CourseDetails/CourseDetails";
import { InfoRounded } from "@material-ui/icons";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { getEndpointForId } from "../../../Services/Utils";
import { COURSE_LAYOUT } from "../../../lib/Enums";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      '&:hover $infoIcon': {
        display: 'block'
      }
    }
  },
  cardContent: {
    '&:last-child': {
      padding: 0,
    },
    padding: 0,
    marginTop: "12px",
  },
  description: {
    marginTop: "4px",
  },
  infoIcon: {
    right: 0,
    display: 'none',
    inset: "0 0 auto auto",
    position: "absolute",
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  infoIconShow: {
    display: 'block',
  },

  popOverlay: {
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
    maxWidth: 372,
    minWidth: 372,
    justifyContent: "center",
  },

  newChapterLabel: {
    backgroundColor: "#183E9F",
    color: theme.palette.common.white,
    lineHeight: "20px",
    textAlign: "center",
    fontSize: 14,
    padding: "6px 0px",
    fontWeight: 500,
    borderRadius: "0px 0px 4px 4px",
    position: "absolute",
    width: "100%",
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      lineHeight: "16px"
    }
  }

}));

export default function MediaCard(props) {
  const classes = useStyles();
  const [openHover, setOpenHover] = useState(false);
  const [isVertical, setIsVertical] = useState(true);
  const [contentCount, setContentCount] = useState(undefined);
  const anchorRef = useRef(null);

  useEffect(() => {
    let isLectureOnly = (props.course.course_layout === COURSE_LAYOUT.LAYOUT_LECTURES_ONLY)
    databaseCount(isLectureOnly ? "Videos" :`Chapters/${props.courseID}`, isLecturesOnlyCourse && props.courseID).then(id => {
      setContentCount(isLectureOnly ? parseInt(id.split("_")[2]) : parseInt(id))
    })
  }, [props.courseID])

  const getInstructors = (instructor_string) => {
    if (props.faculties.length === 0) {
      return undefined;
    }
    const fids = instructor_string.split("_")
    return fids.reduce((acc, id) => {
      acc[id] = props.faculties[id]
      return acc
    }, {})
  }


  const hasNewChapter = props.course.new_content_label_ts > Date.now();
  const isLecturesOnlyCourse = (props.course.course_layout === COURSE_LAYOUT.LAYOUT_LECTURES_ONLY)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation();
    if (e.currentTarget.parentNode.getBoundingClientRect().top < 278) {
      setIsVertical(false);
    } else {
      setIsVertical(true)
    }
    setOpenHover(openHover ? null : anchorRef.current);
  };

  const open = Boolean(openHover);

  const hoverPanel = (
    <Popover
      PaperProps={{
        className: classes.popOverlay,
      }}
      open={open}
      anchorEl={openHover}
      anchorOrigin={{
        vertical: isVertical ? "top" : "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={handleClick}
      disableRestoreFocus>
      <CourseDetails
        isLecturesOnly={isLecturesOnlyCourse}
        type={props.course.type}
        instructors={getInstructors(props.course.inst_ids) || []}
        totDur={props.course.totdur}
        contentCount={contentCount}
        course={props.course}
      />
    </Popover>
  );

  return (
    <Link to={getEndpointForId(props.id, props.title)} >
      <Card
        ref={anchorRef}
        elevation={0}
        className={clsx('CourseCard', classes.root)}>
        <CardMedia
          className="CourseCard-Img"
          image={props.img} >
          {hasNewChapter &&
            <div className={classes.newChapterLabel}>
              NEW {isLecturesOnlyCourse ? "LECTURE" : "CHAPTER"}
            </div>}
        </CardMedia>
        <IconButton className={clsx({ [classes.infoIconShow]: open }, classes.infoIcon)} onClick={handleClick}>
          <InfoRounded htmlColor="#ffffff" />
        </IconButton>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="body2"
            component="body"
            className="CourseCard-Title"
            style={{ fontWeight: "500", fontSize: "16px" }}>
            {props.title}
          </Typography>
          <Typography
            className="CourseCard-Description"
            variant="body2"
            color="textSecondary"
            component="p">
            {props.description || ""}
          </Typography>
        </CardContent>
        {hoverPanel}
      </Card>
    </Link>
  );
}