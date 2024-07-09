import { List, ListItem, ListItemIcon, ListItemText, makeStyles, } from "@material-ui/core"
import React from "react";
import QuizLevelSelector from "./QuizLevelSelector";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyle = makeStyles(theme => {
    return (
        {
            root: {
                marginLeft: theme.spacing(4),
                display: 'flex',
                marginBottom: theme.spacing(3),
                marginTop: theme.spacing(3),

                [theme.breakpoints.down('sm')]: {
                    marginLeft: theme.spacing(3),
                    marginTop: theme.spacing(4),
                },

                [theme.breakpoints.down('xs')]: {
                    marginBottom: '14px',
                    marginTop: theme.spacing(2),
                },

                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
            },



            quizOverviewTitle: {
                ...theme.typography.overline,
                fontSize: 12,
                color: theme.palette.text.secondary,
                lineHeight: '16px',
                fontWeight: '500',
            },

            quizInstructionBody: {
                //no idea
                marginBottom: 0,
                whiteSpace: 'pre-line',
                [theme.breakpoints.down('xs')]: {
                    marginBottom: 40,
                }
            },

            instructionList: {
                paddingLeft: 0,
                marginLeft: 0,
            },

            bulletin: {
                minWidth: 32,
                marginTop: 7,
            },

            OverviewLevelSelector: {
                display: 'block',
                [theme.breakpoints.down('xs')]: {
                    display: 'none'
                }
            },

            overviewQuizButton: {
                display: 'block',
                [theme.breakpoints.down('xs')]: {
                    display: 'none'
                }
            }

        }
    )
})


const OverviewSection = (props) => {

    const classes = useStyle()

    const instructions = [`${(props.level + '' === '1') ? 'Each questions carries one mark. There is no negative marking.' : 'Each question carries two marks.\n -0.33 will be deducted for incorrect response.'}`, 'The rank secured in the first attempt will be used to update the leaderboard.', 'Calculator is provided with your quiz.']

    return (
        <div style={{ display: props.hidden ? 'none' : 'flex' }} className={classes.root}>
            {/* Instruction */}
            <div>
                <div className={classes.quizOverviewTitle}>
                    Instructions
                </div>
                <div className={classes.quizInstructionBody}>
                    <List>
                        {instructions.map(e => {
                            return (
                                <ListItem className={classes.instructionList} alignItems='flex-start'>
                                    <ListItemIcon className={classes.bulletin}>
                                        <FiberManualRecordIcon style={{
                                            height: 14,
                                            width: 14,
                                        }} />
                                    </ListItemIcon>
                                    <ListItemText secondary={e} />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </div>

            {/* levelSelector */}

            <div>
                <div className={classes.OverviewLevelSelector}>
                    <QuizLevelSelector level={props.level} handleLevelChange={props.handleLevelChange} />
                </div>
                <div className={classes.overviewQuizButton}>
                    {props.StartButton}
                </div>
            </div>


        </div>
    )
}


export default OverviewSection