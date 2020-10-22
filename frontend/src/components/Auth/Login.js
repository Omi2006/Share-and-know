import React, { useState, useContext, useRef } from 'react'
import { fetchPost } from './fetchPost'
import { Link } from 'react-router-dom'
import LoggedInContext from '../General/LoggedInContext'
import { UncontrolledAlert, Row, Col } from 'reactstrap'
import { useForm } from 'react-hook-form'
import '../../style/auth.css'
import loginImage from '../../images/undraw_Login_re_4vu2.svg'

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
        if (result.errors) {
            setMessage({type: 'danger', content: result.errors[Object.keys(result.errors)[0]]});
            submitInput.current.disabled = false
            return false;
        }
        submitInput.current.disabled = false;
        localStorage.setItem('loggedIn', true);
        handleLogin(true);
    }

    return (
        <Row style={{margin: "15px", height: '100%' }}>
            <Col md='12'>
                <h4>Welcome back! Login to start interacting with other users</h4>
                <img src={loginImage} alt='login' style={{ width: '50vw', padding: '20px' }}/>
            </Col>
            <Col md='12'>
                {message.content === undefined ? null : <UncontrolledAlert color={message.type} toggle={() => setMessage({})}>{message.content}</UncontrolledAlert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        ref={register({ required: true })} 
                        className="form-control input" 
                        name="username" 
                        aria-label="username"
                    />
                    {errors.username && <p className='error-message'>Remember to fill out the username!</p>}
                    <input 
                        type="password" 
                        placeholder="Password" 
                        ref={register({ required: true })} 
                        className="form-control input" 
                        name="password" 
                        aria-label="password" 
                    />
                    {errors.password && <p className='error-message'>Remember to fill out the password!</p>}
                    <input type='submit' value='Login' ref={submitInput} aria-label='register' className='btn btn-primary'/>
                    <footer><small>Don't have an account? Register <Link to='/register'>here</Link></small></footer>
                </form>
            </Col>
        </Row>
    )
}
