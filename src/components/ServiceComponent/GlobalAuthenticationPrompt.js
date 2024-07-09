import { Button, makeStyles, Snackbar, useMediaQuery, useTheme } from "@material-ui/core"
import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { AuthDialogEvent, useEventListener } from "../../Services/Events"
import AuthenticationDialog from "../UI/Login-SignupDialog/Dialog/Dialog"


const useStyle = makeStyles(theme => ({
    label: {
        color: "#03DAC5" /* "#2D9CDB" */,
        lineHeight: '20px',
    },
    root: {
        padding: 0
    }
}))


//TODO : make separate endpoint for login.
//implement navigate on login feature. 
const GlobalAuthenticationPrompt = (props) => {

    const theme = useTheme()
    const tablet = useMediaQuery(theme.breakpoints.down('sm'))

    const navigator = useNavigate()

    useEffect(() => {
        if (tablet && openAuthDialog) {
            setOpenAuthDialog(false)
        }
        return () => {
        }
    }, [tablet])

    const classes = useStyle()
    useEventListener(AuthDialogEvent, (e) => {
        if (!tablet) {
            setOpenAuthDialog(e.detail.auth)
        } else {
            navigator.push("/login",{
                navigate : navigate
            });
        }
        setnavigate(e.detail.navigate)
        setloginForm(e.detail.login === undefined ? true : e.detail.login)
        setOpen(e.detail.open ? e.detail : false)
        setMsg(e.detail.msg || "Login to continue")
    })

    const [openAuthDialog, setOpenAuthDialog] = useState(false)
    const [loginForm, setloginForm] = useState(true)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState(null)
    const [navigate, setnavigate] = useState(null)
    const close = () => {
        setOpen(false)
    }

    const handleCloseAuthDialog = () => {
        setOpenAuthDialog(false)
    }

    const navLogin = () => {
        if (!tablet) setOpenAuthDialog(open.open)
        else {
            navigator.push('/login')
        }
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                key={"auth"}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={Boolean(open)}
                autoHideDuration={5000}
                onClose={close}
                message={msg ? msg : "Login to continue"}
                action={
                    <Button classes={{ root: classes.root, label: classes.label }} size="small" onClick={navLogin}>
                        Login
                    </Button>
                }/>
            <AuthenticationDialog
                navigate={navigate}
                open={openAuthDialog}
                onClose={handleCloseAuthDialog}
                showLoginForm={loginForm}
                setShowLoginForm={setloginForm} />
        </div>)
}

export default GlobalAuthenticationPrompt