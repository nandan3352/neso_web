import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, InputAdornment, TextField } from '@material-ui/core'
import upiIcon from '../../../assets/images/Payment/UPI/upiIcon.svg'
import divider from '../../../assets/images/Payment/UPI/divider.svg'
import touchIcon from '../../../assets/images/Payment/UPI/touchIcon.svg'

const useStyles = makeStyles((theme) => ({
  UPIForm: {
    height: 225,
    boxSizing: 'border-box',
    background: '#F8F9FB',
    padding: '38px 36px 36px 63px',

    '& .upiIDTextField': {
      width: 372,
      height: 54,

      '& .MuiFormControl-root': {
        height: 54,
        width: '100%',

        '& .MuiButtonBase-root': {
          color: theme.palette.secondary.main,
          letterSpacing: 1.25,
          fontSize: 14,
          lineHeight: '16px',
        },

        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#018786 !important',
        },

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },

        '& .MuiFormLabel-root.Mui-focused': {
          color: theme.palette.secondary.main,
        },
      },
    },

    '& .UPIPayNowButton': {
      float: 'right',
      marginTop: 49,

      '& .MuiButtonBase-root': {
        width: 156,
        height: 48,
        color: '#ffffff',
        background: theme.palette.secondary.main,
        boxShadow: 'none',
        fontSize: 14,
        lineHeight: '16px',
        letterSpacing: 1.25,
        fontWeight: 500,
      },
    },
  },

  sendPayReq: {
    height: 503,
    boxSizing: 'border-box',
    background: '#F8F9FB',
    padding: '48px 38px 42px 64px',

    '& .normalText': {
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0.15,
    },

    '& .upiGrey': {
      color: theme.palette.text.secondary,
    },

    '& .upiBlack': {
      color: theme.palette.text.primary,
    },

    '& .completeThePayment': {
      marginTop: 24,
    },

    '& .refreshAlert': {
      marginTop: 2,
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: 0.25,
      color: 'rgba(0, 0, 0, 0.38)',
    },

    '& .paymentConfirmationTimer': {
      margin: 'auto',
      marginTop: 30,
      width: 84,
      height: 40,
      background: 'rgba(38, 165, 65, 0.16)',
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: 0.15,
      color: '#309C5D',
      fontWeight: 500,
    },

    '& .stepsContainer': {
      marginTop: 39,

      '& > .iconContainer': {
        display: 'flex',
        justifyContent: 'center',

        '& .upiPayIcon': {
          width: 112,
          textAlign: 'center',
        },

        '& .upiPayDivider': {
          marginTop: 18,
          marginLeft: 13,
          marginRight: 3,
        },

        '& .upiPayTouchIcon': {
          width: 133,
          textAlign: 'center',
        },
      },

      '& > .iconsTitle': {
        marginTop: 42,
        width: 385,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',

        '& > .upiPayTitleText': {
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: 0.25,
        },
      },
    },

    '& .upiPayCancelButton': {
      marginTop: 53,
      marginLeft: -8,

      '& .MuiButton-root': {
        width: 76,
        color: theme.palette.secondary.main,
      },
    },
  },
}))

export default function UPI({ price }) {
  const classes = useStyles()

  const [sendPaymentRequest, setSendPaymentRequest] = useState(false)
  const [upiId, setUpiId] = useState('input.r5@okaxis')
  const [upiIdVerified, setUpiIdVerified] = useState(false)

  const EnterUPIAndVerify = () => (
    <div className={classes.UPIForm}>
      <div className='upiIDTextField'>
        <TextField
          label='Enter UPI ID'
          variant='outlined'
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button onClick='' edge='end'>
                  verify
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className='UPIPayNowButton'>
        <Button
          variant='contained'
          // disabled={!upiIdVerified}
          onClick={() => setSendPaymentRequest(true)}
        >
          pay ₹{price}
        </Button>
      </div>
    </div>
  )

  const PaymentRequestSent = () => {
    const [timer, setTimer] = useState('05:00')

    const timerFunction = () => {
      let totalTime = 300

      setInterval(() => {
        let min = parseInt(totalTime / 60)
        let sec = parseInt(totalTime % 60)

        if (min === 0 && sec === 0) window.location.reload()

        if (sec <= 9) sec = `0${sec}`

        totalTime--
        setTimer(`0${min}:${sec}`)
      }, 1000)
    }

    useEffect(timerFunction, [])

    return (
      <div className={classes.sendPayReq}>
        <div className='normalText upiGrey'>
          Payment request sent to <span className='upiBlack'>{upiId}</span>
        </div>

        <div>
          <div className='completeThePayment normalText'>
            Complete the payment on the UPI app in
          </div>
          <div className='refreshAlert'>
            Please do not refresh the page, this page automatically will be
            refreshed
          </div>
        </div>

        <div className='paymentConfirmationTimer' id='upiTimer'>
          {timer}
        </div>

        <div className='stepsContainer'>
          <div className='iconContainer'>
            <div className='upiPayIcon'>
              <img src={upiIcon} alt='' height='66' />
            </div>
            <div className='upiPayDivider'>
              <img src={divider} alt='' />
            </div>
            <div className='upiPayTouchIcon'>
              <img src={touchIcon} alt='' height='63' />
            </div>
          </div>

          <div className='iconsTitle'>
            <div className='upiPayTitleText'>Open the UPI app</div>
            <div className='upiPayTitleText'>Comple the payment</div>
          </div>
        </div>

        <div className='upiPayCancelButton'>
          <Button onClick={() => setSendPaymentRequest(false)}>cancel</Button>
        </div>
      </div>
    )
  }

  return (
    <>{sendPaymentRequest ? <PaymentRequestSent /> : <EnterUPIAndVerify />}</>
  )
}
