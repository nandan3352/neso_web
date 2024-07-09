import React from 'react';
import { ReactComponent as StatusImg } from './status.svg';
import { SvgIcon } from '@material-ui/core';
import './CourseDetails.css';
import { Link } from 'react-router-dom';
import { DoneAll } from '@material-ui/icons';
import { getParameterizedFacultyName } from '../../../../Services/Utils';

function CourseDetails(props) {

  const facultiesData = Object.values(props.instructors)
  const quiz_count = parseInt(props.course.qno) || 0
  const content_count = props.contentCount
  const isLecturesOnly =  props.isLecturesOnly

  return (
    <section className="course-other">
      <div className="course-detail" id="course-chapters">
        <p className="other-heading">{ isLecturesOnly ? "Lecture" : "Chapter"}{content_count > 1 && "s"}</p>
        <p>{content_count | '-'}</p>
        <p>{quiz_count} Quiz{(quiz_count > 1 || quiz_count == 0) && "zes"}</p>
      </div>
      <div className="partition-line"></div>
      <div className="course-detail" id="course-duration">
        <p className="other-heading">Duration</p>
        <p>{Math.round(props.totDur)}</p>
        <p>{props.totDur === 1 ? "Hour" : "Hours"}</p>
      </div>
      <div className="partition-line"></div>
      <div className="course-detail" id="course-language">
        <p className="other-heading">Language</p>
        <p>EN</p>
        <p>English</p>
      </div>
      <div className="partition-line"></div>
      <div className="course-detail" id="course-status">
        <p className="other-heading">Status</p>

        <SvgIcon>
          {props.type === 'incomplete' ? <StatusImg /> : <DoneAll />}
        </SvgIcon>

        <p>{props.type === 'incomplete' ? "Ongoing" : 'Complete'}</p>
      </div>
      <div className="partition-line"></div>
      <div className="course-instructor" >
        <p className="other-heading">{facultiesData.length === 1 ? "Instructor" : "Instructors"}</p>
        <div className="faculty-profile-stack">{facultiesData.map(x =>
          (<span className="avatar" ><Link to={`/faculty/${getParameterizedFacultyName(x.name)}`}><img className="instructor-profile-img" src={x.imgURL} alt="instructor"></img> </Link> </span>)
        )}
        </div>
        <p>{facultiesData.map((x, i) => (<><Link to={`/faculty/${getParameterizedFacultyName(x.name)}`}><span className="course-instructor-name" >  {x.name} </span></Link>{(i + 1) != facultiesData.length && <span className="faculty-concat-ampersand">{" & "}</span>}</>))}</p>

      </div>
    </section>
  );
}

export default CourseDetails;