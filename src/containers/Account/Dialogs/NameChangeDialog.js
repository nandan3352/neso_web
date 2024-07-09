import { getAuth, updateProfile } from 'firebase/auth'
import { Button, CircularProgress, Dialog, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { databaseSet } from '../../../Services/Database'
import { SnackbarEvent, useEventDispatch } from '../../../Services/Events'

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.15,
    fontWeight: 500,
  },

  ChangeDialog: {
    width: 424,
    height: 340,
    padding: '32px 48px 36px 48px',
    display: 'flex',
    flexDirection: 'column',
    gridRowGap: 32,
    boxSizing: 'border-box',

    [theme.breakpoints.down(469)]: {
      width: '90vw',
      padding: '20px 24px',
      height: 316,
    },

    '& .MuiButton-root': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      width: 91,
    },

    '& .MuiTextField-root': {
      width: '100%',

      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
      },

      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },

      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
      },
    },

    '& .ChangeUpdateButton': {
      marginTop: 5,
      textAlign: 'center',
    },
  },

  dialog: {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down(469)]: {
        margin: 15,
      },
    },
  },
}))

export default function NameChangeDialog({ onClose, showNameChange }) {
  const classes = useStyles()
  const [nameChange, setNameChange] = useState({
    newName: '',
    confirmNewName: '',
  })
  const [error, setError] = useState('')
  const dispatchSnack = useEventDispatch(SnackbarEvent)
  const [loading, setLoading] = useState(false)

  const blockSpecialCharacter = (e) => {
    let key = e.key
    let keyCharCode = key.charCodeAt(0)

    if (key === ' ') {
      return
    }
    // 0-9
    if (keyCharCode >= 48 && keyCharCode <= 57) {
      return key
    }
    // A-Z
    if (keyCharCode >= 65 && keyCharCode <= 90) {
      return key
    }
    // a-z
    if (keyCharCode >= 97 && keyCharCode <= 122) {
      return key
    }

    e.preventDefault()
    return false
  }

  const changeHandler = (e) => {
    const { name, value } = e.target

    if (error) {
      setError('')
    }
    setNameChange((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const hanldeNameUpdateRequest = () => {
    if (nameChange.newName === nameChange.confirmNewName) {
      setLoading(true)
      const User = getAuth().currentUser
      updateProfile(User, {
        displayName: nameChange.newName,
      })
        .then(() => {
          databaseSet(`/Users/${User.uid}/name`, nameChange.newName)
          setNameChange({
            newName: '',
            confirmNewName: '',
          })
          setLoading(false)
          dispatchSnack({ msg: 'Your name has been updated successfully.', open: true })
          //refreshAuth()
          onClose()
        })
        .catch((err) => {
          setLoading(false)
          console.log(err);
        })
    } else {
      setLoading(false)
      setError('Name did not match.')
      /*  setNameChange({
         newName: '',
         confirmNewName: '',
       }) */
    }
  }

  return (
    <>
      <Dialog
        style={{ zIndex: 2300 }}
        open={showNameChange}
        onClose={onClose}
        maxWidth='md'
        className={classes.dialog}
      >
        <div className={classes.ChangeDialog}>
          <div className={classes.header}>Update name</div>

          <div>
            <TextField
              label='Name'
              type='text'
              InputLabelProps={{ required: false }}
              variant='outlined'
              name='newName'
              value={nameChange.newName}
              onChange={changeHandler}
              onKeyPress={blockSpecialCharacter}
              required
            />
          </div>
          <div>
            <TextField
              label='Confirm new name'
              error={Boolean(error)}
              helperText={error}
              InputLabelProps={{ required: false }}
              variant='outlined'
              name='confirmNewName'
              onChange={changeHandler}
              value={nameChange.confirmNewName}
              onKeyPress={blockSpecialCharacter}
              required
            />
          </div>

          <div className='ChangeUpdateButton'>
            <Button

              variant='outlined'
              onClick={hanldeNameUpdateRequest}
              disabled={loading || (!Boolean(nameChange.newName) && !nameChange.confirmNewName)}
            >
              {loading ? <CircularProgress color='secondary' size={24} /> : 'update'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
