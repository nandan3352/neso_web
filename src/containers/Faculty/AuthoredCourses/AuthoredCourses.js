import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./AuthoredCourses.css";
import Card from "../../../components/UI/CourseCard/Card";
import { databaseOnValue } from "../../../Services/Database";
import { fetchFacultiesData } from "../../../Services/Database";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",

    [theme.breakpoints.down(601)]: {
      marginLeft: -16,
      marginRight: -16,
    },

    "& .coursesHeading": {
      marginTop: 24,
      fontSize: 20,
      fontWeight: 500,
      lineHeight: "24px",
      letterSpacing: 0.15,
      color: theme.palette.text.primary,

      [theme.breakpoints.down(469)]: {
        marginTop: 20,
      },

      [theme.breakpoints.down(601)]: {
        paddingLeft: 16,
      },
    },

    "& .authoredCoursesContainer": {
      marginTop: 24,

      [theme.breakpoints.down(601)]: {
        paddingLeft: 16,
      },
    },
  },
}));

export default function AuthoredCourses({ courses }) {
  const classes = useStyles();
  const RenderCourse = ({ courseAddress }) => {
    const [state, setState] = useState({
      faculty: undefined,
      course: undefined,
      loading: true,
      error: "",
    });

    useEffect(() => {
      const id = courseAddress.split("/")[1];
      return databaseOnValue(
        `/StreamCourses/${id.substring(0, 2)}/${id}`,
        (snapshot) => {
          if (!snapshot) {
            return;
          }
          const result = snapshot.val();
          fetchFacultiesData(result.inst_ids.split("_")).then((f) => {
            setState({
              faculty: f,
              course: result,
              loading: false,
              error: "",
            });
          });
        }
      );
    }, [courseAddress]);

    const { course, faculty } = state;
    const courseid = courseAddress.split("/")[1];
    return (
      <>
        {!state.loading && (
          <Card
            id={courseid}
            courseID={courseid}
            faculties={faculty}
            course={course}
            title={course.name}
            img={course.img}
            description={course.description}
            chapterId={courseAddress.split("/")[1]}
          />
        )}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className="coursesHeading">Courses</div>
      <div className="authoredCoursesContainer">
        {courses &&
          Object.values(courses).map((course, index) => (
            <div className="authoredCourse" key={index}>
              <RenderCourse courseAddress={course} />
            </div>
          ))}
      </div>
    </div>
  );
}
