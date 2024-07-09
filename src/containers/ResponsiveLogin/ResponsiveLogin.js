import React, { useEffect, useState } from 'react'
import Aside from '../../components/UI/Login-SignupDialog/Aside/Aside'
import LoginForm from '../../components/UI/Login-SignupDialog/Login/LogInForm'
import SignupForm from '../../components/UI/Login-SignupDialog/Signup/SignupForm'
import { navigate } from 'react-router'
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useUser } from '../../Services/Auth'
import {useLocation, useNavigate} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  ResponsiveContainer: {
    position: 'relative',
    paddingTop: 32,
    width: '100%',
    maxWidth: 390,
    boxSizing: 'border-box',
    height: 739,
    margin: 'auto',

    [theme.breakpoints.down(469)]: {
      padding: '24px 16px',
      height: 'auto',
      minHeight: 584,
    },
  },
}))

export default function ResponsiveLogin() {
  const classes = useStyles()
  const history = useNavigate()
  const {navigate} = history.location.state || {}
  const [showLoginForm, setShowLoginForm] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(469))

  const largeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [sm, setsm] = useState(-1)
  const user = useUser()
  const [mobileAuthState, setMobileAuthState] = useState({
    signUp: false,
    signIn: false,
  });

  function setLoginUi(isSignIn) {
    setMobileAuthState({ signIn: false, signUp: false });
    setShowLoginForm(isSignIn);
  }

  function registerMobilePhonenavigate() {
    setMobileAuthState((prev) => ({ ...prev, signUp: true }));
    setShowLoginForm(false);
  }

  function loginMobilePhonenavigate() {
    setMobileAuthState((prev) => ({ ...prev, signIn: true }));
    setShowLoginForm(true);
  }


  useEffect(() => {
    setsm(prev => prev === -1 ? undefined : largeScreen)
  }, [largeScreen])


  if ((user && user.uid) || (sm !== undefined && sm !== -1 && sm)) {
    return <navigate to='/' />
  }

  function postProcess(nonavigate) {
    if (navigate && !nonavigate) { //if user is new, verification will handle the navigate
      history.push(navigate)
    }
  }

  return (
    <div>
      {!isMobile && 
        <div>
          <Aside />
        </div>
      }
      <div className={classes.ResponsiveContainer}>
        {showLoginForm ? (
          <LoginForm 
              navigate={navigate} 
              isMobile={isMobile} 
              postProcess={postProcess}
              setShowLoginForm={setLoginUi}
              isMobileLogin={mobileAuthState.signIn}
              mobileRegisterCb={registerMobilePhonenavigate} />
        ) : (
          <SignupForm 
                navigate={navigate} 
                isMobile={isMobile} 
                postProcess={postProcess}
                setShowLoginForm={setLoginUi} 
                isMobileRegister={mobileAuthState.signUp}
                mobileLoginCb={loginMobilePhonenavigate}/>
        )}
      </div>
    </div>
  )
}
