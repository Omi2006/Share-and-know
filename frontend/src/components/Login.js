import React, {useState} from 'react'

function Login() {

    const [username, updateUsername] = useState('')
    const [password, updatPassword] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        if (username.length <= 0 || password.length <= 0) {
            alert("Fill out all fields")
            return false
        }
        const response = await fetch('knowledge/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await response.json()
        if (result.errors !== undefined) {
            alert(result.errors.non_field_errors[0])
        }
        localStorage.setItem('token', result.token)
    };

    return(
        <div style={{margin: "15px"}}>
            <h2>Login</h2>
            <form style={{padding: "10px"}}>
                <input required type="text" placeholder="Username" onChange={e => updateUsername(e.target.value)} value={username} className="form-control" name="username" aria-label="username"/>
                <input required type="password" placeholder="Password" onChange={e => updatPassword(e.target.value)} value={password} className="form-control" name="password" aria-label="password" style={{marginTop: "10px", marginBottom: "10px"}}/>
                <button onClick={handleFormSubmit} className="btn btn-primary" aria-label="Login" type="button">Login</button>
            </form>
        </div>
    )
}

export default Login
