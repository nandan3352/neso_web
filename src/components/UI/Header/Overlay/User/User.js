import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Button } from '@material-ui/core'
import UserProfileImage from '../../../../ServiceComponent/UserProfileImage'
import { signout, useUser } from '../../../../../Services/Auth'
import AlertDialog from '../../../Quiz/AlertDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: 108,
    boxSizing: 'border-box',
    padding: '20px 0px 16px 20px',
    borderBottom: '1px solid rgba(var(--theme-divider))',
    display: 'flex',
    gridColumnGap: 24,

    '& .overlayUserImg': {
      height: 72,
      width: 72,

      '& img': {
        height: '100%',
        width: '100%',
        borderRadius: '100%',
      },
    },

    '& .overlayUserInfo': {
      '& .overlayUserName': {
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0.15,
        textTransform: 'capitalize',
      },

      '& .overlayUserEmail': {
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.25,
        color: theme.palette.text.secondary,
      },

      '& .overlayLogoutButton': {
        '& .MuiButton-root': {
          height: 18,
          width: 82,
          marginTop: 10,
          padding: 0,
          justifyContent: 'flex-start',
          color: theme.palette.secondary.main,
          letterSpacing: 1.25,

          '& .MuiSvgIcon-root': {
            height: 13.5,
            width: 13.5,
            marginLeft: 4,
          },
        },
      },
    },
  },
}))

export default function User({ handleClose }) {
  const classes = useStyles()
  const [confirm, setConfirm] = useState(false)
  const user = useUser()

  if (!user)
    return null

  const handleConfirm = () => setConfirm(_ => !_)

  const logout = () => {
    signout().then((_) => {
      handleClose()
    }).catch(e => console.log("Error", e))
    setConfirm(false)
  }

  return (
    <div className={classes.root}>
      <AlertDialog
        open={confirm}
        positive="logout"
        negative="No"
        negativeHandle={handleConfirm}
        positiveHandle={logout}
        handleClose={handleConfirm}
        title="Confirm logout"
        body="Are you sure?" />
      <div className='overlayUserImg'>
        <UserProfileImage width={72} img={user.profilePic} name={user.name} uid={user.uid} />
      </div>
      <div className='overlayUserInfo'>
        <div className='overlayUserName'>{user.name}</div>
        < div className='overlayUserEmail'>{user.email || user.phNo}</div>
        <div className='overlayLogoutButton'>
          {/* TODO : bug here */}
          <Button onClick={handleConfirm}>
            logout
            <ExitToAppIcon color="secondary" />
          </Button>
        </div>
      </div>
    </div >
  )
}
