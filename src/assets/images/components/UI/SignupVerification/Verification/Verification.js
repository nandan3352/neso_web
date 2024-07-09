import React, { useEffect, useState } from 'react'
import NesoLogo from '../../../../assets/images/Logos/NesoLogo.svg'
import NesoLogoDark from '../../../../assets/images/Logos/NesoLogoDark.svg'
import OTPForm from '../../MobileOTPVerification/OTPForm'
import Timeline from '../../Timeline/Timeline'
import './Verification.css'
import VerifiedUIComponent from '../verifiedUIComponent/verified'
import SetupProfile from '../SetupProfile/SetupProfile'
import { CircularProgress, Dialog, useTheme } from '@material-ui/core'
import { useLocation } from 'react-router'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

export default function Verification(props) {
  const theme = useTheme()
  const location = useLocation()
  const { name, number, verified, navigate } = location.state
  const [user, setUser] = useState('')
  const [userVerified, setUserVerified] = useState(Boolean(verified))
  const [userSetupProfile, setUserSetupProfile] = useState(false)

  const auth = getAuth()

  useEffect(() => {
    if (verified && !userVerified) {
      setUserVerified(true)
      return
    }

    if (!number) {
      return
    }

    let appVerifier = new RecaptchaVerifier(
      auth,
      'invisible-recatcha-container',
      {
        size: 'invisible',
      }
    )

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((e) => {
        setUser(e)
      })
      .catch((err) => console.log(err.message))
  }, [verified])

  return (
    <>
      {/* recpatcha container */}
      <span id='invisible-recatcha-container'></span>
      <Dialog style={{ zIndex: 1500 }} fullScreen open={true}>
        <div className='verificationContainer'>
          <div className='nesoLogo'>
            <img src={theme.palette.type === 'dark' ? NesoLogoDark : NesoLogo} alt='' />
          </div>

          <div className='mobileVerificationTimelineContainer'>
            {userSetupProfile ? (
              <Timeline two first='Verification' second='Profile set up' />
            ) : (
              <Timeline first='Verification' second='Profile set up' />
            )}
          </div>

          <div className='verificationBottomContainer'>
            {userSetupProfile ? (
              <SetupProfile navigate={navigate} />
            ) : userVerified ? (
              <VerifiedUIComponent setUserSetupProfile={setUserSetupProfile} />
            ) : (
              Boolean(user) ? <OTPForm
                user={user}
                number={number}
                name={name}
                setUserVerified={setUserVerified}
              /> : <CircularProgress color='secondary' size={24} />
            )}
          </div>
        </div>
      </Dialog>
    </>
  )
}
