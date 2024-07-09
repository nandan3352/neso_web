import React, { useState, useCallback, useEffect } from "react";
import "./Content.css";
import { Accordion, AccordionDetails, AccordionSummary, makeStyles } from "@material-ui/core";
import { ArrowDropDown} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({

  root: {

  },

  accDetailRoot: {
    display: "block",
    padding: 0,
    '&$expanded': {
      margin: 0
    }
  },
  accSummaryRoot: {
    padding: 0,
    marginLeft: 0,
    minHeight: 0,
    "&$expanded": {
      minHeight: 0,
    }
  },

  accSummaryContent: {
    paddingLeft: 12,
    margin: 0,
    '&$expanded': {
      margin: 0
    }
  },

  expanded: {

  },

  accRoot: {
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 0
    }
  },

  subjectContainer: {
    ...theme.typography.subtitle1
  },

  subjectTitle: {
    marginBottom: 20,
    color: undefined,
  },

  selectedChapter: {
    color: theme.palette.text.primary,
    fontWeight: 400
  },

  NotselectedChapter: {
    color: theme.palette.text.secondary,
    fontWeight: 400
  },

  chapterContainer: {

  },

  chapterTitle: {
    marginBottom: 24,
    marginLeft: 64,
    cursor: "pointer",
    color: undefined,
  }
}))

function Content({ parentScroll, onItemClick, highlight, courses }) {

  const classes = useStyles()

  const [expandedSection, setExpandedSection] = useState(0)

  const isVisible = (ref) => {
    let b = ref.getBoundingClientRect()

    return (
      b.top >= 0 &&
      b.left >= 0 &&
      b.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      b.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  useEffect(() => {
    Object.keys(courses).forEach((course, i) => {
      if (Object.keys(courses[course]).includes(highlight)) {
        setExpandedSection(i)
      }
    })
  }, [highlight])

  const handleExpand = i => e => {
    setExpandedSection(i)
  }

  return (
    <section className="content-section">
      {Object.keys(courses).map((course, courseI) => {
        const needTobeExpanded = Object.keys(courses[course]).includes(highlight)
        return (
          <Accordion classes={{ root: classes.accRoot, expanded: classes.expanded }} expanded={expandedSection === courseI || needTobeExpanded} onChange={handleExpand(courseI)} className={classes.subjectContainer}>
            <AccordionSummary classes={{ expanded: classes.expanded, content: classes.accSummaryContent, root: classes.accSummaryRoot }} className={`${classes.subjectTitle} ${needTobeExpanded ? classes.selectedChapter : classes.NotselectedChapter}`}>
              {expandedSection === courseI || needTobeExpanded ? <ArrowDropDown /> : <ArrowDropDown style={{ transform: "rotate(-90deg)" }} />}
              <div style={{ width: 8 }} />
              {course}
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accDetailRoot }} className={classes.chapterContainer}>
              {Object.entries(courses[course]).map(([courseid, { name }], i) => {
                return <div ref={(ref) => {
                  if (courseid === highlight && parentScroll && ref && !isVisible(ref)) {
                    parentScroll.scrollTo({ top: ref.offsetTop - 85, behavior: "smooth" })
                  }
                }} onClick={onItemClick(courseid)} className={`${classes.chapterTitle} ${courseid === highlight ? classes.selectedChapter : classes.NotselectedChapter}`} >{name}</div>
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </section>
  );
}

export default Content;

