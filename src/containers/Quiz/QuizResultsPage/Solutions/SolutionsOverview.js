import { makeStyles } from "@material-ui/core";
import ExplanationComponent from "../../../../components/UI/Quiz/ExplanationComponent";
import QuestionBody from "../../QuizQuestionPage/QuestionBody"
import { getColorBasedOnStatus, CORRECT as correct, INCORRECT as wrong, LEFT as zero } from "../../QuizQuestionPage/QuizSelectorComponents/StatusIndicator";
import AnalyticItemHolder from "../Overview/AnalyticItemHolder";


const useStyle = makeStyles(theme => (
    {
        root: props => ({
            position: 'relative',
            border: `1px solid ${getColorBasedOnStatus(props.status, theme.palette.divider)}`,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(2)
            }
        }),

        spacer: {
            width: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                width: theme.spacing(1)
            },
        },

        solutionAnalyticItem: {
            position: 'relative',
            minWidth: 42,
            height: 32,
            [theme.breakpoints.down('xs')]: {
                minWidth: 30,
                height: 24
            }
        },

        topPanel: {
            ...theme.typography.subtitle2,
            fontSize: '16px',
            paddingLeft: 22,
            paddingRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                border: 'none',
                height: theme.spacing(5),
            },
            height: theme.spacing(6),
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(var(--theme-divider))',
        }

    }
))

const SolutionOverview = (props) => {

    const analytic = props.analytic
    const classes = useStyle({ ...props.analytic })
    const question = props.question
    const qNo = props.qNo
    const remarks = ['Your answer is correct!', 'Correct answer!', 'Your answer is wrong!']
    const remarksMobile = ['correct!', 'Correct!', 'wrong!']
    return (
        <div className={classes.root}>
            <div className={classes.topPanel}>
                <div>
                    {`${props.isMobileDisplay ? 'Q No.' : 'Question No.'} ${qNo}`}
                </div>
                <div style={{ display: 'flex' }}>
                    <div className={classes.solutionAnalyticItem}>
                        <AnalyticItemHolder width={props.ismobileDisplay ? 30 : 42} varient={correct} />
                    </div>
                    <div className={classes.spacer} />
                    <div className={classes.solutionAnalyticItem}>
                        <AnalyticItemHolder style={{ width: '49px' }} varient={props.level + '' === '1' ? zero : wrong} />
                    </div>
                </div>
            </div>
            <div>
                <QuestionBody explanation={true} questionData={question} choosenOption={analytic.answerChoosen} />
            </div>
            <div>
                <ExplanationComponent type={question.qtype} remarks={props.isMobileDisplay ? remarksMobile : remarks} options={question.options} optionChoosen={analytic.answerChoosed} exp={question.exp} correctOption={question.ans} />
            </div>
        </div>
    )
}

export default SolutionOverview