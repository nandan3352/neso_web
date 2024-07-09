import React from "react";
import { ReactComponent as Tick } from "../../../assets/images/QnN/tick.svg";
import NOTES from "../../../assets/images/QnN/notes_card.svg";
import QUIZ from "../../../assets/images/QnN/quiz_card.svg";
import PPT from "../../../assets/images/QnN/PPT_card.svg";
import { CircularProgress, IconButton, SvgIcon } from "@material-ui/core";
import "./QNP.css"
import { Link } from "react-router-dom";
import { getEndpointForId, useIsCompleted } from "../../../Services/Utils";
import { SnackbarEvent, useEventDispatch } from "../../../Services/Events";
import { MoreVert } from "@material-ui/icons";

const QNP = ({ id, title, nopages, completed, showLoader, onClick, disabled, canAccess, ...props }) => {

  const dispatchSnackbar = useEventDispatch(SnackbarEvent)
  const isCompleted = useIsCompleted(id).isComplete
  const buyFuel = (e) => {
    e.preventDefault()
    dispatchSnackbar({ msg: `Get Neso Fuel to access this ${id.includes('_q') ? 'quiz' : 'ppt'}`, button: { text: 'GET FUEL', nav: '/fuel' }, open: true })
  }

  const withLink = (type, Children) => {
    const comps = id.split('_')
    return <Link onClick={canAccess ? undefined : buyFuel} to={canAccess ? (type === 'p' ? getEndpointForId(id, props.courseName, title) : `/notes?id=${comps[0] + '_' + comps[1]}`) : undefined} >
      {Children}
    </Link>
  }

  const img = (id) => {
    switch (id.split("_")[2]) {
      case "q":
        nopages = nopages + " questions"
        return QUIZ
      case "n":
        nopages = nopages + " pages"
        return NOTES
      case "p":
        nopages = nopages + " slides"
        return PPT
      default:
        return NOTES
    }
  }


  const rightIcon = (
    <div className='hover-container' >
      <SvgIcon color='primary' className={(completed || isCompleted) ? 'tick-completed' : 'tick-not-completed'} >
        <Tick />
      </SvgIcon>
      <IconButton onClick={props.handleMore} className={(completed || isCompleted) ? 'more-completed' : 'more-not-completed'}   >
        <MoreVert />
      </IconButton>
    </div>)

  const card = (
    <div className="qnp-content-border-sm" onClick={canAccess ? (!disabled && onClick) : buyFuel}>
      <div className='qnp-logo'>
        <img src={img(id)} alt="" className="qnp-img-sm" />
        <span className='chapter-number'>
          {id.split("_")[1]}
        </span>
      </div>
      <div className="qnp-content-inside-sm">
        <div className="qnp-content-title-sm">{title}</div>
        <div className="qnp-content-subject">{props.courseName}</div>
      </div>
      <div style={{ flexGrow: "1" }} />
      <div className="qnp-content-arrow-sm">
        {showLoader ? <CircularProgress size={24} color="secondary" /> : rightIcon}
      </div>
    </div>
  )

  return ['p', 'n'].includes(id.split("_")[2]) ? withLink(id.split("_")[2], card) : card;
};

export default QNP;
