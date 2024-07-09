import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Plutonium from '../../../assets/images/Logos/Plutonium.svg'
import Radium from '../../../assets/images/Logos/Radium.svg'
import Uranium from '../../../assets/images/Logos/Uranium.svg'
import Alert from '@material-ui/lab/Alert'
import { CardActionArea, useMediaQuery, useTheme } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 4,
    background: theme.palette.background.default,
    transition: 'linear 0.1s',
    boxSizing: 'border-box',
    position: 'relative',
    [theme.breakpoints.down(769)]: {
      width: '220px !important',
      marginTop: '35px !important',
      marginBottom: '48px !important',
    },
  },

  header: {
    borderRadius: '4px 4px 0px 0px',
    margin: 'auto',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '1.25rem',
    fontWeight: 500,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardBody: props => ({
    boxSizing: 'border-box',
    display: 'flex',
    border: `1px solid ${props.color}`,
    borderTop: 'none',
    flexDirection: 'column',
    borderRadius: '0px 0px 4px 4px'
  }),

  subscription: {
    '&': {
      display: 'flex',
    },

    '& > img': {
      margin: '20px auto',
      width: 'fit-content',
      height: 100,
    },
  },

  price: {
    '&': {
      color: theme.palette.text.primary,
      fontSize: 32,
      fontWeight: 500,
      flexGrow: 2,
      position: 'relative',
    },
  },

  priceAlert: {
    '& .MuiAlert-root': {
      padding: 0,
      marginTop: 16,
      width: 86,
      height: 32,
      fontSize: 14,
      fontWeight: 500,
      color: '#27AE60',
      textTransform: 'capitalize',
      position: 'absolute',
      left: '33%',
    },

    '& .MuiAlert-message': {
      padding: 0,
      margin: 'auto',
    },
  },

  cardBodyButton: {
    '&': {
      width: '75%',
      height: 36,
      borderRadius: 4,
      margin: '13px auto 24px auto',
      display: 'flex',
    },

    '& > div': {
      width: 'fit-content',
      margin: 'auto',
      textTransform: 'lowercase',
    },

    '&:hover': {
      cursor: 'pointer',
    },
  },

  buttonTxt: {
    fontWeight: 500,
    fontSize: 16,
  },

  smallGrey: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '24px',
    color: 'rgba(var(--theme-text-secondary))',
    position: 'absolute',
    top: 12,
  },
}))

export default function FuelCard({
  validityDuration,
  color,
  subscriptionCode,
  price,
  data,
  name,
  savedMoney,
  className,
  symbol,
  onClick
}) {
  const theme = useTheme()
  const isNotDesktop = useMediaQuery(theme.breakpoints.down(769))

  const dynamicCardStyles = {
    height: 353,
    width: isNotDesktop ? 234 : 220,
  }

  const dynamicBackgroundStyles = {
    background: color,
    color: color !== '#ADFF00' && '#FFFFFF',
  }

  const dynamicCardBodyStyles = {
    height: '85%',
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

  function getppm() {
    var ppm = price / parseInt(validityDuration);

    if (parseInt(ppm) === ppm) {
      return parseInt(ppm);
    } else return ppm.toFixed(2);
  }

  const classes = useStyles({ color })

  return (
    <div
      className={`${classes.card} ${className}`}
      style={dynamicCardStyles}>
      <div className={classes.header} style={dynamicBackgroundStyles}>
        {validityDuration}
      </div>
      <div className={classes.cardBody} style={dynamicCardBodyStyles}>
        <div className={classes.subscription}>
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
        <div className={classes.price}>
          <div>
            {symbol + "" + getppm()} <span className={classes.smallGrey}>/month</span>
          </div>
          {savedMoney && (
            <div className={classes.priceAlert}>
              <Alert icon={false} severity='success'>
                save {symbol + savedMoney}
              </Alert>
            </div>
          )}
        </div>

        <div
          className={classes.cardBodyButton}
          style={dynamicBackgroundStyles}
          onClick={clickHandler}>
          <CardActionArea>
            <div className={classes.buttonTxt} >{symbol + price + "*"}</div>
          </CardActionArea>
        </div>
      </div>
    </div>
  )
}
