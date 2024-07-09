import React from 'react';
import { Bookmark, BookmarkBorder, Done, DoneAll, ShareRounded } from '@material-ui/icons';
import { Button, makeStyles } from '@material-ui/core';
import './VideoMore.css'
import { useUser } from '../../../../Services/Auth';
import { CircularProgress } from '@material-ui/core';
import { ShareEvent, useEventDispatch } from '../../../../Services/Events';

const useStyle = makeStyles({
  label: {
    textTransform: 'capitalize',
    fontWeight: 400,
    fontSize: 16,
  }
})

const VideoMore = (props) => {
  const style = useStyle();
  const user = useUser();
  const share = useEventDispatch(ShareEvent)
  return (
    <div onClick={(e) => {e.preventDefault(); e.stopPropagation(); }} style={{ ...props.style }} className="clicked-more" id={props.moreClickId}>
      {user && <Button className="clicked-more-item" onClick={(e) => { e.stopPropagation(); props.toggleBookmark() }} classes={style}>
        {props.isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
        <div id='bookmark-span'>Bookmark</div>
      </Button>}
      <Button onClick={(e) => { e.stopPropagation(); props.close(); share({ url: props.url }) }} className="clicked-more-item" classes={style}>
        <ShareRounded />
        <div id='share-span'>Share</div>
      </Button>
      {user && <Button disabled={props.isCompleted} onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!props.isCompleted)
          props.setComplete()
        else if (props.close)
          props.close()
      }} className="clicked-more-item" classes={style}>
        {
          props.isCompleted !== undefined ?
            (<>
              {props.isCompleted ? <DoneAll color='primary' /> : <Done />}
              < div id='mark-complete-span'>{props.isCompleted ? "Completed" : "Mark complete"}</div>
            </>)
            : <CircularProgress style={{ margin: 0 }} color='secondary' size={24} />
        }
      </Button >}
    </div >
  )
}

export default VideoMore;