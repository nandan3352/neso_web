import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as Facebook } from '../../../assets/images/SocialMediaIcons/Faculty/Facebook.svg'
import { ReactComponent as Instagram } from '../../../assets/images/SocialMediaIcons/Faculty/Instagram.svg'
import { ReactComponent as Twitter } from '../../../assets/images/SocialMediaIcons/Faculty/Twitter.svg'
import RoomIcon from '@material-ui/icons/Room'
import EmailIcon from '@material-ui/icons/Email'
import { Button, IconButton } from '@material-ui/core'
import SvgIcon from '@material-ui/core/SvgIcon'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginTop: 88,
    padding: '0px 32px',
    paddingBottom: 32,
    position: 'relative',
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

        [theme.breakpoints.down(769)]: {
          marginLeft: 24,
        },

        [theme.breakpoints.down(469)]: {
          marginLeft: 20,
        },
      },
    },

    [theme.breakpoints.down(469)]: {
      marginTop: 16,
    },

    '& .facultyImage': {
      height: 120,
      width: 120,
      marginTop: -44,

      [theme.breakpoints.down(769)]: {
        marginTop: 0,
        height: 200,
        width: 136,
        overflow: 'hidden',
        borderRadius: 4,
      },

      [theme.breakpoints.down(469)]: {
        width: 96,
        height: 160,
        minWidth: 96,
      },

      '& > img': {
        height: '100%',
        width: '100%',
        borderRadius: 250,

        [theme.breakpoints.down(769)]: {
          width: '100%',
          borderRadius: 0,
          transform: 'scaleX(1.5)',
        },
      },
    },

    '& .facultyStream': {
      marginTop: 22,

      [theme.breakpoints.down(769)]: {
        marginTop: -6,
      },

      '& .MuiButton-root': {
        marginLeft: -8,
        fontSize: 14,
        lineHeight: '16px',
        fontWeight: 500,
        letterSpacing: 1.25,
        color: theme.palette.secondary.main,
      },
    },

    '& .facultyName': {
      marginTop: 14,
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: 0.15,
      color: theme.palette.text.primary,

      [theme.breakpoints.down(469)]: {
        marginTop: 2,
      },
    },

    '& .facultyQuote': {
      marginTop: 4,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0.15,
      color: theme.palette.text.secondary,
    },

    '& .facultyLocation': {
      marginTop: 24,
      display: 'flex',
      alignItems: 'center',

      [theme.breakpoints.down(769)]: {
        marginTop: 8,
      },

      '& > .MuiSvgIcon-root': {
        height: 16,
        width: 16,
        color: theme.palette.text.secondary,
      },

      '& > span': {
        lineHeight: '24px',
        color: theme.palette.text.secondary,
        letterSpacing: 0.15,
        marginLeft: 8,
        textTransform: 'capitalize',
      },
    },

    '& .facultySocialIcons': {
      marginTop: 29,
      width: 216,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      left: -13,

      '& .facultyIcon': {
        '& .MuiIconButton-root': {
          height: 44,
          width: 44,

          '& svg path': {
            fill: 'var(--theme-secondary-main)',
          },
        },
      },

      [theme.breakpoints.down(769)]: {
        marginTop: 20,
      },

      [theme.breakpoints.down(469)]: {
        marginTop: 16,
      },
    },
  },
}))

export default function FacultyProfile({ faculty }) {
  const classes = useStyles()

  const mapStream = (stream) => {
    const map = {
      'COMPUTER SCIENCE': 'Computer Science',
      'ELECTRICAL ENGINEERING': 'electrical',
      'ELECTRONICS & COMMUNICATION': 'Electronics & Communication'
    }
    return map[stream] || stream
  }

  return (
    <div className={classes.root}>
      <div className='facultyImage'>
        <img src={faculty.imgURL} alt='image' />
      </div>
      <div className='facultyData'>
        <div className='facultyStream'>
          <Link to={`/home/${mapStream(faculty.stream)}`}>
            <Button>{faculty.stream}</Button>
          </Link>
        </div>
        <div className='facultyName'>{faculty.name}</div>
        {faculty.quote !== '0' ? (
          <div className='facultyQuote'>{faculty.quote}</div>
        ) : (
          ''
        )}
        <div className='facultyLocation'>
          <RoomIcon />
          <span>{faculty.location}</span>
        </div>
        {faculty.facebook ||
          faculty.twitter ||
          faculty.insta ||
          faculty.email ? (
          <div className='facultySocialIcons'>
            {faculty.facebook ? (
              <div className='facultyIcon'>
                <a
                  href={faculty.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconButton>
                    <SvgIcon component={Facebook} />
                  </IconButton>
                </a>
              </div>
            ) : (
              ''
            )}
            {faculty.twitter ? (
              <div className='facultyIcon'>
                <a
                  href={faculty.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconButton>
                    <SvgIcon component={Twitter} />
                  </IconButton>
                </a>
              </div>
            ) : (
              ''
            )}
            {faculty.insta ? (
              <div className='facultyIcon'>
                <a
                  href={faculty.insta}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconButton>
                    <SvgIcon component={Instagram} />
                  </IconButton>
                </a>
              </div>
            ) : (
              ''
            )}
            {faculty.email ? (
              <div>
                <a
                  href={`mailto:${faculty.email}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconButton>
                    <EmailIcon htmlColor='var(--theme-secondary-main)' />
                  </IconButton>
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
