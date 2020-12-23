import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToggleLoggedInContext, fetchCsrf } from './';
import { Col, Row } from 'reactstrap';
import toast from 'react-hot-toast';

import ShareImage from '../../images/undraw_share_online_r87b.svg';
import '../../style/auth.css';

export default function Register() {
    const { handleSubmit, errors, register, getValues } = useForm();
    const handleLogin = useContext(ToggleLoggedInContext);
    const submitButton = useRef();

    const onSubmit = data => {
        if (!submitButton.current) {
            return;
        }
        submitButton.current.disabled = true;
        if (
            data.username.length <= 0 ||
            data.password.length <= 0 ||
            data.confirm.length <= 0 ||
            data.email.length <= 0
        ) {
            submitButton.current.disabled = false;
            toast.error('Fill out all fields!', { duration: 1000 });
            return false;
        } else if (data.password !== data.confirm) {
            submitButton.current.disabled = false;
            toast.error('Password and confirm fields must match!', {
                duration: 1000,
            });
            return false;
        }
        const result = fetchCsrf('/knowledge/register', data, 'POST');
        toast.dismiss();
        toast.promise(
            result,
            {
                loading: 'Loading...',
                error: err => {
                    submitButton.current.disabled = false;
                    return err.toString();
                },
                success: info => {
                    submitButton.current.disabled = false;
                    handleLogin(info.username);
                    return 'Account created successfully!';
                },
            },
            {
                error: { duration: 2000 },
            }
        );
    };

    return (
        <Row style={{ margin: '15px' }}>
            <Col md="12">
                <h4>Welcome! Register to interact with other users.</h4>
                <img
                    src={ShareImage}
                    alt="Share online"
                    style={{ width: '40vw', padding: '20px' }}
                />
            </Col>
            <Col md="12">
                <form
                    style={{
                        padding: '10px',
                        margin: 'auto',
                        maxWidth: '320px',
                    }}
                    onSubmit={handleSubmit(onSubmit)}
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
                        type="email"
                        placeholder="Email"
                        className="form-control input"
                        name="email"
                        aria-label="email"
                        ref={register({ required: true })}
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {errors.email && (
                        <p className="error-message">
                            Remember to fill out the email!
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control input"
                        name="password"
                        aria-label="password"
                        ref={register({
                            required: true,
                            validate: value => value === getValues().confirm,
                        })}
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {errors.password && (
                        <p className="error-message">
                            {errors.password.type === 'required'
                                ? 'Remember to fill out the password!'
                                : 'Password and confirm fields must match!'}
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="form-control input"
                        name="confirm"
                        ref={register({ required: true })}
                        aria-label="confirm"
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {errors.confirm && (
                        <p className="error-message">
                            Remember to fill out the confirm password!
                        </p>
                    )}

                    <input
                        type="submit"
                        value="Register"
                        aria-label="register"
                        ref={submitButton}
                        className="btn btn-primary"
                    />
                </form>
            </Col>
        </Row>
    );
}
