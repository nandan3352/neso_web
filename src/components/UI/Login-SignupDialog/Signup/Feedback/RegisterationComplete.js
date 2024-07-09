import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/core/styles'
import { navigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: ({ embeded }) => ({
    padding: embeded ? 0 : "0px 32px",
    height: embeded ? "auto" : "100vh",
    '& .regSucessDoneBox': {
      marginTop: 136,
      height: 56,
      width: 56,
      background: 'rgba(33, 150, 83, 0.16)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [theme.breakpoints.down(469)]: {
        marginTop: 86,
      },

      '& .MuiSvgIcon-root': {
        height: 40,
        width: 40,
        color: '#27AE60',
      },
    },

    '& .secondHeader': {
      marginTop: 48,
      marginBottom: 32,

      [theme.breakpoints.down(469)]: {
        marginBottom: 24,
      },
    },
  }),

  boldText: {
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.15,
    color: theme.palette.text.primary,
    fontWeight: 500,
  },

  email: {
    color: theme.palette.text.primary
  },

  smallText: {
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 0.15,
    color: theme.palette.text.secondary,

    '& > span': {
      fontWeight: 500,
    },
  },
}))

export default function RegisterationComplete({ regEmail, embeded }) {

  const location = useLocation()
  const classes = useStyles({ embeded })

  let email
  if (regEmail) {
    email = regEmail
  } else {
    email = location.state && location.state.email
  }


  if (!email) {
    return <navigate to="/" />
  }

  return (
    <div className={classes.root}>
      <>
        {embeded && <div className={classes.boldText}>Registration successful!</div>}

        <div className='regSucessDoneBox'>
          <DoneIcon />
        </div>

        <div className='secondHeader'>
          <div className={classes.boldText}>
            You have been successfully registered
          </div>
        </div>

        <div>
          <div className={classes.smallText}>
            We have emailed you a verification link to{' '}
            <span className={classes.email}>{email}</span> to complete the
            registration. Please check your inbox, and if you can not find it.
            Check your spam folder.
          </div>
        </div>
      </>
    </div>
  )
}
