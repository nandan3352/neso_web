import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, MenuItem, TextField } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 420,
    background: '#F8F9FB',
    padding: '25px 36px 36px 64px',
    boxSizing: 'border-box',

    '& .bankTableContainer': {
      height: 182,
      width: 372,
      background: '#ffffff',

      '& table, th, td': {
        border: '1px solid rgba(var(--theme-divider))',
      },

      '& > table': {
        height: '100%',
        width: '100%',
      },
    },

    '& .bankSelectorNetbanking': {
      width: 372,
      marginTop: 32,
      height: 54,

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
      },
    },

    '& .netBankingPayNowButton': {
      float: 'right',
      marginTop: 36,

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
      },
    },
  },
}))

export default function Netbanking({ price }) {
  const classes = useStyles()

  // useEffect(async () => {
  //   const res = await axios.get('https://api.razorpay.com/v1/methods', {
  //     auth: {
  //       username: 'rzp_test_YNzWS79mC1j4AC',
  //     },
  //   })

  // }, [])

  return (
    <div className={classes.root}>
      <div className='bankTableContainer'>
        <table>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
      </div>

      <div className='bankSelectorNetbanking'>
        <TextField variant='outlined' label='Select a different bank' select>
          <MenuItem>Bank of Baroda</MenuItem>
          <MenuItem>Bank of Barodi</MenuItem>
          <MenuItem>Bank of Barodu</MenuItem>
          <MenuItem>Bank of Barode</MenuItem>
          <MenuItem>Bank of Barodt</MenuItem>
        </TextField>
      </div>

      <div className='netBankingPayNowButton'>
        <Button variant='contained'>pay ₹{price} </Button>
      </div>
    </div>
  )
}
