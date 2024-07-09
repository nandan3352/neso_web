import { makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { INCORRECT as NEGATIVE, LEFT, ZERO } from "../../QuizQuestionPage/QuizSelectorComponents/StatusIndicator";



const useStyle = makeStyles(theme => (
    {
        root: props => ({
            ...theme.typography.subtitle2,
            color: 'auto',
            fontWeight: '500',
            lineHeight: '24px',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px'
            },
            '&:after': {
                content: ((props.varient === LEFT || props.varient === ZERO) ? '"0"' :
                    (props.varient === NEGATIVE ? '"-0.33"' :
                        (theme.breakpoints.down('xs') ? `"+${props.level || 1}"` : `"+${props.level || 1}.0"`)))
            }
        }),
        positive: {
            backgroundColor: 'rgba(39, 174, 96, 0.16)',
            color: '#27AE60',
        },
        negative: {
            backgroundColor: 'rgba(235, 87, 87, 0.16)',
            color: '#EB5757'
        },
        left: {
            backgroundColor: theme.palette.custom.quizAnalyticBackgroundLeft,
            color: theme.palette.custom.quizAnalyticTextLeft
        }
    }
))


const AnalyticItemHolder = (props) => {
    const classes = useStyle(props)
    
    const isNegative = () => (props.varient === NEGATIVE || props.varient === ZERO) //incase zero marks too, display red

    const isLeft = () => (props.varient === LEFT)

    return (
        <div {...props} className={clsx({ [classes.left]: isLeft(), [classes.negative]: isNegative(), [classes.positive]: !isNegative() }, classes.root)}>
        </div>)
}


export default AnalyticItemHolder