import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import { IconButton, SvgIcon } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../../../assets/images/Search/searchIcon.svg'

function InputBar(props) {

    const history = useNavigate();

    function handleChange(event) {
        props.inputBarValue(event.target.value);
    }


    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            props.querySubmit()
            let query = event.target.value.trim()
            history.push({ pathname: "/search", state: { query } });
        }
    }

    return (
        <section className='header-search-bar'>
            <SvgIcon>
                <SearchIcon />
            </SvgIcon>
            <input ref={(ref) => ref && props.focus && ref.focus()} value={props.input} type='text' onChange={handleChange} onKeyPress={handleKeyPress} autoComplete='new-password' id='header-input-bar' />
            <IconButton onClick={() => props.showSearchBarClick()} className='header-search-bar-close'>
                <Close />
            </IconButton>
        </section>
    )
}

export default InputBar;