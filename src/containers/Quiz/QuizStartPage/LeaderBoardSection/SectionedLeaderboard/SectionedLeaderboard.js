import { collection, getDocs, getFirestore, limit, orderBy, query, where } from "@firebase/firestore";
import { makeStyles, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { useEffect, useState } from "react";
import LeaderBoardSection from "../LeaderBoardSection";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
    },

    accDetailRoot: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        height: "calc(100% - 1px)",
        flexDirection: "column",
        flexGrow: 1,
        padding: 0,
        '&$expanded': {
            margin: 0
        }
    },
    accSummaryRoot: {
        justifyContent: "start",
        padding: 0,
        marginLeft: 24,
        minHeight: 56,
        "&$expanded": {
            marginLeft: 24,
            minHeight: 56,
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 16,
            minHeight: 48,
            "&$expanded": {
                marginLeft: 16,
                minHeight: 48,
            },
        }
    },

    expandIcon: {
        borderRadius: "50%",
        backgroundColor: theme.palette.text.disabled,
        padding: 0,
        marginLeft: 16,
        "&:hover": {
            backgroundColor: theme.palette.text.disabled,
        }
    },

    accSummaryContent: {
        ...theme.typography.subtitle1,
        fontWeight: 700,
        paddingLeft: 12,
        margin: 0,
        flexGrow: 0,
        '&$expanded': {
            flexGrow: 0,
            margin: 0
        }
    },

    expanded: {

    },

    accRoot: {
        minHeight: 56,
        overflow: "hidden",
        backgroundColor: "transparent",
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 0
        },
        "& .MuiCollapse-entered": {
            height: "calc(100% - 56px) !important"
        },
        "& .MuiCollapse-wrapper": {
            height: "100%"
        },

        "& .MuiCollapse-wrapperInner": {
            "&>div": {
                height: "100%"
            }
        },
    },

}))

const SectionedLeaderboard = ({ id }) => {

    const classes = useStyle()

    const [expandedLevel, setexpandedLevel] = useState([1, 2])

    const [leaderboards, setLeaderboards] = useState({
        "1": -1,
        "2": -1
    })


    const levels = [1, 2]

    const toggleExpand = (level) => e => {
        setexpandedLevel(prev => (prev.includes(level) ? prev.filter(p => p !== level) : [...prev, level]))
    }

    async function fetchLeaderBoard(id, level) {
        const leaderBoard_snap = await getDocs(query(collection(getFirestore(), `QuizStatistics/${id}/Leaderboard`), where("level", "==", level), orderBy('marks', 'desc'), orderBy('timestamp', "asc"), limit(10)))
        setLeaderboards(prev => ({ ...prev, [level]: (leaderBoard_snap.size > 0 ? leaderBoard_snap.docs.map(d => ({ id: d.id, ...d.data() })) : null) }))
    }

    useEffect(() => {
        levels.forEach(l => fetchLeaderBoard(id, l))
    }, [id])

    return (<div className={classes.root}>
        {
            levels.map(l => (
                <Accordion TransitionProps={{ timeout: 0 }} style={{ maxHeight: (expandedLevel.length === 2 && window.innerWidth > 780 ? 280 : "none") }} classes={{ root: classes.accRoot, expanded: classes.expanded }} expanded={expandedLevel.includes(l)} onChange={toggleExpand(l)} >
                    <AccordionSummary expandIcon={<KeyboardArrowDown htmlColor="#FFFFFF" />} classes={{ expandIcon: classes.expandIcon, content: classes.accSummaryContent, root: classes.accSummaryRoot, expanded: classes.expanded }} >
                        Level {l}
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accDetailRoot }}>
                        <LeaderBoardSection leaderBoard={leaderboards[l]} />
                    </AccordionDetails>
                </Accordion>
            ))
        }
    </div >)
}

export default SectionedLeaderboard;