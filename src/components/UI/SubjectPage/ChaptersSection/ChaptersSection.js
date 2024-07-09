import { Button, useTheme } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../../Services/Auth";
import { getAlignedScrollPosition } from "../../../../Services/Utils";
import Chapter from "../Chapter/Chapter"
import "./ChaptersSection.css";

function ChaptersSection({
  totalChapterCount,
  paidChaptersCount,
  freeChaptersCount,
  courseName,
  endPointValue,
  videos,
  videoThumb,
  bookmarks,
  videoProgress,
  subscription,
  isPaidSection,
  chapters
}) {

  const [expanded, setExpanded] = React.useState(-1);

  const user = useUser()
  const theme = useTheme()

  const setExpand = (panel, element) => {
    const collapsingElement = document.getElementById(`chapter-section-${expanded}`)
    const expandingElement = document.getElementById(`chapter-section-${panel}`)

    const aligningScrollOffset = getAlignedScrollPosition(expanded, panel, collapsingElement, expandingElement)

    setExpanded(prev => prev != panel ? panel : -1);

    if (aligningScrollOffset >= 0) {
      window.scrollTo({ top: aligningScrollOffset, left: 0, behavior: 'smooth' })
    }

  }

  React.useEffect(() => {
    if (endPointValue.slice(0, 2) == "ot" && totalChapterCount == 1) {
      if (expanded != 1)
        setExpanded(1);
    }
  }, [])

  const FuelBanner = (
    <div className='get-fuel-paid'>
      <div className="get-fuel-details">
        <h6>Neso Fuel</h6>
        <p>{!subscription.isSubscribed ?
          "Get Neso Fuel to access the following contents" :
          "You have access to the following contents"}</p>
      </div>
      {!subscription.isSubscribed &&
        <Link to={{ pathname: "/fuel", state: { refuel: true } }}>
          <Button className="paid-btn"
            color="primary"
            variant={theme.palette.type == "dark" ? "outlined" : "contained"}
            style={{ width: 104 }}>
            get fuel
          </Button>
        </Link>}
    </div>
  )

  function getChapterNumber(i) {
    return isPaidSection ? freeChaptersCount + i + 1 : i + 1
  }


  const chapterProps = {
    videos,
    videoThumb,
    endPointValue,
    bookmarks,
    videoProgress,
    subscription,
    courseName
  }

  return (
    <section className={isPaidSection ? "paid-chapters" : "free-chapters"} style={paidChaptersCount == 0 ? { borderStyle: 'none' } : {}}>
      {isPaidSection && FuelBanner}
      <div className="chapters-list" >
        {chapters.map((chapter, index) => (
          <Chapter
            {...chapter}
            {...chapterProps}
            user={user}
            number={getChapterNumber(index)}
            key={index}
            free={!isPaidSection}
            setExpand={setExpand}
            expand={expanded == getChapterNumber(index) ? true : false}
          />
        ))}
      </div>
    </section>
  );
}

export default ChaptersSection;
