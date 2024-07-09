import React from 'react';
import './PPT.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import PPTIcon from '../../../../assets/images/icons/pptIcon.svg';
import { useEventDispatch, SnackbarEvent } from "../../../../Services/Events";
import MoreVert from '@material-ui/icons/MoreVert';
import { getpaddedidForsubject } from "../../../../Services/Utils";
import MoreOverlay from '../VideoMore/MoreOverlay';
import { getEndpointForQuiz, useIsCompleted } from '../../../../Services/Utils';
import { ReactComponent as Tick } from "../../../../assets/images/QnN/tick.svg";
import { IconButton } from "@material-ui/core";


function PPT(props) {
    const { course_id, sub_id } = useParams();

    const dispatchSnackBar = useEventDispatch(SnackbarEvent);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const course = getpaddedidForsubject(sub_id, course_id)
    const id = `${course}_${props.number}_p`;
    const url = useLocation().pathname;
    const complete = useIsCompleted(id).isComplete;

    function handleSnackBar() {
        dispatchSnackBar({ open: true, msg: "Get Neso fuel to access this PPT", button: { nav: "/fuel", text: "Get fuel" } })
    }

    const getUrl = () => {
        let number = props.number < 10 ? `0${props.number}` : props.number
        return `/${number}-${props.title.toLowerCase().replace(/\s/g, "-")}`
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

    const navEndpoint = getEndpointForQuiz(url, props.number, props.title)

    return (
        // <Link to={`/ppts?id=${props.pptArrPropName[props.number - 1 - props.freeLength]}`} onClick={(e) => { if (props.paid) { e.preventDefault(); handleSnackBar() } }}>
        <Link target="_blank" rel="noopener noreferer" to={`${props.path}${getUrl()}`} onClick={(e) => { if (props.paid) { e.preventDefault(); handleSnackBar() } }}>
            <section className={`ppt-section ${!props.free ? "" : "free"}`} style={{ cursor: "pointer" }}>
                <div className='ppt-container'>
                    <div className='ppt-thumbnail'>
                        <span>{props.number}</span>
                        <img src={PPTIcon} alt={props.title} />
                    </div>
                    <div className='ppt-section-name'>
                        <p>{props.title}</p>
                    </div>
                </div>
                <div className='ppt-section-arrow'>
                    {complete && <IconButton className="ppt-icon-tick">
                        <Tick />
                    </IconButton>}
                    <IconButton className={`ppt-icon-more ${complete ? "" : "complete"}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClick(e) }}>
                        <MoreVert />
                    </IconButton>
                </div>
                <MoreOverlay
                    url={`${props.path}${getUrl()}`}
                    anchorEl={anchorEl}
                    id={id}
                    open={open}
                    name={props.title}
                    close={handleClose}
                    vidClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                />
            </section>
        </Link>
    )
}

export default PPT;