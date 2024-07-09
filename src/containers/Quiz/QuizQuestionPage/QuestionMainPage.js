import { CircularProgress, makeStyles, useMediaQuery, useTheme } from "@material-ui/core"
import QuestionPageTopbar from "./QuestionPageTopbar"
import QuestionInfoTopPanel from "./QuestionInfoTopPanel"
import QuestionSelectorDrawer from "./QuizSelectorComponents/QuestionSelectorDrawer"
import { ANSWERED, NOT_ANSWERED, NOT_VISITED, MARKED_FOR_REVIEW, CURRENT } from "./QuizSelectorComponents/StatusIndicator";
import QuizBottomButtonGroup from "./QuizBottomButtonGroup";
import QuestionBody from "./QuestionBody";
import DrawerToggleButton from "./QuizSelectorComponents/DrawerToggleButton";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useVideoDatabase as useQuizData } from "../../../Services/Database";
import EventBus, { QuizEventClearResponse } from "../../../lib/EventBus";
import { useNavigate } from "react-router-dom";
import AlertDialog, { getSubmissionAlertBody } from "../../../components/UI/Quiz/AlertDialog";
import QuizCalculator from "../QuizCalculator/QuizCalculator";
import QuizStartCounter from "./QuizStartCounter/QuizStartCounter";
import QuestionNoIndicatorPanel from "./QuestionNoIndicatorPanel";
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../../components/UI/Ads/AdsContainer";
import { useSubscriptionListener } from "../../../Services/Subscription";


const useStyle = makeStyles(theme => (
    {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            userSelect: 'none',
        },

        questionTopbar: {
            display: 'block',
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },

        questionMainBody: {
            display: 'flex',
            height: '100%'
        },

        '&::-webkit-scrollbar': {
            display: 'none'
        },

        questionLeftSectionRoot: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginRight: 0,
        },

        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 228,
        },

        progressBar: {
            color: theme.palette.secondary.main,
            alignSelf: 'center',
            position: 'absolute',
            top: '50%',
            marginTop: -40,

        },

        questionScroll: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            scrollbarWidth: "none",
            msOverflowStyle: "none",
        },

        questionInfoMobilepanel: {
            display: 'none',
            marginBottom: 12,
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            }
        },

        questionBodyContainer: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '100%'
        },

        toggleButtonContainer: {
            position: 'absolute',
            display: 'flex',
            right: 0,
            top: '50%',
            background: theme.palette.background.default,
            alignItems: 'center',
        },

        questionDrawerSectionRoot: {
            position: 'relative',
            display: 'flex'
        },

    }
))


const processQuizData = (quizData) => {

    let quizArray = []

    for (var key in quizData) {
        quizArray.push(quizData[key])
    }

    return quizArray.length === 0 ? null : quizArray
}

const isEveryQuestionsAnswered = (status) => {
    return status.find((val) => val.answerChoosen === null) !== undefined
}

const generateStatusArray = (TotalQuestions) => {
    return Array(TotalQuestions).fill().map((_, i) => ({ status: i === 0 ? CURRENT : NOT_VISITED, answerChoosen: null }));
}

const QuestionMainPage = (props) => {

    const startCountDown = 3

    const rawQuestions = useQuizData("/QuizQuestions", props.id + '_').data

    const classes = useStyle()

    const theme = useTheme()

    const isTabletDisplay = useMediaQuery(theme.breakpoints.down('sm'))
    const ismobileDisplay = useMediaQuery(theme.breakpoints.down('xs'))

    const [showStartCount, setShowStartCount] = useState(true)
    const [openDrawer, setOpenDrawer] = useState(isTabletDisplay)

    const [alertDialog, setAlertDialog] = useState(false)
    const [timeoutDialog, setTimeout] = useState(false)

    const [canQuitQuiz, setcanQuitQuiz] = useState(false)

    const [calculator, setcalculator] = useState(false)

    const [quizStatus, setQuizStatus] = useState(generateStatusArray(props.quizData.tq))

    const [currentQuestion, setCurrentQuestion] = useState(0)

    const history = useNavigate()

    

    const level = props.level

    const subscription = useSubscriptionListener()

    useEffect(() => {
        setOpenDrawer(!isTabletDisplay)
        return () => {
        }
    }, [isTabletDisplay])

    useEffect(() => {
        //prevents poping and refreshing
        const resubmissionAlert = "Are you sure? All your responses get cleared!"

        const popEvent = async (e) => e.preventDefault()

        const preventBack = history.block((ignored) => {
            if (!canQuitQuiz) return resubmissionAlert
        })

        if (canQuitQuiz) {
            history.replace({
                pathname: `/result/${props.quizData.name}`,
                state: { level: props.level, id: props.id, response: quizStatus.map(e => ({ answerChoosen: e.answerChoosen })), /* TODO : no need to send status to server, only answer choosen */ quizData: props.quizData, questions: processQuizData(rawQuestions) }
            })
        }

        window.addEventListener('popstate', popEvent)

        window.onbeforeunload = () => resubmissionAlert

        return () => {
            preventBack()
            window.onbeforeunload = () => { }
            window.removeEventListener('popstate', popEvent)
        }

    }, [canQuitQuiz, history])


    const drawerContainerRef = useRef()
    const alertDialogContainerRef = useRef()
    const prefetchedImage = useRef({})

    document.title = props.quizData.name + " | Neso Academy"

    useEffect(() => {
        //prefetching
        if (rawQuestions) {
            Object.values(rawQuestions).forEach((v) => {
                if (v.qu) {
                    const img = new Image()
                    img.src = v.qu
                    if (prefetchedImage.current.imgs) {
                        prefetchedImage.current.imgs.push(img)
                    } else {
                        prefetchedImage.current.imgs = [img]
                    }
                }
            })
        }
    }, [rawQuestions])


    //Utils
    const processQuizStatus = (index = -1) => {

        if (index !== -1) quizStatus[index].status = CURRENT
        else if (currentQuestion + 1 !== props.quizData.tq) quizStatus[currentQuestion + 1].status = CURRENT

        if (quizStatus[currentQuestion].status === MARKED_FOR_REVIEW) return

        quizStatus[currentQuestion].status = (quizStatus[currentQuestion].answerChoosen === null) ? NOT_ANSWERED : ANSWERED
        setQuizStatus(quizStatus)
    }

    const nextQuestion = () => {
        if (currentQuestion + 1 === props.quizData.tq)
            return
        setCurrentQuestion(currentQuestion + 1)
    }

    const submitQuiz = () => {
        setcanQuitQuiz(true) //can be quit from quiz only on submitting
    }

    const timeout = () => {
        setTimeout(true)
    }

    //Event Handlers

    const handleCalculator = () => {
        setcalculator(!calculator)
    }

    const handleSubmissionAlert = () => {
        setAlertDialog(!alertDialog)
    }

    const handleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    const handleOptionChange = (value) => {
        quizStatus[currentQuestion].answerChoosen = value
    }

    const handleQuestionSelector = (index) => {
        if (index === currentQuestion) {
            return
        }
        processQuizStatus(index)
        setCurrentQuestion(index)
        if (isTabletDisplay || ismobileDisplay)
            handleDrawer()
    }

    const handleSaveAndNext = () => {
        processQuizStatus()
        nextQuestion()
    }

    const handleMarkForReview = () => {
        quizStatus[currentQuestion].status = MARKED_FOR_REVIEW
        processQuizStatus()
        setQuizStatus(quizStatus)
        nextQuestion()
    }

    const handleClearResponse = () => {
        if (quizStatus[currentQuestion].answerChoosen == null)
            return
        quizStatus[currentQuestion].answerChoosen = null
        setQuizStatus(quizStatus)
        EventBus.dispatch(QuizEventClearResponse)
    }


    return (
        <div ref={alertDialogContainerRef} className={classes.root}>
            <QuizCalculator handleCalculator={handleCalculator} show={calculator} />
            {showStartCount && <QuizStartCounter timeOut={() => setShowStartCount(false)} count={startCountDown} init={new Date(new Date().getTime() + (startCountDown) * 1000)} />}
            <AlertDialog
                container={alertDialogContainerRef.current}
                open={timeoutDialog}
                positive="View Result"
                positiveHandle={submitQuiz}
                handleClose={submitQuiz}
                title="Timeout!"
                body={"Time is up. Your quiz has been submitted."} />
            <AlertDialog
                container={alertDialogContainerRef.current}
                open={alertDialog}
                positive="Submit"
                negative="cancel"
                negativeHandle={handleSubmissionAlert}
                positiveHandle={submitQuiz}
                handleClose={handleSubmissionAlert}
                title="Submit quiz?"
                body={getSubmissionAlertBody(isEveryQuestionsAnswered(quizStatus))} />
            <div className={classes.questionTopbar}>
                <QuestionPageTopbar title={props.quizData.name} level={level} />
            </div>
            <div className={classes.questionMainBody} ref={drawerContainerRef}>
                <div className={clsx(classes.questionLeftSectionRoot, {
                    [classes.contentShift]: (openDrawer && !isTabletDisplay),
                })}>
                    <QuestionInfoTopPanel
                        level={level}
                        isTabletDisplay={isTabletDisplay}
                        ismobileDisplay={ismobileDisplay}
                        calculator={handleCalculator}
                        submit={timeout}
                        handleSubmit={handleSubmissionAlert}
                        time={props.quizData.t}
                        delay={startCountDown}
                        questionNo={currentQuestion + 1} />
                    <div className={classes.questionBodyContainer}>
                        {
                            rawQuestions ?
                                (<div className={classes.questionScroll}>
                                    <div className={classes.questionInfoMobilepanel}>
                                        <QuestionNoIndicatorPanel
                                            level={level}
                                            isTabletDisplay={isTabletDisplay}
                                            questionNo={currentQuestion + 1} />
                                    </div>
                                    <AdsContainer path="quiz" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} />
                                    <QuestionBody
                                        questionNo={currentQuestion}
                                        questionData={processQuizData(rawQuestions)[currentQuestion]}
                                        choosenOption={quizStatus[currentQuestion].answerChoosen}
                                        handleOptionChange={handleOptionChange} />
                                </div>)
                                : (<CircularProgress className={classes.progressBar} />)}
                        <div className={classes.toggleButtonContainer}>
                            <DrawerToggleButton surface={false} open={openDrawer} onClick={handleDrawer} />
                        </div>
                    </div>
                    <QuizBottomButtonGroup
                        ismobileDisplay={ismobileDisplay}
                        isTosubmit={(currentQuestion + 1 === props.quizData.tq)}
                        handleClearResponse={handleClearResponse}
                        handleMarkForReview={handleMarkForReview}
                        handleSaveAndNext={handleSaveAndNext}
                        submit={handleSubmissionAlert} />

                </div>
                <div className={classes.questionDrawerSectionRoot} >
                    <QuestionSelectorDrawer
                        handleQuestionSelector={handleQuestionSelector}
                        root={drawerContainerRef.current}
                        close={handleDrawer}
                        open={openDrawer}
                        QuizStatusArray={quizStatus}
                        submit={handleSubmissionAlert} />
                </div>
            </div>
        </div>)
}

export default QuestionMainPage