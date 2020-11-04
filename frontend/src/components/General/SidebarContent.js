import React, { useContext } from 'react';
import LoggedInContext from './LoggedInContext';
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

export default function SidebarContent() {
    const { handleLogin, loggedIn } = useContext(LoggedInContext);

    const logout = async () => {
        const response = await fetch('/knowledge/logout');
        const result = await response.json();
        if (result.errors) {
            alert('An error has occured');
            return;
        }
        handleLogin(null);
    };

    return (
        <Nav vertical className="navnav">
            <h3>Share</h3>
            <hr />
            <NavItem>
                <Link to="/" className="nav-link navnavlink">
                    <FontAwesomeIcon icon={faHome} className="navnavitem" />
                    <p className="navnavtext">Home</p>
                </Link>
            </NavItem>
            {loggedIn ? (
                <>
                    <NavItem>
                        <Link to="/new/post" className="nav-link navnavlink">
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="navnavitem"
                            />
                            <p className="navnavtext">New post</p>
                        </Link>
                    </NavItem>
                    <NavItem>
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
                    <NavItem>
                        <Link to="/login" className="nav-link navnavlink">
                            <FontAwesomeIcon
                                icon={faSignInAlt}
                                className="navnavitem"
                            />
                            <p className="navnavtext">Login</p>
                        </Link>
                    </NavItem>
                    <NavItem>
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
