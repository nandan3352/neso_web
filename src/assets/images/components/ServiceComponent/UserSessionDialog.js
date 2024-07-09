import { useEffect, useState } from "react"
import { signout, useUser } from "../../Services/Auth"
import { databaseOnValue } from "../../Services/Database"
import { AuthDialogEvent, useEventDispatch } from "../../Services/Events"
import AlertDialog from "../UI/Quiz/AlertDialog"


function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function getOrCreateSessionId() {

    const SESSION_ID = "NESO_USER_SESSION_ID"

    let uuid = localStorage.getItem(SESSION_ID)
    if (!uuid) {
        uuid = createUUID();
        localStorage.setItem(SESSION_ID, uuid)
    }
    return uuid
}

const UserSessionDialog = (props) => {

    const dispatchAuth = useEventDispatch(AuthDialogEvent)

    const [open, setOpen] = useState(false)
    const user = useUser()

    const handleclose = () => setOpen(false)

    const handleLogin = () => {
        setOpen(false)
        dispatchAuth({ auth: true })
    }

    useEffect(() => {
        if (!user) {
            return
        }
        let sessionId = getOrCreateSessionId()
        return databaseOnValue(`Users/${user.uid}/web_session`, (snap) => {
            if (snap && snap.val() && user) {
                if (snap.val() !== sessionId) {
                    signout()
                    setOpen(true);
                }
            }
        })
    }, [user])

    return <AlertDialog
        open={open}
        positive="Login"
        negative="Cancel"
        negativeHandle={handleclose}
        positiveHandle={handleLogin}
        handleClose={handleclose}
        title="You have been logged out"
        body={<div>You’ve been logged out from Neso Academy. This may have been caused by using more than one device or browser</div>} >

    </AlertDialog>
}

export default UserSessionDialog