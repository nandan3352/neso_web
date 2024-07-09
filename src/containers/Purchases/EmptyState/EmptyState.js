import { makeStyles } from '@material-ui/core'
import React from 'react'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const useStyles = makeStyles((theme) => ({
  EmptyState: {
    height: '95vh',
    paddingTop: 200,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& .puchaseIcon': {
      '& .MuiSvgIcon-root': {
        height: 36,
        color: theme.palette.secondary.main,
        width: 36,
      },
    },
  },

  heading: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.15,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  subText: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 0.15,
    color: theme.palette.text.secondary,
    width: 193,
    textAlign: 'center',
  },
}))

export default function EmptyState() {
  const classes = useStyles()
  return (
    <div className={classes.EmptyState}>
      <div className='puchaseIcon'>
        <LocalOfferIcon />
      </div>
      <div className={classes.heading}>Nothing here!</div>
      <div className={classes.subText}>
        Your all transactions will appear here
      </div>
    </div>
  )
}
