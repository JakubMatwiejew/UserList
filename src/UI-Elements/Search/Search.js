import React from 'react'
import './Search.css'

const Search = (props) => {

    const handleFocus = (event) => event.target.select();

    const classNames = ['search-input'];

    if (props.warning === 0) {
        classNames.push('input-warning')
    }

    return (        
        <div className={classNames.join(' ')}>
            <input type="text" autoFocus={true} placeholder={props.placeholder} onChange={props.change} value={props.searchPhrase} onFocus={handleFocus} />
        </div>
    )
}

export default Search