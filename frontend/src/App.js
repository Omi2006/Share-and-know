import React, {useState} from 'react';
import { HashRouter as Router , Redirect, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import Register from "./components/Register";
import Login from './components/Login';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Post from './components/Post'
import PostForm from './components/PostForm'
import Home from './components/Home'
import { LoginProvider } from './components/LoggedInContext';

export default function App(){

	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'))

	return(
		<Router>
			<LoginProvider value={{loggedIn: loggedIn, handleLogin: setLoggedIn}}>
				<Navbar/>
				<div className='App'>
					<Route path='/' exact component={Home} />
					<Route path='/register' exact component={() => loggedIn ? <Redirect to='/' /> : <Register/>} />
					<Route path='/login' exact component={() => loggedIn ? <Redirect to='/' /> : <Login/>} />
					<Route path='/new/post' exact component={() => loggedIn ? <PostForm/> : <Redirect to='/login'/>} />
					<Route path='/posts/:uuid' exact component={Post} />
					<Footer />
				</div>
			</LoginProvider>
		</Router>
	)

}
