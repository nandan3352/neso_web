import { makeStyles } from "@material-ui/core"
import AnalyticItemHolder from "../QuizResultsPage/Overview/AnalyticItemHolder"
import { CORRECT as POSITIVE, INCORRECT as NEGATIVE } from "./QuizSelectorComponents/StatusIndicator"



const useStyle = makeStyles(theme => ({
    quizTopPanelLeftCluster: {
        marginTop: 0,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
            marginLeft: theme.spacing(2),
            marginTop: 12,
        }
    },

    quizQuestionNo: {
        ...theme.typography.h6,
        color: theme.palette.text.primary,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            ...theme.typography.subtitle1
        }
    },

    spacer: {
        width: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(1),
        }
    },

    infoPanelAnalyticItem: {
        position: 'relative',
        minWidth: 42,
        height: 32,
        [theme.breakpoints.down('xs')]: {
            minWidth: 30,
            height: 24
        }
    },

}))

const QuestionNoIndicatorPanel = (props) => {

    const classes = useStyle(props)
    const infoPanelAdaptiveness = props.isTabletDisplay
    const neg = (props.level + '') === '2'

    return (
        <div className={classes.quizTopPanelLeftCluster}>

            <div className={classes.quizQuestionNo}>
                {infoPanelAdaptiveness ? `Q No. ${props.questionNo}` : `Question No. ${props.questionNo}`}
            </div>
            <div style={{ display: 'inline-flex' }}>
                <div className={classes.infoPanelAnalyticItem}>
                    <AnalyticItemHolder level={props.level} varient={POSITIVE} />
                </div>
                <div className={classes.spacer} />
                {
                    neg && (<div className={classes.infoPanelAnalyticItem}>
                        <AnalyticItemHolder style={{ width: '49px' }} varient={NEGATIVE} />
                    </div>)
                }
            </div>
        </div>
    )
}


export default QuestionNoIndicatorPanel