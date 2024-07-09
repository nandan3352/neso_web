import React from 'react'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import '../AuthoredCourses.css'
import Skeleton from '@material-ui/lab/Skeleton'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',

    '& .coursesHeading': {
      marginTop: 24,
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: 0.15,
      color: theme.palette.text.primary,
    },

    '& .authoredCoursesContainer': {
      marginTop: 24,

      '& .authoredCourse': {
        '& .authoredCourseTitle': {
          marginTop: 12,
        },

        '& .authoredCourseDescription': {
          marginTop: 4,
        },
      },
    },
  },
}))

export default function CoursesLoader() {
  const classes = useStyles()

  const theme = createMuiTheme({})
  const isNotDesktop = useMediaQuery(theme.breakpoints.down(769))
  const isMobile = useMediaQuery(theme.breakpoints.down(469))

  let height = isNotDesktop ? 161 : 176
  let width = isNotDesktop ? 161 : 176

  return (
    <div className={classes.root}>
      <div className='coursesHeading'>Courses</div>

      <div className='authoredCoursesContainer'>
        <div className='authoredCourse'>
          <Skeleton variant='rect' width={width} height={height} />
          <div className='authoredCourseTitle'>
            <Skeleton variant='text' />
          </div>
          <div className='authoredCourseDescription'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='authoredCourse'>
          <Skeleton variant='rect' width={width} height={height} />
          <div className='authoredCourseTitle'>
            <Skeleton variant='text' />
          </div>
          <div className='authoredCourseDescription'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='authoredCourse'>
          <Skeleton variant='rect' width={width} height={height} />
          <div className='authoredCourseTitle'>
            <Skeleton variant='text' />
          </div>
          <div className='authoredCourseDescription'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='authoredCourse'>
          <Skeleton variant='rect' width={width} height={height} />
          <div className='authoredCourseTitle'>
            <Skeleton variant='text' />
          </div>
          <div className='authoredCourseDescription'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='authoredCourse'>
          <Skeleton variant='rect' width={width} height={height} />
          <div className='authoredCourseTitle'>
            <Skeleton variant='text' />
          </div>
          <div className='authoredCourseDescription'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='authoredCourse'>
          <Skeleton variant='rect' width={width} height={height} />
          <div className='authoredCourseTitle'>
            <Skeleton variant='text' />
          </div>
          <div className='authoredCourseDescription'>
            <Skeleton variant='text' />
          </div>
        </div>
      </div>
    </div>
  )
}
