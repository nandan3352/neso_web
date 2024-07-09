
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from '../../Services/Auth'
import FuelCard from './FuelCard/FuelCard'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 633,
        width: '100%',
        display: 'flex',
        background: theme.palette.container.paper,
    },

    plansContainer: {
        width: 'fit-content',
        margin: '0px auto',
        textAlign: 'center',
    },

    header: {
        marginTop: 48,
        fontSize: 24,
        color: theme.palette.text.primary,
        fontWeight: 500,
    },

    subHeading: {
        boxSizing: 'border-box',
        height: 48,
        width: 550,
        margin: 'auto',
        marginTop: 16,
        padding: '0px 20px',
        lineHeight: 1.4,
        color: theme.palette.text.secondary,
    },

    fuelCardContainer: {
        height: 407,
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2)
    },

   

    subtitleGst: {
        ...theme.typography.caption,
        color: theme.palette.text.disabled,
        marginTop: 24,

    },

   
}))

const FuelCards = ({ nesoPlans, planSelectedHandler, planUIs }) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.plansContainer}>
                <div className={classes.header}>Choose your plan</div>

                <div className={classes.subHeading}>
                    With Neso Fuel get access to all the paid content with Ad-free
                    experience
                </div>

                <div className={classes.fuelCardContainer}>

                    {planUIs.map(plan => {
                        return <FuelCard
                            data={nesoPlans[plan.planName]}
                            symbol={nesoPlans.symbol}
                            name={plan.planName}
                            color={plan.color}
                            onClick={planSelectedHandler}
                            subscriptionCode={plan.code}
                            className={plan.style}
                            savedMoney={nesoPlans[plan.planName]?.saved > 1 && (nesoPlans[plan.planName].saved / 100)}
                            price={nesoPlans[plan.planName]?.price / 100}
                            validityDuration={`${nesoPlans[plan.planName]?.duration} month${nesoPlans[plan.planName]?.duration > 1 ? "s" : ""}`} />
                    })}

                </div>

                <div className={classes.subtitleGst}> *All prices are GST exclusive and non-refundable </div>

            </div>
        </div>
    )
}


export default FuelCards