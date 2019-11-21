import React from 'react'
import './ListElement.css'

const ListElement = (props) => {

    return (
        <div className="list-element">
            <p>{props.index}.</p>
            <p>{props.name}</p>
        </div>
    )
}

export default ListElement