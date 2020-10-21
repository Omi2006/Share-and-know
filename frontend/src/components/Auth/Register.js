import React, { useContext, useState } from 'react'
import { fetchPost } from './fetchPost'
import { useForm } from 'react-hook-form'
import LoggedInContext from '../General/LoggedInContext'
import { UncontrolledAlert } from 'reactstrap'

export default function Register() {

    const { handleSubmit, errors, register, watch } = useForm();
    const { handleLogin } = useContext(LoggedInContext);
    const [message, setMessage] = useState({});

    const onSubmit = async data => {
        if (data.username.length <= 0 || data.password.length <= 0 || data.confirm.length <= 0 || data.email.length <= 0) {
            setMessage({type: 'danger', content: 'Fill out all fields!'});
            return false;
        }
        else if (data.password !== data.confirm) {
            setMessage({type: 'danger', content: 'Password and confirm fields must match!'});
            return false;
        }
        const result = await fetchPost('/knowledge/register', data);
        if (result.errors !== undefined) {
            setMessage({type: 'danger', content: result.errors[Object.keys(result.errors)[0]]});
            return false;
        }
        localStorage.setItem('loggedIn', result.username);
        handleLogin(true);
    }

    return (
        <div style={{margin: '15px'}}>
            {message.content === undefined ? null : (<UncontrolledAlert color={message.type} toggle={() => setMessage({})}>{message.content}</UncontrolledAlert>)}
            {errors.password && 
                <UncontrolledAlert color='danger'>
                    {errors.password.type === 'required' ? 'You must fill out the password!' : 'Password and confirm fields must match!'}
                </UncontrolledAlert>}
            <h2>Register</h2>
            <form style={{padding: '10px'}} onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type='text' 
                    placeholder='Username' 
                    ref={register({ required: true })} 
                    className='form-control' 
                    name='username' 
                    aria-label='username'
                />
                {errors.username && <p style={{ color: '#bf1650'}}>⚠ Remember to fill out the username!</p>}
                <input type='email' 
                    placeholder='Email' 
                    className='form-control' 
                    name='email' 
                    aria-label='email' 
                    ref={register({ required: true })}
                    style={{marginTop: '10px', marginBottom: '10px'}}
                />
                {errors.email && <p style={{ color: '#bf1650'}}>⚠ Remember to fill out the email!</p>}
                <input 
                    type='password' 
                    placeholder='Password' 
                    className='form-control' 
                    name='password' 
                    aria-label='password' 
                    ref={register({ required: true, validate: value => value === watch('confirm') })}
                    style={{marginTop: '10px', marginBottom: '10px'}}
                />
                {errors.password && <p>{errors.password.type === 'required' ? '⚠ Remember to fill out the username!' : '⚠ Password and confirm fields must match!'}</p> }
                <input 
                    type='password' 
                    placeholder='Confirm password' 
                    className='form-control' 
                    name='confirm' 
                    ref={register({ required: true })}
                    aria-label='confirm' 
                    style={{marginTop: '10px', marginBottom: '10px'}}
                />
                {errors.confirm && <p style={{ color: '#bf1650'}}>⚠ Remember to fill out the confirm password!</p>}

                <input type='submit' value='Register' aria-label='register' className='btn btn-primary'/>
            </form>
        </div>
    )
    
}