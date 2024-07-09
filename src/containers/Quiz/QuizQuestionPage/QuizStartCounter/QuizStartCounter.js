import { makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { calculateTimeLeft } from "../QuizTimer"


const useStyle = makeStyles((theme) => (
    {
        '@keyframes startCounterAnimation': {
            '0%': {
                opacity: 0,
                transform: 'scale(0)'
            },
            '100%': {
                opacity: 1,
                transform: 'scale(1)'
            }
        },

        root: {
            position: 'absolute',
            fontSize: '200px',
            zIndex: 4000,
            color: theme.palette.text.disabled,
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        animate: {
            animation: `$startCounterAnimation 1s ${theme.transitions.easing.easeInOut} infinite`,
        }
    }
))

const QuizStartCounter = (props) => {
    const classes = useStyle()
    const [count, setCount] = useState(calculateTimeLeft(props.init))

    useEffect(() => {
        const clear = setInterval(() => {
            const newTimeStamp = calculateTimeLeft(props.init)
            if (newTimeStamp === null) {
                clearTimeout()
                props.timeOut()
            } else if (newTimeStamp !== null) {
                setCount(newTimeStamp);
            }
        }, 1000)
        return () => {
            clearTimeout(clear)
        }
    }, [])

    return (
        <div className={clsx(classes.root, { [classes.animate]: Number(count.seconds[1]) < (Number(props.count) - 1) })}>
            {count.seconds[1] === ((props.count + 1) + '') ? (props.count + '') : Number(count.seconds[1]) + 1}
        </div>)
}

export default QuizStartCounter