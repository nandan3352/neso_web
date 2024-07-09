import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MobileFuelCard from '../FuelCard/Mobile/MobileFuelCard'

const useStyles = makeStyles((theme) => ({
  gstSub: {
    ...theme.typography.caption,
    color: theme.palette.text.disabled,
    textAlign: "center",
    marginTop: 16,
  },
  root: {
    width: '100%',
    padding: '0px 15px',
    boxSizing: 'border-box',

    '& .mobileFuelHeader': {
      fontSize: 20,
      color: theme.palette.text.primary,
      fontWeight: 500,
      marginTop: 32,
    },

    '& .mobileSubHeader': {
      fontWeight: 400,
      color: theme.palette.text.secondary,
      marginTop: 8,
      lineHeight: '24px',
    },

    '& .mobileSubscriptionsContainer': {
      marginTop: 32,
    },
  },
}))

export default function MobileNesoFuel({ planUIs, planSelectedHandler, nesoPlans }) {
  const classes = useStyles()
  const [packageName, setPackageName] = useState('uranium')

  return (
    <div className={classes.root}>
      <div className='mobileFuelHeader'>Choose your plan</div>
      <div className='mobileSubHeader'>
        With Neso Fuel get access to all the paid content with Ad-free
        experience
      </div>
      <div className='mobileSubscriptionsContainer'>
        {[...planUIs].reverse().map(plan => {
          return <MobileFuelCard
            data={nesoPlans[plan.planName]}
            symbol={nesoPlans?.symbol}
            name={plan.planName}
            color={plan.color}
            onClick={planSelectedHandler}
            subscriptionCode={plan.code}
            savedMoney={nesoPlans[plan.planName]?.saved && (nesoPlans[plan.planName].saved / 100)}
            price={nesoPlans[plan.planName]?.price / 100}
            validityDuration={`${nesoPlans[plan.planName]?.duration} month${nesoPlans[plan.planName]?.duration > 1 ? "s" : ""}`}
            setPackage={setPackageName}
            selected={packageName === plan.planName} />
        })}

        <div className={classes.gstSub} >*All prices are GST exclusive and non-refundable</div>

      </div>

    </div>
  )
}
