import React, { useEffect, useState } from 'react';
import {
    HashRouter as Router,
    Route,
    Routes,
    Outlet,
    Navigate,
} from 'react-router-dom';
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
                                <Route path="posts/:uuid" element={<Post />} />
                                <Route path="/hubs/:title*" element={<Hubs />}>
                                    <Route path="/" element={<Hub />} />
                                    <Route
                                        path="posts/:uuid"
                                        element={<Post />}
                                    />
                                    <Route
                                        path=":title*"
                                        element={
                                            <HubRoutes loggedIn={loggedIn} />
                                        }
                                    />
                                </Route>
                            </Routes>
                        </div>
                    </Sidebar>
                </ToggleLoggedinProvider>
            </LoggedinProvider>
        </Router>
    );
}

function Hubs() {
    return <Outlet />;
}

/*
Okay so you may be looking at this and wonder what the heck is he doing here, and 
since it's a bit complex I'll explain. What we do here is that we first render
the Hub Routes above. The HubRoutes include a Routes component and the specific 
routes we want. Now, this is made of the index, new post, specific post, and a sub route. 
When the path becomes from something like /hub/TITLE to /hub/TITLE/TITLE2,
Our HubRoutes render itself again with the new TITLE2 route as the main one. This is 
because of the :title* path we have. So this allows us to recursively nest hubs. But why 
does it work? In the v6 of react router, you only want an Outlet to render the chosen path.
So just exposing the new nested routes still works because the Outlet takes their place.
*/
function HubRoutes({ loggedIn }) {
    return (
        <>
            <Routes>
                <Route path="/" element={<Hub />} />
                <Route
                    path="posts/new"
                    element={loggedIn ? <PostForm /> : <Navigate to="/login" />}
                />
                <Route path="posts/:uuid" element={<Post />} />
                <Route
                    path=":title*"
                    element={<HubRoutes loggedIn={loggedIn} />}
                />
            </Routes>
        </>
    );
}
