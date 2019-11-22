import React from 'react'
import './ListElement.css'

const ListElement = (props) => {

    const classNames = ['list-element'];

    if (props.filtered) {
        classNames.push('is-filtered')
    }

    return (
        <div className={classNames.join(' ')}>
            <p>{props.index}.</p>
            <p>{props.name}</p>
        </div>
    )
}

export default ListElement