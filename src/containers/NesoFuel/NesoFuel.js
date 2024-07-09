import React, { useState, useEffect } from 'react'

import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import MobileUpperFuelContainer from './mobile/MobileNesoFuel'
import FuelBenefitContainer from '../../components/UI/FuelBenefitContainer/FuelBenefitContainer'
import axios from "axios";
import { Helmet } from 'react-helmet'
import { useNavigate } from "react-router-dom"
import NesoLoader from '../../components/UI/LoadingIcon/NesoLoader'
import FuelCards from './FuelCards';
import { useUser } from '../../Services/Auth';
import { AuthDialogEvent, useEventDispatch } from '../../Services/Events';


const useStyle = makeStyles(theme => ({
  radiumCard: {
    order: 1,
    transformOrigin: 'center',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        transform: 'scale(1.153)'
      },
      "&:hover ~ $uraniumCard": {
        transform: 'scale(1)',
      }
    }
  },

  uraniumCard: {
    order: 3,
    transformOrigin: 'center',
    transform: 'scale(1.153)',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 22px',
      transform: 'scale(1)',
    }
  },

  plutoniumCard: {
    height: 'auto',
    width: 'auto',
    order: 2,
    margin: '0px 38px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 22px',
    },
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        transform: 'scale(1.1538)'
      },
      "&:hover ~ $uraniumCard": {
        transform: 'scale(1)',
      }
    }

  },
  Loader: {
    height: '95vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .MuiCircularProgress-colorPrimary': {
      color: theme.palette.secondary.main,
    },
  },
}))


export default function NesoFuel() {

  const classes = useStyle()

  const [nesoplans, setNesoplans] = useState(null);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(469))
  const dispatchAuth = useEventDispatch(AuthDialogEvent)
  const user = useUser()
  const history = useNavigate()


  useEffect(() => {
    var options = {
      method: "GET",
      url: "https://us-central1-neso-c53c4.cloudfunctions.net/fetchPlanDetails",
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/json",
      },
    };

    axios(options)
      .then((response) => {
        setNesoplans(response.data);
        return;
      }).catch((err) => {
        console.log("ERROR " + err);
      });
  }, []);



  const Loader = () => {
    return (
      <div className={classes.Loader}>
        <div>
          <NesoLoader />
        </div>
      </div>
    )
  }

  function gotoAddressPage(data) {
    if (user) {
      history.push({
        pathname: '/address',
        state: data,
      })
    } else {
      dispatchAuth({
        login: true,
        auth: true,
        navigate: {
          pathname: '/address',
          state: data,
        }
      })
    }

  }

  const planUIs = [
    {
      planName: "radium",
      style: classes.radiumCard,
      color: '#ADFF00',
      code: 'R'
    },
    {
      planName: "plutonium",
      style: classes.plutoniumCard,
      color: '#0047FF',
      code: 'P'
    },
    {
      planName: "uranium",
      style: classes.uraniumCard,
      color: '#7000FF',
      code: 'U'
    },
  ]

  if (!nesoplans) {
    return <Loader />
  }



  return (
    <>
      <Helmet>
        <title>Fuel | Neso Academy</title>
        <meta name="description" content="With Neso Fuel get access to all the paid content with Ad-free experience." />
      </Helmet>

      <div>
        {' '}
        {isMobile ?
          <MobileUpperFuelContainer
            planUIs={planUIs}
            planSelectedHandler={gotoAddressPage}
            nesoPlans={nesoplans} /> :
          (nesoplans &&
            <FuelCards
              planUIs={planUIs}
              nesoPlans={nesoplans}
              planSelectedHandler={gotoAddressPage} />)}
        {' '}
        <FuelBenefitContainer />
      </div>
    </>

  )
}
