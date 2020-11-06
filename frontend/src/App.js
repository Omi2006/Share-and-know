import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Sidebar from './components/General/Navbar';
import Footer from './components/General/Footer';
import Post from './components/Post/Post';
import PostForm from './components/Post/New';
import Home from './components/Home';
import { LoginProvider } from './components/General/LoggedInContext';
import Category from './components/Category';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch('/knowledge/login');
            const { user } = await response.json();
            setLoggedIn(user);
        };
        getUser();
    }, [loggedIn]);

    return (
        <Router>
            <LoginProvider
                value={{ loggedIn: loggedIn, handleLogin: setLoggedIn }}
            >
                <Sidebar>
                    <div className="App" style={{ marginTop: '65px' }}>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/register"
                            exact
                            component={() =>
                                loggedIn ? <Redirect to="/" /> : <Register />
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
                        <Route
                            path="/category/:name"
                            exact
                            component={Category}
                        />
                        <Footer />
                    </div>
                </Sidebar>
            </LoginProvider>
        </Router>
    );
}
