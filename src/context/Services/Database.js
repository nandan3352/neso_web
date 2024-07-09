import { useState, useEffect } from "react";
import * as ENDPOINT from "../lib/EndPoints";
import { ref as sref, getDownloadURL, getStorage } from "firebase/storage";
import {
  getDatabase,
  query,
  ref,
  set,
  update,
  get,
  child,
  onValue,
  orderByChild,
  orderByKey,
  equalTo,
  startAt,
  endAt,
  limitToLast,
  limitToFirst,
} from "firebase/database";

import {
  onSnapshot,
  limit,
  doc,
  getDoc,
  query as fquery,
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  startAt as fstartAt,
  endAt as fendAt,
  orderBy,
  where,
} from "firebase/firestore";
import { getIdCompsFromId, getImgUrl } from "./Utils";

//database handler

/* database query performers */

export function databaseSet(path, value) {
  return set(ref(getDatabase(), path), value);
}

export function databaseUpdate(path, value) {
  return update(ref(getDatabase(), path), value);
}

/**
 * returns the id of last item in path,used as the count
 * @param {string} path
 */
export async function databaseCount(path, pattern) {
  const snap = await get(
    query(
      ref(getDatabase(), path),
      orderByKey(),
      ...(pattern ? [startAt(`${pattern}`), endAt(`${pattern}\uf8ff`)] : []),
      limitToLast(1)
    )
  );
  let id = "0_0_0";
  snap.forEach((res) => {
    id = res.key;
  });
  return id;
}

/**
 *
 * @param {string} path
 * @returns {Promise<DataSnapshot>}
 */
export function databaseOnce(path) {
  return get(child(ref(getDatabase()), path));
}

/**
 *
 * @param {string} path
 * @param {resultcallback} callback
 * @callback resultcallback
 * @param {DataSnapshot} snap
 *
 * @returns {Function} unsubscribe
 */
export function databaseOnValue(path, callback, errorCallback) {
  return onValue(child(ref(getDatabase()), path), callback, errorCallback);
}

/**
 *
 * @param {string} path
 * @param {string} childname
 * @param {resultcallback} callback
 * @callback resultcallback
 * @param {DataSnapshot} snap
 *
 * @returns {Function} unsubscribe
 */
export function databaseOrderbychildOnValue(path, childname, callback) {
  return onValue(
    query(ref(getDatabase(), path), orderByChild(childname)),
    callback
  );
}

/**
 *
 * @param {string} path
 * @param {string} childname
 *
 * @returns {Promise<DataSnapshot>} data
 */
export function databaseOrderbychildOnce(path, childname) {
  return get(query(ref(getDatabase(), path), orderByChild(childname)));
}

/**
 *
 * @param {string} path
 * @param {string} childname
 * @param {string} equalto
 * @param {resultcallback} callback
 * @callback resultcallback
 * @param {DataSnapshot} snap
 *
 * @returns {Function} unsubscribe
 */
export function databaseOrderbychildEqualToOnValue(
  path,
  childname,
  equalto,
  callback
) {
  return onValue(
    query(ref(getDatabase(), path), orderByChild(childname), equalTo(equalto)),
    callback
  );
}

export function databasefetchHistory(path, childname, limit) {
  return get(query(ref(getDatabase(), path), limitToLast(limit)));
}

export function databaseFetchLatestLectures(path, start, end, limit) {
  return get(
    query(
      ref(getDatabase(), path),
      orderByKey(),
      startAt(start),
      endAt(end),
      limitToLast(limit)
    )
  );
}

/**
 *
 * @param {app.app.App} firebase
 * @param {Array} facultyIds
 *
 */

export async function fetchFacultiesData(facultyIds) {
  const facultyPromise = facultyIds.map(async (fid) => {
    const facultySnap = await databaseOnce(`Faculty/${fid}`);
    if (facultySnap && facultySnap.val()) {
      return { id: fid, data: facultySnap.val() };
    }

    return { id: fid, data: null };
  });

  const faculties = await Promise.all(facultyPromise);
  return Object.assign({}, ...faculties.map((x) => ({ [x.id]: x.data })));
}

/**
 * util functions to fetch individual items
 * @param {app.app.App} firebase
 * @param {Array} idList to fetch data
 */

export async function fetchData(idList) {
  const itemsPromise = idList.map(async (id) => {
    const snap = await databaseOnce(getEndpoint(id));
    if (snap && snap.val()) {
      const imgData = await fetchAdditionalDataOnLecture(id);
      const additionalDataForchap = await fetchAdditionalDataOnChapter(id);
      const course = (
        await databaseOnce(
          `StreamCourses/${id.slice(0, 2)}/${id.split("_")[0]}/name`
        )
      ).val();
      const result = snap.val();
      const isPaid = (result) => {
        if (result) return result.cost ? result.cost !== 0 : result.paid;
        return true;
      };
      return {
        id: id,
        val: {
          id: id,
          additional: { courseName: course, ...additionalDataForchap },
          ...imgData,
          ...result,
          paid: isPaid(result),
        },
      };
    } else {
      return {
        id: id,
        val: {
          id: id,
          notExists: true,
          additional: {},
          name: `NA(${id})` /* Not available */,
        },
      };
    }
  });
  const itemsFetched = await Promise.all(itemsPromise);
  return Object.assign({}, ...itemsFetched.map((x) => ({ [x.id]: x.val })));
}

const fetchAdditionalDataOnChapter = async (id) => {
  if (id.split("_").length === 2) {
    const firstLectureSnap = await get(
      query(
        ref(getDatabase(), "/Videos"),
        orderByKey(),
        startAt(id + "_01"),
        endAt(id + "_99"),
        limitToFirst(1)
      )
    );
    
    const firstLectureObj = firstLectureSnap.val();
    const firstLectureId = Object.keys(firstLectureObj || {}).pop();
    if (firstLectureId) {
      const firstVideo = firstLectureObj[firstLectureId];
      return {
        firstVideo: { id: firstLectureId, name: firstVideo.vid_title },
        firstVideoName: firstVideo.vid_title,
      };
    }
  }
};

export const fetchNextChapter = async (currentLectureId) => {
  const { courseId, chapterId } = getIdCompsFromId(currentLectureId);
  const nextChapterId = `${courseId}_${parseInt(chapterId) + 1}`;
  const chapter = await fetchData([nextChapterId]);
  const nextChapter = chapter[nextChapterId]
  if (!nextChapter.notExists) {
    return nextChapter;
  } else {
    return null;
  }
};

const fetchAdditionalDataOnLecture = async (id) => {
  let idArray = id.split("_");
  if (
    idArray.length === 3 &&
    idArray[2] !== "q" &&
    idArray[2] !== "n" &&
    idArray[2] !== "p"
  ) {
    let chapsnap = await databaseOnce(`Chapters/${idArray[0]}/${idArray[1]}`);
    let snap = await databaseOnce(`LectureThumbnails/${id}`);
    return {
      img: getImgUrl(snap.val()),
      chapName: chapsnap.val().name,
      isPaid: chapsnap.val().cost !== 0,
    };
  }
};

/**
 * gives endpoint of database for an id
 * @param {String} id
 */

export const getEndpoint = (id) => {
  let itemComponents = id.split("_");
  if (itemComponents.length === 1)
    return ENDPOINT.ENDPOINT_COURSE + id.substring(0, 2) + "/" + id;
  if (itemComponents.length === 2)
    return (
      ENDPOINT.ENDPOINT_CHAPTER + itemComponents[0] + "/" + itemComponents[1]
    );
  else if (itemComponents.length === 3) {
    const itemType = itemComponents[2];
    switch (itemType) {
      case "q":
        return (
          ENDPOINT.ENDPOINT_QUIZ + itemComponents[0] + "/" + itemComponents[1]
        );
      case "n":
        return (
          ENDPOINT.ENDPOINT_NOTE + itemComponents[0] + "_" + itemComponents[1]
        );
      case "p":
        return (
          ENDPOINT.ENDPOINT_PPTS + itemComponents[0] + "_" + itemComponents[1]
        );
      default:
        return ENDPOINT.ENDPOINT_LECTURE + itemComponents.join("_");
    }
  }
};

//custom hooks to listen realtime from firebase,hiding internal logic to get firebase object using context API

export const useDatabase = (endpoint, dependancy) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    if (!endpoint) {
      return;
    }

    const unsubscribe = databaseOnValue(
      endpoint,
      (snapShot) => {
        if (snapShot) setData(snapShot.val());
        setNotFound(snapShot.val() === null);
        setLoading(false);
      },
      (error) => {
        setError(true);
        setLoading(false);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [endpoint]);

  return { loading, error, data, notFound };
};

// hook will fetch data only if the data provided is not available (conditional hook)

export const useConditionalFetch = (endpoint, pattern, conditionalData) => {
  const [data, setData] = useState(conditionalData);

  useEffect(() => {
    //this will prevent the data fetch, if the data is available already
    if (conditionalData) {
      return;
    }
    get(
      query(
        ref(getDatabase(), endpoint),
        orderByKey(),
        startAt(pattern),
        endAt(`${pattern}\uf8ff`)
      )
    ).then(
      (snapShot) => {
        if (snapShot.val()) {
          let dataArray = [];

          const data = snapShot.val();
          for (var key in data) {
            dataArray.push(data[key]);
          }
          setData(dataArray);
        }
      },
      (error) => {}
    );
    return () => {
      //do nothing
    };
  }, [endpoint, conditionalData, pattern]);

  return { data };
};

export const useDatabaseOnce = (endpoint) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    databaseOnce(endpoint).then(
      (snapShot) => {
        setLoading(false);
        if (snapShot) setData(snapShot.val());
      },
      (error) => {
        setLoading(false);
        setError(true);
      }
    );
    return () => {
      //do nothing
    };
  }, [endpoint]);

  return { loading, error, data };
};

export const useDataBaseUpdate = (endpoint, value) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  databaseSet(endpoint, value)
    .then((done) => setLoading(false))
    .catch((error) => {
      setLoading(false);
      setError(false);
    });

  return { loading, error };
};

export const useVideosStartEnd = (endpoint, startat, endat) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    if (!endpoint) {
      return;
    }
    const unsubscribe = onValue(
      query(
        ref(getDatabase(), endpoint),
        orderByKey(),
        startAt(`${startat}`),
        endAt(`${endat}`)
      ),
      (snapShot) => {
        setLoading(false);
        if (snapShot) setData(snapShot.val());
      },
      (error) => {
        setLoading(false);
        setError(true);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [endpoint, startat, endat]);

  return { loading, error, data };
};

export const useVideoDatabase = (endpoint, pattern, lock) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (lock || !endpoint || !pattern) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setData(undefined);
    const unsubscribe = onValue(
      query(
        ref(getDatabase(), endpoint),
        orderByKey(),
        startAt(`${pattern}`),
        endAt(`${pattern}\uf8ff`)
      ),
      (snapShot) => {
        if (snapShot) setData(snapShot.val());
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(true);
      }
    );
    return () => {
      if (unsubscribe instanceof Function) unsubscribe();
    };
  }, [pattern, endpoint, lock]);

  return { loading, error, data };
};

//Firestore Hooks, return Firebase types { QuerySnapShots, DocumentSnapshots }

export const usePPTDatabase = (endPoint) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endPoint) return;

    getDownloadURL(sref(getStorage(), `PDFs/PPT/${endPoint}`))
      .then((url) => {
        setLoading(false);
        setData(url);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, [endPoint]);

  return { loading, data, error };
};

//TODO: No need for this hook!!!
export const useBookmarkFetch = (endpoint, condition) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (condition) {
      const unsubscribe = databaseOnValue(
        endpoint,
        (snapShot) => {
          setLoading(false);
          if (snapShot) setData(snapShot.val());
        },
        (error) => {
          setLoading(false);
          setError(true);
        }
      );

      return () => {
        unsubscribe();
      };
    } else {
      setData("Not Logged in");
    }
  }, [endpoint]);

  return { loading, error, data };
};

/// FIRESTORE HELPERS

//firestore handlers

export function firestoreDocsOddescWhereeq(
  path,
  orderdesc,
  wherefield,
  equalto
) {
  return getDocs(
    fquery(
      collection(getFirestore(), path),
      orderBy(orderdesc, "desc"),
      where(wherefield, "==", equalto)
    )
  );
}

export function firestoreGetDoc(path) {
  return getDoc(doc(getFirestore(), path));
}

export function firestoreSetDoc(path, data) {
  return setDoc(doc(getFirestore(), path), data);
}

export function firestoreAddDoc(path, data) {
  return addDoc(collection(getFirestore(), path), data);
}

/**
 * @returns {app.firestore.QuerySnapshot<app.firestore.DocumentData>}
 * optional :  orderBy - ordering docs
 * optional : limit - page size
 *  */
export const useFirestoreDocumentList = (
  collectionPath,
  order_by_key,
  sort = "asc",
  limitField = null
) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    /**
     * @type {app.firestore.Firestore}
     */

    const db = getFirestore();

    let constraints = [];

    if (order_by_key) constraints.push(orderBy(order_by_key, sort));
    if (limitField) {
      constraints.push(limit(limitField));
    }
    let query = fquery(collection(db, collectionPath), ...constraints);
    return onSnapshot(query, (snap) => {
      setDocs(snap);
    });
  }, [collectionPath, limitField, order_by_key, sort]);

  return docs;
};

/**
 * @returns {app.firestore.DocumentSnapshot<app.firestore.DocumentData>} actively listening snapshots, that will unsubscribe automatically
 * @param {String} collectionPath path to collection
 * @param {String} document doc key
 *
 * initial state will be -1
 */

export const useFirestoreDocument = (collectionPath, document) => {
  const [doc, setDoc] = useState(-1);

  useEffect(() => {
    /**
     * @type {app.firestore.Firestore}
     */
    const db = getFirestore();
    getDoc(doc(db, collectionPath + "/" + document)).then((snap) => {
      setDoc(snap);
    });
  }, [collectionPath, document]);

  return doc;
};

/**
 * returns a done flag
 * @param {String} collectionPath path to collection
 * @param {String} document doc key
 * @param {*} value value to be updated or to be added
 */
export const useFirestoreDocumentUpdate = (collectionPath, document, value) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    firestoreSetDoc(`${collectionPath}/${document}`, value).then((snap) => {
      setDone(true);
    });

    return () => {
      //no Active Listeners
    };
  }, [collectionPath, document, value]);

  return done;
};

export async function fetchUserNotification(firebase, uid) {
  let result = await databaseOnce(`/Users/${uid}/notifications`);
  return { result: result.val() };
}
