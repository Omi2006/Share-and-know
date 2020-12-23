import React, { useContext } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArchway,
    faHome,
    faSignInAlt,
    faSignOutAlt,
    faUser,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ToggleLoggedInContext, LoggedInContext } from '../Auth';
import { animated } from 'react-spring';
import toast from 'react-hot-toast';
import '../../style/navbar.css';

const AnimatedNav = animated(Nav);

export default function SidebarContent({ toggleSidebar, style }) {
    const loggedIn = useContext(LoggedInContext);
    const handleLogin = useContext(ToggleLoggedInContext);
    const navigate = useNavigate();

    const logout = async () => {
        const response = await fetch('/knowledge/logout');
        const result = response.json();
        toast.promise(result, {
            loading: 'Loading...',
            error: err => err.toString(),
            success: () => {
                handleLogin(null);
                toggleSidebar();
                return 'Logged out successfully!';
            },
        });
    };

    const goToRoute = route => {
        navigate(route);
        toggleSidebar();
    };

    //Generate the routes based on whether the user is logged in or not
    const routes = [
        {
            onClick: () => goToRoute('/'),
            icon: faHome,
            name: 'Home',
        },
        {
            onClick: () => goToRoute('/users'),
            name: 'Users',
            icon: faUsers,
        },
    ];
    loggedIn
        ? routes.push(
              {
                  onClick: () => goToRoute('/joined'),
                  icon: faArchway,
                  name: 'Your hubs',
              },
              {
                  onClick: logout,
                  icon: faSignOutAlt,
                  name: 'Logout',
              }
          )
        : routes.push(
              {
                  onClick: () => goToRoute('/login'),
                  icon: faSignInAlt,
                  name: 'Login',
              },
              {
                  onClick: () => goToRoute('/register'),
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
