
import React, { } from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyle = makeStyles(theme => {
    return (
        {
            root: {
                display: 'flex',
                flexDirection: 'column',
            },
            quizTitle: {
                ...theme.typography.h6,
                lineHeight: '24px',
                marginLeft: theme.spacing(4),
                [theme.breakpoints.down('sm')]: {
                    marginLeft: theme.spacing(3),
                },
                [theme.breakpoints.down('xs')]: {
                    marginLeft: 0,
                    textAlign: 'center',
                }
            },

            quizInfoPanelContainer: {
                marginTop: '44px',
                [theme.breakpoints.down('xs')]: {
                    marginTop: '16px',
                },
                alignSelf: 'center',
                display: 'inline-flex',

            },  
            quizInfoContainer: {
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'flex-start',
                '&:first-child': {
                    marginRight: theme.spacing(6),
                    [theme.breakpoints.down('xs')]: {
                        marginRight: 36
                    }
                }
            },

            quizInfoTitle: {
                ...theme.typography.overline,
                color: theme.palette.text.secondary,
                lineHeight: '16px',
                fontSize: 12,
                fontWeight: '500',
            },

            quizInfoText: {
                marginTop: 4,
                ...theme.typography.h6,
                color: theme.palette.text.secondary,
                lineHeight: '24px',
                fontSize: '20px',
            }

        }
    )
})

const QuizInfoPanel = (props) => {
    const classes = useStyle()
    const noOfQuestions = props.noOfQuestions
    const totalTime = props.totalTime
    const quizTitle = props.title

    return (
        <div className={classes.root}>

            <div className={classes.quizTitle}>
                {quizTitle}
            </div>

            <div className={classes.quizInfoPanelContainer}>

                {/* No of question */}
                <div className={classes.quizInfoContainer}>
                    <div className={classes.quizInfoTitle}>
                        Questions
                  </div>
                    <div className={classes.quizInfoText}>
                        {noOfQuestions}
                    </div>
                </div>

                {/* Total Time */}

                <div className={classes.quizInfoContainer}>
                    <div className={classes.quizInfoTitle}>
                        Time
                  </div>
                    <div className={classes.quizInfoText}>
                        {totalTime}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default QuizInfoPanel