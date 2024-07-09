import { IconButton, makeStyles, SvgIcon } from "@material-ui/core"
import { Bookmark, BookmarkBorder } from "@material-ui/icons"
import { ReactComponent as Facebook } from "../../../assets/images/SocialMediaIcons/Facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/images/SocialMediaIcons/Twitter.svg";




const useStyle = makeStyles(theme => ({
    root: {
        maxWidth: "680px",
        margin: "auto",
        marginBottom: 32,
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingBottom : 12,
    },

    title: {
        ...theme.typography.h4,
        marginBottom: 20,
        fontWeight : 800
    },

    iconPanel: {
        marginLeft: -12
    },

    icon: {

    },

    iconNotCompleted: {
        '& rect': {
            fill: "#5c5c5c"
        },
        '& path': {
            fill: "#666666"
        }
    },

    iconCompleted: {
        '& rect': {
            fill: theme.palette.type === 'dark' ? "#ff9089" : "#F2994A"
        },
        '& path': {
            fill: theme.palette.type === 'dark' ? "#f7e7ea" : "#BF232D"
        }
    }

}))

const NotesHeader = ({ title, id, bookmarked, isComplete }) => {
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <div className={classes.title} >{title}</div>
            <div className={classes.iconPanel}>
                <IconButton>
                    {bookmarked ? <Bookmark color="secondary" /> : <BookmarkBorder />}
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
                <IconButton disabled>
                    <svg
                        className={isComplete ? classes.iconCompleted : classes.iconNotCompleted}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                            width="24"
                            height="24"
                            rx="12"
                            fill-opacity="0.16"
                        />
                        <path d="M10.5 14.625L7.875 12L7 12.875L10.5 16.375L18 8.875L17.125 8L10.5 14.625Z" />
                    </svg>
                </IconButton>
            </div>
        </div>
    )
}

export default NotesHeader