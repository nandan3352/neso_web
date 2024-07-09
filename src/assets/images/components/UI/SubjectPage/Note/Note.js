import React from 'react';
import { Link } from 'react-router-dom';
import NoteIcon from './NoteIcon.svg';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import "./Note.css";

function Note(props) {

    const getUrl = () => {
        let number = props.number < 10 ? `0${props.number}` : props.number
        return `/notes/${number}-${props.note.name.toLowerCase().replace(/\s/g, "")}`
    }

    return (
        <Link to={`${props.path}${getUrl()}`}>
            <section className="note-section" style={{ cursor: "pointer" }}>
                <div className='note-container'>
                    <div className='note-thumbnail'>
                        <span>{props.number}</span>
                        <img src={NoteIcon} alt={props.title} />
                    </div>
                    <div className='note-section-name'>
                        <p>{props.note.name}</p>
                    </div>
                </div>
                <div className='note-section-arrow'>
                    <KeyboardArrowRight />
                </div>
            </section>
        </Link>
    )
}

export default Note;