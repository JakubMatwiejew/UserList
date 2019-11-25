import React from 'react';
import { Link } from 'react-router-dom'
import Button from '../UI-Elements/Button/Button';

const Nav = () => {
    return (
        <div>
            <h1>What do you want to fetch?</h1>
            <div className="nav-buttons">
            <Link className="first" to="/users">
                <Button text="Users" type="nav-button"/>
            </Link>
            <Link to="posts">
                <Button text="Posts" type="nav-button"/>
            </Link>
            </div>
        </div>
    )
}

export default Nav;