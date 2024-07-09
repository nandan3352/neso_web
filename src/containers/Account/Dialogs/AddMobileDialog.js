import {
  Button,
  Dialog,
  CircularProgress,
} from '@material-ui/core'
import React, { useState } from 'react'
import OTPForm from '../../../components/UI/MobileOTPVerification/OTPForm'
import { makeStyles } from '@material-ui/core/styles'
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'
import MobileNumberInput from '../../../components/MobileNumberInput/MobileNumberInput'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 424,
    minHeight: 276,
    boxSizing: 'border-box',
    padding: '32px 48px 48px 48px',

    [theme.breakpoints.down(469)]: {
      width: '90vw',
      padding: '20px 24px',
      height: 228,
      minHeight: 228,
    },

    '& .MuiTextField-root': {
      width: '100%',
      caretColor: theme.palette.secondary.main,
    },

    '& .MuiButton-outlined': {
      marginTop: 24,
      width: 107,
      height: 36,
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,

      [theme.breakpoints.down(469)]: {
        marginTop: 16,
      },
    },
  },

  header: {
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.15,
    fontWeight: 500,
    marginBottom: 32,
  },

  otpwrapper: {
    //height: 452,
    display: 'flex',
    paddingTop: 80,
    boxSizing: 'border-box',

    [theme.breakpoints.down(469)]: {
      height: 352,
      paddingTop: 40,
      width: '90vw',
    },

    '& .otpInputContainerLogin': {
      marginTop: 64,

      [theme.breakpoints.down(469)]: {
        marginTop: 30,
        marginBottom: 10,
      },
    },
  },

  paper: {
    scrollbarWidth: 'thin'
  },

  dialog: {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down(469)]: {
        margin: 15,
      },
    },
  },
}))

/* global grecaptcha  */

export default function AddMobileDialog({ showAddMobile, onClose }) {
  const classes = useStyles()
  const [user, setUser] = useState('')
  const [showOTPForm, setShowOTPForm] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [mobileCountryCode, setMobileCountryCode] = useState('+91')
  const [loading, setLoading] = useState(false)
  const auth = getAuth();

  const closehandle = () => {
    setShowOTPForm(false)
    setLoading(false)
    onClose()
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (mobileNumber.length === 0) {
      return
    }

    setLoading(true)

    let appVerifier = new RecaptchaVerifier(
      getAuth(),
      'invisible-recatcha-container',
      {
        size: 'invisible',
      }, 
    )


    signInWithPhoneNumber(auth, `${mobileCountryCode}${mobileNumber}`, appVerifier)
      .then((e) => {
        setUser(e)
        setLoading(false)
        setShowOTPForm(true)
        try {
          appVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          }).catch(e => { })
        } catch (e) { }
      })
      .catch((error) => {
        setMobileNumber('')
        setLoading(false)
        try {
          appVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          }).catch(e => { })
        } catch (e) { }

        // setError(error.message)
        console.log(error.message)
      })
  }

  if (showOTPForm) {
    return (
      <Dialog open={showAddMobile} onClose={closehandle} classes={{ paper: classes.paper }} className={classes.dialog}>
        <div className={classes.otpwrapper}>
          <OTPForm
            backButtonLeft={16}
            onClose={closehandle}
            addNumber={true}
            number={`${mobileCountryCode}${mobileNumber}`}
            user={user}
            setShowOTPForm={setShowOTPForm}
            showBackButton
          />
        </div>
      </Dialog>
    )
  }

  return (
    <div>
      <Dialog open={showAddMobile} onClose={closehandle} className={classes.dialog}>
        <div className={classes.root}>
          <div className={classes.header}>Add mobile phone</div>
          <div style={{ marginBottom: 24 }}>
            <MobileNumberInput
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              mobileCountryCode={mobileCountryCode}
              setMobileCountryCode={setMobileCountryCode}
            />
          </div>

          <span id='invisible-recatcha-container'></span>

          <div style={{ margin: 'auto', width: 107 }} onClick={submitHandler}>
            <Button disabled={loading} variant='outlined'>{loading ? <CircularProgress color='secondary' size={24} /> : 'send otp'}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
