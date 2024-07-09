import {
  collection,
  documentId,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./Auth";
import { databaseOnce } from "./Database";

/**
 *
 * @param {string} user_id
 * @returns returns Object in form { "code" : "count" }
 */
const getPreviouslyUsedCoupons = async (user_id) => {
  const usedCouponsSnap = await databaseOnce(
    `Subscriptions/${user_id}/usedCoupons`
  );
  return usedCouponsSnap.exists()
    ? Object.values(usedCouponsSnap.val()).reduce(
        (acc, e) => ({ ...acc, [e.code]: acc[e.code] ? acc[e.code]++ : 1 }),
        {}
      )
    : [];
};

export const useAvailableCoupons = () => {
  const [availableCoupons, setAvailableCoupons] = useState(null);
  const [usedCoupons, setUsedCoupons] = useState();
  const user = useUser();
  const db = getFirestore();

  useEffect(()=>{
    getPreviouslyUsedCoupons(user.uid).then(usedCoupons => {
        setUsedCoupons(usedCoupons)
    })
  },[user.uid])

  useEffect(() => {
    if(usedCoupons){
        let fquery = query(
            collection(db, "/Coupons/AvailableCoupons/CouponCodes"),
            where("expiry", ">", Date.now())
          );
          return onSnapshot(fquery, (snap) => {
            setAvailableCoupons(
              snap.empty
                ? []
                : snap.docs
                    .map((doc) => ({ code: doc.id, ...doc.data() }))
                    .filter(
                      ({ limit, code }) =>
                        !usedCoupons[code] || limit > usedCoupons[code]
                    )
            )
          });        
    }
  }, [db, usedCoupons]);

  return availableCoupons;
};
