import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import Badge1 from '../../assets/images/Badges/Badge1.svg'
import Badge2 from '../../assets/images/Badges/Badge2.png'
import Badge3 from '../../assets/images/Badges/Badge3.svg'
import Badge4 from '../../assets/images/Badges/Badge4.svg'
import Badge5 from '../../assets/images/Badges/Badge5.svg'
import Badge6 from '../../assets/images/Badges/Badge6.svg'
import Badge7 from '../../assets/images/Badges/Badge7.png'
import Badge8 from '../../assets/images/Badges/Badge8.png'
import Badge9 from '../../assets/images/Badges/Badge9.png'
import Badge10 from '../../assets/images/Badges/Badge10.png'
import Badge11 from '../../assets/images/Badges/Badge11.png'
import { databaseOnce } from "../../Services/Database"


const useStyles = makeStyles((theme) => (
    {
        root: {
            height: '100%',
            width: '100%'
        }
    }
))


const getBadge = (b) => {
    switch (b) {
        case '1':
            return Badge1;
        case '2':
            return Badge2;
        case '3':
            return Badge3;
        case '4':
            return Badge4;
        case '5':
            return Badge5;
        case '6':
            return Badge6;
        case '7':
            return Badge7;
        case '8':
            return Badge8;
        case '9':
            return Badge9;
        case '10':
            return Badge10;
        case '11':
            return Badge11;
        default:
            return null;
    }
}

const UserSubscriptionBadge = ({ uid }) => {

    const [badge, setBadge] = useState(null)

    const classes = useStyles()


    useEffect(() => {
        if (uid)
            databaseOnce(`Subscriptions/${uid}`).then(snap => {
                if (snap && snap.val() && snap.val().nextpay > Date.now()) {
                    setBadge(snap.val().badge)
                }
            })
    }, [uid])

    return badge ? (<img className={classes.root} src={getBadge(badge)} alt="" />) : null
}

export default UserSubscriptionBadge