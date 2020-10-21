import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar'
import SideBarContent from './SideBarContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons'

import './../../style/navbar.css'

export default function SidebarNav(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (
        <Sidebar
            sidebar={<SideBarContent />} 
            open={!collapsed}
            onSetOpen={toggleNavbar}
            styles={{ sidebar: {backgroundColor: 'orange', zIndex: '101' } }}
        >
            <div className='navnavbar'>
                <FontAwesomeIcon 
                    onClick={() => setCollapsed(false)} 
                    icon={faBars} 
                    focusable
                    aria-hidden='false'
                    style={{ 'cursor': 'pointer' }}/>
                <FontAwesomeIcon 
                    className='theme'
                    icon={theme === 'dark' ? faSun : faMoon} 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
            </div>
            {props.children}
        </Sidebar>
  );
}