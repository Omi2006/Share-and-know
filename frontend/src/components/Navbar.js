import React, { useState, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../style/navbar.css'

export default function Navbar() {

    const [navClass, updateNavClass] = useState('topnav');
    const { pathname } = useLocation();
    
    useLayoutEffect(() => {
        updateNavClass('topnav responsive');
    }, [])

    const toggleNav = () => {
        updateNavClass(navClass === 'topnav' ? 'topnav responsive': 'topnav');
    }

    return (
        <div className={navClass} >
            <Link exact to='/' className={pathname === '/' ? 'active' : ''}>Home</Link>
            <Link exact to='/register'className={pathname === '/register' ? 'active' : ''}>Register</Link>
            <Link exact to='/login' className={pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link exact to='/new/post' className={pathname === '/new/post' ? 'active' : ''}>New Post</Link>
            <FontAwesomeIcon icon={faBars} className='icon' onClick={toggleNav}/>
        </div>
    )

}