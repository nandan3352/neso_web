import { makeStyles, Popover, SvgIcon } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../../../assets/images/Search/searchIcon.svg'


const useStyle = makeStyles(theme => ({
    overlay: {
        marginTop: 11,
        marginLeft: 0,
        borderRadius: '0px 0px 4px 4px',
        [theme.breakpoints.down('xs')]: {
            marginTop: 1,
            marginLeft: 16
        }
    },

    suggestionsLink: {
        color: theme.palette.text.secondary
    },

    paper: {
        overflow: 'hidden',
        minWidth: 360,
        maxWidth: 360,
        borderRadius: '0px 0px 4px 4px',
        border: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down('xs')]: {
            minWidth: 'calc(100% + 16px)',
            border: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    },

}))

function Suggestions(props) {

    const classes = useStyle()

    function handleSuggestionSubmit(event) {
        props.setValue(event.currentTarget.id)
        props.querySubmit()
    }

    if (!props.suggestionsResponse || props.suggestionsResponse === -1) {
        return (
            <section className='header-suggestions-loading'></section>
        )
    }

    if (props.suggestionsResponse.length === 0) {
        return (
            <section className='header-suggestions-empty'></section>
        )
    }

    const suggestions = (
        props.suggestionsResponse.map(element => {
            return (
                <Link className={classes.suggestionsLink} to={{ pathname: "/search", state: { query: element } }}>
                    <div className='suggestion-item' onClick={handleSuggestionSubmit} id={element}>
                        <SvgIcon>
                            <SearchIcon />
                        </SvgIcon>
                        <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{element}</span>
                    </div>
                </Link>
            )
        })
    )

    if (props.isMobile) {
        return <section className='header-suggestions'>
            {suggestions}
        </section>
    }

    return (
        <section /* className='header-suggestions' */>
            <Popover
                className={classes.overlay}
                elevation={0}
                keepMounted
                disableAutoFocus
                anchorEl={props.anchorRef}
                onClose={props.querySubmit}
                disableAutoFocusItem
                disableEnforceFocus
                disableScrollLock
                classes={{
                    paper: classes.paper
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={props.suggestionsResponse && props.suggestionsResponse.length > 0}>
                <section>
                    {suggestions}
                </section>
            </Popover>
        </section>
    )
}

export default Suggestions;