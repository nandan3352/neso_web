import React, { useState, useEffect } from "react";
import Streams from "./Streams/Streams";
import "./Home.css";
import PlayStoreDownload from "./PlayStoreDownload/PlayStoreDownload";
import Loader from "../../components/Loader/CourseCardLoader";
import Faculty from "./Faculty/Faculty";
import NesoFuel from "./NesoFuel/NesoFuel";
import ContinueVideo from "./ContinueVideo/ContinueVideo";
// import Stories from "./Stories/Stories";
import Recommendation from "./Recommendation/Recommendation";
import Container from "@material-ui/core/Container";
import { useUser } from "../../Services/Auth";
import { useSubscriptionListener } from "../../Services/Subscription";
import AdsContainer, {
  AD_VARIENT_BANNER_MINI,
} from "../../components/UI/Ads/AdsContainer";
import { Hidden } from "@material-ui/core";
import {
  databaseOnValue,
  databaseOrderbychildOnValue,
} from "../../Services/Database";

const HomeBody = (props) => {
  const auth = useUser();

  const subscriptionState = useSubscriptionListener();
  const [state, setState] = useState({
    loading: true,
    streams: [],
    faculties: [],
  });

  async function fetch() {
    const facultyunsubscribe = databaseOrderbychildOnValue(
      "/Faculty",
      "priority",
      (snapshot) => {
        const result = snapshot.val();
        if (result !== null) {
          setState((prev) => ({
            ...prev,
            faculties: result,
          }));
        }
      }
    );
    const courseunsubscribe = databaseOnValue("/Streams", (snapshot) => {
      const result = snapshot.val();
      if (result !== null) {
        setState((prev) => ({
          ...prev,
          loading: false,
          streams: Object.entries(result)
            .sort(([_, a], [_1, b]) => {
              return a.priority - b.priority;
            })
            .map(([key, stream]) => ({ id: key, ...stream })),
        }));
      }
    });
    return () => {
      facultyunsubscribe();
      courseunsubscribe();
    };
  }

  useEffect(() => {
    let unsubscribe;
    fetch().then((u) => {
      unsubscribe = u;
    });
    return () => {
      try {
        unsubscribe();
      } catch {}
    };
  }, []);

  return (
    <Container>
      <div className="home-main">
        {!state.loading ? (
          <div style={{ width: "100%" }}>
            {auth && auth.uid ? (
              <div>
                <div style={{ marginTop: "32px" }} />
                <ContinueVideo isSubscribed={subscriptionState.isSubscribed} />
                <Hidden smDown>
                  <AdsContainer
                    path="home"
                    hide={subscriptionState.isSubscribed}
                    varient={AD_VARIENT_BANNER_MINI}
                    rootStyle={{ margin: 0 }}
                  />
                </Hidden>
                <Recommendation />
              </div>
            ) : (
              ""
            )}
            {!(auth && auth.uid) && (
              <AdsContainer
                path="home"
                hide={subscriptionState.isSubscribed}
                varient={AD_VARIENT_BANNER_MINI}
              />
            )}
            <Streams
              isSubscribed={subscriptionState.isSubscribed}
              className="Courses"
              state={state}
              scrollToCourse={props.scrollToCourse}
            />
            <AdsContainer
              path="home"
              hide={subscriptionState.isSubscribed}
              varient={AD_VARIENT_BANNER_MINI}
              rootStyle={{ margin: 0 }}
              rootSmStyles={{ margin: "24px 0px" }}
            />
            <Faculty data={state.faculties} />
            <PlayStoreDownload />
            {subscriptionState.isSubscribed ? <div /> : <NesoFuel />}
          </div>
        ) : (
          <div className="MuiContainer-maxWidthLg">
            <Loader user={auth} />
          </div>
        )}
      </div>
      {/*</SimpleBar>*/}
    </Container>
  );
};

export default HomeBody;
