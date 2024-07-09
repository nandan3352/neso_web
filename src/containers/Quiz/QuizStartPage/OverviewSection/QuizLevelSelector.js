import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup } from "@material-ui/core"



const useStyle = makeStyles(theme => (
    {

        levelSelector: {
        },

        levelHeader: {
            ...theme.typography.overline,
            color: theme.palette.text.secondary,
            fontSize: 12,
            lineHeight: '16px',
            fontWeight: '500',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center'
            }
        },
        quizLevelSelectorContainer: {
            flexDirection: 'row'
        },

        quizLevelSelectorLabelContainer: {
            '&:first-child': {
                marginRight: theme.spacing(8)
            }
        },

        quizLevelSelectorLabel: {
            ...theme.typography.body2,
            lineHeight: '20px',
            textTransform: 'none',
            color: theme.palette.text.secondary,
        },

        quizLevelForm: {
            display: 'flex',
            //Radio button height is 42
            marginTop: '15px',
            marginBottom: '15px',
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(1),
                marginTop: theme.spacing(1),
            },
            alignItems: 'center'
        },

        levelRadioButtonRoot: {
            '&$checked': {
                color: theme.palette.secondary.main,
                '& svg': {
                    color: theme.palette.secondary.main
                },
            },
        },
        checked: {
        }

    }
))

const QuizLevelSelector = (props) => {

    const classes = useStyle()

    return (
        <div className={classes.levelHeader}>
            <div className={classes.levelHeader} >
                Select your level
            </div>

            <FormControl name="level1" className={classes.quizLevelForm} component="fieldset">
                <RadioGroup className={classes.quizLevelSelectorContainer} value={props.level} onChange={props.handleLevelChange}>
                    <FormControlLabel classes={{
                        label: classes.quizLevelSelectorLabel
                    }} className={classes.quizLevelSelectorLabelContainer} value='1' control={<Radio classes={{ root: classes.levelRadioButtonRoot, checked: classes.checked }} />} label="Level 1" />
                    <FormControlLabel
                        classes={{
                            label: classes.quizLevelSelectorLabel
                        }} className={classes.quizLevelSelectorLabelContainer} value='2' control={<Radio color='default' classes={{ root: classes.levelRadioButtonRoot, checked: classes.checked }} />} label="Level 2" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default QuizLevelSelector