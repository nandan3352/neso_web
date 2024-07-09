import React from 'react'
import '../RecentVideos.css'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { useMediaQuery, useTheme } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64,

    [theme.breakpoints.down(769)]: {
      marginTop: 48,
    },

    [theme.breakpoints.down(469)]: {
      marginTop: 32,
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
    },

    '& .recentFacultyVideoContainer': {
      gridColumnGap: 20,

      [theme.breakpoints.down(600)]: {
        height: 250,
      },

      '& .recentVideo': {
        [theme.breakpoints.down(601)]: {
          width: 274,
          minWidth: 274,
          height: 154,
        },

        '& .recentVideoImage': {
          '& .MuiSkeleton-root': {
            position: 'relative',
            width: 274,
            height: 154,

            [theme.breakpoints.down(769)]: {
              width: '100%',
              maxWidth: 342,
              height: 192,
            },

            [theme.breakpoints.down(601)]: {
              width: 274,
              height: 154,
            },
          },
        },
        '& .titleContainer': {
          marginTop: 8,
        },
      },
    },

    '& .recentVideosShowMore': {
      marginTop: 46,
      marginBottom: 69,
    },
  },
}))

export default function RecentVideos() {
  const classes = useStyles()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(601))

  return (
    <div className={classes.root}>
      <div className='recentFacultyVideosHeader'>Recent</div>
      <div className='recentFacultyVideoContainer'>
        <div className='recentVideo'>
          <div className='recentVideoImage'>
            <Skeleton variant='rect' />
          </div>
          <div className='titleContainer'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='recentVideo'>
          <div className='recentVideoImage'>
            <Skeleton variant='rect' />
          </div>
          <div className='titleContainer'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='recentVideo'>
          <div className='recentVideoImage'>
            <Skeleton variant='rect' />
          </div>
          <div className='titleContainer'>
            <Skeleton variant='text' />
          </div>
        </div>

        <div className='recentVideo'>
          <div className='recentVideoImage'>
            <Skeleton variant='rect' />
          </div>
          <div className='titleContainer'>
            <Skeleton variant='text' />
          </div>
        </div>
      </div>

      {isMobile ? (
        ''
      ) : (
        <div className='recentVideosShowMore'>
          <Skeleton variant='text' />
        </div>
      )}
    </div>
  )
}
