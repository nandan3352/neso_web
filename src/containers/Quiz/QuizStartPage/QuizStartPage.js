import React, { useEffect, useRef, useState } from 'react'
// import { BrowserRouter as Router, Link, Route, switch } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import QuizInfoPanel from './QuizInfoPanel/QuizInfoPanel';
import OverviewSection from './OverviewSection/OverviewSection';
import MainTopbar from './QuizStartTopbar/MainTopbar';
import { Button, Divider, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { KeyboardArrowLeft } from '@material-ui/icons';
import QuizLevelSelector from './OverviewSection/QuizLevelSelector';
import clsx from 'clsx';
import StartButton from "../../../components/UI/Buttons/Secondary/Filled/Button";
import { useNavigate } from 'react-router-dom';
import MobileShareBookmark from './MobileDeviceComponents/MobileShareBookmark';
import SectionedLeaderboard from './LeaderBoardSection/SectionedLeaderboard/SectionedLeaderboard';


const useQuizStyles = makeStyles((theme) => ({

    dialogRoot: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        width: "900px",
        height: "560px",
        background: theme.palette.background.surface,
        outline: "none",
        [theme.breakpoints.down('sm')]: {
            width: "508px",
            height: "727px",
        },

        [theme.breakpoints.down('xs')]: {
            top: 0,
            left: 0,
            transform: "none",
            position: 'relative',
            overflowY : "auto",
            width: "100%",
            height: "100%",
        },

    },

    InfoPanelContainer: {
        position: 'relative',
        border: 'none',
        marginLeft: 0,
        marginRight: 0,
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            border: `1px solid ${theme.palette.divider}`
        },
    },

    quizStartMobileBackButton: {
        marginLeft: theme.spacing(2),
        marginRight: 4,
        display: 'none',
        position: 'relative',
        left: 0,
        top: 0,
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'flex'
        }
    },

    quizStartPageClose: {
        position: 'absolute',
        right: 0,
        top: 0,
        marginTop: 4,
        padding: theme.spacing(1),
        marginRight: 4,
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(2),
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }

    },

    tabsRoot: {
        marginTop: theme.spacing(2),
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '4px',
        }
    },

    tabsRootSticky: {
        marginTop: 0,
        width: '100%',
        zIndex: 1300,
        position: 'fixed',
    },

    tabsContainer: {
        backgroundColor: theme.palette.background.surface,
        width: '100%',
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingLeft: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 4,
        }
    },

    tabsIndicator: {
        backgroundColor: theme.palette.primary.main,
    },

    tabItemContainer: {
        ...theme.typography.subtitle2,
        textTransform: 'none',
        minWidth: 93,
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: '500',
        marginRight: theme.spacing(4),
        color: theme.palette.grey[200],
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(2),
        },
        '&$selected': {
            color: theme.palette.primary.main,
        },
    },

    selected: {},

    dialogLeftSectionRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        borderRight: `1px solid ${theme.palette.divider}`
    },

    dialogRightSectionRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            marginBottom: 60,
        }
    },

    dialogLeftSection: {
        minWidth: 392,
        maxWidth: 392,
        [theme.breakpoints.down('sm')]: {
            minWidth: 508,
            maxWidth: 508
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'none',
            minWidth: 'auto'
        },
    },

    dialogRightSection: {
        minWidth: 508,
        maxWidth: 508,
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '74%',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'none',
            minWidth: 'auto',
            height: 'auto',
        },
    },

    levelDivider: {
        marginBottom: theme.spacing(2),
    },
    levelSelector: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },

    quizStartButton: {
        height: theme.spacing(6),
        marginRight: theme.spacing(4),
        marginLeft: 0,
        [theme.breakpoints.down('xs')]: {
            height: theme.spacing(4),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        }
    },
    quizBackButton: {
        fontWeight: 400,
        fontSize: '14px',
        color: theme.palette.text.secondary,
        textTransform: 'none',
    },
    mobileStartButton: {
        display: 'none',
        position: 'fixed',
        width: '100%',
        marginBottom: 20,
        top: 'calc(100vh - 52px)',
        zIndex: 300,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            bottom : 0,
            top : "inherit",
        }
    },

}));


const QuizStartPage = (props) => {


    const tabRef = useRef(null)
    const [stickTab, setStickTab] = useState(false)

    const classes = useQuizStyles();

    const [tabSelected, settabSelected] = useState(0)
    const [level, setlevel] = useState(props.level !== undefined ? props.level : '1')

    const theme = useTheme()

    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'))

    const history = useNavigate()


    const openQuizMainPage = (id, level, data) => {
        const options = {
            pathname: `/questions/${data.name}`,
            state: { id: id, level: level, data: data }
        }
        if (props.fromResult || props.fromMobile || props.fromSubject) {
            history.replace(options)
        } else {
            history.push(options)
        }
    }


    useEffect(() => {

        if (!props.container)
            return


        const tabOffset = tabRef.current.offsetTop

        const listenScroll = () => {
            setStickTab(props.container.current.scrollTop > (tabOffset - 4)) //tabs root have 4px topMargin
        }

        props.container.current.addEventListener('scroll', listenScroll)

        return () => {
            if (props.container.current != null)
                props.container.current.removeEventListener('scroll', listenScroll)
        }
    }, [tabRef, props.container])

    const handleTabChange = (event, selectedTab) => {
        settabSelected(selectedTab)
    }

    const handleLevelChange = (event) => {
        setlevel(event.target.value)
    }

    const quizStartButton = (
        <div className={classes.quizStartButton}>
            <StartButton
                onClick={() => openQuizMainPage(props.id, level, props.quizData)}
                width='100%'
                height='100%'
                content={'START'} />
        </div>
    )

    return (
        <div className={classes.dialogRoot}>

            <Grid container style={{ height: "100%" }}>

                <div /* style={{ height: 0, marginTop : -32 }} */ className={classes.mobileStartButton}>
                    {quizStartButton}
                </div>
                {/* Left Section */}

                <Grid className={classes.dialogLeftSection} item xs={12} sm={12}>

                    <div className={classes.dialogLeftSectionRoot}>

                        <div className={classes.quizStartMobileBackButton}>
                            <Button
                                style={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    color: theme.palette.text.secondary,
                                    textTransform: 'none',
                                }}
                                onClick={props.handleClose}
                                variant="text"
                                startIcon={<KeyboardArrowLeft />}>
                                Back
                            </Button>
                            {props.fromMobile && <MobileShareBookmark name={props.quizData.name} id={props.id} />}
                        </div>


                        <div className={classes.InfoPanelContainer}>
                            <MainTopbar id={props.id} name={props.quizData.name} />
                            <QuizInfoPanel title={props.quizData.name} noOfQuestions={props.quizData.tq} totalTime={`${props.quizData.t} mins`} />
                            <div className={classes.levelSelector}>
                                <Divider className={classes.levelDivider} />
                                <QuizLevelSelector level={level} handleLevelChange={handleLevelChange} />
                            </div>
                        </div>

                        <div ref={tabRef} className={clsx(classes.tabsRoot, { [classes.tabsRootSticky]: stickTab })}>
                            <Tabs
                                onChange={handleTabChange}
                                value={tabSelected}
                                classes={
                                    {
                                        indicator: classes.tabsIndicator,
                                        root: classes.tabsContainer
                                    }
                                } >
                                <Tab classes={{ selected: classes.selected, root: classes.tabItemContainer }} id='simple-tab-0' label="Overview" />
                                <Tab classes={{ selected: classes.selected, root: classes.tabItemContainer }} id='simple-tab-1' label="Leaderboard" />
                            </Tabs>
                        </div>
                        <div style={{ height: stickTab ? 48 : 0 }} />
                        <OverviewSection
                            id={props.id}
                            handleLevelChange={handleLevelChange}
                            level={level}
                            StartButton={quizStartButton}
                            quizData={props.quizData}
                            hidden={(smallDisplay && tabSelected !== 0)} />

                    </div>

                </Grid>

                {/* Right Section */}
                {<Grid
                    className={classes.dialogRightSection}
                    item
                    xs={12}
                    style={{ display: (smallDisplay && tabSelected !== 1) ? 'none' : 'flex' }}
                    sm={12} >
                    {/* <div style={{ height: stickTab ? 48 : 0 }} /> */}
                    <div className={classes.dialogRightSectionRoot}>
                        <SectionedLeaderboard id={props.id} />
                        {/* <LeaderboardTopbar />
                        <LeaderBoardSection leaderBoard={leaderBoard} /> */}
                    </div>
                </Grid>}
            </Grid>

            <IconButton onClick={props.handleClose} className={classes.quizStartPageClose}>
                <Close />
            </IconButton>

        </div>
    )
}

export default QuizStartPage
