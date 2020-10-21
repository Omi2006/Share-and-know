import React, { useState, useContext, useRef } from 'react'
import { fetchPost } from './fetchPost'
import LoggedInContext from '../General/LoggedInContext'
import { UncontrolledAlert } from 'reactstrap'
import { useForm } from 'react-hook-form'

export default function Login() {

    const [message, setMessage] = useState({});
    const submitInput = useRef();
    const { register, errors, handleSubmit } = useForm();
    const { handleLogin } = useContext(LoggedInContext);

    const onSubmit = async data => {
        submitInput.current.disabled = true;
        if (data.username.length <= 0 || data.password.length <= 0) {
            setMessage({type: 'danger', content: 'Fill out all fields!'});
            submitInput.current.disabled = false;
            return false;
        };
        const result = await fetchPost('/knowledge/login', data);
        if (result.errors !== undefined) {
            setMessage({type: 'danger', content: result.errors[Object.keys(result.errors)[0]]});
            submitInput.current.disabled = false
            return false;
        }
        localStorage.setItem('loggedIn', result.user);
        submitInput.current.disabled = false;
        handleLogin(true);
    }

    return (
        <div style={{margin: "15px"}}>
            {message.content === undefined ? null : <UncontrolledAlert color={message.type} toggle={() => setMessage({})}>{message.content}</UncontrolledAlert>}
            <h2>Login</h2>
            <form style={{padding: "10px"}} onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    ref={register({ required: true })} 
                    className="form-control" 
                    name="username" 
                    aria-label="username"
                />
                {errors.username && <p style={{ color: '#bf1650'}}>⚠ Remember to fill out the username!</p>}
                <input 
                    type="password" 
                    placeholder="Password" 
                    ref={register({ required: true })} 
                    className="form-control" 
                    name="password" 
                    aria-label="password" 
                    style={{marginTop: "10px", marginBottom: "10px"}}
                />
                {errors.password && <p style={{ color: '#bf1650'}}>⚠ Remember to fill out the password!</p>}
                <input type='submit' value='Login' ref={submitInput} aria-label='register' className='btn btn-primary'/>
            </form>
        </div>
    )
}
