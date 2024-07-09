import React from 'react';
import EmptyPage from './emptyPage.svg';
import "../EmptyQuiz/EmptyQuiz.css"

function EmptyNotes() {
    return (
        <section className='empty-quiz'>
            <div className='empty-image'>
                <img src={EmptyPage} alt='empty-page'></img>
            </div>
            <div className='empty-message'>
                <p>Coming Soon...</p>
                <p>Notes will be added here soon.</p>
            </div>
        </section>
    )
}

export default EmptyNotes;