import React from 'react';
import { ReactComponent as Facebook } from './facebook.svg';
import { ReactComponent as Twitter } from './twitter.svg';
import MarkComplete from './markcomplete.svg';
import { pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';
import './NotesViewRight.css';
import Comments from '../../../../containers/Player/RightSection/Tab/Comments/Comments';
import { useBookmark, useIsCompleted } from "../../../../Services/Utils";
import { getEndpointForId } from '../../../../Services/Utils';
import { Document, Page } from 'react-pdf';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { IconButton, makeStyles, SvgIcon } from '@material-ui/core';
import { Link as MLink } from '@material-ui/core';
import { HomeRounded } from '@material-ui/icons';
import { ReactComponent as Bookmark } from "./bookmark.svg";
import { ReactComponent as Bookmarked } from "./bookmarked.svg";

const useStyles = makeStyles((theme) => ({
    breadcrumbsText: {
        color: theme.palette.text.primary,
    }
}))

function NotesViewRight(props) {
    const styles = useStyles();
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const id = `${props.endPointValue}_n`;
    const [pagesArr, setPagesArr] = React.useState([]);
    const [scrolled, setScrolled] = React.useState('');
    const [bookmarkSrc, setBookmarkSrc] = React.useState(false);

    const useBookmarkFunction = useBookmark();


    // React.useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    // }, []);

    // function handleScroll() {
    //     if (document.documentElement.scrollTop >= 141) {
    //         setScrolled('notes-section-scrolled');
    //     } else {
    //         setScrolled('');
    //     }
    // }

    React.useEffect(() => {
        setBookmarkSrc(useBookmarkFunction.bookmarks.includes(id));
    }, [useBookmarkFunction.bookmarks, props.endPointValue]);

    function onLoadSuccess(param) {
        const numArr = [];
        for (let num = 1; num <= param.numPages; num++) {
            numArr.push(num);
        }
        setPagesArr(numArr);
    }

    async function toggleBookmark() {
        if (await useBookmarkFunction.setbookmark(id, !bookmarkSrc, props.note.name)) {
            setBookmarkSrc(!bookmarkSrc);
        }
    }

    return (
        <section className='notes-view-right'>
            <section className='notes-view-header'>
                <div className='header-path' id='notesview-section-header'>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <MLink href="/" onClick={(e) => { e.stopPropagation() }}>
                            <IconButton id="breadCrumb-button">
                                <HomeRounded />
                            </IconButton>
                        </MLink>
                        <MLink href="/">
                            <Typography className={styles.breadcrumbsText}>
                                {props.subjectLink}
                            </Typography>
                        </MLink>
                        <Typography>{props.note.name} (Notes)</Typography>
                    </Breadcrumbs>
                </div>
                <div className='notes-view-details'>
                    <p>{props.note.name}</p>
                    <div className='notes-view-icons' style={{ marginTop: "-12px" }}>
                        <IconButton style={{ marginLeft: "-12px" }} onClick={toggleBookmark}>
                            <SvgIcon>
                                {bookmarkSrc ? <Bookmarked /> : <Bookmark />}
                            </SvgIcon>
                        </IconButton>
                        <IconButton>
                            <SvgIcon>
                                <Facebook />
                            </SvgIcon>
                        </IconButton>
                        <IconButton>
                            <SvgIcon>
                                <Twitter />
                            </SvgIcon>
                        </IconButton>
                    </div>
                </div>
            </section>
            <section className='notes-view-tablet'>
                <div className='header-path' id='notesview-section-header'>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <MLink href="/" onClick={(e) => { e.stopPropagation() }}>
                            <IconButton id="breadCrumb-button">
                                <HomeRounded />
                            </IconButton>
                        </MLink>
                        <MLink href="/">
                            <Typography className={styles.breadcrumbsText}>
                                {props.subjectLink}
                            </Typography>
                        </MLink>
                        <Typography>{props.note.name} (Notes)</Typography>
                    </Breadcrumbs>
                </div>
                {/* <div className='notes-view-tablet-details'>
                    <p>{props.note.name}</p>
                    <div className='ppt-pages'>
                        <div id='current-ppt-page'>1</div>
                        <span> / 64 </span>
                    </div>
                    <div className='notes-icons'>
                        <img src={MarkComplete} alt='mark-complete' />
                        <img src={Bookmark} alt='bookmark' />
                    </div>
                </div> */}
            </section>
            <section className='notes-view-pdf'>
                <Document file={props.note.pdf} onLoadSuccess={onLoadSuccess}>
                    {pagesArr.map(element => <Page key={element} pageNumber={element} id={element}></Page>)}
                </Document>
                {/* <div className='empty-notes-view'></div>
                <div className='empty-notes-view'></div>
                <div className='empty-notes-view'></div> */}
            </section>
            <Link to={getEndpointForId(props.endPointValue)}>
                <section className='ppt-view-watch-video'>
                    <p>Watch the lectures here</p>
                    <img src={props.currentVideo.img}></img>
                </section>
            </Link>
            {/* <section className='pdf-view-comment-section'>
                <Comments />
            </section> */}
        </section >

    )
}

export default NotesViewRight;
