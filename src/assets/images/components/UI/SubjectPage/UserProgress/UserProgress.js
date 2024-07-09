import { makeStyles } from "@material-ui/core"


const useStyle = makeStyles(theme => (
    {
        progressBarContainer: {
            position : 'relative',
            height : theme.spacing(1),
            backgroundColor : theme.palette.surface.main,
            borderRadius : '4px'
        },

        progressBarLecture: (props) => ({
            position : 'absolute',
            height : '100%',
            width : props.lecturePercentage && `calc(100% * ${props.lecturePercentage})`,
            backgroundColor : '#00C47D',
            borderRadius : '4px'
        }),
        
        progressBarChapter: props =>({
            position : 'absolute',
            height : '100%',
            width : props.chapterPercentage && `calc(100% * ${(props.lecturePercentage || 0) + props.chapterPercentage})`,
            backgroundColor : '#FFEC3F',
            borderRadius : '4px'
        }),

        progressBarQuiz : props => ({
            position : 'absolute',
            height : '100%',
            width : props.quizPercentage && `calc(100% * ${(props.lecturePercentage || 0) + (props.chapterPercentage || 0)   + props.quizPercentage})`,
            backgroundColor : '#954CF2',
            borderRadius : '4px'
        })

    }
))


const UserProgress = (props) => {
    const classes = useStyle(props)
    return (
        <div className={classes.progressBarContainer}>
            <div className={classes.progressBarQuiz}  />
            <div className={classes.progressBarChapter}  />
            <div className={classes.progressBarLecture} />
        </div>
    )
}

export default UserProgress