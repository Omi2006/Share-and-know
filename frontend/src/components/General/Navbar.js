import React, { useContext, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoggedInContext from './LoggedInContext'

import './../../style/navbar.css'

export default function Navigation() {
    const [collapsed, setCollapsed] = useState(true);
    const { handleLogin, loggedIn } = useContext(LoggedInContext)

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logout = () => {
        localStorage.setItem('loggedIn', false)
        handleLogin(false)
    }

    return (
        <Navbar color="gray" dark className='navbar'>
            <NavbarBrand className="mr-auto" href='/'>Share</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
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
  );
}