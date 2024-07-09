import { CircularProgress, Container, Grid, makeStyles } from "@material-ui/core"
import StatusIndicatorGuide from "../../QuizQuestionPage/QuizSelectorComponents/StatusIndicatorGuide"
import StatusIndicator, { CORRECT as correct, INCORRECT as wrong, LEFT as left } from "../../QuizQuestionPage/QuizSelectorComponents/StatusIndicator"
import SolutionOverview from "./SolutionsOverview"
import { useEffect, useRef } from "react"
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../../../components/UI/Ads/AdsContainer"
import { useSubscriptionListener } from "../../../../Services/Subscription"


const useStyle = makeStyles(theme => (
    {
        root: {
            height: 'auto',
            paddingTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                height: 'auto',
                paddingLeft: theme.spacing(1),
                paddingRight: theme.spacing(1),
            }
        },

        leftSectionFixedContainer: {
            alignSelf: 'flex-start',
            position: 'sticky',
            top: '128px',
            padding: '10px !important',
            [theme.breakpoints.down('sm')]: {
                top: 0,
                position: 'relative',
            }
        },

        rightSection: {
            padding: '10px !important',
        },
        navigatorSection: {
            marginLeft: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                marginLeft: theme.spacing(4)
            },
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            }
        },

        questionNavigator: {
            display: 'flex',
            gridColumnGap: 20,
            flexWrap: 'wrap',
        },

        flexContainer: {
            display: 'block',
            [theme.breakpoints.down('sm')]: {
                display: 'flex'
            }
        },

        analyticGuide: {
            paddingTop: 4,
            paddingBottom: 22,
            display: 'flex',
            paddingLeft: 18,
            borderBottom: '1px solid rgba(var(--theme-divider))',
            [theme.breakpoints.down('sm')]: {
                borderRight: '1px solid rgba(var(--theme-divider))',
                borderBottom: 'none',
                width: '100%',
                paddingRight: 36,
                alignItems: 'center',
            },
            [theme.breakpoints.down('xs')]: {
                paddingBottom: 0,
                border: 'none',
                paddingLeft: theme.spacing(1),
            }
        },

        analyticGuideItems: {
            display: 'block',
            '& > div': {
                marginTop: 12
            },
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                width: '100%',
                '& > div': {
                    marginTop: 0
                },
            }
        },

        analyticSection: {
            position: 'relative',
            border: '1px solid rgba(var(--theme-divider))',
            [theme.breakpoints.down('xs')]: {
                border: 'none',
            }
        },

        questionNavigatorTitle: {
            ...theme.typography.subtitle2,
            marginTop: 20,
            marginBottom: theme.spacing(4),
        },


        '&::-webkit-scrollbar': {
            display: 'none'
        },

        solutionScroll: {
            position: 'relative',
            width: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: "none",
            msOverflowStyle: "none",
        }
    }
))


const ResultSolutionSection = (props) => {
    const classes = useStyle()
    const analytics = props.analytics
    const questions = props.quizQuestions

    let questionRefs = []

    const leftSection = useRef(null)
    const leftSectionRoot = useRef(null)


    const handleScroll = (i) => {
        if (questionRefs[i] !== undefined)
            window.scrollTo({ top: questionRefs[i].offsetTop, behavior: 'smooth' })
    }

    const subscription = useSubscriptionListener()

    return (
        <Container className={classes.root}>
            <Grid alignContent='flex-start' container spacing={3} >
                <Grid className={classes.leftSectionFixedContainer} ref={leftSectionRoot} item xs={12} sm={12} md={3} >
                    <Grid ref={leftSection} className={classes.analyticSection} container>
                        <Grid item xs={12} sm={3} md={12} className={classes.flexContainer}>
                            <div className={classes.analyticGuide}>
                                <div className={classes.analyticGuideItems}>
                                    <StatusIndicatorGuide body="Correct" index={props.correct} status={correct} />
                                    <StatusIndicatorGuide body="Incorrect" index={props.wrong} status={wrong} />
                                    <StatusIndicatorGuide body="Left" index={props.left} status={left} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={9} sm={9} md={12}>
                            <div className={classes.navigatorSection}>
                                <div className={classes.questionNavigatorTitle}>
                                    Choose a question no.
                                </div>
                                <div className={classes.questionNavigator}>
                                    {analytics.map((element, index) => <StatusIndicator onClick={() => handleScroll(index)} index={index + 1} status={element.status} gridView={true} />)}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid className={classes.rightSection} item xs={12} sm={12} md={9}>
                    <div className={classes.solutionScroll} >
                    <AdsContainer path="result" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} rootStyle={{marginTop : 0}} />
                        {questions ?
                            questions.map((question, i) => {
                                return (<div ref={(inst) => questionRefs.push(inst)}>
                                    <SolutionOverview level={props.level} isMobileDisplay={props.isMobileDisplay} qNo={i + 1} question={question} analytic={analytics[i]} />
                                </div>)
                            }) : <CircularProgress style={{ position: 'relative', left: '50%', top: '25%' }} color='secondary' />}
                    </div>
                </Grid>
            </Grid>
        </Container>

    )
}


export default ResultSolutionSection