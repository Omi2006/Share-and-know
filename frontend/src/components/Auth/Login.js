import React, { useState, useContext } from 'react'
import { fetchPost } from './fetchPost'
import LoggedInContext from '../General/LoggedInContext'
import {Alert} from 'reactstrap'

export default function Login() {

    const [username, updateUsername] = useState('');
    const [password, updatPassword] = useState('');
    const [message, setMessage] = useState({})
    const { handleLogin } = useContext(LoggedInContext);

    const handleFormSubmit = async event => {
        event.preventDefault();
        if (username.length <= 0 || password.length <= 0) {
            setMessage({type: 'danger', content: 'fill out all fields'})
            return false;
        };
        const result = await fetchPost('/knowledge/login', {username: username, password: password});
        if (result.errors !== undefined) {
            setMessage({type: 'danger', content: result.errors[Object.keys(result.errors)[0]]})
            return false;
        }
        localStorage.setItem('loggedIn', true);
        handleLogin(true);
    }

    return (
        <div style={{margin: "15px"}}>
            {message.content === undefined ? null : (<Alert color={message.type} toggle={() => setMessage({})}>{message.content}</Alert>)}
            <h2>Login</h2>
            <form style={{padding: "10px"}} onSubmit={handleFormSubmit}>
                <input required type="text" placeholder="Username" onChange={e => updateUsername(e.target.value)} value={username} className="form-control" name="username" aria-label="username"/>
                <input required type="password" placeholder="Password" onChange={e => updatPassword(e.target.value)} value={password} className="form-control" name="password" aria-label="password" style={{marginTop: "10px", marginBottom: "10px"}}/>
                <input type='submit' value='Login' aria-label='register' className='btn btn-primary'/>
            </form>
        </div>
    )
}
