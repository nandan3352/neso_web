import React from 'react';
import EmptyNotes from '../EmptyNotes/EmptyNotes';
import Note from '../Note/Note';
import './Notes.css';

//under cpnstruction
function Notes(props) {

    return <EmptyNotes /> // under construction
    /* if (!props.notes || true) {
        
    }

    const notes = []; //under construction

    return (
        <section className='notes-section'>
            {notes.map((element, index) => <Note note={element[0]} notesArrName={element[1]} number={index + 1} path={props.path} endPointValue={props.endPointValue} />)}
        </section>
    ) */
}

export default Notes;