import { Button, makeStyles, Snackbar } from "@material-ui/core"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useEventListener, SnackbarEvent } from "../../Services/Events"



const useStyle = makeStyles(theme => ({
    label: {
        color: "#03DAC5" /* "#2D9CDB" */,
        lineHeight: '20px',
    },
    root: {
        padding: 0
    }
}))

/* required actions :

    open -> boolean
    msg -> string
    button -> { text : string, nav : path  }

*/

const GlobalSnackbar = (props) => {

    const classes = useStyle()

    const history = useNavigate()
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState(null)
    const [button, setbutton] = useState(null)

    const close = () => {
        setOpen(false)
    }
    useEventListener(SnackbarEvent, (e) => {
        setOpen(e.detail.open ? e.detail : false)
        setMsg(e.detail.msg ? e.detail.msg : "Login to continue!")
        setbutton(e.detail.button)
    })

    const handleNav = (path) => () => {
        close()
        history.push(path)
    }

    return <Snackbar
        key={"gs"}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        open={Boolean(open)}
        autoHideDuration={3000}
        onClose={close}
        message={msg ? msg : "Login to continue!"}
        action={
            button && (<Button classes={{ root: classes.root, label: classes.label }} size="small" onClick={handleNav(button.nav)}>
                {button.text}
            </Button>)
        }
    />

}

export default GlobalSnackbar