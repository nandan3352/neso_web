import { makeStyles, Drawer, useMediaQuery, useTheme } from "@material-ui/core"
import StatusIndicator from "./StatusIndicator"
import StatusIndicatorGuide from "./StatusIndicatorGuide"
import * as STATUS from './StatusIndicator'
import SubmitButton from "../../../../components/UI/Buttons/Secondary/Filled/Button"
import DrawerToggleButton from "./DrawerToggleButton"


const useStyle = makeStyles(theme => (
    {
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '60px',
            height: '100%',
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(1)
            }
        },

        guideContainer: {
            '& > div': {
                marginTop: 12
            },
            paddingLeft: 20,
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 4,
            borderBottom: `1px solid ${theme.palette.divider}`,
            paddingBottom: theme.spacing(3)
        },

        questionChooserTitle: {
            ...theme.typography.subtitle2,
            marginTop: 20,
            marginLeft: 20,
            marginBottom: theme.spacing(4)

        },

        questionGridContainer: {
            marginLeft: 20,
            display: 'flex',
            gridColumnGap: 20,
            flexWrap: 'wrap',
        },

        drawer: {

        },

        drawerToggleButtonpos: {
            position: 'fixed',
            zIndex: 1300,
            height: '100%',
            right: 228,
            top: '50%',
            [theme.breakpoints.down('xs')]: {
                marginTop: -theme.spacing(5),
                right: 0,
                top: 'auto',
                height: 'auto',
            }
        },

        drawerPaper: {
            width: 228,
            [theme.breakpoints.down('xs')]: {
                width: 'auto',
            }
        },

        submitButton: {
            display: 'block',
            marginBottom: theme.spacing(2),
            width: 90,
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        }

    }
))

const QuestionSelectorDrawer = (props) => {

    const classes = useStyle()

    const theme = useTheme()

    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'))

    const mobileDisplay = useMediaQuery(theme.breakpoints.down('xs'))

    const answeredCount = props.QuizStatusArray.filter(p => p.status === STATUS.ANSWERED).length

    const notAnsweredCount = props.QuizStatusArray.filter(p => p.status === STATUS.NOT_ANSWERED).length

    const markedForReviewCount = props.QuizStatusArray.filter(p => p.status === STATUS.MARKED_FOR_REVIEW).length

    let notVisitedCount = props.QuizStatusArray.length - answeredCount - notAnsweredCount - markedForReviewCount - 1

    notVisitedCount = notVisitedCount > 0 ? notVisitedCount : 0


    const DrawerBody = (
        <div className={classes.root}>
            <div>
                <div className={classes.guideContainer}>
                    <StatusIndicatorGuide body="Answered" status={STATUS.ANSWERED} index={answeredCount} />
                    <StatusIndicatorGuide body="Not answered" status={STATUS.NOT_ANSWERED} index={notAnsweredCount} />
                    <StatusIndicatorGuide body="Not visited" status={STATUS.NOT_VISITED} index={notVisitedCount} />
                    {mobileDisplay ? <div /> : <StatusIndicatorGuide body="Marked for review" status={STATUS.MARKED_FOR_REVIEW} index={markedForReviewCount} />}
                </div>
                <div className={classes.questionChooserTitle}>
                    Choose a question no.
                </div>
                <div className={classes.questionGridContainer}>
                    {props.QuizStatusArray.map((element, index) =>
                    (<StatusIndicator onClick={() => {
                        props.handleQuestionSelector(index)
                    }} gridView={true} index={index + 1} status={element.status} />))}
                </div>
            </div>
            <div className={classes.submitButton}>
                <SubmitButton onClick={props.submit} width="100%" content="Submit" />
            </div>
        </div>
    )

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">{
            smallDisplay ? (
                <Drawer
                    container={props.root}
                    style={{ zIndex: 1304 }}
                    variant="temporary"
                    anchor={mobileDisplay ? 'bottom' : 'right'}
                    open={props.open}
                    onClose={props.close}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}>
                    <div className={classes.drawerToggleButtonpos}>
                        <DrawerToggleButton onClick={props.close} open={true} surface={true} />
                    </div>
                    {DrawerBody}
                </Drawer>

            ) : (<Drawer
                anchor='right'
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="persistent"
                open={props.open}>
                {DrawerBody}
            </Drawer>)
        }       </nav>)



}

export default QuestionSelectorDrawer