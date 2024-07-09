import NotificationContent from "../../components/UI/Header/AuthComponents/NotificationContent"
import { useNotification } from "../../Services/Utils"


const NotificationWrapper = (props) => {
    const notification = useNotification()

    return <div style={{height : "100vh", overflow : "scroll"}} ><NotificationContent notifications={notification.notifications} notificationData={notification.contentData} /></div>
}


export default NotificationWrapper