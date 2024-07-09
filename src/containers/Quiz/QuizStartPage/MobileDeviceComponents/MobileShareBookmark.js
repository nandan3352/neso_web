import { IconButton, makeStyles } from "@material-ui/core"
import { ShareRounded } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { getEndpointForId, useBookmark } from "../../../../Services/Utils";
import Bookmark from "@material-ui/icons/Bookmark"
import BookmarkBorder from "@material-ui/icons/BookmarkBorder"
import { ShareEvent, useEventDispatch } from "../../../../Services/Events";



const useStyle = makeStyles(theme => ({
    bookmark: {

    },
    share: {

    },
    quizBookmarkIconFilled: {
        color: theme.palette.secondary.main
    }
}))

const MobileShareBookmark = (props) => {

    const [bookmarked, setBookmarked] = useState(false);
    const classes = useStyle()
    const bookmark = useBookmark()
    const share = useEventDispatch(ShareEvent)

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

    //TODO:  get course of the quiz
    return (
        <div className={props.className}>
            <IconButton onClick={(e) => share({ url: getEndpointForId(props.id, undefined, props.name) })}>
                <ShareRounded />
            </IconButton>
            <IconButton onClick={handleBookmark}>
                {bookmarked ? <Bookmark className={classes.quizBookmarkIconFilled} /> : <BookmarkBorder />}
            </IconButton>
        </div>
    )
}


export default MobileShareBookmark