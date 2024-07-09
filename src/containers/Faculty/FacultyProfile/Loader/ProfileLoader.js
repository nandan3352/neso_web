import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import RoomIcon from '@material-ui/icons/Room'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 345,
    marginTop: 88,
    padding: '0px 32px',
    border: '1px solid rgba(var(--theme-divider))',

    [theme.breakpoints.down(769)]: {
      height: 'fit-content',
      width: 431,
      padding: 0,
      marginTop: 32,
      display: 'flex',
      border: 'none',

      '& .facultyData': {
        marginLeft: 40,
      },
    },

    '& .facultyImage': {
      marginTop: -44,

      '& .MuiSkeleton-rect': {
        width: 136,
        height: 200,
      },

      '& .MuiSkeleton-circle': {
        height: 120,
        width: 120,
      },

      [theme.breakpoints.down(769)]: {
        marginTop: 0,
      },
    },

    '& .facultyStream': {
      marginTop: 28,

      [theme.breakpoints.down(769)]: {
        marginTop: 0,
      },
    },

    '& .facultyName': {
      marginTop: 20,
    },

    '& .facultyQuote': {
      marginTop: 4,
    },

    '& .facultyLocation': {
      marginTop: 24,

      [theme.breakpoints.down(769)]: {
        marginTop: 8,
      },
    },

    '& .facultySocialIcons': {
      marginTop: 29,
      width: 216,
      height: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [theme.breakpoints.down(769)]: {
        marginTop: 20,
      },
    },
  },
}))

export default function ProfileLoader() {
  const classes = useStyles()

  const theme = useTheme()
  const isNotDesktop = useMediaQuery(theme.breakpoints.down(769))

  return (
    <div className={classes.root}>
      <div className='facultyImage'>
        <Skeleton animation='wave' variant={isNotDesktop ? 'rect' : 'circle'} />
      </div>
      <div className='facultyData'>
        <div className='facultyStream'>
          <Skeleton variant='text' />
        </div>
        <div className='facultyName'>
          <Skeleton variant='text' />
        </div>
        <div className='facultyQuote'>
          <Skeleton variant='text' />
        </div>
        <div className='facultyLocation'>
          <Skeleton variant='text' />
        </div>
        <div className='facultySocialIcons'>
          <div>
            <Skeleton variant='circle' width={40} height={40} />
          </div>
          <div>
            <Skeleton variant='circle' width={40} height={40} />
          </div>
          <div>
            <Skeleton variant='circle' width={40} height={40} />
          </div>
          <div>
            <Skeleton variant='circle' width={40} height={40} />
          </div>
          <div>
            <Skeleton variant='circle' width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  )
}
