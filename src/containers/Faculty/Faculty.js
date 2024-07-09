import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Courses from './AuthoredCourses/AuthoredCourses'
import RecentVideos from './RecentVideos/RecentVideos'
import FacultyProfile from './FacultyProfile/FacultyProfile'
import ProfileLoader from './FacultyProfile/Loader/ProfileLoader'
import CoursesLoader from './AuthoredCourses/Loader/CoursesLoader'
import VideosLoader from './RecentVideos/Loader/VideosLoader'
import { navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import AdsContainer, { AD_VARIENT_SQUARE } from '../../components/UI/Ads/AdsContainer'
import { useSubscriptionListener } from '../../Services/Subscription'
import { databaseOrderbychildEqualToOnValue } from '../../Services/Database'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 1054,
    boxSizing: 'border-box',

    [theme.breakpoints.down(601)]: {
      minHeight: 762,
    },

    '& .rootContainer': {
      width: 'fit-content',
      boxSizing: 'border-box',
      margin: 'auto',
      display: 'flex',

      [theme.breakpoints.down(769)]: {
        display: 'block',
        width: '100%',
        padding: '0px 32px 0px 33px',
      },

      [theme.breakpoints.down(601)]: {
        padding: '0px 16px 0px 16px',
      },

      '& > .facultyProfileContainer': {
        width: 343,
        boxSizing: 'border-box',

        [theme.breakpoints.down(769)]: {
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 691,
          paddingBottom: 24,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },

        '& .addBanner': {
          height: 343,
          width: 343,
          marginTop: 39,
          background: 'rgba(0, 0, 0, 0.12)',

          [theme.breakpoints.down(769)]: {
            height: 200,
            width: 200,
            marginTop: 32,
          },
        },
      },

      '& > .coursesContainer': {
        width: 568,
        marginLeft: 49,
        boxSizing: 'border-box',

        [theme.breakpoints.down(769)]: {
          marginLeft: 0,
          width: '100%',
        },
      },
    },
  },
}))

const Faculty = (props) => {
  const { name } = useParams()
  const classes = useStyles()
  const [state, setState] = useState({
    faculty: [],
    loading: true,
    error: false,
  })


  const getQueryKey = (name) => {
    const words = name.split("-");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  useEffect(() => {

    if (!name) {
      return
    }

    return databaseOrderbychildEqualToOnValue(`/Faculty`, "name", getQueryKey(name), (snapshot) => {
      if (!snapshot)
        return
      if (snapshot.val()) {
        const result = Object.values(snapshot.val())[0]
        //document.title = result.name + " | Neso Academy";
        setState({
          loading: false,
          faculty: result,
          error: '',
        })
      } else {
        setState(prev => ({ ...prev, error: true }))
      }
    })
  }, [])

  const subscription = useSubscriptionListener()


  const { faculty, loading, error } = state


  if (!name || error) {
    return <navigate to='/' />
  }

  return (
    <>

      <Helmet>
        <title>{loading ? "Neso Academy" : faculty.name + " | Neso Academy"}</title>
        <meta name="description" content="Neso Academy offers world-class learning resources on engineering courses, school syllabus, competitive exams, and many more. Every day thousands of students visit Neso Academy and learn various topics from our library. Students can watch lectures, practice questions, and interact with other students making Neso Academy a Global Classroom. " />
      </Helmet>

      <div className={classes.root}>
        <div className='rootContainer'>
          <div className='facultyProfileContainer'>
            {loading ? <ProfileLoader /> : <FacultyProfile faculty={faculty} />}
            <AdsContainer path="faculty" hide={subscription.isSubscribed} varient={AD_VARIENT_SQUARE} rootStyle={{ width: "100%" }} />
          </div>
          <div className='coursesContainer'>
            {loading ? (
              <CoursesLoader />
            ) : (
              <Courses courses={faculty.authored} />
            )}
            {faculty.authored ? (
              <RecentVideos
                authored={faculty.authored[Object.keys(faculty.authored).pop()]}
              />
            ) : (
              <VideosLoader />
            )}
          </div>
        </div>
      </div>

    </>

  )
}

export default Faculty
