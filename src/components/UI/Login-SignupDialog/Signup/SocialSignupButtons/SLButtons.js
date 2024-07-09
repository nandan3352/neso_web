import React from 'react'
import './SLButtons.css'
import facebook from '../../../../../assets/images/SocialLoginButtonIcons/facebook.svg'
import google from '../../../../../assets/images/SocialLoginButtonIcons/google.svg'
import mobile from '../../../../../assets/images/SocialLoginButtonIcons/mobile.svg'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { SnackbarEvent, useEventDispatch } from '../../../../../Services/Events'
import { useNavigate } from 'react-router-dom'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { checkIfNewUser } from '../../../../../Services/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 390,
    /* position: 'absolute',
    bottom: 20, */

    [theme.breakpoints.down('sm')]: {
      bottom: 99,
    },

    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      marginTop: 48,
      bottom: 0,
    },

    '& > .MuiButtonBase-root': {
      display: 'block',
      margin: '16px 0px',
      maxWidth: 390,
      width: '100%',
      textTransform: 'none',
      padding: 10,
    },

    '& .MuiButton-outlined': {
      border: '1px solid rgba(var(--theme-divider))',
      borderRadius: 4,
      height: 48,
    },
  },

  socialButton: {
    width: 'fit-content',
    margin: 'auto',
    display: 'flex',
  },
}))

function SLButtons({ navigate, signUp, setMobileSignup, setMobileLogin, postProcess }) {
  const classes = useStyles()
  const dispatchSnackbar = useEventDispatch(SnackbarEvent)
  const auth = getAuth()
  const history = useNavigate()

  const SLpostProcess = async (res, provider) => {
    postProcess(
      await checkIfNewUser(res,{
          name: res.user.displayName,
          mail: res.user.email,
          provider: provider,
          imgURL: res.user.photoURL
        }, history, navigate),res.user)

  }

  function handleError(error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      dispatchSnackbar({ msg: 'Account already exist with email', open: true })
    } else {
      dispatchSnackbar({ msg: 'Something went wrong.', open: true })
    }
    console.log(error.message, error.code)
  }

  const facebookSignupHandler = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .then((res) => {
        SLpostProcess(res, FacebookAuthProvider.PROVIDER_ID)
      })
      .catch((error) => {
        handleError(error)
      })
  }

  const googleSignupHandler = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((res) => {
        SLpostProcess(res, GoogleAuthProvider.PROVIDER_ID)
      })
      .catch((error) => {
        handleError(error)
      })
  }

  const handleMobile = (e) => {
    if (signUp) {
      setMobileSignup(true)
    } else {
      setMobileLogin(true)
    }
  }

  return (
    <div className={classes.root}>
      <Button variant='outlined' onClick={googleSignupHandler}>
        <div className={classes.socialButton}>
          <div className='bLogo'>
            <img src={google} alt='google' />
          </div>
          <div className='bTextGoogle'>Continue with Google</div>
        </div>
      </Button>

      <Button variant='outlined' onClick={facebookSignupHandler}>
        <div className={classes.socialButton}>
          <div className='bLogo'>
            <img src={facebook} alt='facebook' />
          </div>
          <div className='bTextFacebook'>Continue with Facebook</div>
        </div>
      </Button>

      <Button variant='outlined' onClick={handleMobile}>
        <div className={classes.socialButton}>
          <div className='bLogo'>
            <img src={mobile} alt='mobile' />
          </div>
          <div>
            <span className='bTextMobile'>Continue with mobile</span>
          </div>
        </div>
      </Button>
    </div>
  )
}

export default SLButtons
