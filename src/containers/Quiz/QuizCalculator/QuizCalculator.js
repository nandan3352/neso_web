import { CircularProgress, IconButton, makeStyles } from "@material-ui/core"
import Close from "@material-ui/icons/Close"
import Draggable from "react-draggable"


const useCalcStyles = makeStyles(theme => (
    {

        root: {
            zIndex: 3000,
            maxWidth: 479,
            position: 'absolute',
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(4),
            right: 0,
        },

        calculatorTopbar: {
            display: 'flex',
            flexDirection: 'row-reverse',
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
            border: '1px solid rgb(153, 153, 153)',
            borderRadius: '8px 8px 0px 0px'
        },

        calculatorCloseBtn: {
            color: 'white'
        },

        calculatorContainer: {
            position: 'relative',
            width: 480,
            height: 344,
            overflow: 'Hidden',
        },

        calculatorLoader: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        calculator: {
            position: 'relative',
            top: -48
        },
    }
))


const QuizCalculator = (props) => {

    const classes = useCalcStyles()

    return props.show ?
        <Draggable bounds="parent">
            <div className={classes.root}>
                <div id="calculator-header" className={classes.calculatorTopbar} >
                    <IconButton  className={classes.calculatorCloseBtn} onClick={props.handleCalculator}>
                        <Close htmlColor="#ffffff" />
                    </IconButton>
                </div>
                <div className={classes.calculatorContainer}>
                    <div className={classes.calculatorLoader}>
                        <CircularProgress color='secondary' />
                    </div>
                    <iframe frameBorder="0" className={classes.calculator} title="Calculator" src="https://tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html" width="500px" height="346px" />
                </div>
            </div>
        </Draggable>
        : <div />

}


export default QuizCalculator