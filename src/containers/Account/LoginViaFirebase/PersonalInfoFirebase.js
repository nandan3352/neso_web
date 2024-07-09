import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import NameChangeDialog from '../Dialogs/NameChangeDialog'
import PasswordDialog from '../Dialogs/PasswordDialog'
import AddMobileDialog from '../Dialogs/AddMobileDialog'
import DeleteAccount from '../DeleteAccount/DeleteAccount'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'column',
    gridRowGap: 16,

    [theme.breakpoints.down(469)]: {
      marginTop: 20,
    },

    '& .userInfoItem': {
      minHeight: 64,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [theme.breakpoints.down(469)]: {
        paddingRight: 19,
      },

      '& .changeButton .MuiButton-root': {
        width: 95,
      },

      '& .MuiButton-root': {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      },

      '& .PersonalUserInfo': {
        height: '100%',
        width: 360,
        boxSizing: 'border-box',
        padding: '9px 0px 12px 16px',

        '& .userInfoNormalText': {
          color: theme.palette.text.primary,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0.15,
        },

        '& .userInfoSmallText': {
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: 0.25,
          color: theme.palette.text.secondary,
        },
      },
    },

    '& .userDeleteAccount': {
      paddingLeft: 16,

      '& > div': {
        paddingTop: 24,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& .userDeleteNormalText': {
          width: 140,
          color: theme.palette.text.primary,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0.15,
        },

        '& .userDeleteSmallText': {
          width: 316,
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: 0.25,
          color: theme.palette.text.secondary,

          [theme.breakpoints.down(600)]: {
            width: '90%',
          },
        },
      },
    },
  },
}))

export default function PersonalInfoFirebase({ user }) {
  const classes = useStyles()

  const [showNameChange, setShowNameChange] = useState(false)
  const [showAddMobile, setShowAddMobile] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  const handleNameDilaogClose = () => setShowNameChange(false)
  const handleNameDialogClick = () => setShowNameChange(true)

  const handleMobileDilaogClose = () => setShowAddMobile(false)
  const handleMobileDialogClick = () => setShowAddMobile(true)

  const handlePasswordDialogClick = () => setShowPasswordChange(true)
  const handlePasswordDialogClose = () => setShowPasswordChange(false)


  return (
    <div className={classes.root}>
      <div className='userInfoItem'>
        <div className='PersonalUserInfo'>
          <div className='userInfoNormalText'>Name</div>
          <div
            className='userInfoSmallText'
            style={{ textTransform: 'capitalize' }}
          >
            {user.displayName}
          </div>
        </div>
        <div className='changeButton'>
          <Button variant='outlined' onClick={handleNameDialogClick}>
            change
          </Button>
        </div>
      </div>

      {user.email ? (
        <div className='userInfoItem'>
          <div className='PersonalUserInfo'>
            <div className='userInfoNormalText'>Email Address</div>
            <div className='userInfoSmallText'>{user.email}</div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className='userInfoItem'>
        <div className='PersonalUserInfo'>
          <div className='userInfoNormalText'>Mobile phone</div>
          <div className='userInfoSmallText'>
            {user.phoneNumber
              ? user.phoneNumber
              : 'Connect mobile number to log in with mobile.'}
          </div>
        </div>
        {user.phoneNumber ? (
          ''
        ) : (
          <div>
            <Button variant='outlined' onClick={handleMobileDialogClick}>
              Add
            </Button>
          </div>
        )}
      </div>

      {user.email ? (
        <div className='userInfoItem'>
          <div className='PersonalUserInfo'>
            <div className='userInfoNormalText'>Change password</div>
            <div className='userInfoSmallText'>••••••••</div>
          </div>
          <div className='changeButton'>
            <Button variant='outlined' onClick={handlePasswordDialogClick}>
              change
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}

      <DeleteAccount />

      <NameChangeDialog
        showNameChange={showNameChange}
        onClose={handleNameDilaogClose}
      />

      <PasswordDialog
        isAddPassword={false}
        show={showPasswordChange}
        onClose={handlePasswordDialogClose}
      />

      <AddMobileDialog
        showAddMobile={showAddMobile}
        onClose={handleMobileDilaogClose}
      />

    </div>
  )
}
