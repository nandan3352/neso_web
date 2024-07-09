import React from 'react'
import './verified.css'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
}))

export default function Verified({ setUserSetupProfile }) {
  const classes = useStyles()
  return (
    <div className='verifiedContainer'>
      <div>
        <div className='verifiedHeading'>Verified!</div>
        <div className='verifiedSubHeading'>Thank you for the verification</div>
      </div>
      <div className='verifiedDoneAll'>
        <DoneAllIcon />
      </div>
      <div className='verifiedNextButton'>
        <Button
          className={classes.button}
          variant='outlined'
          onClick={() => setUserSetupProfile(true)}
        >
          next
        </Button>
      </div>
    </div>
  )
}
