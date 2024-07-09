import { useContext } from "react";
import { useState, useEffect } from "react";
import { FireBaseContext } from "../context/firebase";
import { useUser } from "./Auth";
import { databaseOnValue, databaseOnce } from "./Database";
import moment from "moment";

/**
 * Active Neso fuel subscription Listener ... returns null if user is not eligible for Neso fuel contents
 * @typedef {Object} subscriptionObject
 * @property {number} nextpay
 * @property {string} plan
 * @property {Boolean} isSubscribed
 * @property {Boolean} loading
 * @returns {subscriptionObject}
 */
export const useSubscriptionListener = () => {
  const { firebase } = useContext(FireBaseContext);
  const user = useUser();
  const [subscriptionObject, setSubscriptionObject] = useState({
    loading: true,
  });

  useEffect(() => {
    let unsubscribe;
    if (user && user.uid) {
      unsubscribe = databaseOnValue(`Subscriptions/${user.uid}`, (snapShot) => {
        if (snapShot) {
          if (snapShot.val())
            setSubscriptionObject({
              ...snapShot.val(),
              isSubscribed: (snapShot.val().nextpay > Date.now()),
              loading: false,
            });
          else
            setSubscriptionObject({ isSubscribed: false, loading: false });
        }
      })
    } else {
      if (unsubscribe) unsubscribe();
      setSubscriptionObject({ isSubscribed: false, loading: false });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [firebase, user]);

  return subscriptionObject;
};

export async function getAllOrders(orderIds) {
  let orderPromises = orderIds.map(async (oid) => {
    let orderSnap = await databaseOnce(`/Orders/${oid}`)
    let order = {...orderSnap.val(),oid, createdAt: moment(
      parseInt(oid.substring(4, oid.length - 3))
    )}
    let validity = order.validity || 0
    if(validity === 0){
      validity = (await databaseOnce(`/SubscriptionsTransactions/${oid}/order/entity/notes/validity`)).val() 
    }
    return {...order,validity,duration : Math.ceil(validity/2592000000)}
  })
  let orders = await Promise.all(orderPromises)
  return orders.sort((a,b) => b.createdAt.unix() - a.createdAt.unix()) 
}
