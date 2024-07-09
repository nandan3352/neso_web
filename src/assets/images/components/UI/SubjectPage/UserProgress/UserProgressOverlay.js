import { Dialog, IconButton, makeStyles, Popover } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import UserProgress from "./UserProgress"


const useStyle = makeStyles(theme => (
    {
        root: {
            width : 376,
            padding: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                width : 300,
                padding: '20px 20px 4px 20px',
            },
        },

        popover: {
            pointerEvents: 'none',
            [theme.breakpoints.down(1000)]: {
                pointerEvents: 'auto',
            }
        },

        paper: {
            border: `1px solid ${theme.palette.divider}`,
            margin: 10
        },

        header: {
            ...theme.typography.h6,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(4)
        },

        progressContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(2)
        },

        progressLabel: {
            ...theme.typography.subtitle1,
            width: 66
        },

        progressCompleted: {
            ...theme.typography.subtitle1,
            justifySelf: 'end'
        },

        progressBar: {
            marginLeft: 20,
            marginRight : 0,
            width: 198,
            [theme.breakpoints.down('xs')]: {
                width: 140,
                marginLeft: 16,
            }
        },

        progressTotal: {
            color: theme.palette.text.secondary
        },

        close: {
            display: 'none',
            margin: '-12px -12px 0px 0px',
            [theme.breakpoints.down(1000)]: {
                display: 'flex'
            }
        }


    }
))

const UserProgressOverlay = (props) => {
    const progress = props.userRecord

    const classes = useStyle()

    const open = Boolean(props.anchor)

    const content = (
        <div className={classes.root}>
            <div className={classes.header}>
                Progress
                <IconButton className={classes.close} onClick={props.close}>
                    <Close />
                </IconButton>
            </div>
            <div className={classes.progressContainer}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={classes.progressLabel}>
                        Lectures
                        </div>
                    <div className={classes.progressBar}>
                        <UserProgress lecturePercentage={progress.lectures} />
                    </div>
                </div>
                <div className={classes.progressCompleted}>
                    {`${Number((progress.lt * progress.lectures).toFixed(0))}`} <span className={classes.progressTotal}>{`/${progress.lt}`}</span>
                </div>
            </div>
            <div className={classes.progressContainer}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={classes.progressLabel}>
                        Chapters
                        </div>
                    <div className={classes.progressBar}>
                        <UserProgress chapterPercentage={progress.chapters} />
                    </div>
                </div>
                <div className={classes.progressCompleted}>
                    {`${Number((progress.ct * progress.chapters).toFixed(0))}`} <span className={classes.progressTotal}>{`/${progress.ct}`}</span>
                </div>
            </div>
            <div className={classes.progressContainer}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={classes.progressLabel}>
                        Quizzes
                        </div>
                    <div className={classes.progressBar}>
                        <UserProgress quizPercentage={progress.quizzes} />
                    </div>
                </div>
                <div className={classes.progressCompleted}>
                    {`${Number((progress.qt * progress.quizzes).toFixed(0)) || 0}`} <span className={classes.progressTotal}>{`/${progress.qt}`}</span>
                </div>
            </div>
        </div>
    )

    if (props.isMobile) {
        return (
            <Dialog classes={{ paper: classes.paper }}
                onClose={props.close} open={open}>
                {content}
            </Dialog>
        )
    }

    return (
        <Popover
            disableRestoreFocus
            className={classes.popover}
            anchorOrigin={{
                vertical: props.isTablet ? 'bottom' : 'top',
                horizontal: props.isTablet ? 'center' : 'right',
            }}
            transformOrigin={{
                vertical: props.isTablet ? 'top' : 'bottom',
                horizontal: props.isTablet ? 'center' : 'left',
            }}
            classes={{ paper: classes.paper }}
            elevation={0}
            open={open}
            anchorEl={props.anchor}>
            {content}
        </Popover>
    )
}

export default UserProgressOverlay