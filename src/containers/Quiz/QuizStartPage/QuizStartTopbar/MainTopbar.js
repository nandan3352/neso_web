import React, { useEffect, useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core"
import Bookmark from "@material-ui/icons/Bookmark"
import BookmarkBorder from "@material-ui/icons/BookmarkBorder"
import { useBookmark } from "../../../../Services/Utils";
import { AuthDialogEvent, useEventDispatch } from "../../../../Services/Events";

const useStyles = makeStyles(theme => {
    return (
        {
            root: {
                width: '100%',
                marginLeft: theme.spacing(4),
                [theme.breakpoints.down('sm')]: {
                    marginLeft: theme.spacing(3),
                },
                [theme.breakpoints.down('xs')]: {
                    marginLeft: 0,
                    justifyContent: 'center'
                },
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignContent: 'start'
            },

            quizTopBarTitle: {
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(1),
                ...theme.typography.overline,
                fontSize: 12,
                lineHeight: '16px',
                fontWeight: '500',
                color: theme.palette.text.secondary,
                [theme.breakpoints.down('xs')]: {
                    marginTop: theme.spacing(2)
                }
            },

            quizBookmark: {
                display: 'block',
                position: 'static',
                marginTop: '16px',
                marginRight: theme.spacing(6),
                [theme.breakpoints.down('xs')]: {
                    display: 'none'
                },

            },

            quizBookmarkIcon: {
                padding: theme.spacing(1),
                [theme.breakpoints.down('sm')]: {
                    marginRight: theme.spacing(5)
                }
            },

            quizBookmarkIconFilled: {
                color: theme.palette.secondary.main
            }
        }
    )
})

const MainTopbar = (props) => {

    const [bookmarked, setBookmarked] = useState(false);
    const classes = useStyles()
    const bookmark = useBookmark()

    useEffect(() => {
        setBookmarked(bookmark.bookmarks.includes(props.id + '_q'))
        return () => {
            //do nothing
        }
    }, [bookmark.bookmarks, props.id])


    const handleBookmark = async () => {
        if (await bookmark.setbookmark(props.id + '_q', !bookmarked, props.name))
            setBookmarked(!bookmarked)
    }

    return (
        <div className={classes.root}>
            <div className={classes.quizTopBarTitle}>
                quiz
            </div>
            <div className={classes.quizBookmark}>
                <IconButton className={classes.quizBookmarkIcon} onClick={handleBookmark}>
                    {bookmarked ? <Bookmark className={classes.quizBookmarkIconFilled} /> : <BookmarkBorder />}
                </IconButton>
            </div>
        </div>)
}

export default MainTopbar