import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  CardActionArea,
  Table,
  TableCell,
  TableRow,
} from '@material-ui/core'
import paytm from '../../../assets/images/Payment/Wallet/paytm.svg'
import phonepe from '../../../assets/images/Payment/Wallet/phonepe.svg'
import phonepeBlack from '../../../assets/images/Payment/Wallet/phonepeBlack.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 276,
    background: '#F8F9FB',
    boxSizing: 'border-box',
    position: 'relative',
    padding: '62px 36px 36px 64px',

    '& .walletPhonePeBlackIcon': {
      position: 'absolute',
      top: 33,
      right: 50,
      height: 76,
      width: 76,
    },

    '& .walletTableContainer': {
      height: 90,
      width: 292,
      background: '#ffffff',

      '& table, th, td': {
        textAlign: 'center',
        border: '1px solid rgba(var(--theme-divider))',
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0.15,
        fontWeight: 400,
      },

      '& > table': {
        height: '100%',
        width: '100%',

        '& tr': {
          display: 'flex',
          borderCollapse: 'initial',
        },

        '& td': {
          width: 146,
        },
      },
    },

    '& .walletPayButton': {
      float: 'right',
      marginTop: 40,

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

export default function Wallet({ price }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className='walletPhonePeBlackIcon'>
        <img src={phonepeBlack} alt='' />
      </div>

      <div className='walletTableContainer'>
        <Table>
          <TableRow>
            <CardActionArea>
              <TableCell>
                <div>
                  <img src={paytm} alt='paytm' />
                </div>
                <div>Paytm</div>
              </TableCell>
            </CardActionArea>

            <CardActionArea>
              <TableCell>
                <div>
                  <img src={phonepe} alt='PhonePe' />
                </div>
                <div>PhonePe</div>
              </TableCell>
            </CardActionArea>
          </TableRow>
        </Table>
      </div>

      <div className='walletPayButton'>
        <Button variant='contained'>pay ₹{price} </Button>
      </div>
    </div>
  )
}
