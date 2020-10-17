import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LoggedInContext from './LoggedInContext'
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons'

import './../../style/navbar.css'

export default function Navigation() {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const [collapsed, setCollapsed] = useState(false);
    const { handleLogin, loggedIn } = useContext(LoggedInContext);
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logout = () => {
        localStorage.setItem('loggedIn', false)
        handleLogin(false)
    }

    return (
        <section className='sidebar' style={{backgroundColor: collapsed ? '' : 'orange'}}>
            <Navbar expand='lg' color='faded' dark className='navnavbar'>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <NavbarBrand href='#' className='mr-auto'>Share</NavbarBrand>
                <Collapse isOpen={!collapsed} navbar style={{ alignItems: 'flex-start' }}>
                    <Nav navbar vertical>
                        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='theme'/>
                        {loggedIn ? (
                            <div>
                                <NavItem>
                                    <NavLink><Link to='/new/post'>New post</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link onClick={() => logout()}>Logout</Link></NavLink>
                                </NavItem>
                            </div>
                        ) : (
                            <div>
                                <NavItem>
                                    <NavLink><Link to='/register'>Register</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to='/login'>Login</Link></NavLink>
                                </NavItem>
                            </div>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </section>
  );
}