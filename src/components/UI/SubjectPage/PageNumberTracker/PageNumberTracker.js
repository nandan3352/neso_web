import React, { useState, useEffect, useRef } from 'react';

function PageNumberTracker(props) {


    const [userInput, setuserInput] = useState(props.currentPage)

    useEffect(() => {
        setuserInput(props.currentPage)
        return () => {
        }
    }, [props.currentPage])

    const inputRef = useRef(null)

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            const value = event.target.value;
            if (1 <= value && value <= props.pages) {
                props.handleInputPageChange(value);
                inputRef.current.blur()
            } else {
                setuserInput(props.currentPage)
            }
        }
    }
    const handleChange = (e) => {
        setuserInput(e.target.value)
    }

    return (
        <section className='page-number-tracker-container'>
            <div className='ppt-pages'>
                <div id='current-ppt-page'>
                    <input ref={inputRef} value={userInput} onChange={handleChange} id='inputPageNumber' onKeyPress={handleKeyPress} style={{color: "rgba(var(--theme-text-primary))" }} />
                </div>
                <span> / {props.pages}</span>
            </div>
        </section>
    )
}

export default PageNumberTracker;