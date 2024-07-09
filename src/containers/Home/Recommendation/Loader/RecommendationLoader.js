import { makeStyles } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton";



const useStyle = makeStyles((theme) => ({
    root: {
        paddingLeft: 20
    }
}))

const RecommendationLoader = () => {
    const classes = useStyle()
    return <>
        <div className={classes.root} >
            <Skeleton variant="rect" width="100%" height={142} />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
        </div>
        <div className={classes.root}>
            <Skeleton variant="rect" width="100%" height={142} />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
        </div>
        <div className={classes.root}>
            <Skeleton variant="rect" width="100%" height={142} />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
        </div>
        <div className={classes.root}>
            <Skeleton variant="rect" width="100%" height={142} />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
        </div>
    </>
}

export default RecommendationLoader