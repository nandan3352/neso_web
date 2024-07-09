import React from 'react';
import His from './history.svg';
import Bookmarks from './bm.svg';
import './EmptyState.css';

function EmptyState(props) {
    return (
        <section className = 'empty-search'>
                {
                (props.page === "history")?(
                    <div className = 'empty-search-message'>
                        <img src = {His} alt = 'History'></img>
                        <p>Your history will appear here</p>
                    </div>
                ):
                (
                <div className = 'empty-search-message'>
                    <img src = {Bookmarks} alt = 'bookmarks'></img>
                    <p>Your bookmarks will appear here</p>
                </div>
                )
                }
                
        </section>
    )
}

export default EmptyState;