import React, { useState, useRef, useEffect } from "react";
import "./Faculty.css";
import FacultyCard from "./FacultyCard/FacultyCard";
import { Link } from "react-router-dom";
import { Button, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { getParameterizedFacultyName } from "../../../Services/Utils";

const useStyles = makeStyles((theme) => {
  return {

    root: {
      margin: "32px 0px 64px 0px",
    },

    facultyContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(6,1fr)",
      gridColumnGap: 20,
      columnGap:  20,
      gridRowGap: theme.spacing(4),
      rowGap: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(3,1fr)",
        gridRowGap: theme.spacing(3),
        rowGap: theme.spacing(3),
        gridColumnGap: 12,
        columnGap: 12 ,
      }
    },

    showMoreContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "start"
    },

    showMoreBtn: {
      marginTop: 76,
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        marginTop: 50,
        fontSize: 12,
      }
    }

  };
});


const Faculty = (props) => {

  const facultyObj = props.data;
  const classes = useStyles();

  const perPageCount = 6
  const [limit, setLimit] = useState((2 * perPageCount) - 1)

  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const facultyEntries = Object.entries(facultyObj).sort((a, b) => a[1].priority - b[1].priority)

  useEffect(() => {
    if (isSmScreen) {
      setLimit(8)
    } else {
      setLimit((2 * perPageCount) - 1)
    }
  }, [isSmScreen])


  function handleSeeMore(e) {
    setLimit((prev) => prev + perPageCount)
  }

  return (
    <div className={classes.root}>
      <div className="faculty-title">Faculties</div>

      <div className={classes.facultyContainer} >
        {facultyObj && (
          facultyEntries.slice(0, limit).map((faculty, indx) => (
            <Link to={`/faculty/${getParameterizedFacultyName(faculty[1].name)}`}>
              <FacultyCard
                className="card"
                facultyName={faculty[1].name}
                facultyImg={faculty[1].imgURL}
                facutyDept={faculty[1].dept}
                style={{ cursor: "pointer" }} />
            </Link>
          )
          )
        )}
        {limit < facultyEntries.length &&
          <div className={classes.showMoreContainer}>
            <Button onClick={handleSeeMore} variant={!isSmScreen ? "outlined" : "text"} color="secondary" className={classes.showMoreBtn}>
              {!isSmScreen ? "show more" : "see all"}
            </Button>
          </div>}
      </div>


    </div>
  );
};
export default Faculty;
