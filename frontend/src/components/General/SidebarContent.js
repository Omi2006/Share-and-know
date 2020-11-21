import React, { useContext } from 'react';
import LoggedInContext from '../Auth/LoggedInContext';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../../style/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faPlus,
    faSignInAlt,
    faSignOutAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import ToggleLoggedinContext from '../Auth/ToggleLoginContext';

export default function SidebarContent({ toggleNavbar }) {
    const loggedIn = useContext(LoggedInContext);
    const handleLogin = useContext(ToggleLoggedinContext);

    const logout = async () => {
        const response = await fetch('/knowledge/logout');
        const result = await response.json();
        if (result.errors) {
            alert('An error has occured');
            return;
        }
        alert('Logged out successfully!');
        handleLogin(null);
    };

    return (
        <Nav vertical className="navnav">
            <h3>Share</h3>
            <hr />
            <NavItem onClick={toggleNavbar}>
                <Link to="/" className="nav-link navnavlink">
                    <FontAwesomeIcon icon={faHome} className="navnavitem" />
                    <p className="navnavtext">Home</p>
                </Link>
            </NavItem>
            {loggedIn ? (
                <>
                    <NavItem onClick={toggleNavbar}>
                        <Link to="/new/post" className="nav-link navnavlink">
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="navnavitem"
                            />
                            <p className="navnavtext">New post</p>
                        </Link>
                    </NavItem>
                    <NavItem onClick={toggleNavbar}>
                        <button
                            onClick={logout}
                            className="navnavbutton navnavlink"
                            style={{ margin: '0px', width: '140.547px' }}
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className="navnavitem"
                            />
                            <p className="navnavtext">Logout</p>
                        </button>
                    </NavItem>
                </>
            ) : (
                <>
                    <NavItem onClick={toggleNavbar}>
                        <Link to="/login" className="nav-link navnavlink">
                            <FontAwesomeIcon
                                icon={faSignInAlt}
                                className="navnavitem"
                            />
                            <p className="navnavtext">Login</p>
                        </Link>
                    </NavItem>
                    <NavItem onClick={toggleNavbar}>
                        <Link to="/register" className="nav-link navnavlink">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="navnavitem"
                            />
                            <p className="navnavtext">Register</p>
                        </Link>
                    </NavItem>
                </>
            )}
        </Nav>
    );
}
