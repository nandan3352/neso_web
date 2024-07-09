import { IconButton, makeStyles, SvgIcon } from "@material-ui/core"
import InputBar from "./InputBar"
import Suggestions from "./Suggestion"
import { ReactComponent as SearchIcon } from '../../../../assets/images/Search/searchIcon.svg'
import { useEffect, useRef, useState } from "react"
import '../Header.css'



//TODO: migrate plain css to css generators

const useStyle = makeStyles(theme => ({
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))



const SearchBar = (props) => {

    const classes = useStyle()

    const [inputValue, setInputValue] = useState('');
    const [suggestionsResponse, setSuggestionsResponse] = useState(null);
    const [suggestionQueue, setSuggestionQueue] = useState(null)
    const searchBarRef = useRef(null)

    const showSearchBar = props.showBar
    const setShowSearchBar = props.toggle

    useEffect(() => {

        if (suggestionsResponse !== -1 && suggestionQueue) {
            getSuggestionsResponse(suggestionQueue)
        }

        return () => {
        }
    }, [suggestionQueue, suggestionsResponse])

    const showSearchBarClick = () => {
        setInputValueEmpty()
        setSuggestionsResponse(null)
        setShowSearchBar((prev) => !prev);
    }

    const querySubmit = () => {
        setSuggestionsResponse(null)
        setSuggestionQueue(null)
    }

    const setInputValueEmpty = () => {
        setInputValue('');
    }

    const inputBarValue = (value) => {

        if (value === inputValue)
            return
        setInputValue(value);
        setSuggestionQueue(value)
    }

    //TODO : recent searches
    const getSuggestionsResponse = async (query) => {

        const value = query.trim()
        setSuggestionQueue(null)

        if (value.length > 1) {
            const endpoint = `https://us-central1-neso-c53c4.cloudfunctions.net/search/suggest/?q=${value}`;
            setSuggestionsResponse(-1)
            const response = await (await fetch(endpoint)).json();

            if (inputValue.length > 0) {
                setSuggestionsResponse(response)
            }
            else setSuggestionsResponse(null)

        }
    }

    const searchIcon = () => (
        <div classes={classes.searchIcon} onClick={showSearchBarClick}>
            <IconButton>
                <SvgIcon>
                    <SearchIcon />
                </SvgIcon>
            </IconButton>
        </div>
    )

    return (
        <>
            <div id={showSearchBar ? 'open' : 'close'} className='header-search-container'>
                <div ref={searchBarRef} id={showSearchBar ? 'open' : 'close'} className='header-input-bar'>
                    <InputBar focus={showSearchBar} querySubmit={querySubmit} showSearchBarClick={showSearchBarClick} input={inputValue} inputBarValue={inputBarValue} />
                    <Suggestions isMobile={props.isMobile} anchorRef={searchBarRef.current} querySubmit={querySubmit} open={(inputValue.length > 1)} suggestionsResponse={suggestionsResponse} setValue={setInputValue} />
                </div>
                {!props.isMobile && !showSearchBar ? searchIcon() : <div />}
            </div>

            {props.isMobile && !showSearchBar ? searchIcon() : <div />}
        </>
    )
}


export default SearchBar