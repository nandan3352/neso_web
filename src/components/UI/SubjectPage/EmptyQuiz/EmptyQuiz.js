import React from 'react';
import EmptyPage from './emptyPage.svg';
import './EmptyQuiz.css';

function EmptyQuiz() {
    return (
        <section className = 'empty-quiz'>
            <div className = 'empty-image'>
                <img src = {EmptyPage} alt = 'empty-page'></img>
            </div>
            <div className = 'empty-message'>
                <p>Coming Soon...</p>
                <p>Quizzes will be added here soon.</p>
            </div>
        </section>
    )
}

export default EmptyQuiz;