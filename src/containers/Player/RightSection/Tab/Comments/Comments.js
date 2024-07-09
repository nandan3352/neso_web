import React, { useEffect, useState } from "react";
import Comment from "../../../../../components/UI/Comment/Comment";
// import Img from "./40x40img.svg";
import "./Comments.css";
import { mapCommentData, removePad } from "../../../../../Services/Utils";
import { useUser } from "../../../../../Services/Auth";
import { Button, CircularProgress, InputBase, SvgIcon } from "@material-ui/core";
import { AccountCircleRounded, ArrowDropDown } from "@material-ui/icons";
import UserProfileImage from "../../../../../components/ServiceComponent/UserProfileImage";
import { AuthDialogEvent, useEventDispatch } from "../../../../../Services/Events";
import { firestoreAddDoc, firestoreDocsOddescWhereeq } from "../../../../../Services/Database";
import { doc as fdoc, collection, getFirestore, updateDoc, increment, deleteDoc, getDocs, query, where } from "@firebase/firestore";

const Comments = (props) => {

  const user = useUser()

  /**
   * undefined -> initial fetch 
   * null -> No more comments
   */
  const [comments, setComments] = useState(null)
  const [input, setInput] = useState("")
  const [visibleCommentCount, setVisibleCommentCount] = useState(5)
  const [showSubmissionPanel, setShowSubmissionPanel] = useState(false)
  const dispatchSnackbar = useEventDispatch(AuthDialogEvent)

  useEffect(() => {
    fetchComments()
    return () => {

    }
  }, [])

  useEffect(() => {
    setInput("")
    setShowSubmissionPanel(false)
  }, [user])



  const fetchComments = async () => {
    //timestamp -> c , parent comment -> e

    const fetchedComments = await firestoreDocsOddescWhereeq(`Videos/${removePad(props.id)}/Comments`, 'c', 'e', 'None')

    const commentsdata = fetchedComments.docs.map(mapCommentData)
    setComments(commentsdata)

  }

  const addComments = async (comment, parent, i, pAuthor = null) => {
    const doc = {
      id: 'undefined',
      data: () => (
        {
          a: user.name,
          b: comment,
          c: Date.now(),
          d: user.uid,
          e: parent ? parent : 'None',
          f: 0,
          pAuthor: pAuthor,
          lecid: props.id
        }
      )
    }

    const docRef = await firestoreAddDoc(`Videos/${removePad(props.id)}/Comments`, doc.data())
    doc.id = docRef.id


    if (parent && parent !== "None") {
      await updateDoc(fdoc(getFirestore(), `Videos/${removePad(props.id)}/Comments/${parent}`), {
        f: increment(1)
      })
      setComments(c => {
        c[i].reply++
        return c
      })
    }
    return mapCommentData(doc)
  }

  const deleteComment = async (id, parent, i) => {

    await deleteDoc(fdoc(getFirestore(), `Videos/${removePad(props.id)}/Comments/${id}`))
    if (parent !== "None") {
      await updateDoc(fdoc(getFirestore(), `Videos/${removePad(props.id)}/Comments/${parent}`), {
        f: increment(-1)
      })

      setComments(c => {
        c[i].reply--
        return c
      })
    } else {
      const ref = await getDocs(query(collection(getFirestore(), `Videos/${removePad(props.id)}/Comments/${id}`), where('e', '==', id)))
      await Promise.all(ref.docs.map(e => e.ref.delete()))
      setComments(c => c.filter(e => e.id !== id))
    }

  }


  const addCommentInput = async (data) => {
    setInput("")
    setShowSubmissionPanel(false)
    const newComment = await addComments(data)
    setComments(i => [newComment, ...i])
  }

  const handleKeyPress = async (e) => {
    let data = e.target.value;
    if ((e.key === "Enter" || e.key === "NumpadEnter") && data.replace(/\s/g, "").length !== 0) {
      if (user && user.uid) {
        addCommentInput(e.target.value)
      } else {
        dispatchSnackbar({ open: true, msg: 'Login to comment.' })
      }
    }
  };

  const handleChange = (e) => {

    if (!(user && user.uid)) {
      dispatchSnackbar({ open: true, msg: 'Login to comment.' })
      return
    }

    if (e.target.value.replace(/\s/g, "").length === 0)
      setShowSubmissionPanel(false)
    else if (!showSubmissionPanel)
      setShowSubmissionPanel(true)
    setInput(e.target.value)
  }

  const handleLoadMore = () => {
    setVisibleCommentCount(i => i + 5)
  }

  return (
    <div className="comments-root">
      <div>
        <div className="main-writeComments">

          <div style={{ width: 40, height: 40 }}>
            {(user && user.uid) ? <UserProfileImage width={40} img={user.profilePic} name={user.name} uid={user.uid} /> : <SvgIcon style={{ opacity: 0.57, height: '100%', width: '100%' }} ><AccountCircleRounded /></SvgIcon>}
          </div>

          <div>
            <InputBase
              className="writeComments-input"
              type="text"
              placeholder="Write a comment"
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              value={input}
            />
          </div>
        </div>
        {user && showSubmissionPanel && <div className="comment-handle-panel">
          <Button onClick={(e) => { setInput(''); setShowSubmissionPanel(false) }} classes={{ label: 'comment-button-text' }} variant='outlined'> Cancel</Button>
          <Button onClick={(e) => addCommentInput(input)} style={{ marginLeft: 16 }} color='secondary' variant='outlined'> Submit</Button>
        </div>}
      </div>

      <div className="list-of-comments">
        {comments ? comments.slice(0, visibleCommentCount).map((comment, index) => {
          return (
            <div key={comment.id}>
              <Comment
                id={removePad(props.id)}
                user={user}
                delete={deleteComment}
                addReply={addComments}
                index={index}
                comments={comment} />
            </div>
          );
        }) : <div style={{ display: 'flex', justifyContent: "center" }}><CircularProgress color="secondary" /></div>}
      </div>
      {comments && visibleCommentCount < comments.length ? (
        <div className="load-btn">
          <Button
            onClick={handleLoadMore}
            variant='outlined'
            color='secondary'
            endIcon={<ArrowDropDown color="secondary" />}>
            load more comments
          </Button>

        </div>
      ) : (
        ""
      )}
    </div>
  );

}

export default Comments;
