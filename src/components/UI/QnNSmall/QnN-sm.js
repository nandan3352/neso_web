import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Tick from "../../../assets/images/QnN/tick.svg";
import NOTES from "../../../assets/images/QnN/notes_card.svg";
import QUIZ from "../../../assets/images/QnN/quiz_card.svg";
import PPT from "../../../assets/images/QnN/PPT_card.svg";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export const CARD_QUIZ = 'nesoquiz'
export const CARD_NOTES = 'nesoNotes'
export const CARD_PPT = 'nesoPPT'

const QnN = ({ id, n, title, nopages, completed, type, showLoader, onClick, disabled }) => {

  const img = () => {
    switch (type) {
      case CARD_QUIZ:
        return QUIZ
      case CARD_NOTES:
        return NOTES
      case CARD_PPT:
        return PPT
      default:
        return NOTES
    }
  }

  const withLink = (Children) => {
    const comps = id.split('_')
    return <Link to={type === CARD_PPT ? `/ppts?id=${comps[0] + '_' + comps[1]}` : `/notes?id=${comps[0] + '_' + comps[1]}`}>
      {Children}
    </Link>
  }

  const rightIcon = (completed ? <img src={Tick} alt="" /> : <KeyboardArrowRight />)

  const card = (
    <div className="qnn-content-border-sm" onClick={!disabled && onClick}>
      <div className='qnn-logo'>
        <img src={img()} alt="" className="qnn-img-sm" />
        <span className='chapter-number'>
          {n}
        </span>
      </div>
      <div className="qnn-content-inside-sm">
        <div className="qnn-content-title-sm">{title}</div>
        <div className="qnn-content-pg-no-sm">{nopages} </div>
      </div>
      <div style={{ flexGrow: "1" }} />
      <div className="qnn-content-arrow-sm">
        {showLoader ? <CircularProgress size={24} color="secondary" /> : rightIcon}
      </div>
    </div>
  )

  return [CARD_NOTES, CARD_PPT].includes(type) ? withLink(card) : card;
};

export default QnN;
