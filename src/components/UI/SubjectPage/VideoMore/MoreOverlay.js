import { Drawer, Fade, Menu, Popover, useMediaQuery, useTheme } from "@material-ui/core"
import { useBookmark, useIsCompleted } from "../../../../Services/Utils"
import VideoMore from "./VideoMore"


//TODO: place this component in root (global component)

/* 
    props : 
    close
    anchorEl
    id
    open*/
const MoreOverlay = (props) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const bookmark = useBookmark();
    const completed = useIsCompleted(props.id)

    const handleBookmark = (id) => {
        return () => {
            const isRemoved = bookmark.bookmarks.includes(id)
            bookmark
                .setbookmark(id, !bookmark.bookmarks.includes(id), props.name)
                .then((i) => {
                    if (isRemoved && props.bookmarkRemoved) {
                        props.bookmarkRemoved(id)
                    }
                    props.close()
                });
        };
    };

    const open = Boolean(props.anchorEl);

    return (
        isMobile ?
            <Drawer onClose={props.close}
                open={open}
                anchor="bottom" >
                <VideoMore
                    url={props.url}
                    isCompleted={completed.isComplete}
                    setComplete={completed.setComplete}
                    isBookmarked={bookmark.bookmarks.includes(props.id + '')}
                    toggleBookmark={handleBookmark(props.id)}
                    style={{ display: 'block', height: 'auto', width: '100%', maxWidth: '100%', position: 'static', transform: 'none' }}
                    id={props.id}
                    moreClickId='more-clicked'
                    close={props.close}
                />
            </Drawer>
            :

            <Popover
                elevation={0}
                anchorEl={props.anchorEl}
                onClose={props.close}
                open={open}
                anchorOrigin={props.anchorOrigin ? props.anchorOrigin : {
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={props.transformOrigin ? props.transformOrigin : {
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <VideoMore
                    url={props.url}
                    isCompleted={completed.isComplete}
                    setComplete={completed.setComplete}
                    isBookmarked={bookmark.bookmarks.includes(props.id + '')}
                    toggleBookmark={handleBookmark(props.id)}
                    style={{ position: 'static', transform: 'none', minWidth: "250px" }}
                    id={props.id} moreClickId='more-clicked'
                    close={props.close} />
            </Popover>
    )
}

export default MoreOverlay