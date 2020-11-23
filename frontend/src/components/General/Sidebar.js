import React, { useState, useEffect } from 'react';
import SidebarContent from './SidebarContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';

import './../../style/navbar.css';
import { useSpring } from 'react-spring';

export default function Sidebar({ children }) {
    const [collapsed, setCollapsed] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const content = useSpring({
        opacity: !collapsed ? 1 : 0,
        transform: !collapsed ? 'translateX(0%)' : 'translateX(-110%)',
    });

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            <div className="navnavbar">
                <button
                    style={{ padding: '0px ' }}
                    onClick={toggleSidebar}
                    className="navnavicon"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button
                    className="theme navnavicon"
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
            <SidebarContent toggleSidebar={toggleSidebar} style={content} />
            <div
                style={{ filter: !collapsed && 'blur(5px)' }}
                onClick={!collapsed ? toggleSidebar : () => {}}
            >
                {children}
            </div>
        </>
    );
}
