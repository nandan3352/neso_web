import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Plutonium from '../../../assets/images/Logos/Plutonium.svg'
import Radium from '../../../assets/images/Logos/Radium.svg'
import Uranium from '../../../assets/images/Logos/Uranium.svg'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 216,
    padding: 16,
    borderRadius: 4,
    textAlign: 'center',
    boxSizing: 'border-box',

    '& .statusCardFuelImage': {
      margin: 'auto',
      height: 72,
      width: 133,

      '& img': {
        height: '100%',
      },
    },

    '& .statusCardStatus': {
      marginTop: 16,
      fontSize: 10,
      fontWeight: 500,
      lineHeight: '16px',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: theme.palette.text.secondary,
    },

    '& .runningStatus': {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
    },

    '& .statusGreen': {
      color: '#27AE60',
    },

    '& .statusCardFuelExpiryDate': {
      marginTop: 16,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0.5,
      color: theme.palette.text.secondary,

      '& > span': {
        fontWeight: 500,
        color: theme.palette.text.primary,
      },
    },

    '& .statusCardFuelPurchaseDate': {
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: 0.4,
      color: theme.palette.text.disabled,
    },

    '& .statusCardRefuelButton': {
      margin: '20px 0px 4px 0px',

      '& .MuiButton-root': {
        height: 36,
        width: 94,
        color: '#BF232D',
        borderColor: '#BF232D',
      },
    },
  },
}))

export default function FuelStatusCard({ running, name, fuelData }) {
  const classes = useStyles()

  const StatusActiveBackground = {
    border: '1px solid #27AE60',
    background: 'rgba(39, 174, 96, 0.08)',
  }

  const StatusExpiredBackground = {
    background: 'rgba(33, 33, 33, 0.08)',
    border: '1px solid rgba(var(--theme-divider))',
  }

  return (
    <div
      className={classes.root}
      style={running ? StatusActiveBackground : StatusExpiredBackground}
    >
      <div className='statusCardFuelImage'>
        <img
          src={
            name === 'radium'
              ? Radium
              : name === 'plutonium'
                ? Plutonium
                : Uranium
          }
          alt=''
        />
      </div>

      <div className='statusCardStatus'>status</div>
      <div className={`${running && 'statusGreen'} runningStatus`}>
        {running ? 'running' : 'expired'}
      </div>

      <div className='statusCardFuelExpiryDate'>
        {running ? "Empties" : "Emptied"} on{' '}
        <span>
          {fuelData.expiryDate}
        </span>
      </div>
      <div className='statusCardFuelPurchaseDate'>
        Purchased on {fuelData.purchasedDate}
      </div>

      {!running && (
        <div className='statusCardRefuelButton'>
          <Link to={{ pathname: '/fuel', state: { refuel: true } }}>
            <Button variant='outlined' color='secondary'>
              re-fuel
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
