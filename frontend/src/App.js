import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Sidebar from './components/General/Navbar';
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
                            <Route path="/" exact component={Home} />
                            <Route
                                path="/register"
                                exact
                                component={() =>
                                    loggedIn ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Register />
                                    )
                                }
                            />
                            <Route
                                path="/login"
                                exact
                                component={() =>
                                    loggedIn ? <Redirect to="/" /> : <Login />
                                }
                            />
                            <Route
                                path="/new/post"
                                exact
                                component={() =>
                                    loggedIn ? (
                                        <PostForm />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                }
                            />
                            <Route path="/posts/:uuid" exact component={Post} />
                            <Route path="/hubs/:title" exact component={Hub} />
                        </div>
                    </Sidebar>
                </ToggleLoggedinProvider>
            </LoggedinProvider>
        </Router>
    );
}
