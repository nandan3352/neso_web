import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, InputAdornment, TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Luhn from 'luhn'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 320,
    background: '#F8F9FB',
    boxSizing: 'border-box',
    padding: '32px 36px 36px 65px',

    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: -1,
    },

    [theme.breakpoints.down(469)]: {
      padding: 16,
      height: 244,
    },

    '& .creditCardNumber': {
      width: '100%',
      maxWidth: 370,
    },

    '& .expiryAndCVV': {
      width: '100%',
      marginTop: 21,
      maxWidth: 370,
      display: 'flex',
      gridColumnGap: 22,
      justifyContent: 'space-between',

      [theme.breakpoints.down(469)]: {
        marginTop: 16,
      },

      '& .expiryDuration': {
        minWidth: 212,

        '& .MuiInputAdornment-positionEnd': {
          color: theme.palette.text.secondary,
        },
      },

      '& .cardCVV': {
        width: '100%',
        maxWidth: 135,
        minWidth: 69,
      },
    },

    '& .cardPaymentDisclaimer': {
      marginTop: 21,
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: 0.4,
      color: theme.palette.text.secondary,

      [theme.breakpoints.down(469)]: {
        marginTop: 16,
      },
    },

    '& .cardPayNowButton': {
      float: 'right',
      marginTop: 36,

      [theme.breakpoints.down(469)]: {
        marginTop: 17,
      },

      '& .MuiButtonBase-root': {
        width: 156,
        height: 48,
        color: '#ffffff',
        background: theme.palette.secondary.main,
        boxShadow: 'none',
        fontSize: 14,
        lineHeight: '16px',
        letterSpacing: 1.25,
        fontWeight: 500,

        [theme.breakpoints.down(469)]: {
          height: 36,
          width: 102,
        },
      },
    },

    '& .MuiFormControl-root': {
      height: 54,
      width: '100%',

      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#018786 !important',
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.12)',
      },

      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
      },

      '& input[type=number]': {
        '-moz-appearance': 'textfield',
      },
    },
  },
}))

export default function PaymentCard({ price }) {
  const classes = useStyles()

  const [selectedDate, handleDateChange] = useState(null)
  const [card, setCard] = useState({
    cardNumber: '',
    cvv: '',
  })
  const [isCardNumberValidated, setIsCardNumberValidated] = useState(true)
  const [isCVVValidated, setIsCVVValidated] = useState(true)

  const validateCardNumber = (str) => {
    let isValid = Luhn.validate(str)
    setIsCardNumberValidated(isValid)
  }

  const validateCVV = (str) => {
    let regex = /^[0-9]{3,4}$/
    setIsCVVValidated(regex.test(str))
  }

  const changeHandler = (e) => {
    const { name, value } = e.target

    if (name === 'cardNumber') {
      validateCardNumber(value)
    } else {
      validateCVV(value)
    }

    setCard((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  return (
    <div className={classes.root}>
      <div className='creditCardNumber'>
        <TextField
          error={!isCardNumberValidated}
          helperText={!isCardNumberValidated && 'Incorrect entry'}
          name='cardNumber'
          label='Enter card number'
          variant='outlined'
          value={card.cardNumber}
          onChange={changeHandler}
          required
          InputLabelProps={{ required: false }}
        />
      </div>

      <div className='expiryAndCVV'>
        <div className='expiryDuration'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label='Expiry date (MM/YY)'
              views={['year', 'month']}
              value={selectedDate}
              onChange={handleDateChange}
              inputVariant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <ArrowDropDownIcon />
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className='cardCVV'>
          <TextField
            error={!isCVVValidated}
            helperText={!isCVVValidated && 'Incorrect entry'}
            name='cvv'
            label='CVV'
            type='password'
            variant='outlined'
            value={card.cvv}
            onChange={changeHandler}
            required
            InputLabelProps={{ required: false }}
          />
        </div>
      </div>

      <div className='cardPaymentDisclaimer'>
        Your card details will not be saved.
      </div>

      <div className='cardPayNowButton'>
        <Button variant='contained'>pay ₹{price} </Button>
      </div>
    </div>
  )
}
