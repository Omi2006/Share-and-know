import React, { useState, useContext, useRef } from 'react';
import { fetchCsrf } from './fetchCsrf';
import { Link } from 'react-router-dom';
import { Alert, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import '../../style/auth.css';
import loginImage from '../../images/undraw_Login_re_4vu2.svg';
import ToggleLoggedinContext from './ToggleLoginContext';

export default function Login() {
    const [message, setMessage] = useState({});
    const submitInput = useRef();
    const { register, errors, handleSubmit } = useForm();
    const handleLogin = useContext(ToggleLoggedinContext);

    const toggleMessage = () => setMessage({});

    const onSubmit = async data => {
        submitInput.current.disabled = true;
        if (data.username.length <= 0 || data.password.length <= 0) {
            setMessage({ type: 'danger', content: 'Fill out all fields!' });
            submitInput.current.disabled = false;
            return false;
        }
        const result = await fetchCsrf('/knowledge/login', data, 'POST');
        if (result.errors) {
            setMessage({
                type: 'danger',
                content: result.errors[Object.keys(result.errors)[0]],
            });
            submitInput.current.disabled = false;
            return false;
        }
        submitInput.current.disabled = false;
        handleLogin(result.username);
    };

    return (
        <Row style={{ margin: '15px', height: '100%' }}>
            <Col md="12">
                <h4>
                    Welcome back! Login to start interacting with other users
                </h4>
                <img
                    src={loginImage}
                    alt="login"
                    style={{ width: '50vw', padding: '20px' }}
                />
            </Col>
            <Col md="12">
                {message.content && (
                    <Alert color={message.type} toggle={toggleMessage}>
                        {message.content}
                    </Alert>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        margin: 'auto',
                        maxWidth: '320px',
                        minWidth: '0px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        ref={register({ required: true })}
                        className="form-control input"
                        name="username"
                        aria-label="username"
                    />
                    {errors.username && (
                        <p className="error-message">
                            Remember to fill out the username!
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        ref={register({ required: true })}
                        className="form-control input"
                        name="password"
                        aria-label="password"
                    />
                    {errors.password && (
                        <p className="error-message">
                            Remember to fill out the password!
                        </p>
                    )}
                    <input
                        type="submit"
                        value="Login"
                        ref={submitInput}
                        aria-label="login"
                        className="btn btn-primary"
                    />
                    <footer>
                        <small>
                            Don't have an account? Register{' '}
                            <Link to="/register">here</Link>
                        </small>
                    </footer>
                </form>
            </Col>
        </Row>
    );
}
