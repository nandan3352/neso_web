import React from 'react';
import Search from './search.svg';
import './EmptySearch.css';

function EmptySearch() {
    return (
        <section className = 'empty-search'>
            <div className = 'empty-search-message'>
                <img src = {Search} alt = 'search'></img>
                <p>No results found!</p>
            </div>
        </section>
    )
}

export default EmptySearch;