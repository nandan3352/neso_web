import React from 'react'
import './timeline.css'
import { Divider, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'


const useStyle = makeStyles((theme) => ({
  divider: {
    borderTop: `2px solid ${theme.palette.divider}`,
    height: 0,
    width: 101,
    [theme.breakpoints.down('xs')]: {
      width: 29
    }
  },

  timelineDivider: {
    margin: "0px 12px",
    display: "flex",
    alignItems: "center"
  }
}))

export default function Timeline(props) {

  const classes = useStyle()

  return (
    <>
      <div className='timelineContainer'>
        <div>
          <div className='green indicator'>
            {props.done ? <DoneIcon htmlColor='#27ae60' /> : 1}
          </div>
          <div className={classes.timelineDivider}>
            <div className={classes.divider} />
          </div>
          <div className={`${props.two ? 'green' : 'grey'} indicator`}>2</div>
        </div>
        <div
          className={
            props.payment
              ? 'paymentTimeLineTextContainer'
              : 'verificationTimeLineTextContainer'
          }
        >
          <div className='subText'>{props.first}</div>
          <div className='subText'>{props.second}</div>
        </div>
      </div>
    </>
  )
}
