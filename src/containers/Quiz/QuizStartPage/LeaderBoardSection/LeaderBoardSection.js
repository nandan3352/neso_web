import { CircularProgress, makeStyles, Table, TableContainer, TableRow } from "@material-ui/core"
import clsx from "clsx"
import { useUser } from "../../../../Services/Auth"
import LeaderBoardListItem from "./LeaderBoardListItem"
import LeaderBoardSectionHeader from "./LeaderBoardSectionHeader"
import "./hidableScroll.css"


const useStyle = makeStyles(theme => (
    {
        root: {
            width: '100%',
            height: 'inherit'//'calc(100% - 38px)'
        },

        '&::-webkit-scrollbar': {
            display: 'none'
        },

        flexBox: {
            display: 'flex',
            flexDirection: 'column',
        },

        leaderboardListContainer: {
            [theme.breakpoints.down('xs')]: {
                overflow: 'visible'
            },
            scrollbarWidth: 'none',
            overflow: 'auto',
            height: '100%',
            width: '100%',
        },

        leaderboardList: {
            height: '100%',
            paddingTop: theme.spacing(1),
        },
        spacer: {
            height: theme.spacing(1),
            '&:not(:first-child)': {
                borderLeft: `1px solid ${theme.palette.divider}`
            }
        },

        footerSpace: {
            '&:not(:first-child)': {
                borderLeft: `1px solid ${theme.palette.divider}`
            }
        },
        emptyListPlaceHolder: {
            ...theme.typography.subtitle1,
            display: 'flex',
            flexGrow: 1,
            color: theme.palette.text.secondary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        tableContainerRoot: props => ({
            height: props.canShowTable && '100%',
            [theme.breakpoints.down('xs')]: {
                overflowY: 'clip'
            }
        }),
    }
))


/**
 * 
 *  props.leaderBoard : 
 *      -1 -> loading
 * 
 */


const LeaderBoardSection = (props) => {


    const user = useUser()
    const leaderboardList = props.leaderBoard ? props.leaderBoard : []
    const canShowTable = !(leaderboardList === -1 || leaderboardList.length === 0)
    const classes = useStyle({ canShowTable })

    return (
        <>
            <TableContainer className={`${classes.tableContainerRoot} scroll-hide`}>
                <Table stickyHeader className={clsx(classes.root)}>
                    <LeaderBoardSectionHeader from={props.from} />
                    {canShowTable && props.from === "result" && <tr>
                        <td className={classes.spacer}></td>
                        <td className={classes.spacer}></td>
                        <td className={classes.spacer}></td>
                    </tr>}
                    {leaderboardList !== -1 && leaderboardList && leaderboardList.length !== 0 && (leaderboardList.map((data, i) => <LeaderBoardListItem highlight={user && (user.uid === data.id)} position={i + 1}  {...data} timestamp={data.timestamp.toMillis()} awards={i} />))}
                    {canShowTable && <tr style={{ height: '100%' }}>
                        <td className={classes.footerSpace}></td>
                        <td className={classes.footerSpace}></td>
                        <td className={classes.footerSpace}></td>
                    </tr>}
                </Table>
            </TableContainer>{
                leaderboardList === -1 || leaderboardList.length === 0 ? (
                    <div className={classes.emptyListPlaceHolder}>
                        {
                            leaderboardList === -1 ?
                                <CircularProgress style={{ padding: "32px 0px" }} color='secondary' />
                                : <div style={{ padding: "32px 0px" }}>
                                    Be the first one to be at the top.
                                </div>
                        }

                    </div>
                ) : <div />
            }
        </>
    )
}

export default LeaderBoardSection