import React, { useState, useEffect } from 'react';
import { SidebarContent, usePrefersReducedMotion } from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';
import { useSpring } from 'react-spring';
import './../../style/navbar.css';

export default function Sidebar({ children }) {
    const [collapsed, setCollapsed] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const prefersReducedMotion = usePrefersReducedMotion();

    const content = useSpring({
        opacity: !collapsed ? 1 : 0,
        transform: !collapsed
            ? 'translate3D(0%, 0, 0)'
            : 'translate3D(-100%, 0, 0)',
        immediate: prefersReducedMotion,
    });

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

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
                    <span className="visually-hidden">Toggle sidebar</span>
                </button>
                <button
                    className="theme navnavicon"
                    style={{ padding: '0px ' }}
                    onClick={toggleTheme}
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
                onClick={!collapsed ? toggleSidebar : undefined}
            >
                {children}
            </div>
        </>
    );
}
