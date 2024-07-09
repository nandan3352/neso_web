import { useEffect } from "react";
import EventBus from "../lib/EventBus";
export const LATEST_ITEM_BACKDROP_ACTION = 'latestSectionToggle'
export const USER_SESSION_EXPIRED = 'NesoUserExpired'
export const AuthDialogEvent = "NesoAuthDialog"
export const SnackbarEvent = "NesoSnackbar"
export const ShareEvent = "NesoShare"
const useEventListener = (action, trigger) => {
    useEffect(() => {
        EventBus.on(action, trigger)
        return () => {
            EventBus.remove(action, trigger)
        }
    }, [action, trigger])
}
const useEventDispatch = (action) => {
    return (data) => EventBus.dispatch(action, data)
}
export { useEventDispatch, useEventListener }

