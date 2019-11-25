import React from 'react'

const Button = (props) => {

    const classNames = ['button'];

    if (props.type) {
        classNames.push(props.type)
    }

    return (
        <button className={classNames.join(' ')} onClick={props.clicked}>{props.text}</button>
    )
}

export default Button