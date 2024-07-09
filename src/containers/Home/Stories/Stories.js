import React from "react";
import "./Stories.css";
import StoriesPage from "./StoriesPage/StoriesPage";
import StoryCard from "./StoryCard/StoryCard";
import {useDatabase} from "../../../Services/Database";

const Stories = () => {

  const stories = useDatabase("Story");
  const [toggleStories, setToggleStories] = React.useState(false);

  if (!stories.data) {
    return <section></section>
  } 

  const storiesData = [];
  const imageSrc = [];

  for (let element in stories.data) {
    if (stories.data[element].expiry) {
      storiesData.push(stories.data[element]);
      imageSrc.push(stories.data[element].link);
    }
  }

  function showStoriesPage() {
    setToggleStories(true);
    document.body.style.overflow = 'hidden';
  }

  function handleBackArrowClick() {
    setToggleStories(false);
    document.body.style.overflow = '';
  }


  return (
    <div className="stories-flex">
      <div className="stories-width">
        <div>
          <p className="stories-title">Stories</p>
        </div>
        <div className="stories-grid">
          {storiesData.map(element => <StoryCard  showStoriesPage = {showStoriesPage} propsData = {element}/>)}
        </div>
      </div>
      { toggleStories && <StoriesPage startNumber = {0} imageSrc = {imageSrc} handleBackArrowClick = {handleBackArrowClick}/>}
    </div>
  );
};

export default Stories;
