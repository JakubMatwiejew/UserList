import React from 'react'
import './Search.css'

const Search = (props) => {

    const handleFocus = (event) => event.target.select();

    return (
        <div className="search-input">
            <input type="text" autofocus="true" placeholder={props.placeholder} onChange={props.change} value={props.searchPhrase} onFocus={handleFocus} />
        </div>
    )
}

export default Search