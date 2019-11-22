import React from 'react'

const LoadingState = (props) => {

    return (
        <div className="blink">
            <h3>{props.loadingState}</h3>
        </div>
    )
}

export default LoadingState