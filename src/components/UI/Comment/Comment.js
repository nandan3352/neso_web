import React, { useEffect, useState } from "react";
import "./Comment.css";
import moment from "moment";
import { mapCommentData } from "../../../Services/Utils";
import { Button, CircularProgress, IconButton, InputBase } from "@material-ui/core";
import { Close, Delete } from "@material-ui/icons";
import UserProfileImage from "../../ServiceComponent/UserProfileImage";
import UserSubscriptionBadge from "../../ServiceComponent/UserSubscriptionBadge";
import { AuthDialogEvent, useEventDispatch } from "../../../Services/Events";
import AlertDialog from "../Quiz/AlertDialog";
import { firestoreDocsOddescWhereeq } from "../../../Services/Database";


const Comment = (props) => {
  const {
    id,
    author,
    content,
    time,
    reply,
    authorId,
    parent,
    pAuthor,
  } = props.comments;

  const [replies, setReplies] = useState(null)
  const [hideReply, setHideReply] = useState(true);
  const [showSubmissionPanel, setShowSubmissionPanel] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const dispatchAuth = useEventDispatch(AuthDialogEvent)

  const [inputTextValue, setInputTextValue] = useState("");

  useEffect(() => {
    if (!replies && !hideReply) {
      fetchReplies()
    }
    return () => {

    }
  }, [hideReply])

  const confirmDeleteToggle = () => setConfirmDelete(prev => !prev)

  const fetchReplies = async () => {

    if (parent !== "None") {
      setReplies([])
      return
    }

    //TODO : change as asc
    const rawReplies = (await firestoreDocsOddescWhereeq(`Videos/${props.id}/Comments`, 'c', 'e', id)).docs

    const repliesdata = rawReplies.map(mapCommentData)

    repliesdata.sort((a, b) => a.time - b.time)

    setReplies(repliesdata)
  }


  const openReply = () => {
    setHideReply(!hideReply);
  };


  const handleSecondLevelReply = async (e, author = null) => {
    if (!props.handleKeyPress)
      return

    if ((e.key === "Enter" || e.key === "NumpadEnter") && !e.target.value.replace(/\s/g, "").length !== 0) {
      setInputTextValue("")
      setHideReply(true)
      props.handleKeyPress(e, author)
      setShowSubmissionPanel(false)
    }

  }

  const handleKeyPress = async (e, author = null) => {
    let data = e.target.value;

    if ((e.key === "Enter" || e.key === "NumpadEnter") && data.replace(/\s/g, "").length !== 0) {
      setInputTextValue("")
      setShowSubmissionPanel(false)
      const newReply = await props.addReply(data, id, props.index, author)
      setReplies(i => [...i, newReply])
    }
  };

  const handleSecondLevelDelete = (replyId, replyParent) => {
    return async () => {
      await props.delete(replyId, replyParent, props.index)
      setReplies(r => r.filter(e => e.id !== replyId))
    }
  }

  const handleDelete = async () => {
    await props.delete(id, parent, props.index)
  }

  const handleChange = (e) => {
    if (e.target.value.replace(/\s/g, "").length === 0) {
      setShowSubmissionPanel(false)
    }
    else if (!showSubmissionPanel)
      setShowSubmissionPanel(true)
    setInputTextValue(e.target.value);
  };

  const handleSubmission = (e) => {
    if (props.handleKeyPress) {
      handleSecondLevelReply({ target: { value: inputTextValue }, key: 'Enter' }, author)
    } else {
      handleKeyPress({ target: { value: inputTextValue }, key: 'Enter' }, author)
    }
  }

  return (
    <div className="comment-item">
      <AlertDialog
        open={confirmDelete}
        positive="Delete"
        negative="No"
        negativeHandle={confirmDeleteToggle}
        positiveHandle={(e) => {
          setConfirmDelete(false)
          if (props.handleDelete) {
            props.handleDelete(id, parent)(e)
          } else {
            handleDelete(e)
          }
        }}
        handleClose={confirmDeleteToggle}
        title="Are you sure?"
        body={`Your ${props.handleDelete ? 'reply' : 'comment'} will be removed.`}
      />
      <div className="main-comment">
        <div style={{ minWidth: 40, width: 40, height: 40 }} >
          <UserProfileImage width={40} name={author} uid={authorId} />
        </div>
        <div id={parent === "None" && replies && replies.length > 0 ? 'replies-open' : 'replies-close'} className="main-content">
          <div className="commenter">
            <p class="commenter-name">{author}</p>
            <div class="commenter-badge">
              <UserSubscriptionBadge uid={authorId} />
            </div>
            <div className="grow" />
            <div>
              {(props.user && props.user.uid && (authorId === props.user.uid)) &&
                <IconButton onClick={confirmDeleteToggle} className="delete-btn" >
                  <Delete />
                </IconButton>}
            </div>
          </div>
          <div className="time">
            <p>{moment(time).startOf("time").fromNow()}</p>
          </div>
          <div className="comment-content">
            <p> <span className="reply-mention">{(pAuthor ? `@${pAuthor}` : '')}</span> {content}</p>
          </div>


          <Button variant='text' color="secondary" onClick={props.user || reply > 0 ? openReply : (e) => dispatchAuth({ open: true, msg: "Login to comment." })
          } className="reply-btn">
            <p>{(reply > 0 ? `${hideReply ? `View ${reply}` : "Hide "} ${reply === 1 ? 'Reply' : 'Replies'}` : `${hideReply ? '' : 'Hide  '}Reply`)}</p>
          </Button>

          {!hideReply ? (
            <div className='reply-section' >
              {
                props.user && props.user.uid !== null ? (
                  <div>
                    <div className="main-writeComments">

                      <div style={{ width: 40, height: 40 }}>
                        <UserProfileImage img={props.user.profilePic} name={props.user.name} uid={props.user.uid} />
                      </div>

                      <div>
                        <div className="input-icons">

                          <InputBase
                            startAdornment={<div className='reply-tag'>
                              {`@${author}`}
                            </div>}
                            className="writeComments-input"
                            type="text"
                            placeholder="Reply"
                            onKeyPress={(e) => {
                              if (props.handleKeyPress) {
                                handleSecondLevelReply(e, author)
                              } else {
                                handleKeyPress(e, author)
                              }
                            }}
                            value={inputTextValue}
                            onChange={(value) => handleChange(value)}
                          >
                          </InputBase>

                        </div>
                      </div>
                    </div>
                    {showSubmissionPanel && <div className='comment-handle-panel'>
                      <Button onClick={(e) => { setInputTextValue(''); setShowSubmissionPanel(false); openReply() }} classes={{ label: 'comment-button-text' }} variant='outlined'> Cancel</Button>
                      <Button onClick={handleSubmission} style={{ marginLeft: 16 }} color='secondary' variant='outlined'> Submit</Button>
                    </div>}
                  </div>) : ("")
              }
              {replies && replies.length > 0 ? (
                <div>
                  {replies.map((child, i) => {
                    return <Comment handleDelete={handleSecondLevelDelete} index={i} handleKeyPress={handleKeyPress} user={props.user} img={props.img} comments={child} />;
                  })}
                </div>
              ) : (!replies && parent === "None") && <div style={{ display: 'flex', justifyContent: "center" }}><CircularProgress color="secondary" /></div>}
            </div>
          ) : ("")}
        </div>
      </div>
    </div >
  );
};

export default Comment;
