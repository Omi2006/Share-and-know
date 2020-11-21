import React, { useContext } from 'react';
import LoggedInContext from '../Auth/LoggedInContext';
import { Nav, NavItem } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faPlus,
    faSignInAlt,
    faSignOutAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import ToggleLoggedinContext from '../Auth/ToggleLoginContext';
import { animated } from 'react-spring';
import '../../style/navbar.css';

const AnimatedNav = animated(Nav);

export default function SidebarContent({ toggleSidebar, style }) {
    const loggedIn = useContext(LoggedInContext);
    const handleLogin = useContext(ToggleLoggedinContext);
    const { push } = useHistory();

    const logout = async () => {
        const response = await fetch('/knowledge/logout');
        const result = await response.json();
        if (result.errors) {
            alert('An error has occured');
            return;
        }
        alert('Logged out successfully!');
        handleLogin(null);
        toggleSidebar();
    };

    const navigate = route => {
        push(route);
        toggleSidebar();
    };

    //Generate the routes based on whether the user is logged in or not
    const routes = [
        {
            onClick: () => navigate('/'),
            icon: faHome,
            name: 'Home',
        },
    ];
    loggedIn
        ? routes.push(
              {
                  onClick: () => navigate('/new/post'),
                  icon: faPlus,
                  name: 'New post',
              },
              {
                  onClick: logout,
                  icon: faSignOutAlt,
                  name: 'Logout',
              }
          )
        : routes.push(
              {
                  onClick: () => navigate('/login'),
                  icon: faSignInAlt,
                  name: 'Login',
              },
              {
                  onClick: () => navigate('/register'),
                  icon: faUser,
                  name: 'Register',
              }
          );

    return (
        <AnimatedNav vertical style={style} className="navnav">
            <h3>Share</h3>
            <hr />
            {routes.map(route => (
                <NavItem key={route.name}>
                    <button
                        onClick={route.onClick}
                        className="navnavbutton navnavlink"
                    >
                        <FontAwesomeIcon
                            icon={route.icon}
                            className="navnavitem"
                        />
                        <p className="navnavtext">{route.name}</p>
                    </button>
                </NavItem>
            ))}
        </AnimatedNav>
    );
}
