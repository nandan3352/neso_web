import { FormControl, FormControlLabel, makeStyles, RadioGroup, Radio, TextField, Checkbox, CircularProgress } from "@material-ui/core"
import { useEffect, useState } from "react"
import MathRenderer from "../../../components/UI/Quiz/MathRenderer"
import { QuizEventClearResponse } from "../../../lib/EventBus"
import { useEventListener } from "../../../Services/Events"


const useStyle = makeStyles(theme => (
    {
        root: {
            userSelect : 'none',
        },

        questionStyle: props => ({
            ...theme.typography.body2,
            fontSize: '18px',
            lineHeight: '30px',
            fontFamily: 'Lato, roboto',
            marginLeft: props.explanation ? 22 : theme.spacing(4),
            marginTop: theme.spacing(3),
            marginRight: theme.spacing(4),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(2),
                marginRight: theme.spacing(2),
                fontSize: '16px',
                lineHeight: '24px',
                marginTop: 4,
                marginBottom: theme.spacing(2),
            }
        }),

        '@keyframes shimmer': {
            '0%': { backgroundPosition: '-5000px 0' },
            '100%': { backgroundPosition: '5000px 0' }
        },

        questionImage: {
            width: 'auto',
            maxHeight: 258,
            height: 258,
            objectFit: "contain",
            marginLeft: theme.spacing(4),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(7),
            [theme.breakpoints.down('xs')]: {
                marginLeft: 1,
                marginRight: 1,
                width: 'calc(100% - 2px)'
            }
        },

        questionImageContainer: {

        },

        optionsGroup: {
            marginBottom: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginBottom: 0,
            }
        },

        optionsLabel: {
            marginRight: theme.spacing(2)
        },
        optionsContainer: {
            ...theme.typography.body2,
            fontSize: '18px',
            lineHeight: '30px',
            fontFamily: 'Lato, roboto',
            display: 'inline-flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            border: 'none',
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                borderTop: '1px solid rgba(0,0,0,0.12)',
                fontSize: '16px',
                lineHeight: '24px'
            }
        },

        options: {
            ...theme.typography.body2,
            fontSize: '18px',
            lineHeight: '30px',
            fontFamily: 'Lato, roboto',
            [theme.breakpoints.down('xs')]: {
                fontSize: '16px',
                lineHeight: '24px'
            }
        },

        radioRoot: {
            '&$checked': {
                '& svg': {
                    color: theme.palette.secondary.main
                }
            }
        },

        image: {

        },

        checked: {

        },

        textField: {
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(2)
            }
        }
    }
))

export const removeMathJaxDelimiterSyntax = (source) => (source !== null ? (source + "").replace(/\\\(|\\\)/gi, (x) => ('$')) : "")

const QuestionBody = (props) => {

    const classes = useStyle(props)

    const [choosenOption, setChoosenOption] = useState(props.choosenOption)

    useEventListener(QuizEventClearResponse, () => setChoosenOption(null))

    useEffect(() => {
        setChoosenOption(props.choosenOption)
    }, [props.choosenOption, props.questionNo])

    //checkbox Utils
    const processCBupdatedVal = (prev, idx) => ((!(prev + '').includes(idx)) ? (prev ? (prev + idx).split('').sort().join('') : idx) : prev.replace(idx, ''))

    const getCheckedForCB = (index) => (choosenOption ? (choosenOption + '').includes(index + '') : false)


    //handles

    const handleOptionChange = (event) => {
        if (!Number(event.target.value.trim()) && event.target.value.length !== 0)
            return
        const choosed = event.target.value.length === 0 ? null : event.target.value.trim()
        setChoosenOption(choosed)
        props.handleOptionChange(choosed)
    }

    const handleCheckBoxChange = (event) => {
        const updated = processCBupdatedVal(choosenOption, event.target.name)
        setChoosenOption(updated)
        props.handleOptionChange(updated)
    }

    const alphabetArray = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.']


    //same radio group is used for both radio options and checkbox options
    const getChooserBasedOnType = (type, index) => {
        switch (type) {
            case 1:
                return <Radio color="secondary" classes={{ root: classes.radioRoot, checked: classes.checked }} />;
            case 3:
                return <Checkbox checked={getCheckedForCB(index)} onChange={handleCheckBoxChange} name={index} classes={{ root: classes.radioRoot, checked: classes.checked }} />
            default:
                break;
        }
    }

    const Options = (index, label, type) => (
        <div className={classes.optionsContainer}>
            <div className={classes.optionsLabel}>
                {alphabetArray[index - 1]}
            </div>
            <FormControlLabel classes={{
                label: classes.options
            }} style={{ marginRight: '7px' }} value={index} control={getChooserBasedOnType(type, index)} label={
                (<MathRenderer source={label + ''} />)
            } />
        </div>
    )

    const optionGroup = (type) => {
        return (
            <FormControl style={{
                width: '100%'
            }} component="fieldset">
                <RadioGroup aria-label="quizOptions" name="quizOptions" value={choosenOption} onChange={handleOptionChange}>
                    {props.questionData.options.map((value, index) => (Options(index + '', value, type)))}
                </RadioGroup>
            </FormControl>
        )
    }

    const getOptionsBody = (type) => {
        console.log(type);
        switch (type) {
            case 1: //radio
            case 3: //checkbox
                return optionGroup(type)
            case 5:
                return (
                    <TextField inputMode="numeric" inputProps={{
                        type: 'text',
                        inputMode: 'numeric', pattern: '[0-9]*'
                    }} className={classes.textField} value={choosenOption == null ? "" : choosenOption} onChange={handleOptionChange} />)
            default:
                return <div />
        }
    }

    return (
        <div key={props.choosenOption} className={classes.root}>

            <div className={classes.questionStyle}>
                <MathRenderer source={props.questionData.q + ''} />
            </div>

            <div className={classes.questionImageContainer}>
                {props.questionData.qu ? <img className={classes.questionImage} src={props.questionData.qu} alt="loading..." /> : <div />}
            </div>

            {props.explanation ? <div /> : (<div className={classes.optionsGroup}> {getOptionsBody(props.questionData.qtype)} </div>)}

        </div>)
}

export default QuestionBody