import { IconButton } from "@material-ui/core"
import { Bookmark, BookmarkBorder } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useBookmark } from "../../../../Services/Utils"



const PlayerBookmark = (props) => {

    const { bookmarks, setbookmark } = useBookmark()
    const [bookmarked, setBookmarked] = useState(false)

    useEffect(() => {
        setBookmarked(bookmarks.includes(props.id))
        return () => {
            //do nothing
        }
    }, [bookmarks, props.id])

    const handleBookmark = async (e) => {
        if (await setbookmark(props.id, !bookmarked, props.name))
            setBookmarked(!bookmarked)
    }

    return (
        <div >
            <IconButton onClick={handleBookmark}>
                {bookmarked ? <Bookmark color="secondary" /> : <BookmarkBorder />}
            </IconButton>
        </div>
    )
}

export default PlayerBookmark