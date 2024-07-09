import React, { useState } from 'react'
import './SetupProfile.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from '../../../../Services/Auth'
import { Link } from 'react-router-dom'
import imageCompression from 'browser-image-compression'
import NameChangeDialog from '../../../../containers/Account/Dialogs/NameChangeDialog'
import { updateProfile, getAuth } from 'firebase/auth'
import { databaseUpdate } from '../../../../Services/Database'
import { ref, getStorage, uploadBytes, getDownloadURL, } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',

    '& .MuiButtonBase-root': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      marginTop: 40,
      [theme.breakpoints.down('xs')]: {
        marginTop: 32
      },
      backgroundColor: theme.palette.background.default
    },
  },

  icon: {
    color: theme.palette.secondary.main,
    height: 36,
    width: 36,
  },
}))

export default function SetupProfile({navigate}) {
  const currentUser = useUser()
  const [fileUrl, setFileUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [addname, setAddname] = useState(false)
  const clickHandler = () => {
    var input = document.getElementById('profilePictureInput')
    input.click()
  }

  const updateInDatabase = async (url) => {
    try {
      await databaseUpdate(`Users/${currentUser.uid}`, {
        imgURL: url,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const changeHandler = async (e) => {
    try {
      if (e.target.files.length === 0) return

      setUploading(true)

      const image = e.target.files[0]

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 200,
        useWebWorker: true
      }
      const compressedImg = await imageCompression(image, options)
      const auth = getAuth()
      const strInstance = getStorage()
      const storageRef = ref(strInstance, `userProfilePics/${currentUser.uid}`)

      await uploadBytes(storageRef, compressedImg)
      const imageUrl = await getDownloadURL(storageRef)

      const User = auth.currentUser
      updateProfile(User, {
        photoURL: imageUrl,
      })
        .then(() => {
          User.reload()
          setUploading(false)
          updateInDatabase(imageUrl)
        })
        .catch((err) => {
          setUploading(false)
          console.log(err)
        })
      setFileUrl(imageUrl)
    } catch (error) {
      console.log(error)
    }
  }

  const classes = useStyles()

  return (
    <div>
      <NameChangeDialog showNameChange={addname} onClose={() => setAddname(false)} />
      <div className='SetupProfileContainer'>
        <div>
          <div className='SPHeading'>Almost done!</div>
          <div className='SPHeading'>Let's set up a profile picture</div>
        </div>
        <div className='cameraContainer' onClick={clickHandler}>
          {fileUrl ? (
            <>
              <div className='profileImage'>
                <img src={fileUrl} alt='' />
              </div>
            </>
          ) : (
            <>
              {uploading ? <CircularProgress className={classes.icon} /> : <AddAPhotoIcon className={classes.icon} />}
            </>
          )}
          <input
            type='file'
            hidden='hidden'
            id='profilePictureInput'
            accept='image/*'
            onChange={changeHandler}
          />
        </div>

        <div>
          <div className='SPHeading userName'>{(currentUser && currentUser.name) || <Button color='secondary' variant='text' onClick={() => setAddname(true)}>Add Name </Button>}</div>
          <div className='SPSubHeading'>{(currentUser && (currentUser.email ||  currentUser.phNo)) || ''}</div>
          <div className='setupProfileButton'>
            <div className={classes.root}>
              <Link to={navigate || '/home'}>
                <Button variant='outlined'>
                  { navigate ? "CONTINUE" : "TAKE ME HOME"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
