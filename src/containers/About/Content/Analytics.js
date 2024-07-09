import React from "react";
import Youtube from "../../../assets/images/SocialMediaIcons/RedYouTube.svg";
import DYoutube from "../../../assets/images/SocialMediaIcons/DarkYoutube.svg";
import "./analytics.css";
import { useDatabase } from "../../../Services/Database";

const Analytics = ({ check }) => {
  const aboutStat = useDatabase("/AboutStats").data

  return (
    <div className='analytics'>
      <div className='analyticsWrapper'>
        <div className='analyticsTitle'>
          {check ? <img src={DYoutube} alt='' /> : <img src={Youtube} alt='' />}
          <p>Views</p>
        </div>
        <p>{aboutStat && aboutStat.views}</p>
      </div>
      <div className='analyticsWrapper'>
        <div className='analyticsTitle'>
          {check ? <img src={DYoutube} alt='' /> : <img src={Youtube} alt='' />}
          <p>Subscribers</p>
        </div>
        <p>{aboutStat &&aboutStat.subscribers}</p>
      </div>
      <div className='analyticsWrapper'>
        <div className='analyticsTitle'>
          {check ? <img src={DYoutube} alt='' /> : <img src={Youtube} alt='' />}
          <p>Watch Time</p>
        </div>
        <p>{aboutStat &&aboutStat.watchTime}</p>
      </div>
    </div>
  );
};

export default Analytics;
