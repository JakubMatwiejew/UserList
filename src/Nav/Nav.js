import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <h1>What do you want to fetch?</h1>
            <div className="nav-buttons">
            <Link to="/users">
                <button style={{marginRight: "30px"}} className="button nav-button">Users</button>
            </Link>
            <Link to="posts">
                <button className="button nav-button">Posts</button>
            </Link>
            </div>
        </div>
    )
}

export default Nav;