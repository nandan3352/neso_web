import { Dialog, makeStyles, IconButton, Button, SvgIcon } from "@material-ui/core"
import { Close, Email } from "@material-ui/icons"
import { useState } from "react"
import { ShareEvent, useEventListener } from "../../../Services/Events"
import { ReactComponent as Facebook } from "../../../assets/images/SocialMediaIcons/Facebook.svg";
import { ReactComponent as Whatsapp } from "../../../assets/images/SocialMediaIcons/Whatsapp.svg";
import { ReactComponent as Twitter } from "../../../assets/images/SocialMediaIcons/Twitter.svg";



const useStyles = makeStyles((theme) => (
    {
        root: {

        },


        title: {
            ...theme.typography.body1,
            padding: '24px 24px 0px 24px'
        },

        close: {
            margin: '12px 12px 0px 12px'
        },

        content: {

            display: 'flex',
            alignItems: 'center',
            padding: '4px 24px 20px 24px'
        },

        topPanel: {
            display: 'flex',
            justifyContent: 'space-between',
        },

        copyLabel: {
            color: theme.palette.secondary.main
        },

        textarea: {
            ...theme.typography.body1,
            color: theme.palette.text.secondary,
            // backgroundColor: theme.palette.container.footer,
            minWidth: 330,
            wordWrap: 'break-word',
            lineHeight: '24px',
            height: '68px',
            overflowY: 'auto',
            overflowX: 'hidden',
            [theme.breakpoints.down('xs')]: {
                minWidth: 'auto'
            },
            // '&::selection': {
            //     color: theme.palette.text.secondary,
            //     backgroundColor: 'transparent'
            // },
            padding: '10px 16px',
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'auto',
            maxWidth: 330,
            boxSizing: 'border-box',
            resize: 'none',
            marginRight: 29,
        },

        paper: {
            borderRadius: '4px !important'
        },

        socialMedia: {
            padding: '0px 12px 20px 12px'
        }
    }
))

const GlobalShareDialog = (

) => {


    const classes = useStyles()
    const [url, setUrl] = useState('')
    const [copied, setCopied] = useState(false)

    useEventListener(ShareEvent, (e) => {
        setUrl(e.detail ? e.detail.url : '')
    })

    const close = () => {
        setCopied(false)
        setUrl('')
    }

    const copy = () => {
        const containerid = 'url-copy'
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {
            document.selection.empty();
        }

        if (document.selection) {
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy");
        } else if (window.getSelection) {
            let range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
            document.execCommand("copy");
        }
        setCopied(true)
    }

    function processTitle() {
        const urlComps = url.split('/')
        const index = (urlComps[urlComps.length - 1]).indexOf('-')
        const title = (urlComps[urlComps.length - 1]).substr(index + 1).replace(/-/g, " ").replace(/&/g, 'and') + ' - Neso academy'
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    const shareUrl = url.slice(0, 4) === "http" ? url : window.location.origin + url
    const title = processTitle()
    const share = [{ Icon: Email, link: `mailto:?subject=${title}&body=check out this link ${shareUrl}.` }, { Icon: Facebook, link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${title}` }, { Icon: Twitter, link: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}&hashtags=Nesoacademy,redefiningeducation` }, { Icon: Whatsapp, link: `https://api.whatsapp.com/send/?phone&text=${title}, ${shareUrl}` }]

    return (<Dialog
        onClose={close}
        style={{ zIndex: 1600 }}
        classes={{ paper: classes.paper }}
        open={Boolean(url)} >
        <div className={classes.topPanel}>
            <div className={classes.title}>
                Share
            </div>
            <IconButton onClick={close} className={classes.close}>
                <Close />
            </IconButton>
        </div>
        <div className={classes.content} >
            <div id="url-copy" className={classes.textarea} readOnly={true} >
                {shareUrl}
            </div>
            <Button variant='outlined' classes={{ label: classes.copyLabel }} onClick={copy} F >
                {copied ? 'COPIED' : 'COPY'}
            </Button>
        </div>
        <div className={classes.socialMedia} >
            {share.map(e =>
                <a href={e.link} target='_blank'
                    rel='noopener noreferrer'>
                    <IconButton >
                        <SvgIcon>
                            <e.Icon />
                        </SvgIcon>
                    </IconButton>
                </a>
            )}
        </div>
    </Dialog>)
}

export default GlobalShareDialog