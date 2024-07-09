import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Plutonium from '../../../../assets/images/Logos/Plutonium.svg'
import Radium from '../../../../assets/images/Logos/Radium.svg'
import Uranium from '../../../../assets/images/Logos/Uranium.svg'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 78,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    borderRadius: 4,
    boxSizing: 'border-box',
    alignItems: 'center',
    border: '1px solid',
    marginTop: 11,

    '&:first-child': {
      marginTop: 0
    },

    '& .subscription': {
      height: 56,
      width: 100,
      margin: 'auto',
      padding: 5,

      '& img': {
        height: '100%',
        width: '100%',
      },
    },

    '& .subscriptionPlan': {
      height: 'fit-content',
      margin: 'auto',

      '& .subscriptionPlanName': {
        color: theme.palette.text.primary,
        fontSize: 16,
        lineHeight: '24px',
        textTransform: 'capitalize',
      },

      '& .subscriptionPlanPrice': {
        lineHeight: '20px',
        fontSize: 14,
        color: theme.palette.text.secondary,
        letterSpacing: 0.25,
      },
    },

    '& .validity': {
      textAlign: 'center',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',

      '& .validityPrice': {
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0.15,
        fontWeight: 500,
        color: theme.palette.text.primary,
      },

      '& .fuelDuration': {
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: theme.palette.text.secondary,
      },
    },
  },

  mobilePriceButton: {
    height: 68,
    width: '100vw',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    padding: 16,
    display: 'flex',
    position: 'fixed',
    background: 'var(--theme-background-surface)',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',

    '& .priceButtonPackage': {
      display: 'flex',
      '& .priceButtonPackageName': {
        margin: 'auto',
        textTransform: 'capitalize',
        fontSize: 20,
        lineHeight: '24px',
        fontWeight: 500,
        letterSpacing: 0.15,
        color: theme.palette.text.primary,
      },
      '& .savedMoneyAlert': {
        margin: 'auto',
        marginLeft: 8,
        borderRadius: 4,
        background: 'rgba(39, 174, 96, 0.12)',
        padding: '4px 8px',
        fontSize: 12,
        lineHeight: '16px',
        color: '#27AE60',
        letterSpacing: 0.4,
      },
    },

    '& .MuiButton-root': {
      padding: 0,
      letterSpacing: 0.25,
      lineHeight: '16px',
      height: 36,
      width: 89,
      fontSize: 14,
      fontWeight: 500,
      color: theme.palette.text.buttonFilled,
      background: theme.palette.secondary.main,
    },
  },
}))

export default function MobileFuelCard({
  data,
  name,
  onClick,
  price,
  symbol,
  selected,
  savedMoney,
  setPackage,
  subscriptionCode,
  validityDuration,
}) {
  const classes = useStyles()

  const theme = useTheme()

  const dynamicRootStyles = {
    borderColor: selected ? '#228586' : theme.palette.divider,
    background: selected ? 'rgba(34, 133, 134, 0.08)' : '',
  }


  const clickHandler = () => {
    data.symbol = symbol;
    data.price = data.price / 100;
    data.saved = data.saved / 100;
    onClick({
      name: name,
      data: data,
    })
  }

  const getppm = () => parseInt(price) / parseInt(validityDuration)

  return (
    <>
      <div
        className={classes.root}
        style={dynamicRootStyles}
        onClick={() => setPackage(name)}>
        <div className='subscription'>
          <img
            src={
              subscriptionCode === 'R'
                ? Radium
                : subscriptionCode === 'P'
                  ? Plutonium
                  : Uranium
            }
            alt={subscriptionCode}
          />
        </div>

        <div className='subscriptionPlan'>
          <div className='subscriptionPlanName'>{name}</div>
          <div className='subscriptionPlanPrice'>{symbol + "" + getppm()}/month</div>
        </div>

        <div className='validity'>
          <div className='validityPrice'>{symbol + "" + price + "*"}</div>
          <div className='fuelDuration'>{validityDuration}</div>
        </div>
      </div>

      {selected && (
        <div className={classes.mobilePriceButton}>
          <div className='priceButtonPackage'>
            <div className='priceButtonPackageName'>{name}</div>
            {savedMoney !== 0 ? <div className='savedMoneyAlert'>Save {symbol + "" + savedMoney}</div> : ""}
          </div>
          <div>
            <Button variant='contained' onClick={clickHandler}>
              pay {symbol + "" + price}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
