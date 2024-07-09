import React from 'react';
import {Link} from 'react-router-dom';
import Arrow from '../PPT/arrow.svg';
import './NotesViewLeft.css';

function NotesViewLeft(props) {
    return (
        <section className = 'notes-view-left'>
            <section className = 'ppts-names'>
                {props.notesArr.map((element, index) => 
                    <Link to = {`/notes?id=${element.prop}`}><div className = 'ppt-title'>
                        <p id = {element.prop}>{index + 1}. {element.note.name}</p>
                    <div className = 'ppt-view-arrow'>
                        <img src = {Arrow} alt = 'arrow'/>
                    </div>
                </div></Link>)}
            </section>
            <section className = 'ppt-ad-section'>
                <div className = 'ppt-ad'></div>
            </section>
        </section>
    )
}

export default NotesViewLeft;