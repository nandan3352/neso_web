import { Container, Grid, makeStyles } from "@material-ui/core"
import { useState } from "react"
import SecondaryOutline1Button from "../../../../components/UI/Buttons/Secondary/Outline1/Button"
import { INCORRECT, LEFT, ZERO } from "../../QuizQuestionPage/QuizSelectorComponents/StatusIndicator"
import LeaderBoardSection from "../../QuizStartPage/LeaderBoardSection/LeaderBoardSection"
import QuizStartDialog from "../../QuizStartPage/QuizStartDialog"
import LeaderboardTopbar from "../../QuizStartPage/QuizStartTopbar/LeaderBoardTopbar"
import AnalyticItemHolder from "./AnalyticItemHolder"
import ProgressKeyComponent from "./ProgressKeyComponent"
import QuizAnalyticProgressBar from "./QuizAnalyticProgressBar"


const useStyle = makeStyles(theme => (
    {
        root: {
            paddingTop: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                paddingTop: 0
            },
            marginBottom: theme.spacing(3),
        },

        leftSection: {
            padding: '10px !important',
            [theme.breakpoints.down('xs')]: {
                padding: '0px !important'
            },
        },

        leaderBoardSectionRoot: {
            width: '100%',
            padding: '10px !important',
            [theme.breakpoints.down('xs')]: {
                padding: '0px !important'
            },
        },

        leaderBoardSection: {
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            position: 'relative',
            height: '100%',
            border: '1px solid rgba(var(--theme-divider))',
            [theme.breakpoints.down('sm')]: {
                minHeight: '500px',
            },
            [theme.breakpoints.down('xs')]: {
                border: 'none',
                marginLeft: -theme.spacing(2),
                marginRight: -theme.spacing(2)
            }
        },
        progressSection: {
            paddingLeft: 19,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            border: '1px solid rgba(var(--theme-divider))',
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(1),
                border: 'none'
            }
        },

        quizTitle: {
            ...theme.typography.h6,
            lineHeight: '24px',
            marginTop: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(2),
            }
        },

        marks: {
            ...theme.typography.subtitle1,
            color: theme.palette.text.secondary,
            marginTop: '4px',
            lineHeight: '24px',
        },

        flexContainer: {
            display: 'flex',
            flexDirection: 'column',
        },

        percentage: {
            ...theme.typography.h3,
            fontSize: 48,
            lineHeight: '56px',
            marginTop: 29,
            alignSelf: 'center',
            marginBottom: theme.spacing(4)
        },

        progressBar: {
            marginLeft: 13,
            marginRight: 26,
            [theme.breakpoints.down('xs')]: {
                marginLeft: 4,
                marginRight: 21,
            }
        },

        progressKey: {
            display: 'inline-flex',
            marginTop: theme.spacing(1),
            marginRight: 20,
            justifyContent: 'space-between',
            [theme.breakpoints.down('xs')]: {
                marginLeft: -5
            }
        },

        remarks: {
            ...theme.typography.subtitle1,
            lineHeight: '24px',
            alignSelf: 'center',
            marginRight: theme.spacing(4),
            marginLeft: 12,
            marginTop: 28,
            textAlign: 'center'
        },

        remarkHighlights: {
            paddingTop: '2px',
            paddingBottom: '2px',
            color: theme.palette.type === 'dark' ? '#D6ACFF' : '#5C2196',
            backgroundColor: 'rgba(77, 74, 242, 0.16)',
            borderRadius: '2px',
        },

        tryAgain: {
            alignSelf: 'center',
            marginTop: 20,
        },

        analyticsTitle: {
            ...theme.typography.subtitle2,
            color: theme.palette.text.secondary,
            marginTop: theme.spacing(3),
            marginLeft: 10,
            marginBottom: 6,
            [theme.breakpoints.down('xs')]: {
                marginLeft: 0,
            },
        },

        analyticGrid: {
            gridColumnGap: theme.spacing(2),
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: 10,
            marginBottom: theme.spacing(3),
            marginRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                marginLeft: 4,
                marginRight: 12,
            },
        },
        analyticGridItem: {
            width: 50,
            height: 32,
            [theme.breakpoints.down('xs')]: {
                width: 48,
                height: 24,
            },
            marginTop: theme.spacing(1)
        }
    }
))

function findRankFromLeaderboard(leaderBoard, marks, props) {
    const rankByuser = (leaderBoard.findIndex((e) => e.id === props.uid && e.marks === marks) + 1)
    if (rankByuser > 0) {
        return rankByuser
    }
    const rankByfilter = (leaderBoard.filter(p => p.marks >= marks).length)

    if (rankByfilter < 10) {
        return rankByfilter + 1
    }

    if (leaderBoard.length < 10) {
        return leaderBoard.length + 1
    }
    return null
}

const ResultOverviewSection = (props) => {
    const classes = useStyle()

    const { correct, wrong, percentage, marks, rank, btp, analytics } = props.result
    const leaderBoard = props.leaderboard
    const rankFromLeaderBoard = leaderBoard !== -1 && leaderBoard && findRankFromLeaderboard(leaderBoard, marks, props)
    const isMobileDisplay = props.isMobileDisplay

    const quizData = props.quizData

    const calculateRelativeRatio = (value) => (value / quizData.tq)

    const [tryAgain, setTryAgain] = useState(false)

    const handleTryAgain = () => {
        setTryAgain(!tryAgain)
    }



    const getRankString = (rank) => {

        if (!rank) {
            return '-'
        }

        if (['11', '12', '13'].includes(rank + ''))
            return `${rank}th`

        let lastDigit = (rank + '')[(rank + '').length - 1]
        switch (lastDigit) {
            case '1':
                return `${rank}st`
            case '2':
                return `${rank}nd`;
            case '3':
                return `${rank}rd`;
            default:
                return `${rank}th`;
        }
    }

    return (
        <div className={classes.root}>
            <QuizStartDialog fromMobile={isMobileDisplay} fromResult id={props.id} level={props.level} open={tryAgain} handleClose={handleTryAgain} data={quizData} />

            <Container >
                <Grid container justify="center" spacing={isMobileDisplay ? 0 : 3}  >
                    <Grid className={classes.leftSection} item sm={12} md={4} style={{ width: '100%', display: isMobileDisplay && props.selected === 1 ? 'none' : 'block' }} >
                        <div className={classes.progressSection}>
                            <div className={classes.quizTitle}>
                                {quizData.name}
                            </div>

                            <div className={classes.marks}>
                                {`Marks: ${marks}/${parseInt(props.level) === 2 ? (parseInt(quizData.tq) * 2) : quizData.tq}`}
                            </div>

                            <Grid container item >

                                <Grid item sm={6} md={12} style={{ width: '100%' }} >
                                    <div className={classes.flexContainer}>
                                        <div className={classes.percentage}>
                                            {`${Number(percentage)}%`}
                                        </div>

                                        <div className={classes.progressBar}>
                                            <QuizAnalyticProgressBar correctPercentage={calculateRelativeRatio(correct)} wrongPercentage={calculateRelativeRatio(wrong)} />
                                        </div>

                                        <div className={classes.progressKey}>
                                            <ProgressKeyComponent title="Correct" count={correct} color='#27AE60' />
                                            <ProgressKeyComponent title="Wrong" count={wrong} color='#EB5757' />
                                            <ProgressKeyComponent title="Left" count={quizData.tq - (correct + wrong)} color={false} />
                                        </div>
                                    </div>

                                </Grid>

                                <Grid item sm={6} md={12} >
                                    <div className={classes.flexContainer}>
                                        <div className={classes.remarks}>
                                            {
                                                Number(btp) < 0 ? "You're the first person to give this quiz." : <>
                                                    {"You did better than "}
                                                    <span style={{ paddingLeft: '8px', paddingRight: '8px' }}
                                                        className={classes.remarkHighlights} >
                                                        {`${btp !== undefined ? btp : ''}%`}
                                                    </span>
                                                    {" people taking this test, and you have scored the "}
                                                    <span style={{ paddingLeft: '8px', paddingRight: '8px' }}
                                                        className={classes.remarkHighlights}>
                                                        {getRankString(rankFromLeaderBoard || rank)}
                                                    </span>
                                                    {" rank."}
                                                </>
                                            }
                                        </div>

                                        <div className={classes.tryAgain}>
                                            <SecondaryOutline1Button
                                                onClick={handleTryAgain}
                                                content='Try Again'
                                                width='115px' />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className={classes.analyticsTitle}>Analytics </div>
                            <div className={classes.analyticGrid}>
                                {analytics.map((element, index) => {
                                    return <div className={classes.analyticGridItem}>
                                        <AnalyticItemHolder
                                            height={isMobileDisplay ? 24 : 32}
                                            width={isMobileDisplay ? 48 : 50}
                                            level={props.level}
                                            varient={(element.status === INCORRECT) && (props.level + '') === '1' ? ZERO : element.status} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </Grid>
                    <Grid item className={classes.leaderBoardSectionRoot} style={{ display: isMobileDisplay && props.selected === 0 ? 'none' : 'block' }} sm={12} md={6}>
                        <div className={classes.leaderBoardSection}>
                            <LeaderboardTopbar />
                            <LeaderBoardSection from="result" leaderBoard={leaderBoard} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>)
}


export default ResultOverviewSection