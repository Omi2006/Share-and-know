import React, { useState, useContext } from 'react'
import { fetchPost } from './fetchPost'
import { Redirect } from 'react-router-dom'
import LoggedInContext from './LoggedInContext'

export default function Login() {

    const [username, updateUsername] = useState('')
    const [password, updatPassword] = useState('')
    const { handleLogin } = useContext(LoggedInContext)

    const handleFormSubmit = event => {
        event.preventDefault()
        if (username.length <= 0 || password.length <= 0) {
            alert("Fill out all fields")
            return false
        }
        const result = fetchPost('/knowledge/login', {username: username, password: password})

        if (result.errors !== undefined) {
            console.log(result.errors)
            alert(result.errors.non_field_errors[0])
            return ;
        }
        localStorage.setItem('loggedIn', true)
        handleLogin(true)
    }

    return (
        <div style={{margin: "15px"}}>
            <h2>Login</h2>
            <form style={{padding: "10px"}} onSubmit={handleFormSubmit}>
                <input required type="text" placeholder="Username" onChange={e => updateUsername(e.target.value)} value={username} className="form-control" name="username" aria-label="username"/>
                <input required type="password" placeholder="Password" onChange={e => updatPassword(e.target.value)} value={password} className="form-control" name="password" aria-label="password" style={{marginTop: "10px", marginBottom: "10px"}}/>
                <input type='submit' value='Login' aria-label='register' className='btn btn-primary'/>
            </form>
        </div>
    )
}
