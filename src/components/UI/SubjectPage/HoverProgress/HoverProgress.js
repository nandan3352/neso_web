import React from 'react';
import './HoverProgress.css';

function HoverProgress() {
    return (
        <section className = 'subject-page-progress'>
            <p id = 'subject-page-progress-heading'>Progress</p>
            <div className = 'progress-items'>
                <div className = 'progress-item'>
                    <span className = 'progress-item-span'>Lectures</span>
                    <div className = 'subject-page-progress-bar'>
                        <div id = 'lecture-progress'></div>
                    </div>
                    <div className = 'total-number'>
                        <span>126</span>
                        <span>/ 300</span>
                    </div>
                </div>
                <div className = 'progress-item'>
                    <span className = 'progress-item-span'>Chapters</span>
                    <div className = 'subject-page-progress-bar'>
                        <div id = 'chapter-progress'></div>
                    </div>
                    <div className = 'total-number'>
                        <span>126</span>
                        <span>/ 300</span>
                    </div>
                </div>
                <div className = 'progress-item'>
                    <span className = 'progress-item-span'>Quizzes</span>
                    <div className = 'subject-page-progress-bar'>
                        <div id = 'quiz-progress'></div>
                    </div>
                    <div className = 'total-number'>
                        <span>126</span>
                        <span>/ 300</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HoverProgress;