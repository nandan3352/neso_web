import React, { useEffect, useState } from 'react'
import './RecentVideos.css'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import VideosLoader from './Loader/VideosLoader'
import MoreOverlay from '../../../components/UI/SubjectPage/VideoMore/MoreOverlay'
import { Button, useMediaQuery, useTheme } from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { getEndpointForId } from '../../../Services/Utils'
import LatestCard from '../../../components/UI/LatestItemCard/LatestItemCard'
import { databaseFetchLatestLectures, fetchData } from '../../../Services/Database'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64,

    [theme.breakpoints.down(769)]: {
      marginTop: 48,
    },

    [theme.breakpoints.down(469)]: {
      marginTop: 32,
    },

    [theme.breakpoints.down(601)]: {
      marginLeft: -16,
      marginRight: -16,
    },

    '& .recentFacultyVideosHeader': {
      marginBottom: 24,
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: 0.15,
      color: theme.palette.text.primary,

      [theme.breakpoints.down(469)]: {
        marginBottom: 20,
      },

      [theme.breakpoints.down(601)]: {
        paddingLeft: 16,
      },
    },

    '& .recentFacultyVideoContainer': {
      marginLeft: -8,

      [theme.breakpoints.down(601)]: {
        paddingBottom: 48,
        paddingLeft: 16,
      },
    },

    '& .recentVideosShowMore': {
      marginTop: 46,
      marginBottom: 69,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& :hover': {
        cursor: 'pointer',
      },

      '& .showMore': {
        fontWeight: 500,
        letterSpacing: 1.25,
        color: theme.palette.secondary.main,
        fontSize: 14,
        lineHeight: '16px',
      },
    },
  },
}))

export default function RecentVideos({ authored }) {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [recentLectures, setRecentLectures] = useState('')
  const [recentLecturesData, setRecentLecturesDate] = useState({})
  const [limit, setLimit] = useState(4)
  const [more, setMore] = useState(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(601))

  useEffect(() => {

    databaseFetchLatestLectures("Videos",
      `${authored.split('/')[1]}_1_00`,
      `${authored.split('/')[1]}_99_99`,
      6).then((snapshot) => {
        let result = snapshot.val()
        setRecentLectures(result)
      }).catch((e)=>console.log(e))

  }, [])

  useEffect(() => {
    if (Boolean(recentLectures)) {
      const vid_ids = Object.keys(recentLectures).reverse()
      fetchData(vid_ids).then(d => {
        setRecentLecturesDate(d)
        setLoading(false)
      })
    }
  }, [recentLectures])

  useEffect(() => {
    if (isMobile) {
      setLimit(6)
    } else {
      setLimit(4)
    }
  }, [isMobile])

  //event handlers

  const handleMore = (id, url, name) => {
    return (event) => {
      event.preventDefault()
      event.stopPropagation()
      setMore({ target: event.target, id: id, url: url, name: name })
    }
  }

  if (loading) {
    return <VideosLoader />
  }

  const handleLimit = () => {
    setLimit( prev => (prev === 4 ? 6 : 4))
  }

  return (
    <div className={classes.root}>
      <MoreOverlay
        close={() => setMore(null)}
        anchorEl={more ? more.target : null}
        id={more ? more.id : null}
        url={more ? more.url : null}
        open={Boolean(more)}
        name={more ? more.name : null}
      />
      <div className='recentFacultyVideosHeader'>Recent</div>
      <div className='recentFacultyVideoContainer'>
        {Object.entries(recentLecturesData)
          .splice(0, limit)
          .map(([key, video], index) => (
            <div className='recentVideo'>
              <LatestCard
                i={index}
                id={key}
                chapName={video.chapName}
                courseName={video.additional.courseName}
                handleMore={handleMore(key, getEndpointForId(key, video.additional.courseName, video.chapName, video.vid_title), video.vid_title)}
                duration={video.dur}
                thumb={video.img}
                title={video.vid_title}
              />
            </div>
          ))}
      </div>
      {4 < Object.keys(recentLecturesData).length && !isMobile && (
        <div className='recentVideosShowMore'>
            <Button>
              <ArrowDropDownIcon style={{rotate : limit !== 4 && "180deg"}} htmlColor='var(--theme-secondary-main)' />
              <div className='showMore' onClick={handleLimit}>
                { limit === 4   ? "SHOW MORE" : "SHOW LESS" }
              </div>
            </Button>
        </div>
      )}
    </div>
  )
}
