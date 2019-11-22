import React from 'react'
import './Search.css'

const Search = (props) => {
    return (
        <div className="search-input">
            <input type="text" placeholder={props.placeholder} onChange={props.change} value={props.searchPhrase} />
        </div>
    )
}

export default Search