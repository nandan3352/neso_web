import moment from "moment";
import {
  getDatabase,
  onValue,
  orderByKey,
  push,
  query,
  ref,
  remove,
  startAt,
  limitToLast,
} from "@firebase/database";
import { useContext, useEffect, useState } from "react";
import { getOrCreateSessionId } from "../components/ServiceComponent/UserSessionDialog";
import { FireBaseContext } from "../context/firebase";
import { useUser } from "./Auth";
import {
  databaseOnce,
  databaseOnValue,
  databaseSet,
  fetchData,
} from "./Database";
import { AuthDialogEvent, SnackbarEvent, useEventDispatch } from "./Events";
import placeholder from "../assets/images/placeholder.webp";

export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

//TODO : keep everything in separate files

//// common utils

export const setCrawlableContent = async (url) => {
  const textSnap = await databaseOnce(url);
  return textSnap.val();
};

export const getDurationOfLectureInSeconds = (duration) => {
  const vid_time_split = duration.split(":");
  return parseInt(vid_time_split[0]) * 60 + parseInt(vid_time_split[1]);
};

export const getImgUrl = (id, quality = 480) =>
  id
    ? `https://d1z78r8i505acl.cloudfront.net/poster/${id}.${quality}.jpeg`
    : placeholder;

export const firstCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getExpiryDate = (order_id, validity) =>
  moment(
    parseInt(order_id.substring(4, order_id.length - 3)) +
      parseInt(validity)
  ).format("DD MMM YYYY");

export const getOrderDate = (order_id, short = false) =>
  moment(parseInt(order_id.substring(4, order_id.length - 3))).format(
    `DD MMM${short ? "" : "M"} YYYY`
  );

export const getGSTtype = (address) => {
  const lwraddr = address.toLowerCase();
  if (lwraddr.includes("uttar pradesh")) {
    return "CGST+SGST";
  } else if (lwraddr.includes("india")) {
    return "GST";
  } else {
    return "IGST";
  }
};

export const isSGST = (address) =>
  !["IGST", "GST"].includes(getGSTtype(address));
export const isIGST = (address) => getGSTtype(address).includes("IGST");

export const separteTaxComponents = (amt) => {
  const netCost = (amt/ 1.18).toFixed(2);
  const tax = (amt- netCost).toFixed(2);
  return { netCost, tax };
};

export const getCurrencySymbol = (currency) => {
  try {
    let a = 0;
    return a
      .toLocaleString("en", { style: "currency", currency: currency })
      .replace(/\d+([,.]\d+)?/g, "");
  } catch (e) {
    return currency;
  }
};

export function getTotalAmountInPaisa(price, discountpercent) {
  const gstAdded =
    parseInt(price) + parseFloat(Number(price * 0.18).toFixed(2));
  const discount = Number(
    discountpercent ? gstAdded * discountpercent || 0 : 0
  ).toFixed(2);
  return (gstAdded - discount) * 100;
}
//check if address has every required fields
export function checkAddressIsValid(address) {
  if (!address) {
    return false;
  }
  return Boolean(
    address.name &&
      address.number &&
      address.pincode &&
      address.city &&
      address.state &&
      address.country &&
      address.address
  );
}

/**
 *
 * @param {Object} lecture_obj
 * @param {Object} thumbnails_ob
 * @param {String} filter_id
 * @returns Array of merged lectures data
 */
export const createLecturesMergedArray = (
  lecture_obj,
  thumbnails_obj,
  filter_id
) => {
  let lectures_ids = Object.keys(lecture_obj);
  if (filter_id) {
    lectures_ids = lectures_ids.filter((vid_id) => vid_id.includes(filter_id));
  }
  return lectures_ids.map((key) => ({
    ...lecture_obj[key],
    id: key,
    imgUrl: thumbnails_obj[key],
  }));
};

export const filterUserProgress = (progresses, chapter_id) => {
  if (progresses) {
    const filtered_ids = Object.keys(progresses).filter(
      (key) =>
        key.includes(chapter_id) && !["q", "n", "p"].includes(key.split("_")[2])
    );
    const lecture_progresses = Object.assign(
      {},
      ...filtered_ids.map((e) => ({ [e]: progresses[e] }))
    );
    return lecture_progresses;
  }
  return {};
};

/**
 * @deprecated
 * @param {
 * } url
 * @param {*} title
 */
//Share API, TODO get url as parameter,
export const share = (url, title) => {
  if (navigator.share) {
    navigator.share({
      text: "Share",
      title: title,
      url: window.location.host + url,
    });
  } else {
    console.log("fallback", window.location.host + url);
  }
};

//BOOKMARKS Utils

/**
 *
 * custom hook to manage bookmarking. returns current bookmarks, and a function to toggleBookmark
 *
 * @typedef {Object} BookmarkUtilObject
 * auto updating array, stores current bookmarks
 * @property {Array} bookmarks
 * first param will take id of the content, second param is toggle flag (true -> add bookmark, false -> remove bookmark)
 * @property {function(String, Boolean, String)} setbookmark
 *
 * @returns {BookmarkUtilObject}
 */
export const useBookmark = () => {
  const dispatchAuth = useEventDispatch(AuthDialogEvent);
  const dispatchSnack = useEventDispatch(SnackbarEvent);
  const user = useUser();
  const [bookmarks, setbookmarks] = useState([]);
  const [bookmarksIndex, setBookmarksIndex] = useState({});
  useEffect(() => {
    if (user && user.uid) {
      databaseOnce(`/Users/${user.uid}/bookmarks`).then((snap) => {
        if (snap.val()) {
          const bmindexes = Object.entries(snap.val()).map((e) => ({
            [e[1]]: e[0],
          }));
          setBookmarksIndex(Object.assign({}, ...bmindexes));
          setbookmarks(Object.values(snap.val()));
        } else setbookmarks([]);
      });
    } else {
      setbookmarks([]);
    }
    return () => {};
  }, [user]);

  const setbookmark = async (id, add, name) => {
    if (user && user.uid) {
      const idx = bookmarks.indexOf(id);
      let updatedBookmark = bookmarks;

      if (!add) {
        if (idx >= 0) {
          updatedBookmark.splice(idx, 1);
          setbookmarks(updatedBookmark);
          setBookmarksIndex((prev) => ({ ...prev, [id]: undefined }));
          const childTobeDeleted = bookmarksIndex[id];
          if (childTobeDeleted) {
            await remove(
              ref(
                getDatabase(),
                `/Users/${user.uid}/bookmarks/${childTobeDeleted}`
              )
            );
          }
        }
      } else {
        if (idx < 0) {
          updatedBookmark.push(id);
          setbookmarks(updatedBookmark);
          const keyref = await push(
            ref(getDatabase(), `/Users/${user.uid}/bookmarks`),
            id
          );
          setBookmarksIndex((prev) => ({ ...prev, [id]: keyref.key }));
        }
      }

      const getSentence = (add, name) => {
        if (add) {
          return name
            ? `${name} has been added to bookmarks`
            : "Added to bookmarks";
        } else {
          return name
            ? `${name} has been removed from bookmarks`
            : "Removed from bookmarks";
        }
      };

      dispatchSnack({ open: true, msg: getSentence(add, name) });
      return true;
    } else {
      dispatchAuth({ open: true, msg: "Login to access bookmarks." });
      return false;
    }
  };

  return { setbookmark, bookmarks };
};

//PPT Utils
/**
 *
 * custom hook to track completion of a ppt. returns boolean, and a function to set the completion of the ppt.
 * Takes in a id string of the format (CourseId_chapterId_p) and returns true if the ppt related to the chapter is complete
 * @typedef {Object} CompleteUtilObject
 * @property {Boolean} isComplete
 *
 * @property {function()} setbookmark
 *
 * @returns (Boolean)
 */

export const useIsCompleted = (id) => {
  const { firebase } = useContext(FireBaseContext);
  const user = useUser();
  const [isComplete, setIsComplete] = useState(undefined);
  useEffect(() => {
    //TODO : check chapter in case if it is lecture and then individual id
    let unsubscribe;
    if (user && user.uid && id) {
      setIsComplete(undefined);
      unsubscribe = databaseOnValue(
        `Users/${user.uid}/progress/${id}`,
        (snap) => {
          if (snap && snap.val() && snap.val() === 1) {
            setIsComplete(true);
          } else {
            setIsComplete(false);
          }
        }
      );
    }
    return unsubscribe;
  }, [firebase, user, id]);

  const setComplete = async (val = 1) => {
    //TODO : set total video count in completed chapters
    if (user && user.uid) {
      databaseSet(`Users/${user.uid}/progress/${id}`, val).then((v) =>
        setIsComplete(true)
      );
    }
  };

  return { isComplete, setComplete };
};

//DARK MODE UTILS

/**
 *
 * darkmode hook to manage darkmode !should only be used in root!
 *
 * @typedef {Object} DarkModeObject
 * current darkmode value
 * @property {Boolean} darkMode
 * toggles darkmode
 * @property {function} toggleDarkMode
 *
 * @returns {DarkModeObject}
 */
export const useDarkMode = () => {
  const initialDarkMode = localStorage.getItem("neso-dark-theme");

  const [darkMode, setDarkMode] = useState(initialDarkMode === "dark");

  useEffect(() => {
    document.documentElement.setAttribute(
      "dark-theme",
      initialDarkMode === "dark" ? "dark" : "light"
    );
    return () => {
      //do nothing
    };
  }, [initialDarkMode]);

  const toggleDarkMode = () => {
    localStorage.setItem("neso-dark-theme", !darkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "dark-theme",
      !darkMode ? "dark" : "light"
    );
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
};

/**
 * @deprecated migrated to modular version of firebase
 * Typed hook to make ease of using injected firebase object (it will type the returned object using jsDoc)
 * @returns {firebase.default.app.App}
 */
export const useFirebase = () => {
  const { firebase } = useContext(FireBaseContext);
  return firebase;
};

//QUIZ UTILS

/**
 *
 * represents states and functions for dispatching a quiz
 *
 * choosedQuiz / fetchingUserRecord as -1 indicates no quiz Selected / user record fetched
 *
 * @typedef {Object} QuizStatesAndFuntions
 * @property {Integers} choosedQuizIndex
 * @property {Integers} fetchingUserRecordIndex
 * @property {Funtion} handleQuizChoosed
 * @property {Funtion} userRecordFetchCompleteCallback
 * @returns {QuizStatesAndFuntions}
 */
export const useQuizDispatchStates = () => {
  const [choosedQuizIndex, setQuizDialogOpen] = useState(-1);
  const [fetchingUserRecordIndex, setFetchingUserRecord] = useState(-1);

  function userRecordFetchCompleteCallback() {
    setFetchingUserRecord(-1);
  }

  const handleQuizChoosed = (i) => (e) => {
    setQuizDialogOpen(i);
    setFetchingUserRecord(i);
  };

  return {
    choosedQuizIndex,
    fetchingUserRecordIndex,
    handleQuizChoosed,
    userRecordFetchCompleteCallback,
  };
};

//Notifcation Utils

/**
 * fetch general and user specifc notifications
 * @typedef {object} NotificationUtil
 * @property {Object} notifications
 * @property {Object} contentData
 * @property {number} count
 * @returns {NotificationUtil}
 */
export const useNotification = () => {
  const user = useUser();
  const [userNotifs, setUserNotifs] = useState(undefined);
  const [generalNotif, setGeneralNotif] = useState(undefined);
  const [notifications, setNotifications] = useState(undefined);
  const [clearTimestamp, setclearTimestamp] = useState(undefined);
  const [contentData, setContentData] = useState(undefined);

  const genCount =
    generalNotif === undefined ? -1 : Object.keys(generalNotif || {}).length;
  const usCount =
    userNotifs === undefined ? -1 : Object.keys(userNotifs || {}).length;

  useEffect(() => {
    const totalNotif = genCount + usCount;
    if (totalNotif >= 0)
      setNotifications(
        totalNotif === 0 ? null : { ...userNotifs, ...generalNotif }
      );
  }, [genCount, usCount]);

  useEffect(() => {
    if (user) {
      return databaseOnValue(
        `Users/${user.uid}/clearNotifTimestamp`,
        (snap) => {
          if (snap) {
            setclearTimestamp(snap.val());
          }
        }
      );
    } else {
      setclearTimestamp(null);
    }
  }, [user]);

  const filterContentRelatedNotifs = (p) => !p.type.includes("support");

  const extractContentId = (p) =>
    p.type.includes("comment") ? p.type.split("split")[1] : p.type;
  useEffect(() => {
    if (clearTimestamp !== undefined) {
      const startAT = (Boolean(clearTimestamp) ? clearTimestamp : 0) + "";
      return onValue(
        query(
          ref(getDatabase(), "/Notifications"),
          orderByKey(),
          startAt(startAT),
          limitToLast(20)
        ),
        (snap) => {
          if (snap) {
            setGeneralNotif(snap.val());
            if (snap.val()) {
              fetchData(
                Object.values(snap.val())
                  .filter(filterContentRelatedNotifs)
                  .map(extractContentId)
              ).then((e) => {
                setContentData((prev) => ({ ...prev, ...e }));
              });
            }
          }
        }
      );
    }
  }, [clearTimestamp]);

  useEffect(() => {
    if (user) {
      return databaseOnValue(`Users/${user.uid}/notifications`, (snap) => {
        if (snap) {
          setUserNotifs(snap.val());
          if (snap.val()) {
            fetchData(
              Object.values(snap.val())
                .filter(filterContentRelatedNotifs)
                .map(extractContentId)
            ).then((e) => {
              setContentData((prev) => ({ ...prev, ...e }));
            });
          }
        }
      });
    }
  }, [user]);

  return {
    notifications,
    contentData,
    count: countNewNotifications(notifications || {}),
  };
};

//Player Utils
/**
 * check and reset maximum stream limit.
 * @typedef {object} StreamLimitUtils
 * @property {Function} reset
 * @property {Boolean} block
 * @returns {StreamLimitUtils}
 */
export const useStreamLimit = () => {
  const user = useUser();
  const [block, setStreamBlocked] = useState(false);
  const reset = () => {
    if (!user) return;
    databaseSet(`Users/${user.uid}/stream_session`, getOrCreateSessionId());
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const uuid = getOrCreateSessionId();

    const session_path = `Users/${user.uid}/stream_session`;

    databaseSet(session_path, uuid);

    return databaseOnValue(session_path, (snap) => {
      setStreamBlocked(snap && snap.val() && snap.val() !== uuid);
      if (snap && !snap.val()) {
        databaseSet(session_path, uuid);
      }
    });
  }, [user]);

  return { block, reset };
};

//other Utils

/**
 * Aligning chapter element in Subject page
 */

export const getAlignedScrollPosition = (
  expandedIndex,
  expandingIndex,
  collapsingElement,
  expandingElement
) => {
  let aligningScrollOffset = -1;

  if (collapsingElement && expandingIndex == expandedIndex) {
    aligningScrollOffset =
      window.scrollY + (collapsingElement.getBoundingClientRect().top - 108);
  } else if (
    expandingElement &&
    (expandingIndex < expandedIndex || expandedIndex === -1)
  ) {
    aligningScrollOffset =
      window.scrollY + (expandingElement.getBoundingClientRect().top - 108);
  } else if (collapsingElement && expandingElement) {
    const reducedHeight =
      collapsingElement.offsetHeight - (window.innerWidth < 600 ? 72 : 160);
    aligningScrollOffset =
      window.scrollY -
      reducedHeight +
      (expandingElement.getBoundingClientRect().top - 108);
  }

  return aligningScrollOffset;
};

const LATEST_TIMESTAMP_KEY = "neso_latest_timestamp";
const NOTIFICATION_TIMESTAMP_KEY = "neso_notification_timestamp";
const NOTIFICATION_READ_ARRAY = "neso_notification_read";

export const updateNotifcationTimeStamp = () => {
  window.localStorage.setItem(NOTIFICATION_TIMESTAMP_KEY, Date.now());
};

export const isNotificationRead = (id) => {
  const prevRead = window.localStorage.getItem(NOTIFICATION_READ_ARRAY);
  return prevRead && prevRead.includes(id);
};

export const updateNotificationRead = (id) => {
  const prevRead = window.localStorage.getItem(NOTIFICATION_READ_ARRAY);

  window.localStorage.setItem(
    NOTIFICATION_READ_ARRAY,
    prevRead ? prevRead + "_" + id : id
  );
};

export const countNewNotifications = (rawMap) => {
  const prevTS = window.localStorage.getItem(NOTIFICATION_TIMESTAMP_KEY);

  if (prevTS) {
    return Object.keys(rawMap).filter((p) => p > prevTS).length;
  } else {
    return Object.keys(rawMap).length;
  }
};

export const updateLatestTimeStamp = () => {
  window.localStorage.setItem(LATEST_TIMESTAMP_KEY, Date.now());
};

export const countNewLatestItems = (rawMap) => {
  const prevTS = window.localStorage.getItem(LATEST_TIMESTAMP_KEY);

  if (prevTS) {
    return Object.keys(rawMap).filter((p) => p > prevTS).length;
  } else {
    return Object.keys(rawMap).length;
  }
};

/* export const getScreenShot = (dom_id, filename) => {
  try {
    var opt = {
      margin: 1,
      filename: (filename + '.pdf'),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    pdfGenerate().from(document.querySelector(dom_id)).set(opt).save()
    screenShot(document.querySelector(dom_id)).then((c) => {
      let downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', `${filename}.png`);
      c.toBlob(function (blob) {
        let url = URL.createObjectURL(blob);
        download.setAttribute('href', url);
        downloadLink.click();
      });
    })
  } catch (e) {
    console.log(e);
  }
}
 */

/**
 *
 * @param {*} sub_code
 * @param {*} course_code
 * @returns id of the course for url params
 */
export const getpaddedidForsubject = (sub_code, course_code) => {
  try {
    const course_id = course_code.split("-")[0] + "";
    return (
      sub_code +
      Array(3 - course_id.length)
        .fill("0")
        .reduce((a, i) => i + a, course_id)
    );
  } catch (e) {
    return sub_code + "999";
  }
};

export const getParameterizedFacultyName = (name) => {
  return name.toLowerCase().replace(/\s/g, "-");
};

export const getIdCompsFromId = (id) => {
  const comps = id.split("_");
  return {
    courseId: comps[0],
    chapterId: comps[1] || null,
    contentId: comps[2] || null,
  };
};

/**
 *
 * @param {*} url
 * @returns id parsed from the url
 */

export const getIdsFromParams = (params) => {
  let courseId = getpaddedidForsubject(
    params.sub_id,
    params.course_id.split("-")[0]
  );
  let chapterId = params.chapter_id
    ? parseInt(params.chapter_id.split("-")[0])
    : null;
  let contentId = params.lecture_id ? params.lecture_id.split("-")[0] : null;

  return { courseId, chapterId, contentId };
};

// export const getLectureIdFromUrl = (url) => {
//   const comps = url.split("/");
//   let course_comp = getpaddedidForsubject(comps[1], comps[2].split("-")[0]);
//   try {
//     return (
//       course_comp +
//       "_" +
//       parseInt(comps[3].split("-")[0]) +
//       "_" +
//       comps[4].split("-")[0]
//     );
//   } catch (e) {
//     return "nan_nan_nan";
//   }
// };

export function getnavigateUrl(navigateId, url) {
  try {
    const subId = navigateId.substring(0, 2);
    const courseNum = parseInt(navigateId.slice(2)) + "";
    const courseId = courseNum.padStart(2, "0");
    const urlParts = url.split("/");
    return `/${subId}/${courseId}-${urlParts[2]
      .split("-")
      .slice(1)
      .join("-")}/${urlParts.slice(3).join("/")}`;
  } catch {
    return "/";
  }
}

/**
 *
 * @returns endpoint to navigate for the given id
 */

export const getEndpointForId = (
  id,
  sub_name = "subject",
  chap_name = "chapter",
  lec_name = "lecture",
  start
) => {
  if (!id) return "/";

  const comps = id.split("_");
  const pad = (number) => (number.length === 1 ? 0 + number : number);
  const parse = (name, alt) =>
    (name &&
      name
        .replace(/&/g, "and")
        .replace(/[^0-9a-z+A-Z\s]/g, "")
        .replace(/\s-?\s?/g, "-")
        .toLowerCase()) ||
    alt;

  const getBaseUrl = (course) => {
    const courseNum = parseInt(course.slice(2)) + "";
    return `/${course.slice(0, 2)}/${
      pad(courseNum) + "-" + parse(sub_name, "subject")
    }`;
  };

  switch (comps.length) {
    case 1:
      return getBaseUrl(id);
    case 3:
      if (!isNaN(comps[2])) {
        return `${getBaseUrl(comps[0])}/${
          pad(comps[1]) + "-" + parse(chap_name, "chapter")
        }/${pad(comps[2]) + "-" + parse(lec_name, "lecture")}${
          start ? "#t=" + start : ""
        }`;
      } else {
        if (comps[2].includes("p")) {
          return `${getBaseUrl(comps[0])}/ppts/${
            pad(comps[1]) + "-" + parse(chap_name, "chapter")
          }`;
        } else if (comps[2].includes("n")) {
          return `${getBaseUrl(comps[0])}/notes/${
            pad(comps[1]) + "-" + parse(chap_name, "chapter")
          }`;
        } else if (comps[2].includes("q")) {
          return `${getBaseUrl(comps[0])}/quiz/${
            pad(comps[1]) + "-" + parse(chap_name, "chapter")
          }`;
        }
        return ""; //no endpoint for quiz
      }
    default:
      return `${getBaseUrl(comps[0])}/${
        pad(comps[1]) + "-" + parse(chap_name, "chapter")
      }/${pad("1") + "-" + parse(lec_name, "lecture")}`;
  }
};

//TODO: migrate to @getEndpointForId (No need for separate function only for quiz)
export const getEndpointForQuiz = (url, chap, name) => {
  const parsedUrl = url.split("/quiz")[0];
  const chapId = chap + "";
  const parse = (name, alt) =>
    (name &&
      name
        .replace(/&/g, "and")
        .replace(/[^0-9a-zA-Z\s]/g, "")
        .replace(/\s-?\s?/g, "-")
        .toLowerCase()) ||
    alt;
  return `${parsedUrl}/quiz/${
    chapId.length === 1 ? 0 + chapId : chapId
  }-${parse(name, "")}`;
};

export const removePad = (id) => {
  const comps = id.split("_");
  return (
    comps[0] +
    "_" +
    comps[1] +
    "_" +
    (comps[2][0] === "0" ? comps[2][1] : comps[2])
  );
};

export const mapCommentData = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    author: data.a,
    content: data.b,
    time: data.c,
    authorId: data.d,
    parent: data.e,
    reply: data.f,
    pAuthor: data.pAuthor,
  };
};

export function cachedFetch(url, options) {
  let cacheKey = url;

  let cached = sessionStorage.getItem(cacheKey);
  if (cached !== null) {
    let response = new Response(new Blob([cached]));
    return Promise.resolve(response);
  }

  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      let ct = response.headers.get("Content-Type");
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response
          .clone()
          .text()
          .then((content) => {
            sessionStorage.setItem(cacheKey, content);
          });
      }
    }
    return response;
  });
}

export function getFormattedAddressLines(address) { 
  if(!address){
    return
  }
  let addressArr = address.split(" ")
  let lastInx = addressArr.length - 1
  let pin = addressArr[lastInx]
  let country = addressArr[lastInx - 1]
  let state = addressArr[lastInx - 2] 
  let city = addressArr[lastInx - 3]

  return [addressArr.slice(0,-4).join(" "), `${city}, ${state},`, `${country} ${pin}` ]

 }
