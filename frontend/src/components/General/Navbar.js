import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';
import SideBarContent from './SideBarContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';

import './../../style/navbar.css';

export default function SidebarNav(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <Sidebar
            sidebar={<SideBarContent />}
            open={!collapsed}
            onSetOpen={toggleNavbar}
            styles={{
                sidebar: { backgroundColor: '#0bf1c0', zIndex: '101' },
                overlay: { backgroundColor: 'rgb(0, 0, 0, 0.13)' },
            }}
        >
            <div className="navnavbar">
                <button
                    style={{ padding: '0px ' }}
                    onClick={() => setCollapsed(false)}
                    className="navnavbutton"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button
                    className="theme navnavbutton"
                    style={{ padding: '0px ' }}
                    onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                >
                    <FontAwesomeIcon
                        className="theme"
                        icon={theme === 'dark' ? faSun : faMoon}
                    />
                </button>
            </div>
            {props.children}
        </Sidebar>
    );
}
