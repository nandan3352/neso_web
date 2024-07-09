import { makeStyles } from "@material-ui/core"

const useStyle = makeStyles(theme => (
    {
        root: {
            display: 'flex',
            marginBottom: 8,
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },

        leaderBoardtitle: {
            ...theme.typography.h6,
            lineHeight: '24px',
            marginTop: 24,
            marginLeft: 24,
            marginBottom: 4,
        }
    }
))

const LeaderboardTopbar = (props) => {
    const classes = useStyle()
    return (
        <div className={classes.root} >
            <div className={classes.leaderBoardtitle}>
                Leaderboard
            </div>
        </div>)
}


export default LeaderboardTopbar