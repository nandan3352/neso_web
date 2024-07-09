import { CircularProgress, makeStyles, Tab, Tabs, useMediaQuery, useTheme } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ResultOverviewSection from "./Overview/ResultOverviewSection"
import ResultSolutionSection from "./Solutions/ResultSolutionSection"
import { useUser } from "../../../Services/Auth"
import NetworkError from "../../NetworkErrorPage/NetworkError"
import { CORRECT, INCORRECT, LEFT } from "../QuizQuestionPage/QuizSelectorComponents/StatusIndicator"
import { firestoreGetDoc, useConditionalFetch } from "../../../Services/Database"
import { collection, getFirestore, limit, onSnapshot, orderBy, query, where } from "@firebase/firestore"
import { getFunctions, httpsCallable } from "@firebase/functions"


const useStyle = makeStyles(theme => (
    {
        root: {

        },

        loaderContainer: {
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
        },

        container: {
            marginTop: 56,
        },

        tabsRoot: {
            zIndex: 5,
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'fixed',
            top: 59,
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.down('xs')]: {
                top: 56
            }
        },

        tabsContainer: {
            paddingLeft: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 12,
            }
        },

        tabsIndicator: {
            backgroundColor: theme.palette.primary.main,
        },

        tabItemContainer: {
            ...theme.typography.subtitle2,
            textTransform: 'none',
            minWidth: 60,
            minHeight: theme.spacing(7),
            fontSize: '14px',
            lineHeight: '24px',
            fontWeight: '500',
            marginRight: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginRight: theme.spacing(2)
            },
            color: theme.palette.text.secondary,

            '&$selected': {
                color: theme.palette.primary.main,
            },
            '&:nth-child(2)': {
                display: 'none',
                [theme.breakpoints.down('xs')]: {
                    display: 'block',
                }
            }

        },

        centered: {
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'start'
            }
        },

        selected: {},
    }
))


/**
 * 
 * !Required!
 *  1. quizData
 *  2. id
 *  3. level
 * !Optional!
 *  4. analytics , marks (for revisited users)
 *  5. response
 * 
 */

//TODO :  btp calculation

const ResultMainPage = () => {

    const user = useUser()
    const classes = useStyle()
    const history = useNavigate()
    const theme = useTheme()
    const isMobileDisplay = useMediaQuery(theme.breakpoints.down('xs'))
    const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const quizStatus = history.location.state


    const id = quizStatus && quizStatus.id
    const level = quizStatus && quizStatus.level
    const quizData = quizStatus && quizStatus.quizData

    document.title = quizData.name + " | Neso Academy"


    const questions = useConditionalFetch("/QuizQuestions", id + "_", quizStatus && quizStatus.questions).data  // TODO : have conditional fetch here..


    const resultDataParser = (rawAnalytics, mark) => {
        /* Model -> s - status, uc - user choice , 0 -> left, 1 -> correct, -1 -> incorrect */
        const getStatus = (s) => s === 0 ? LEFT : (s === 1 ? CORRECT : INCORRECT)

        const correct = rawAnalytics.reduce((acc, q) => (q.s > 0 ? acc + q.s : acc), 0)
        const wrong = rawAnalytics.reduce((acc, q) => (q.s < 0 ? acc + Math.abs(q.s) : acc), 0)
        const left = quizData.tq - correct - wrong
        const percentage = mark < 0 ? 0 : ((mark / (quizData.tq * ((level + '' === '2' && 2) || 1))) * 100).toFixed(2)
        const analytics = rawAnalytics.map(a => ({ status: getStatus(a.s), answerChoosed: a.uc }))

        return { correct, wrong, left, percentage, analytics }
    }

    const betterThanPercentAndArbitaryRank = async (score) => {

        let stats;
        try {
            stats = (await firestoreGetDoc(`QuizStatistics/${id}`)).data()
        } catch (e) {

        }

        const { att, mean, sqmean } = stats ? stats : { att: 1, mean: 0, sqmean: 0 }

        let updatedAttempted = att + 1

        function ncdf(x, mean, std) {
            if (std === 0) { //if everyone got same mark
                return (x > mean ? 0.99 : 0)
            }
            x = (x - mean) / std
            let t = 1 / (1 + .2315419 * Math.abs(x))
            let d = .3989423 * Math.exp(-x * x / 2)
            let prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
            if (x > 0) prob = 1 - prob
            return prob
        }

        const btp = att === 1 ? -1 : (ncdf(score, mean, Math.sqrt((sqmean - (mean * mean)))) * 100)  //-1 indicates first attempt
        let arbitrary_rank = updatedAttempted - (updatedAttempted * (parseFloat(btp) / 100))
        setresult((result) => ({ ...result, btp: Number(btp.toFixed(2)), rank: 1 + Math.floor(arbitrary_rank < 10 ? 10 : arbitrary_rank) }))
    }

    const [tabSelected, setTabSelected] = useState(0)
    const [result, setresult] = useState(quizStatus && quizStatus.analytics ? { marks: quizStatus.marks, ...resultDataParser(quizStatus.analytics, quizStatus.marks) } : null)
    const [leaderboard, setLeaderboard] = useState(-1)
    /* false : initial fetching (no Error), null -> no error so far.. ,true -> error triggered  */
    const [error, setError] = useState(false)

    async function listenleaderboard() {
        return onSnapshot(query(collection(getFirestore(), `QuizStatistics/${id}/Leaderboard`), where("level", "==", parseInt(level)), orderBy('marks', 'desc'), orderBy('timestamp', 'asc'), limit(10)), (leaderBoard) => {
            setLeaderboard(leaderBoard.docs.map(d => ({ id: d.id, ...d.data() })))
        })
    }

    async function evaluateResult(quizStatus) {

        setError(null)

        if (!quizStatus || (quizStatus && quizStatus.analytics) || (quizStatus && !quizStatus.response)) {
            return
        }

        try {
            let result = await httpsCallable(getFunctions(), 'quizEvaluate')({
                "id": quizStatus.id,
                "level": quizStatus.level,
                "response": quizStatus.response
            })
            let result_data = result.data
            setresult({ marks: result_data.marks, rank: result_data.rank, btp: result_data.btp, ...resultDataParser(result_data.analytics, result_data.marks) })
        } catch (e) {
            setError(true)
            console.log(e);
        }
    }

    useEffect(() => {

        if (!result && !error && (error !== null)) {
            evaluateResult(quizStatus, user ? user.uid : null)
        } else if (result && result.btp === undefined) {
            betterThanPercentAndArbitaryRank(result.marks)
        }

        const lbUnsubscribe = listenleaderboard()

        return () => {
            if (lbUnsubscribe instanceof Function) {
                lbUnsubscribe()
            }
        }
    }, [quizStatus, result, user, error])


    if (quizStatus === undefined)
        history.goBack()

    if (result === null)
        return (<div className={classes.loaderContainer}>{
            error ?
                <NetworkError handle={() => setError(false)} info={"Sorry, You have encountered an network error"} /> :
                <CircularProgress color='secondary' />}
        </div>)


    const handleTabChange = (event, selectedTab) => {
        window.scrollTo({ top: 0 })
        setTabSelected(selectedTab)
    }


    return (
        <div className={classes.root}>
            <div className={classes.tabsRoot}>
                <Tabs
                    onChange={handleTabChange}
                    value={tabSelected}
                    classes={{ centered: classes.centered, indicator: classes.tabsIndicator, root: classes.tabsContainer }}
                    centered>
                    <Tab classes={{ selected: classes.selected, root: classes.tabItemContainer }} id='simple-tab-0' label="Overview" />
                    <Tab classes={{ selected: classes.selected, root: classes.tabItemContainer }} id='simple-tab-1' label="Leaderboard" />
                    <Tab classes={{ selected: classes.selected, root: classes.tabItemContainer }} id='simple-tab-2' label="Solutions" />
                </Tabs>
            </div>

            <div className={classes.container}>
                {(tabSelected === 0 || tabSelected === 1) ?
                    <ResultOverviewSection
                        leaderboard={leaderboard}
                        id={id}
                        uid={user.uid}
                        level={level}
                        isMobileDisplay={isMobileDisplay}
                        selected={tabSelected}
                        result={result}
                        quizData={quizData} /> :
                    <ResultSolutionSection
                        id={id}
                        level={level}
                        isTabletScreen={isTabletScreen}
                        correct={result['correct']}
                        wrong={result['wrong']}
                        left={quizData.tq - result['correct'] - result['wrong']}
                        isMobileDisplay={isMobileDisplay}
                        analytics={result['analytics']}
                        quizQuestions={questions} />}
            </div>

        </div>)
}

export default ResultMainPage