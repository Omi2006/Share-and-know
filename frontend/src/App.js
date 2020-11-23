import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Sidebar from './components/General/Sidebar';
import Post from './components/Post/Post';
import PostForm from './components/Post/New';
import Home from './components/Home';
import Hub from './components/Hub/Hub';
import { LoggedinProvider } from './components/Auth/LoggedInContext';
import { ToggleLoggedinProvider } from './components/Auth/ToggleLoginContext';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(undefined);

    useEffect(() => {
        if (loggedIn !== undefined) return () => {};
        const getUser = async () => {
            const response = await fetch('/knowledge/login');
            const { user } = await response.json();
            setLoggedIn(user);
        };
        getUser();
    }, [loggedIn]);

    return (
        <Router>
            <LoggedinProvider value={loggedIn}>
                <ToggleLoggedinProvider value={setLoggedIn}>
                    <Sidebar>
                        <div className="App" style={{ marginTop: '65px' }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/register"
                                    element={loggedIn ? <Home /> : <Register />}
                                />
                                <Route
                                    path="/login"
                                    element={loggedIn ? <Home /> : <Login />}
                                />
                                <Route
                                    path="/new/post"
                                    element={
                                        loggedIn ? <PostForm /> : <Login />
                                    }
                                />
                                <Route path="/posts/:uuid" element={<Post />} />
                                <Route path="/hubs/:title" element={<Hub />} />
                            </Routes>
                        </div>
                    </Sidebar>
                </ToggleLoggedinProvider>
            </LoggedinProvider>
        </Router>
    );
}
