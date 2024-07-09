import { Button, IconButton, makeStyles, SvgIcon } from "@material-ui/core"
import { useState } from "react"
import { ReactComponent as Calculator } from "../../../assets/images/Quiz/Calc.svg"
import QuestionNoIndicatorPanel from "./QuestionNoIndicatorPanel"

import QuizTimer from "./QuizTimer"

const useStyle = makeStyles(theme => (
    {
        root: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            height: theme.spacing(6),
            borderBottom: `1px solid ${theme.palette.divider}`,
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'row-reverse',
            }
        },

        timerContainer: {
            ...theme.typography.h6,
            display: 'flex',
            position: 'absolute',
            [theme.breakpoints.down('xs')]: {
                position: 'relative',
                ...theme.typography.subtitle2
            },
            width: '100%',
            height: theme.spacing(6),
            justifyContent: 'center',
            alignItems: 'center'
        },

        timerHead: {
            color: theme.palette.text.secondary
        },

        timerTail: {
            marginLeft: 4
        },

        questionInfodesktopPanel: {
            display: 'block',
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            }
        },

        quizCalculator: {
            marginLeft: theme.spacing(2),
            marginRight: 20,
            [theme.breakpoints.down('xs')]: {
                marginLeft: 4,
            }
        },

        quizInfoSubmit: {
            alignSelf: 'center',
            color: theme.palette.secondary.main,
            marginRight: theme.spacing(1),
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'block'
            }
        }
    }
))

const QuizInfoTopPanel = (props) => {

    const classes = useStyle()

    const [time, _] = useState(new Date(new Date().getTime() + props.time * 60000 + (props.delay + 1) * 1000))


    return (
        <div>
            <div className={classes.root}>
                <Button className={classes.quizInfoSubmit} variant='text' onClick={props.handleSubmit} >
                    submit
                </Button>

                <div className={classes.questionInfodesktopPanel}>
                    <QuestionNoIndicatorPanel level={props.level} isTabletDisplay={props.isTabletDisplay} questionNo={props.questionNo} />
                </div>

                <div className={classes.timerContainer}>
                    <div className={classes.timerHead}>
                        Time left:
                </div>
                    <div className={classes.timerTail}>
                        <QuizTimer delay={props.delay} submit={props.submit} futureTime={time} />
                    </div>
                </div>

                <div >
                    <IconButton className={classes.quizCalculator} onClick={props.calculator}>
                        <SvgIcon viewBox='0 0 36 36' >
                            <Calculator />
                        </SvgIcon>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default QuizInfoTopPanel