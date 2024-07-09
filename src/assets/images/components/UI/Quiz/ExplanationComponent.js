import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import MathRenderer from "./MathRenderer";

const useStyle = makeStyles(theme => (
    {
        root: {
            userSelect : 'none',
        },

        '&img': {
            width: '100%'
        },

        optionRoot: {
            borderTop: '1px solid rgba(var(--theme-divider))',
            '&:last-child': {
                borderBottom: 'none'
            }
        },

        prefixes: {
            marginLeft: 14,
            marginRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(1),
            },
        },

        option: {
            padding: theme.spacing(1),
            display: 'flex',
            lineHeight: '30px',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...theme.typography.body2,
            fontSize: '18px',
            [theme.breakpoints.down('xs')]: {
                fontSize: '16px',
                lineHeight: '24px'
            },
            fontFamily: 'Lato, roboto',
            color: theme.palette.text.primary
        },

        optionRemark: {
            marginRight: theme.spacing(2),
        },

        optionCorrect: {
            color: '#27AE60',
            backgroundColor: 'rgba(62, 182, 113, 0.16)'
        },

        optionIncorrect: {
            color: '#EB5757',
            backgroundColor: 'rgba(235, 87, 87, 0.16)'
        },

        txtResponse: {
            marginLeft: 14,
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(1),
            },
        },
        explanationHeader: {
            color: theme.palette.text.secondary,
            marginBottom: '16px'
        },
        explanation: {
            background: theme.palette.container.footer,
            color: theme.palette.text.primary,
            overflow: 'auto',
            fontFamily: 'Lato, roboto',
            fontSize: '18px',
            paddingTop: theme.spacing(2),
            paddingLeft: 22,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                fontSize: '16px',
                lineHeight: '24px',
            },
            paddingBottom: theme.spacing(2),
        },

        imgFit: {
            '& img': {
                maxHeight: 258,
                objectFit: "contain",
                [theme.breakpoints.down('xs')]: {
                    width: 'calc(100% - 2px)'
                }
            }
        }
    }
))

const ExplanationComponent = (props) => {

    const options = props.options
    const exp = props.exp
    const choosedOption = props.optionChoosen && props.optionChoosen + ''
    const correctOption = props.correctOption + ''
    const type = props.type

    //! Accepted param shoulfd be a string !
    const iscorrect = (i) => (type === 1 ? i === correctOption : (correctOption + '').includes(i + ''))

    const isChoosenOption = (i) => (type === 1 ? i === choosedOption : ((choosedOption + '').includes(i + '')))

    const isChoosenOrCorrectOption = (i) => (iscorrect(i) || isChoosenOption(i))

    const getRemark = (i) => (isChoosenOption(i) ? (iscorrect(i) ? props.remarks[0] : props.remarks[2]) : (iscorrect(i) ? props.remarks[1] : ""))

    const isResponseGiven = (givenans) => givenans !== null

    const classes = useStyle()

    const prefixes = ['A.', 'B.', 'C.', 'D.']

    const showExp = (i) => {
        return type === 5 ? true : (type === 1) ? ((i) === correctOption) : ((correctOption + '').charAt((correctOption + '').length - 1) === (i + ''))
    }

    const explanation = (i) => (
        (exp && showExp(i) ? (
            <div className={classes.explanation}>
                <div className={classes.explanationHeader} >
                    Explanation
                </div>
                <div>
                    <MathRenderer className={classes.imgFit} source={exp} />
                </div>
            </div>
        ) : <div />))

    const textFieldComponent = (
        <div className={classes.optionRoot} >
            {
                isResponseGiven(choosedOption) && !iscorrect(choosedOption) ?
                    <div className={clsx(classes.option, classes.optionIncorrect)}>
                        <div className={classes.txtResponse}>
                            {choosedOption}
                        </div>
                        <div className={classes.optionRemark}>
                            {props.remarks[2]}
                        </div>
                    </div>
                    : <div />
            }

            <div className={clsx(classes.option, classes.optionCorrect)}>
                <div className={classes.txtResponse}>
                    {correctOption}
                </div>
                <div className={classes.optionRemark}>
                    {iscorrect(choosedOption) ? props.remarks[0] : props.remarks[1]}
                </div>
            </div>

            {explanation(correctOption)}
        </div>
    )

    return (
        <div className={classes.root}>
            {  options ? options.map((element, i) => (
                <div className={classes.optionRoot}>
                    <div
                        className={
                            clsx(classes.option, { [iscorrect(i + '') ? classes.optionCorrect : classes.optionIncorrect]: isChoosenOrCorrectOption(i + '') })}>
                        <div style={{ display: 'inline-flex' }}>
                            <div className={classes.prefixes}>
                                {prefixes[i - 1]}
                            </div>
                            <MathRenderer source={element + ''} />
                        </div>
                        <div className={classes.optionRemark}>
                            {getRemark(i + '')}
                        </div>
                    </div>

                    { explanation(i + '')}

                </div>
            )) : textFieldComponent
            }
        </div>)
}

export default ExplanationComponent