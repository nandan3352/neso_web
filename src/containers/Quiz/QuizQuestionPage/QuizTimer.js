import { makeStyles } from "@material-ui/core";
import { Unsubscribe } from "@material-ui/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";

const useStyle = makeStyles(theme => (
    {
        '@keyframes timeCriticalAnimation': {
            '0%': {
                opacity: 0
            },
            '100%': {
                opacity: 1
            }
        },
        timeCritical: {
            color: 'rgb(235,0,0)',
            animation: `$timeCriticalAnimation 1s ${theme.transitions.easing.easeInOut} infinite`
        },

        root: {
            color: 'rgba(39,174,96,1)'
        }
    }
))

export const calculateTimeLeft = (futureTime) => {

    let now = new Date()
    let difference = futureTime - now;
    let timeLeft = {};

    let min = Math.floor((difference / 1000 / 60) % 60)
    let sec = Math.floor((difference / 1000) % 60)

    if (Math.floor(min / 10) === 0)
        min = '0' + min

    if (Math.floor(sec / 10) === 0)
        sec = '0' + sec

    if (difference > 0) {
        timeLeft = {
            minutes: min,
            seconds: sec,
        };
        return timeLeft
    } else if (Math.floor(difference) === 0) {
        return -1
    } else {
        return null
    }

}

const TimerWindow = (props) => {

}

const QuizTimer = (props) => {

    const classes = useStyle()


    const [delay, setDelay] = useState(props.delay)
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.futureTime))
    const [isTimeOut, setIsTimeOut] = useState(false)

    useEffect(() => {
        if (isTimeOut)
            props.submit()
        return () => {
        }
    }, [isTimeOut, props])

    useEffect(() => {
        const interval = delay ? delay * 1000 : 1000
        const clear = setInterval(() => {
            const newTimeStamp = calculateTimeLeft(props.futureTime)
            setDelay(null)
            if (newTimeStamp === null) {
                clearTimeout()
                setIsTimeOut(true)
            } else if (newTimeStamp !== null) {
                setTimeLeft(newTimeStamp);
            }
        }, interval)
        return () => {
            clearTimeout(clear)
        }
    },[delay])

    return (
        <div className={clsx({ [classes.timeCritical]: timeLeft.minutes === '00' }, { [classes.root]: timeLeft.minutes !== '00' })}>
            {`${timeLeft.minutes}:${delay ? '00' :timeLeft.seconds}`}
        </div>)
}

export default QuizTimer