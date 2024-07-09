import { Button, Dialog } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Plutonium from '../../../assets/images/Logos/Plutonium.svg'
import Uranium from '../../../assets/images/Logos/Uranium.svg'
import Radium from '../../../assets/images/Logos/Radium.svg'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',

    [theme.breakpoints.down(469)]: {
      flexDirection: 'column',
    },
  },

  asideImage: {
    width: 320,
    height: 360,

    [theme.breakpoints.down(469)]: {
      height: 200,
      width: 296,
    },
  },

  root: {
    width: 320,
    boxSizing: 'border-box',
    padding: 41,

    [theme.breakpoints.down(469)]: {
      width: 296,
      height: 286,
      padding: 0,
      paddingTop: 24,
    },

    '& .activationCardFuelLogo': {
      margin: 'auto',
      width: 160,
      height: 86,
      '& > img': {
        width: '100%',
        height: '100%',
      },
    },

    '& .activationCardGreetText': {
      marginTop: 38,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: 0.15,
      fontWeight: 500,
      textAlign: 'center',

      [theme.breakpoints.down(469)]: {
        marginTop: 24,
      },
    },

    '& .acticationCardText': {
      margin: 'auto',
      width: 191,
      marginTop: 16,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0.15,
      textAlign: 'center',
    },

    '& .activationCardDetailsButton': {
      margin: 'auto',
      marginTop: 30,
      width: 121,

      [theme.breakpoints.down(469)]: {
        marginTop: 18,
      },

      '& .MuiButton-root': {
        color: theme.palette.secondary.main,
      },
    },
  },
}))

export default function FuelDialog(props) {
  const classes = useStyles()

  if (!props.state) {
    return null
  }

  const plan = props.state.name

  if (!(['radium', 'plutonium', 'uranium'].includes(plan))) {
    return null
  }

  return (
    <>
      <Dialog {...props} maxWidth='md'>
        <div className={classes.container}>
          <div
            className={classes.asideImage}
            style={{
              background: `url(https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FFuelCongratsImg.webp?alt=media&token=9a243f44-4b55-45e3-aa45-a676737609c3)`,
              backgroundSize: 'cover',
            }}
          >
            {/* <img src={AsideImageCourses} alt='' /> */}
          </div>

          <div className={classes.root}>
            <div className='activationCardFuelLogo'>
              <img
                src={
                  plan === 'radium'
                    ? Radium
                    : plan === 'plutonium'
                      ? Plutonium
                      : Uranium
                }
                alt=''
              />
            </div>

            <div className='activationCardGreetText'>Congratulations!</div>

            <div className='acticationCardText'>
              You now have a gallon full of Neso Fuel
            </div>

            <div className='activationCardDetailsButton'>
              <Link to="/fuel">
                <Button>view details</Button>
              </Link>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
