import React, { useRef, useEffect, useState, useCallback } from "react";
import "./VdoPlayer.css";
import { databaseSet } from "../../Services/Database";
import { handleOverlay } from "../../containers/Player/RightSection/RightSection";

function VideoPlayer({
  otp,
  startAt,
  playbackInfo,
  uid,
  vid,
  subject,
  sessionPlaybackSpeed,
  playNextVideo,
  setsessionPlspeed,
}) {
  const container = useRef();
  const userProgressRef = useRef({
    0: false,
    20: false,
    40: false,
    60: false,
    80: false,
    90: false,
    100: false,
  });
  const [playerSource, setPlayerSource] = useState();
  const [playerCreated, setPlayerCreated] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  const writeProgress = useCallback(
    (cTime, progress) => {
      if (!uid || !subject) {
        return;
      }
      databaseSet("Users/" + uid + "/progress/" + vid, progress);
      databaseSet("Users/" + uid + "/cw/", {
        id: vid,
        start: cTime * 1000,
        subject: subject.name,
      });
    },
    [subject, uid, vid]
  );

  const onPlayerLoaded = useCallback(() => {
    const player = window.VdoPlayer.getInstance(container.current);
    handleOverlay(false);
    document.querySelector(".player").style.opacity = 1;
    player.video.playbackRate = sessionPlaybackSpeed;
    player.video.defaultMuted = false;
    player.video.muted = false;
    player.video.currentTime = Boolean(startAt) ? startAt : 0;
    setPlayerLoaded(true);
  }, [sessionPlaybackSpeed, startAt]);

  const onProgressUpdate = useCallback(() => {
    const userProgress = userProgressRef.current;
    const sortedProgressKeys = Object.keys(userProgress).sort();

    const player = window.VdoPlayer.getInstance(container.current);

    const prog = player.video.currentTime / player.video.duration;
    if (!isNaN(prog)) {
      if (prog <= 0.95 && !userProgress["100"]) {
        for (const index in sortedProgressKeys) {
          let progressKey = sortedProgressKeys[index];
          if (
            prog > Number(progressKey) / 100 &&
            prog < Number(sortedProgressKeys[Number(index) + 1]) / 100 &&
            !userProgress[progressKey]
          ) {
            const progress = Number(prog.toFixed(2))
            writeProgress(player.video.currentTime, progress);
            userProgressRef.current = {
              ...userProgressRef.current,
              [progressKey]: true,
            };
            break;
          }
        }
      } else if (!userProgress["100"]) {
        writeProgress(player.video.currentTime, 1);
        userProgressRef.current = {
          ...userProgressRef.current,
          100: true,
        };
      }
    }
  }, [writeProgress]);

  useEffect(() => {
    if (!playerCreated) {
      return;
    }

    const player = window.VdoPlayer.getInstance(container.current);

    const playerRateChangeEvent = () => {
      setsessionPlspeed(player.video.playbackRate);
    };
    const playerEndEvent = () => {
      try {
        player.api.setFullscreen(false);
      } catch (error) {
        
      }
      playNextVideo();
    };
    player.video.addEventListener("loadeddata", onPlayerLoaded);
    if (uid) {
      player.video.addEventListener("progress", onProgressUpdate);
    }
    if (playerLoaded) {
      player.video.addEventListener("ratechange", playerRateChangeEvent);
    }
    player.video.addEventListener("ended", playerEndEvent);

    return () => {
      player.video.removeEventListener("loadeddata", onPlayerLoaded);
      player.video.removeEventListener("progress", onProgressUpdate);
      player.video.removeEventListener("ended", playerEndEvent);
      player.video.removeEventListener("ratechange", playerRateChangeEvent);
    };
  }, [
    onPlayerLoaded,
    onProgressUpdate,
    playNextVideo,
    playerCreated,
    playerLoaded,
    setsessionPlspeed,
    uid,
  ]);

  function loadLecture({ otp, playbackInfo }) {
    const params = new URLSearchParams("");
    const parametersToAdd = {
      otp,
      playbackInfo,
      autoplay: true,
      //controls: 'native',
      player: "pAjjYhnzV0QVAOE3",
    };
    for (const item in parametersToAdd) {
      params.append(item, parametersToAdd[item]);
    }

    setPlayerSource("https://player.vdocipher.com/v2/?" + params);
    setPlayerCreated(true);
  }

  useEffect(() => {
    if (window.VdoPlayer) {
      return loadLecture({
        otp,
        playbackInfo,
      });
    }
    /* console.log("loading script");
    const playerScript = document.createElement("script");
    playerScript.src = "https://player.vdocipher.com/v2/api.js";
    document.body.appendChild(playerScript);
    playerScript.addEventListener("load", () => {
      window.playerscriptLoaded = true;
      loadLecture({ otp, playbackInfo, startTime: startAt });
    }); */
  }, []);
  return (
    <div className="player">
      {playerSource && (
        <iframe
          id="nesovdoplayer"
          ref={container}
          title="NesoPlayer"
          src={playerSource}
          style={{
            border: 0,
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
        ></iframe>
      )}
    </div>
  );
}

export default VideoPlayer;
