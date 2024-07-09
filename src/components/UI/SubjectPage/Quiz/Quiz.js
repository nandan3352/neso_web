import React from 'react';
import './Quiz.css';
import QuizIcon from '../../../../assets/images/icons/quizIcon.svg';
import { useParams } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CircularProgress, IconButton } from '@material-ui/core';
import { useEventDispatch, SnackbarEvent } from "../../../../Services/Events";
import { Link, useLocation } from 'react-router-dom';
import { getEndpointForQuiz } from '../../../../Services/Utils';
import MoreOverlay from '../VideoMore/MoreOverlay';
import { getpaddedidForsubject } from "../../../../Services/Utils";
import { ReactComponent as Tick } from "../../../../assets/images/QnN/tick.svg";
import { useIsCompleted } from "../../../../Services/Utils";

function Quiz(props) {
    const { course_id, sub_id } = useParams();
    const dispatchSnack = useEventDispatch(SnackbarEvent);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const course = getpaddedidForsubject(sub_id, course_id)
    const id = `${course}_${props.number}_q`;
    const url = useLocation().pathname;
    const complete = useIsCompleted(id).isComplete;

    function handleSnackBar() {
        dispatchSnack({ open: true, msg: "Get Neso fuel to access this quiz", button: { nav: '/fuel', text: 'Get Fuel' } })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        setAnchorEl(null);
    };

    const iconoverlay = (
        <div className="icon-container">
            {complete && <IconButton className="more-icon-tick">
                <Tick />
            </IconButton>}
            <IconButton className={`more-icon-more ${complete ? "" : "complete"}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClick(e) }}>
                <MoreVertIcon />
            </IconButton>
        </div>
    );


    const navEndpoint = getEndpointForQuiz(url, props.number, props.name)
    return (
        <Link to={props.free ? navEndpoint : undefined}>
            <section className={`quiz-container ${props.free ? "free" : ""}`} onClick={() => !props.free ? handleSnackBar() : undefined /* props.handleQuiz(props.number) */} style={{ cursor: "pointer" }}>
                <section className='quiz-section' >
                    <div className='quiz-thumbnail'>
                        <span>{props.number}</span>
                        <img src={QuizIcon} alt={props.name}></img>
                    </div>
                    <div className='quiz-details'>
                        <p>{props.name}</p>
                        {/* <p>{props.totQuestions} questions</p> */}
                    </div>
                </section>
                <div className='quiz-arrow'>
                    {props.showLoader ?
                        <CircularProgress color='secondary' size={24} />
                        :
                        iconoverlay
                    }
                    <MoreOverlay
                        anchorEl={anchorEl}
                        id={id}
                        url={navEndpoint}
                        close={handleClose}
                        vidClose={() => setAnchorEl(null)}
                        open={open}
                        name={props.name}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    />
                </div>
            </section>
        </Link >

    )
}

export default Quiz;
