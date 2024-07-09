import React from "react";
import Card from "../../../../components/UI/CourseCard/Card";
import "./Courses.css";
import { useDatabase } from "../../../../Services/Database";
import { CourseCardPlaceholder } from "../../../../components/Loader/CourseCardLoader";


const Courses = (props) => {
  const courses = useDatabase(`/StreamCourses/${props.streamId}`);

  return (
    <div className="course-flex">
      <div className="grid-container">
        {courses.loading || !courses.data ? (
          <CourseCardPlaceholder />
        ) : (
          Object.entries(courses.data)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([key, course], index) => {
              return (
                <div className="grid-item" key={index}>
                  <Card
                    faculties={props.faculties}
                    course={course}
                    id={key}
                    title={course.name}
                    img={course.img}
                    description={course.description}
                    courseID={key} //CourseID
                  />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default Courses;
