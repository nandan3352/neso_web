import React from "react";
import "./StoryCard.css";

const StoryCard = (props) => {

  function handleClick() {
    props.showStoriesPage();
  }

  return (
    <div onClick = {handleClick}>
      <div className="story-card" style = {{backgroundImage: `url(${props.propsData.link})`}}>
        <p className="story-title">{props.propsData.desc}</p>
        <p className="time-ago">3 mins ago</p>
      </div>
    </div>
  );
};

export default StoryCard;
