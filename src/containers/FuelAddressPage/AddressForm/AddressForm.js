import React, { useEffect, useState } from 'react'
import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CountryList from '../../../lib/countryCode.json'
import axios from 'axios'
import { useUser } from '../../../Services/Auth'
import { databaseUpdate } from '../../../Services/Database'

const useStyles = makeStyles((theme) => ({

  responsiveFields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridColumnGap: 22,
    [theme.breakpoints.down('sm')]: {
      gridColumnGap: 18,
    }
  },

  stateLoading: {
    display: "flex",
    justifyContent: "center",
  },

  root: {
    margin: 'auto',
    marginTop: 20,
    width: '100%',
    maxWidth: 762,

    '& .addressheader': {
      fontSize: 20,
      textAlign: 'center',
      lineHeight: '24px',
      letterSpacing: 0.15,
      fontWeight: 500,
    },

    '& .formGridContainer': {
      marginTop: 35,

      [theme.breakpoints.down(469)]: {
        marginTop: 24,
      },

      '& .MuiFormControl-root': {
        width: '100%',
        maxWidth: 370,
        height: 52,

        [theme.breakpoints.down(469)]: {
          maxWidth: '100%',
        },

        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginTop: -1,
        },

        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: '#f44336',
        },

        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#018786 !important',
        },

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.divider,
        },

        '& .MuiFormLabel-root.Mui-focused': {
          color: theme.palette.secondary.main,
        },

        '& input[type=number]': {
          '-moz-appearance': 'textfield',
        },
      },

      '& .userAddress': {
        gridColumnStart: 1,
        gridColumnEnd: 3,
        '& .MuiFormControl-root': {
          width: '100%',
          height: 'auto',
          maxWidth: 762,

          '& .MuiOutlinedInput-multiline': {
            minHeight: 100,
            width: '-webkit-fill-available',
          },

          '& .MuiOutlinedInput-root': {
            height: 'inherit',
            padding: 15,
          },

          '& .MuiInputBase-root': {
            display: 'block',
          },
        },
      },
    },

    '& .addressSaveButton': {
      margin: 'auto',
      marginTop: 40,
      width: 328,

      [theme.breakpoints.down(469)]: {
        width: '92%',
        position: 'fixed',
        bottom: 11,
        left: 16,
        right: 16,
        zIndex: 2,
      },

      '& .MuiButtonBase-root': {
        width: '100%',
        color: '#ffffff',
        background: theme.palette.secondary.main,
        boxShadow: 'none',
        height: 48,
      },
    },
  },
}))

export default function AddressForm({
  onClose,
  editAddress,
  userAddress,
  setUserAddress,
  setConfirmAddress,
  setIsUserAddressAvailable,
}) {

  const [address, setAddress] = useState(userAddress)
  const [loading, setLoading] = useState(false)
  const [stateList, setStateList] = useState([])
  const [isPinValid, setIsPinValid] = useState(true)
  const [isPhoneNumberValid, setIsphonenumberValid] = useState(true)

  const user = useUser()

  useEffect(() => {
    if (address && address.country && stateList.length === 0) {
      setStateFromCountry(getCountryCode(address.country))
    }
  }, [])

  const setStateFromCountry = (code) => {
    setStateList([])
    axios({
      method: 'post',
      url: 'https://us-central1-neso-c53c4.cloudfunctions.net/getStates',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ code: code }),
    })
      .then((res) => setStateList(res.data.data))
      .catch((err) => console.log(err))
  }

  const validatePIN = (str) => {
    if (address.country.toLocaleLowerCase() === 'india') {
      let regex = /^[1-9][0-9]{5}$/
      let isValid = regex.test(str)
      setIsPinValid(isValid)
      return isValid
    } else {
      setIsPinValid(true)
      return true
    }
  }

  function handlePincodeChange(event) {
    const { value } = event.target
    if (value.length > 6) return
    validatePIN(value)
    updateFields(event.target)
  }

  function handlePhNoChange(event) {
    const { value } = event.target
    if (isNaN(value)) return
    if (!isPhoneNumberValid)
      setIsphonenumberValid(true)
    updateFields(event.target)
  }

  function handleCountryChange(event) {
    updateFields(event.target, { state: "" })
  }

  function handleFieldChange(event) {
    updateFields(event.target)
  }


  function updateFields({ name, value }, update = {}) {
    setAddress((prevState) => {
      return {
        ...prevState,
        ...update,
        [name]: value,
      }
    })
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    if (address.number.length < 6 || address.number.length > 15) {
      setIsphonenumberValid(false)
      setLoading(false)
      return
    }
    if (isPinValid && isPhoneNumberValid) {
      if (setIsUserAddressAvailable) {
        databaseUpdate(`Users/${user.uid}`, {
          billaddress: address,
        }).then(() => {
          setUserAddress(address)
          setIsUserAddressAvailable(true)
          onClose()
        }).catch((err) => {
          console.log(err); setLoading(false);
        })
      } else {
        setUserAddress(address)
        setConfirmAddress(true)
      }
    }
    else {
      setLoading(false)
    }
  }

  const classes = useStyles()
  const countriesList = CountryList

  const getCountryCode = (country) => countriesList.find(p => p.name === country).code


  return (
    <div className={classes.root}>
      <div className='addressheader'>
        {editAddress ? 'Edit address' : 'Add an address'}
      </div>

      <form onSubmit={SubmitHandler} autoComplete='off'>
        <div className='formGridContainer'>
          <div>
            <TextField
              label='Full name'
              variant='outlined'
              name='name'
              onChange={handleFieldChange}
              value={address.name}
              required
              InputLabelProps={{ required: false }}
            />
          </div>
          <div>
            <TextField
              error={!isPhoneNumberValid}
              helperText={!isPhoneNumberValid && 'Enter a valid phone number'}
              label='Mobile number'
              variant='outlined'
              name='number'
              onChange={handlePhNoChange}
              value={address.number}
              required
              InputLabelProps={{ required: false }}
            />
          </div>

          <div>
            <TextField
              label='Country'
              variant='outlined'
              name='country'
              onChange={handleCountryChange}
              value={address.country}
              select
              required
              InputLabelProps={{ required: false }}>
              {countriesList.map((country) => (
                <MenuItem
                  key={country.code}
                  onClick={() => setStateFromCountry(country.code)}
                  value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField
              label='State'
              variant='outlined'
              name='state'
              onChange={handleFieldChange}
              value={address.state}
              select
              disabled={address.country ? false : true}
              required
              InputLabelProps={{ required: false }}>
              {stateList.length === 0 ?
                <div className={classes.stateLoading}>
                  <CircularProgress color='secondary' size={24} />
                </div> : stateList.map((state) => (
                  <MenuItem key={state.id} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div className={classes.responsiveFields}>
            <div>
              <TextField
                label='City'
                variant='outlined'
                name='city'
                onChange={handleFieldChange}
                value={address.city}
                required
                InputLabelProps={{ required: false }}
              />
            </div>
            <div>
              <TextField
                error={!isPinValid}
                helperText={!isPinValid && 'Enter a valid city pincode'}
                label='City Pincode'
                variant='outlined'
                name='pincode'
                onChange={handlePincodeChange}
                value={address.pincode}
                required
                InputLabelProps={{ required: false }}
              />
            </div>
          </div>
          <div className='userAddress'>
            <TextField
              multiline
              label='Address'
              variant='outlined'
              name='address'
              onChange={handleFieldChange}
              value={address.address}
              required
              InputLabelProps={{ required: false }}
            />
          </div>
        </div>
        <div className='addressSaveButton'>
          <Button type='submit' variant='contained' disabled={loading} >
            {loading ? <CircularProgress color='#FFFFFF' size={24} /> : "save and next"}
          </Button>
        </div>
      </form>
    </div>
  )
}
