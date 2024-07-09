import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import './OTPForm.css'
import {
  Button,
  CircularProgress,
  DialogContentText,
  IconButton,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useNavigate } from 'react-router-dom'
import EventBus from '../../../lib/EventBus'
import { AuthDialogEvent, SnackbarEvent, useEventDispatch } from '../../../Services/Events'
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, updatePhoneNumber, updateProfile } from 'firebase/auth'
import { databaseUpdate } from '../../../Services/Database'

const useStyles = makeStyles((theme) => ({
  otpBackButton: props => ({
    position: 'absolute',
    top: 12,
    left: props.backButtonLeft || 52,
  }),

  OTPFormContainer: {
    boxSizing: 'border-box',
    width: 372,
    height: 'auto',
    minHeight: 382,
    margin: 'auto',

    [theme.breakpoints.down(469)]: {
      minHeight: 262,
    },

    [theme.breakpoints.down(410)]: {
      width: '100%',
      maxWidth: 312,
    },

    '& .otpHeader': {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: 0.15,
    },

    '& .otpDescription': {
      margin: 'auto',
      marginTop: 16,
      fontSize: 14,
      lineHeight: '20px',
      textAlign: 'center',
      letterSpacing: 0.25,
      width: '100%',
      maxWidth: 267,
    },

    '& .MuiCircularProgress-root': {
      height: '24px !important',
      width: '24px !important',
      color: 'var(--theme-secondary-main)',
    },
  },

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 40,

      [theme.breakpoints.down(410)]: {
        width: 25,
      },
    },

    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(var(--theme-divider))',
    },

    '& .MuiInput-underline:before': {
      borderBottom: '1px solid rgba(var(--theme-divider))',
    },

    '& .otpInputContainer': {
      textAlign: 'center',
      marginTop: 64,
      marginBottom: 36,

      [theme.breakpoints.down(469)]: {
        marginTop: 19,
        marginBottom: 16,
      },
    },

    '& .otpInputContainerLogin': {
      textAlign: 'center',
      marginTop: 102,
      marginBottom: 42,
    },
  },

  formFooter: {
    paddingTop: 24,
    textAlign: 'center',
  },
}))
/* global grecaptcha */
export default function OTPForm({
  name,
  number,
  user,
  deleteForm,
  addNumber,
  setShowOTPForm,
  showBackButton,
  setUserVerified,
  onClose,
  backButtonLeft,
  resendHandler,
  postDeleteHandle,
  loginPostProcess
}) {
  const [OTP, setOTP] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setconfirmation] = useState(user)
  const [codeResent, setCodeResent] = useState(false)
  const history = useNavigate()
  const dispatchSnackbar = useEventDispatch(SnackbarEvent)

  const auth = getAuth()

  useEffect(() => {
    if (Object.values(OTP).filter(p => p === '').length === 0) {
      const code = Object.values(OTP).reduce((a, p) => a + '' + p)
      if (deleteForm) {
        deleteUserHandler(code)
      } else if (addNumber) {
        addNumberHander(code)
      } else {
        submitHandler(code)
      }
    }

    return () => {

    }
  }, [OTP])


  const addNumberHander = (code) => {
    setLoading(true)

    if (code.length < 6) {
      return
    }

    const credential = PhoneAuthProvider.credential(confirmation.verificationId, code)
    updatePhoneNumber(auth, credential).then(e => {
      setLoading(false)
      dispatchSnackbar({ msg: 'Mobile number added successfully.', open: true })
      if (onClose) {
        onClose()
      }
    }).catch(e => {
      if (error.code === 'auth/invalid-verification-code') {
        setError('Invalid verification code')
      } else if (error.code === 'auth/phone-number-already-exists') {
        setError('The given mobile number is associated with another account.')
      } else {
        setError('Something went wrong')
      }
      setLoading(false)
      console.log(e.message)
    });

  }

  const deleteUserHandler = (code) => {
    setLoading(true)

    if (code.length < 6) {
      return
    }

    confirmation
      .confirm(code)
      .then((res) => {
        const name = res.user.displayName
        const cred = res.user.email || res.user.phoneNumber
        const uid = res.user.uid
        res.user
          .delete()
          .then(function () {
            if (postDeleteHandle) {
              postDeleteHandle({ cred, name, uid })
            }
          })
          .catch(function (error) {
            console.log(error)
            setLoading(false)
          })
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-verification-code') {
          setError('Invalid verification code')
        } else {
          setError('Something went wrong')
        }
        console.log(error.message)
        setLoading(false)
      })
  }

  const enableFocus = (id) => {
    if (id == 7) {
      /* if (!deleteForm) submitHandler() */
      return
    }
    if (id == 0) {
      return
    }

    let inputBox = document.getElementById(id)
    inputBox.focus()
  }

  const submitHandler = (code) => {
    setLoading(true)


    if (code.length < 6) {
      return
    }

    confirmation
      .confirm(code)
      .then((res) => {
        if (name) {
          updateProfile(res.user, {
            displayName: name,
          })
            .then(() => {
              setUserVerified(true)
              updateInDatabase(res.user.uid)
            })
        }

        
        loginPostProcess && loginPostProcess(false,res.user)
        

        //conflict handling  :)

       try{
        if (!res.additionalUserInfo.isNewUser && !setShowOTPForm) { //old user trying to signup
          history.replace('/')
          return
        }

        if (res.additionalUserInfo.isNewUser && setShowOTPForm) { //new user , tried to login
          history.push({
            pathname: 'user-verification',
            state: {
              verified: true
            },
          })
        }
       }catch(ignore){}
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-verification-code') {
          setError('Invalid verification code')
        } else if(error.code) {
          setError('Something went wrong')
        }
        setLoading(false)
        console.log(error, error.code)
      })
  }

  const handleBackKeyPressed = (event) => {
    var key = event.keyCode || event.charCode
    const name = event.target.name

    if (key == 8) {
      setOTP({
        ...OTP,
        [name]: '',
      })
      enableFocus(`${parseInt(event.target.id) - 1}`)
    }
  }

  const blockSpecialCharacter = (e) => {
    let key = e.key
    const name = e.target.name

    if (Boolean(error))
      setError('')

    if (key === ' ') {
      return
    }
    // 0-9
    if (!isNaN(key) /* keyCharCode >= 48 && keyCharCode <= 57 */ && !loading) {
      setOTP({
        ...OTP,
        [name]: key,
      })
      enableFocus(`${parseInt(e.target.id) + 1}`)
    }

    e.preventDefault()
    return false
  }

  const updateInDatabase = async (uid) => {
    try {
      await databaseUpdate(`Users/${uid}`, {
        name: name,
        mobileno: number,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    enableFocus('1')
  }, [])

  const classes = useStyles({ backButtonLeft })

  const handleResend = (e) => {
    setLoading(true)
    window.appVerifier = new RecaptchaVerifier(
      auth,
      'resend-recatcha-container',
      {
        size: 'invisible',
      }
    )
    signInWithPhoneNumber(auth, number, window.appVerifier)
      .then((e) => {
        setLoading(false)
        setconfirmation(e)
        setCodeResent(true)
        try {
          window.appVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          }).catch(e => { })
        } catch (e) { }
      })
      .catch((error) => {
        try {
          window.appVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          }).catch(e => { })
        } catch (e) { }
        setLoading(false)
        console.log(error)
      })

    if (resendHandler) {
      resendHandler()
    }
  }

  return (
    <>
      {showBackButton && (
        <div
          className={classes.otpBackButton}
          onClick={() => setShowOTPForm(false)}
        >
          <IconButton aria-label='back'>
            <ArrowBackIcon />
          </IconButton>
        </div>
      )}

      <div className={classes.OTPFormContainer}>
        <div className='otpHeader'>
          {deleteForm ? 'Delete this account' : 'Verify your account'}
        </div>

        <div className='otpDescription'>
          Please enter the verification code that we have sent to {number}
        </div>

        <div className='OtpForm'>
          <form className={classes.root} autoComplete='off'>
            <div
              className={
                setShowOTPForm ? 'otpInputContainerLogin' : 'otpInputContainer'
              }
            >
              <TextField
                InputLabelProps={{ required: false }}
                id='1'
                name='one'
                variant='standard'
                type='number'
                value={OTP.one}
                onKeyDown={handleBackKeyPressed}
                onKeyPress={blockSpecialCharacter}
                required
              />

              <TextField
                InputLabelProps={{ required: false }}
                id='2'
                name='two'
                variant='standard'
                type='number'
                value={OTP.two}
                onKeyDown={handleBackKeyPressed}
                onKeyPress={blockSpecialCharacter}
                required
              />

              <TextField
                InputLabelProps={{ required: false }}
                id='3'
                name='three'
                variant='standard'
                type='number'
                value={OTP.three}
                onKeyDown={handleBackKeyPressed}
                onKeyPress={blockSpecialCharacter}
                required
              />
              <TextField
                InputLabelProps={{ required: false }}
                id='4'
                name='four'
                variant='standard'
                type='number'
                value={OTP.four}
                onKeyDown={handleBackKeyPressed}
                onKeyPress={blockSpecialCharacter}
                required
              />
              <TextField
                InputLabelProps={{ required: false }}
                id='5'
                name='five'
                variant='standard'
                type='number'
                value={OTP.five}
                onKeyDown={handleBackKeyPressed}
                onKeyPress={blockSpecialCharacter}
                required
              />
              <TextField
                InputLabelProps={{ required: false }}
                id='6'
                name='six'
                variant='standard'
                type='number'
                value={OTP.six}
                onKeyDown={handleBackKeyPressed}
                onKeyPress={blockSpecialCharacter}
                required
              />
            </div>
          </form>
        </div>

        {loading || Boolean(error) ? (
          <div style={{ textAlign: 'center' }}>
            {Boolean(error) ? <div style={{ padding: '0px 8px', color: 'red' }} > {error} </div> : <CircularProgress />}
          </div>
        ) : (
          ''
        )}

        <DialogContentText>
          <div className={classes.formFooter}>
            Haven't recieved yet?{' '}
            <Button disabled={codeResent || loading} className='toggleButton' variant='text' onClick={handleResend}>
              RESEND
            </Button>
          </div>
        </DialogContentText>

        <span id='resend-recatcha-container'></span>

        {/*  {deleteForm ? (
          <Button
            variant='contained'
            onClick={deleteUserHandler}
            disabled={!OTP.six}
          >
            delete
          </Button>
        ) : (
          ''
        )} */}
      </div>
    </>
  )
}
