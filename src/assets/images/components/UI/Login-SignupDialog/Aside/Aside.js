import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 440,
    height : 'auto',
/*     height: '100%',
 */    background: '#017374',
    padding: '52px 64px',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 279,
      padding: '48px 64px',

      '& > div': {
        width: 392,
        margin: 'auto',
      },
    },

    '& > div': {
      height: '95%',
    },

    '& .descriptionContainer': {
      height: 'inherit',
      display: 'flex',
      alignItems: 'center',

      '& .greet': {
        fontWeight: 500,
        fontSize: 24,
        lineHeight: '24px',
        letterSpacing: 0.18,
        color: '#ffffff',
        marginBottom: 32,

        [theme.breakpoints.down('sm')]: {
          marginTop: 42,
        },
      },

      '& .description': {
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0.15,
        color: 'rgba(255, 255, 255, 0.74)',
      },
    },
  },

  header: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.74)',
  },
}))

export default function Aside() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.header}>Redefining Education</div>

        <div className='descriptionContainer'>
          <div>
            <div className='greet'>
              Welcome <br /> to Neso Academy!
            </div>

            <div className='description'>
              Sign up now to explore more <br /> exciting features
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
