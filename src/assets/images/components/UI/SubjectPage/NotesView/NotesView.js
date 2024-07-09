import React from 'react';
import { useParams } from 'react-router-dom';
import { useVideoDatabase, useDatabase } from '../../../../Services/Database';
import NotesViewLeft from '../NotesViewLeft/NotesViewLeft';
import NotesViewRight from '../NotesViewRight/NotesViewRight';
import './NotesView.css';

function NotesView(props) {

    const params = useParams()
    let endPointValue = `${params.sub_id}0${params.course_id.slice(0, 2)}_${params.notes_id[0] === '0' ? params.notes_id[1] : params.notes_id.slice(0, 2)}`
    const videoIndex = endPointValue[endPointValue.length - 1];
    const video = useDatabase(`Chapters/${endPointValue.slice(0, 5)}`).data;
    const note = useDatabase(`Notes/${endPointValue}`).data;
    const notes = useVideoDatabase('Notes', endPointValue.slice(0, 5)).data;
    const subject = useDatabase(`Subjects/${endPointValue.slice(0, 2)}`).data;

    if (!note && !notes && !subject && !video) {
        return <h1>Loading</h1>
    }

    document.title = subject + " | Neso Academy"

    const notesArr = [];
    const currentVideo = video[videoIndex];

    for (let element in notes) {
        notesArr.push({ note: notes[element], prop: element });
    }

    return (
        <section className='notes-view-section'>
            <div className='notes-view-left-section'>
                <NotesViewLeft notesArr={notesArr} />
            </div>
            {note && <div className='notes-view-right-section'>
                <NotesViewRight subjectLink={subject} note={note} currentVideo={currentVideo} endPointValue={endPointValue} />
            </div>}
        </section>
    )
}

export default NotesView;