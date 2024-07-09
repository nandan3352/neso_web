import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FireBaseContext } from "../context/firebase";
import { databaseOnce, databaseUpdate } from "./Database";


//authentication handlers

/**
 * 
 * @returns {Promise<void>}
 */
export const signout = () => {
    return signOut(getAuth())
}

//check if history can be exported.
export async function checkIfNewUser(res, userdata, history, navigate) {
    let result = await databaseOnce(`Users/${res.user.uid}`);
    if (!result.val() || (result.val() && !result.val().name)) { //new User
        databaseUpdate(`Users/${res.user.uid}`, userdata)
        history.push({
            pathname: 'user-verification',
            state: {
                navigate,
                verified: true
            },
        })
        return true;
    }
    return false;
}

export const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/
    if (emailRegex.test(email)) {
        return true
    } else {
        return false
    }
}


//hooks 

export const useRefreshAuth = () => {
    const { refreshAuth } = useContext(FireBaseContext)
    return refreshAuth
}

/**
 * @typedef {object} user
 * @property {string} name
 * @property {string} uid
 * @property {string} profilePic
 * @property {string} email
 * @property {string} phNo
 * @property {string} provider
 * Listens Auth state returning a data Object of the user, object will be null if not logged in
 * @returns {user} 
 */

export const useUser = (from) => {

    const { user } = useContext(FireBaseContext)

    const name = user && user.displayName
    const pic = user && user.photoURL
    const email = user && user.email
    const num = user && user.phoneNumber

    const appendParamsForFacebookDp = (url) => url.includes('graph.facebook') ? (url + '?type=normal') : url

    const mapUser = (user) => {
        return user && user.uid ? {
            provider: user.providerData[0].providerId, uid: user.uid, name: user.displayName, profilePic: user.photoURL ? appendParamsForFacebookDp(user.photoURL) : undefined, email: user.email, phNo: user.phoneNumber
        } : null
    }

    const [userMapped, setUserMapped] = useState(mapUser(user))

    useEffect(() => {
        setUserMapped(mapUser(user))
        return () => {
        }
    }, [user, name, pic, email, num])

    return userMapped
}


export const useAuth = () => {
    const { auth } = useContext(FireBaseContext)
    return auth;
}