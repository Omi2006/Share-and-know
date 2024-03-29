import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    Navigate,
} from 'react-router-dom';
import {
    Register,
    Login,
    LoggedInProvider,
    ToggleLoggedInProvider,
} from './components/Auth';
import { Sidebar } from './components/General';
import { Toaster } from 'react-hot-toast';
import { Post, NewPost, JoinedPosts } from './components/Post';
import { Hub, HubPath, NewHub } from './components/Hub';
import { UserList, UserProfile } from './components/User';
import { Home } from './components/Home';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(undefined);

    useEffect(() => {
        //Get the current logged in user
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
            <Toaster />
            <LoggedInProvider value={loggedIn}>
                <ToggleLoggedInProvider value={setLoggedIn}>
                    <Sidebar>
                        <div className="App">
                            <HubPath />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/joined"
                                    element={
                                        loggedIn ? <JoinedPosts /> : <Login />
                                    }
                                />
                                <Route path="/users" element={<UserList />} />
                                <Route
                                    path="/users/:username"
                                    element={<UserProfile />}
                                />
                                <Route
                                    path="/register"
                                    element={
                                        loggedIn ? (
                                            <Navigate to="/" />
                                        ) : (
                                            <Register />
                                        )
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        loggedIn ? (
                                            <Navigate to="/" />
                                        ) : (
                                            <Login />
                                        )
                                    }
                                />
                                <Route path="posts/:uuid" element={<Post />} />
                                <Route path="/hubs/:title*" element={<Hubs />}>
                                    <Route path="/" element={<Hub />} />
                                    <Route
                                        path="posts/:uuid"
                                        element={<Post />}
                                    />
                                    <Route
                                        path="new"
                                        element={
                                            loggedIn ? <NewHub /> : <Login />
                                        }
                                    />
                                    <Route
                                        path=":title*"
                                        element={
                                            <HubRoutes loggedIn={loggedIn} />
                                        }
                                    />
                                </Route>
                                <Route path="*">
                                    <h3>This page couldn't be found :(</h3>
                                </Route>
                            </Routes>
                        </div>
                    </Sidebar>
                </ToggleLoggedInProvider>
            </LoggedInProvider>
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
                    element={loggedIn ? <NewPost /> : <Login />}
                />
                <Route path="posts/:uuid" element={<Post />} />
                <Route path="new" element={loggedIn ? <NewHub /> : <Login />} />
                <Route
                    path=":title*"
                    element={<HubRoutes loggedIn={loggedIn} />}
                />
            </Routes>
        </>
    );
}
