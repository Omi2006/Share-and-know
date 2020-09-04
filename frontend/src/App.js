import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import Register from "./components/Register";
import Login from './components/Login';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import PostForm from './components/PostForm'
import Home from './components/Home'


export default function App(){

	return(
		<Router>
			<Navbar />
			<div className='App'>
				<Route path='/' exact component={Home} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				<Route path='/new/post' exact component={PostForm} />
				<Footer />
			</div>
		</Router>
	)

}
