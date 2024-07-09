import React, { useEffect, useState } from 'react'
import './ConfirmingPayment.css'
import { CircularProgress, Dialog } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import NesoLogo from '../../assets/images/Logos/NesoLogo.svg'
import NesoLogoDark from '../../assets/images/Logos/NesoLogoDark.svg'
import PaymentStatus from './PaymentStatus/PaymentStatus'
import { useSubscriptionListener } from '../../Services/Subscription'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '28px 24px 20px 24px',

    '& .confirmingPaymentProgress': {
      margin: 'auto',
      marginTop: 201,
      display: 'flex',
      justifyContent: 'center',

      '& .MuiCircularProgress-colorPrimary': {
        color: theme.palette.secondary.main,
      },
    },

    '& .confirmingPaymentWaitStatement': {
      width: 296,
      margin: 'auto',
      marginTop: 32,
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: 0.15,
      textAlign: 'center',
    },

    '& .confirmingPaymentNote': {
      width: 296,
      margin: 'auto',
      marginTop: 161,
      boxSizing: 'border-box',
      padding: 16,
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: 0.25,
      textAlign: 'center',
    },
  },
}))

export default function ConfirmingPayment(props) {
  const classes = useStyles()
  const [Loading, setLoading] = useState(true)
  const theme = useTheme()
  const subscription = useSubscriptionListener()

  useEffect(() => {
    setInterval(() => {
      setLoading(false)
    }, 5000)
  })

  const Loader = () => {
    return (
      <>
        <div className='confirmingPaymentProgress'>
          <CircularProgress />
        </div>

        <div className='confirmingPaymentWaitStatement'>
          Please wait while we process your payment.
        </div>

        <div className='confirmingPaymentNote'>
          Note: Please do not press back button or close this page until the
          payment is processed.
        </div>
      </>
    )
  }

  return (
    <Dialog disableScrollLock={false} fullScreen open={true}>
      <div className={classes.root}>
        <div className='nesoLogo'>
          <img src={theme.palette.type === 'dark' ? NesoLogoDark : NesoLogo} alt='' />
        </div>
        {(Loading || subscription.loading || (!subscription.isSubscribed && props.location.state && !props.location.state.error) )? <Loader /> : <PaymentStatus  data={{...props.location.state, nextpay : subscription.nextpay}} />}
      </div>
    </Dialog>
  )
}
