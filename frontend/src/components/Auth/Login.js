import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ToggleLoggedInContext, fetchCsrf } from './';
import toast from 'react-hot-toast';
import loginImage from '../../images/undraw_Login_re_4vu2.svg';
import '../../style/auth.css';

export default function Login() {
    const submitInput = useRef();
    const { register, errors, handleSubmit } = useForm();
    const handleLogin = useContext(ToggleLoggedInContext);

    const onSubmit = data => {
        if (submitInput.current === null) {
            return;
        }
        submitInput.current.disabled = true;
        if (data.username.length <= 0 || data.password.length <= 0) {
            toast.error('Fill out all fields!', { duration: 1000 });
            submitInput.current.disabled = false;
            return false;
        }
        const result = fetchCsrf('/knowledge/login', data, 'POST');
        toast.dismiss();
        toast.promise(
            result,
            {
                loading: 'Loading...',
                error: err => {
                    submitInput.current.disabled = false;
                    return err.toString();
                },
                success: info => {
                    submitInput.current.disabled = false;
                    handleLogin(info.username);
                    return 'Logged in successfully!';
                },
            },
            {
                error: { duration: 2000 },
            }
        );
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
