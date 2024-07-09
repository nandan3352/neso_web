import { Dialog, makeStyles, useMediaQuery, useTheme } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useLocation } from "react-router-dom"
import { useUser } from "../../../Services/Auth"
import { firestoreGetDoc } from "../../../Services/Database"
import { AuthDialogEvent, useEventDispatch } from "../../../Services/Events"
import QuizStartPage from "./QuizStartPage"

const useStyle = makeStyles(theme => (
    {
        root: {
            position: 'static',
            width: '100%',
            height: 'calc(100% - 60px)',
            [theme.breakpoints.down('xs')]: {
                position: 'relative'
            }
        }
    }
))

/* ! place this component globally and pass the quiz id selected from parent (let parent handle the dialog) ! */
/**
 * if quiz dispatching is handled by parent, then two states needed, choosed quiz and fetchingUserRecord state
 * 
 */
/**
 * // Mandatory props \\
 * quizData -> object
 * handleClose -> close callback
 * id -> string
 * data -> 'quizNames' data (Object)
 * open -> boolean 
 * // Optional props \\
 * level -> number 
 * userRecordFetchCallback -> called after the user prev record is fetched 
 * @param {*} props 
 * @returns 
 */

const QuizStartDialog = (props) => {

    const theme = useTheme()
    const navigator = useNavigate()
    const mobileDevice = useMediaQuery(theme.breakpoints.down('xs'))
    const [userPreviousRecord, setUserPreviousRecord] = useState(-1) // data not fetched indicator -> -1
    const classes = useStyle()
    const scrollContainerRef = useRef(null)
    const user = useUser()
    const dispatchAuth = useEventDispatch(AuthDialogEvent)
    const path = useLocation().pathname


    useEffect(() => {
        if (props.fromResult) {
            setUserPreviousRecord(null)
            return
        }

        if (!(user && user.uid) && props.open) {
            handleClose()
            dispatchAuth({ open: true, msg: "Login to access quizzes." })
            return
        }

        if (props.open)
            fetchUserRecord()
        else
            setUserPreviousRecord(-1)


        return () => {
            setUserPreviousRecord(-1)
        }
    }, [user, props.open, props.id, props.fromResult])

    const handleClose = () => {
        props.handleClose()
        if (path.includes('/quiz')) {
            navigator.replace(path.split('/quiz')[0])
            //navigator.goBack();
        }
    }


    async function fetchUserRecord() {
        setUserPreviousRecord(-1)
        try {
            const userRecord = (await firestoreGetDoc(`QuizStatistics/${props.id}/Leaderboard/${user.uid}`)).data()
            setUserPreviousRecord(userRecord)
            if (userRecord) {
                const options = {
                    pathname: path.includes('quiz') ? path.replace('quiz', 'result') : `/result/${props.data.name}`,
                    state: { id: props.id, level: userRecord.clevel, quizData: props.data, marks: userRecord.cmarks, analytics: userRecord.analytics },
                }

                if (path.includes('quiz'))
                    navigator.replace(options)
                else
                    navigator.push(options)

            }
        } catch (e) {
        }

        if (props.userRecordFetchCallback instanceof Function) {
            props.userRecordFetchCallback()
        }
    }

    //TODO: need to be changed
    if (mobileDevice && props.open && userPreviousRecord !== -1 && !userPreviousRecord) {
        const options = {
            pathname: "/quiz/" + props.data.name,
            state: { id: props.id, level: props.level, data: props.data, from: props.from, uid: user.uid },
        }
        navigator.replace(options)
        return null
    }

    return (
        <Dialog
            style={{ zIndex: mobileDevice ? 5 : theme.zIndex.modal }}
            PaperProps={
                {
                    style: {
                        position: 'static',
                    },
                    ref: scrollContainerRef
                }
            }
            fullScreen={mobileDevice}
            open={props.open && userPreviousRecord !== -1}
            onClose={handleClose}>
            <div className={classes.root}>
                <QuizStartPage uid={props.uid} fromSubject={path.includes('quiz')} fromResult={props.fromResult} level={(props.level + '') || 1} handleClose={handleClose} container={scrollContainerRef} id={props.id} quizData={props.data} />
            </div>
        </Dialog>
    )
}

export default QuizStartDialog