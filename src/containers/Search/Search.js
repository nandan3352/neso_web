import React, { useState } from 'react';
import SearchResults from '../../components/UI/SearchPage/SearchResultsVideos/SearchResultsVideos';
import LoadingWhole from '../../components/UI/SearchPage/LoadingWhole/LoadingWhole';
import EmptySearch from '../../components/UI/SearchPage/EmptySearch/EmptySearch';
import { databaseOnce, fetchData } from '../../Services/Database';
import { getEndpointForId, useQuizDispatchStates } from '../../Services/Utils';
import { Container, Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useSubscriptionListener } from '../../Services/Subscription';
import QuizStartDialog from '../Quiz/QuizStartPage/QuizStartDialog';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import clsx from 'clsx';
import QNP from '../../components/UI/QNP/QNP';
import MoreOverlay from '../../components/UI/SubjectPage/VideoMore/MoreOverlay';
import AdsContainer, { AD_VARIENT_BANNER_MINI, AD_VARIENT_SQUARE_LARGE } from '../../components/UI/Ads/AdsContainer';
import { Helmet } from 'react-helmet';
import { navigate } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    root: {
    },

    header: {
        ...theme.typography.h5,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        }
    },

    LectChaptSection: {

    },

    auxillaryContents: {
        display: 'grid',
        position: 'relative',
        paddingBottom: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderBottom: `1px solid ${theme.palette.divider}`,
        gridTemplateColumns: '1fr 1fr 1fr',
        gridColumnGap: 20,
        overflow: 'hidden',
        maxHeight: '10000px',
        transition: `all 225ms ease-in`,
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr 1fr',
        },

        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '1fr',
            maxHeight: '216px',
            paddingBottom: theme.spacing(3),
        }
    },

    expandMobileIcon: {
        display: 'none',
        borderRadius: "50%",
        height: 36,
        width: 36,
        left: 'calc(50% - 18px)',
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.surface,
        position: "absolute",
        bottom: -18,
        "&:hover": {
            backgroundColor: theme.palette.background.paper,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
        }
    },

    expand: {
        maxHeight: '10000px',
    },

    gridItem: {

    }

}))

function getFilteredList(response) {

    const notes = []
    const quiz = []
    const ppt = []
    const others = []

    const iterator = (i) => {
        const comps = i[0].split('_')
        const item = { ...i[1], id: i[0] }
        if (comps.length > 2) {
            switch (comps[2]) {
                case 'q':
                    quiz.push({ ...item, id: comps[0] + "_" + comps[1] })
                    break;
                case 'n':
                    notes.push(item)
                    break;
                case 'p':
                    ppt.push(item)
                    break;
                default:
                    others.push(item)
                    break;
            }
        } else {
            others.push(item)
        }
    }

    Object.entries(response).forEach(iterator)

    return { 'ppt': ppt, 'notes': notes, 'quiz': quiz, 'others': others }
}

function Search(props) {


    const queryParam = props.location.search.slice(7)
    const state = props.location.state
    const query = state && state.query && state.query.trim();
    const classes = useStyle()
    const [more, setMore] = useState(null)
    const endpoint = `https://us-central1-neso-c53c4.cloudfunctions.net/search/?size=30&page=1&q=${encodeURIComponent(query)}`;
    const subscription = useSubscriptionListener()
    const navigator = useNavigate()

    const [response, setResponse] = React.useState(null);
    const { userRecordFetchCompleteCallback, choosedQuizIndex, handleQuizChoosed, fetchingUserRecordIndex } = useQuizDispatchStates()

    const [mobileExpand, setmobileExpand] = React.useState(false)

    React.useEffect(() => {
        if (query)
            getSearchResults();
    }, [query]);

    if (queryParam) {
        return <navigate to={{ pathname: "/search", state: { query: queryParam } }} />
    }

    if (!query) {
        return <navigate to="/" />
    }

    const handleExpand = () => {
        setmobileExpand(!mobileExpand)
    }

    const handleMore = (id, url) => {
        return (event) => {
            event.preventDefault()
            event.stopPropagation();
            setMore({ target: event.target, id: id, url: url });
        };
    };

    const auxillaryItemUi = (data) => (
        <QNP handleMore={handleMore(data.id, getEndpointForId(data.id, data.courseName, data.title, data.title))} {...data} />
    )


    async function getSearchResults() {
        setResponse(null)
        const response = await (await fetch(endpoint)).json();
        if (response instanceof Array) {
            const fetchedData = await fetchData(response.map(i => i.id))
            setResponse(getFilteredList(fetchedData))
        }
    }


    //TODO : loader is not nice
    if (!response) {
        return <LoadingWhole />
    }


    if ([response.quiz.length, response.others.length, response.notes.length, response.ppt.length].filter(p => p !== 0).length === 0) {
        return <EmptySearch />
    }

    const quizClickHandle = (i, d) => ((!d.paid || subscription.isSubscribed) ? handleQuizChoosed(i) : undefined)


    const auxillaryContents = [
        ...response.quiz.map((d, i) => auxillaryItemUi({ ...d.additional, id: d.id + '_q', title: d.name, nopages: d.tq + " questions", canAccess: (!d.paid || subscription.isSubscribed), onClick: quizClickHandle(i, d), showLoader: fetchingUserRecordIndex === (i) })),
        ...response.notes.map((d, i) => auxillaryItemUi({ ...d.additional, id: d.id, title: d.name, canAccess: (!d.paid || subscription.isSubscribed) })),
        ...response.ppt.map((d, i) => auxillaryItemUi({ id: d.id, title: d.name, ...d, ...d.additional, canAccess: (!d.paid || subscription.isSubscribed) })),
    ]


    return (
        <Container>
            <Helmet>
                <title>{query} | Neso Academy</title>
                <meta name="description" content="With Neso Fuel get access to all the paid content with Ad-free experience." />
            </Helmet>
            <QuizStartDialog userRecordFetchCallback={userRecordFetchCompleteCallback} id={response.quiz[choosedQuizIndex] && response.quiz[choosedQuizIndex].id} level={1} open={choosedQuizIndex !== -1} handleClose={handleQuizChoosed(-1)} data={response.quiz[choosedQuizIndex] || { tq: '', t: '' }} />
            <MoreOverlay
                close={() => setMore(null)}
                anchorEl={more ? more.target : null}
                id={more ? more.id : null}
                url={more ? more.url : null}
                open={Boolean(more)} />
            <section className={classes.root}>
                <div className={classes.header}>
                    Search Results
                </div>
                <div style={{ position: 'relative' }}>
                    {auxillaryContents.length > 0 &&
                        <div className={clsx(classes.auxillaryContents, { [classes.expand]: mobileExpand })}>
                            {auxillaryContents}
                        </div>}
                    {response.quiz.length > 3 && <IconButton onClick={handleExpand} className={classes.expandMobileIcon}>
                        {!mobileExpand ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                    </IconButton>}
                </div>

                <Grid container>
                    <Grid md={6} sm={12} item>
                        <div className={classes.LectChaptSection}>
                            {response.others.map((d, i) => <>
                                {(i / 4 < 4 && i % 4 === 0) && <Hidden mdUp >
                                    <AdsContainer path="search" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} />
                                </Hidden>}
                                <SearchResults navigator={navigator} {...d} />
                            </>)}
                        </div>
                    </Grid>
                    <Grid md={6} item>
                        <Hidden smDown >
                            <AdsContainer path="search" hide={subscription.isSubscribed} varient={AD_VARIENT_SQUARE_LARGE} rootStyle={{ border: "none", justifyContent: 'flex-end', marginTop: 0 }} />
                            <AdsContainer path="search" hide={subscription.isSubscribed} varient={AD_VARIENT_SQUARE_LARGE} rootStyle={{ border: "none", justifyContent: 'flex-end' }} />
                            <AdsContainer path="search" hide={subscription.isSubscribed} varient={AD_VARIENT_SQUARE_LARGE} rootStyle={{ border: "none", justifyContent: 'flex-end' }} />
                        </Hidden>
                    </Grid>
                </Grid>

            </section>
        </Container>
    )
}


export default Search;
