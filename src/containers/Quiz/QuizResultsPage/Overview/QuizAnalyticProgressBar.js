import { makeStyles } from "@material-ui/core"





const useStyle = makeStyles(theme => (
    {
        progressBarContainer: {
            position : 'relative',
            height : theme.spacing(1),
            backgroundColor : theme.palette.surface.main,
            borderRadius : '4px'
        },

        progressBarCorrect: (props) => ({
            position : 'absolute',
            height : '100%',
            width : `calc(100% * ${props.correctPercentage})`,//props.correctPercentage
            backgroundColor : '#27AE60',
            borderRadius : '4px'
        }),
        
        progressBarWrong: props =>({
            position : 'absolute',
            height : '100%',
            width : `calc(100% * ${props.correctPercentage + props.wrongPercentage})`,//props.correctPercentage
            backgroundColor : '#EB5757',
            borderRadius : '4px'
        }),

    }
))


const QuizAnalyticProgressBar = (props) => {
    const classes = useStyle(props)
    return (
        <div className={classes.progressBarContainer}>
            <div className={classes.progressBarWrong} />
            <div className={classes.progressBarCorrect}  />
        </div>
    )
}

export default QuizAnalyticProgressBar