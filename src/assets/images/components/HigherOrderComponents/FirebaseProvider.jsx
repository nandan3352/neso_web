import { initializeApp, getApps } from 'firebase/app'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { FireBaseContext } from '../../context/firebase'
import { useEffect, useState } from 'react'
import FallbackLoader from '../UI/Loader/FallbackLoader'
import { getOrCreateSessionId } from '../ServiceComponent/UserSessionDialog'
import { databaseSet } from '../../Services/Database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const initialiseFirebase = _ => {

    const apps = getApps()
    if (!apps.length) {
        const firebase = initializeApp(firebaseConfig)
        return { firebase }
    }
    return {
        firebase: apps[0]
    }
}

//higher order function, passing firebase instance to the children

const FirebaseWrapper = ({ children }) => {

    const [user, setUser] = useState(undefined)

    initialiseFirebase()

    const auth = getAuth()

    const value = { user: user }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, u => {
            //facebook auth emailVerified field will be false always. 
            const isVerified = (user) => user && (user.providerData[0].providerId.includes('facebook') || user.emailVerified)
            if (!u || isVerified(u) || (u && u.phoneNumber)) {
                if (u){
                     //registering user session on Login
                    databaseSet(`Users/${u.uid}/web_session`, getOrCreateSessionId())                    
                }
                    
                setUser(u)
            } else if (user === undefined) {
                setUser(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])


    return user === undefined ? <FallbackLoader /> : (
        <FireBaseContext.Provider value={value} >
            {children}
        </FireBaseContext.Provider>
    )
}



export default FirebaseWrapper



