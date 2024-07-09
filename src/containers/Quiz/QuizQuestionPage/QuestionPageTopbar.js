import { makeStyles } from "@material-ui/core"


const useStyle = makeStyles(theme => (
    {

        questionMainTopbar : {
            zIndex : 1400,
            width : '100%',
            position : 'relative',
            display : 'flex',
            justifyContent: 'center',
            alignItems : 'center',
            height: theme.spacing(6),
            backgroundColor : theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },

        quizTitle : {
            ...theme.typography.h6,
            lineHeight : '24px',
            fontWeight : '500',
        },

        quizLevel : {
            ...theme.typography.h6,
            display: 'flex',
            position : 'absolute',
            left : 0,
            marginLeft : theme.spacing(4),
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.text.secondary,
            fontSize: '20px',
            fontWeight: '500',
            width: '76px',
            height: theme.spacing(4),
            background: theme.palette.surface.main,
            borderRadius: '4px',
        },

    }
))

const QuestionPageTopbar = (props) => {

    const classes = useStyle()
    
    return (
        <div className={classes.questionMainTopbar}>
            <div className={classes.quizLevel}>
                {`Level ${props.level}`}
            </div>
            <div className={classes.quizTitle}>
                {props.title}
            </div>
        </div>)
}

export default QuestionPageTopbar