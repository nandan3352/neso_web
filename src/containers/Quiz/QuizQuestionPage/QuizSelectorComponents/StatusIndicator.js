import { IconButton, makeStyles } from "@material-ui/core";


const NOT_ANSWERED = 'notAnswered'
const ANSWERED = 'answered'
const NOT_VISITED = 'notVisited'
const MARKED_FOR_REVIEW = 'markedForReview'
const CURRENT = 'current'
const INCORRECT = 'incorrect'
const CORRECT = 'correct'
const LEFT = 'left'
const ZERO = 'zero'

const useStyle = makeStyles(theme => (
    {
        root: props => (
            {
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: getColorBasedOnStatus(props.status, theme.palette.divider),
                marginRight: 0,
                marginBottom: props.gridView ? 20 : 0,
            }
        ),

        iconButton: props => ({
            width: theme.spacing(4),
            height: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                width: theme.spacing(props.gridView ? 6 : 4),
                height: theme.spacing(props.gridView ? 6 : 4),
            }
        }),

        indicator: {
            ...theme.typography.subtitle2,
            color: 'white',
        }
    }
))

export const getColorBasedOnStatus = (status, surface) => {
    switch (status) {
        case ANSWERED:
        case CORRECT:
            return '#27AE60'
        case NOT_ANSWERED:
        case INCORRECT:
            return '#EB5757'
        case NOT_VISITED:
        case LEFT:
            return surface
        case MARKED_FOR_REVIEW:
            return '#9B51E0'
        case CURRENT:
            return '#2D9CDB'
        default:
            return surface;
    }
}

const StatusIndicator = (props) => {

    const classes = useStyle(props)

    return (
        <div className={classes.root}>
            <IconButton className={classes.iconButton} onClick={props.onClick} disabled={!props.gridView}>
                <div className={classes.indicator}>
                    {props.index}
                </div>
            </IconButton>
        </div>
    )
}

export default StatusIndicator

export { ANSWERED, NOT_ANSWERED, NOT_VISITED, MARKED_FOR_REVIEW, CURRENT, CORRECT, INCORRECT, LEFT, ZERO }