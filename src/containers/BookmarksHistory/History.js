import React, { useState, useEffect } from "react";
import LatestCard from "../../components/UI/LatestItemCard/LatestItemCard";
import SmallThumbnail from "../../components/UI/SmallThumbnail/SmallThumbnail";
import "./BookmarksHistory.css";
import {
  getEndpointForId,
} from "../../Services/Utils";
import { databaseOrderbychildOnValue, fetchData } from "../../Services/Database";
import MoreOverlay from "../../components/UI/SubjectPage/VideoMore/MoreOverlay";
import EmptyState from "./EmptyState/EmptyState";
import { useUser } from "../../Services/Auth";
import BookmarksLoader from "./BookmarksLoader";
import AdsContainer, { AD_VARIENT_BANNER_MINI } from "../../components/UI/Ads/AdsContainer";
import { useSubscriptionListener } from "../../Services/Subscription";
import { Hidden } from "@material-ui/core";

const History = (props) => {
  const [more, setMore] = useState(null);
  const [empty, setEmpty] = useState(null);
  const [fetchDone, setFetchDone] = useState(null);
  const subscription = useSubscriptionListener()

  let grouping = {};

  const user = useUser();

  useEffect(() => {
    document.title = "History | Neso Academy";
    if (user === null) {
      setEmpty(true);
      return;
    }

    databaseOrderbychildOnValue(`Users/${user.uid}/history`, "time", async (snapshot) => {
      const historyDB = await snapshot.val();

      if (historyDB !== null) {
        historyDB.sort(function (a, b) {
          return Number(b.time) - Number(a.time);
        });

        let dateArray = [];
        let idsList = [];

        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        for (let i = 0; i < historyDB.length; i++) {
          let data = historyDB[i];
          var t = new Date(Number(data.time));
          dateArray = [...dateArray, t.toLocaleDateString('en-US', options)];
          idsList = [...idsList, data.vid];
        }

        let uniqueDates = [...new Set(dateArray)];

        for (let i = 0; i < uniqueDates.length; i++) {
          grouping[uniqueDates[i]] = [];
        }

        //Fetching bookmarked item data
        fetchData(idsList).then((res) => {

          for (let i = 0; i < historyDB.length; i++) {
            var t = new Date(Number(historyDB[i].time));
            let data = res[historyDB[i].vid];
            data["id"] = historyDB[i].vid;
            grouping[t.toLocaleDateString('en-US', options)] = [...grouping[t.toLocaleDateString('en-US', options)], data];
          }

          setFetchDone(grouping);
        });

      } else {
        setEmpty(true);
      }
    })


  }, []);

  const handleMore = (id, url, name) => {
    return (event) => {
      event.preventDefault()
      event.stopPropagation();
      setMore({ target: event.target, id: id, url: url, name: name });
    };
  };

  const renderBookmarksSmall = () => {
    if (empty) return <EmptyState page="history" />;

    return fetchDone
      ? Object.keys(fetchDone).map((data, ci) => {
        return (
          <div className="bookmarks-content-container">
            <Hidden smUp>
              {(ci / 4 < 4 && (ci % 2) === 0) && <AdsContainer path="history" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} />}
            </Hidden>
            <span className="bookmarks-subject-title">{data}</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto",
              }}
              className="bookmarks-subject-course-items"
            >
              {fetchDone[data].map((data, i) => {
                return (
                  <div>
                    <SmallThumbnail
                      videoId={data.id}
                      {...data.additional}
                      chapName={data.chapName}
                      img={data.img}
                      title={data.name ? data.name : data.vid_title}
                      duration={data.dur}
                      handleMore={handleMore(data.id, getEndpointForId(data.id, data.additional.courseName, data.dur ? data.chapName : data.name, data.dur ? data.vid_title : data.additional.firstVideoName), data.name ? data.name : data.vid_title)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
      : "";
  };

  const renderHistory = () => {
    if (empty) return <EmptyState page="history" />;

    return fetchDone ? (
      Object.keys(fetchDone).map((date, ci) => {
        return (
          <>
            <Hidden xsDown >
              {(ci / 4 < 4 && (ci % 2) === 0) && <AdsContainer path="history" hide={subscription.isSubscribed} varient={AD_VARIENT_BANNER_MINI} />}
            </Hidden>
            <div className="bookmarks-subject-title-container">
              <span className="bookmarks-subject-title">{date}</span>
            </div>
            <div className="bookmarks-subject-course-items">
              {fetchDone[date].map((data) => {
                return (
                  <div>
                    <LatestCard
                      chapName={data.chapName}
                      {...data.additional}
                      id={data.id}
                      isPaid={data.isPaid}
                      handleMore={handleMore(data.id, getEndpointForId(data.id, data.additional.courseName, data.dur ? data.chapName : data.name, data.dur ? data.vid_title : data.additional.firstVideoName), data.name ? data.name : data.vid_title)}
                      playlistCount={data.lec_count}
                      duration={data.dur}
                      thumb={data.img}
                      title={data.name ? data.name : data.vid_title}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      })
    ) : (
      <BookmarksLoader />
    );
  };

  useEffect(() => { }, []);

  return (
    <div className="bookmarksHistory-main">
      <MoreOverlay
        url={more ? more.url : null}
        close={() => setMore(null)}
        anchorEl={more ? more.target : null}
        id={more ? more.id : null}
        open={Boolean(more)}
        name={more ? more.name : null}
      />
      <div className="bookmarksHistory-main-container">
        <p className="bookmarks-title">History</p>
        <div className="hide-on-small">
          <div className="bookmarks-content-container">
            {renderHistory()}
          </div>
        </div>
        <div className="visible-on-small">
          <div className="bookmarks-content-container">
            {renderBookmarksSmall()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
