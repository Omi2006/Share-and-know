import React, { useContext, useState } from 'react'
import { fetchPost } from './fetchPost'
import { Redirect } from 'react-router-dom'
import LoggedInContext from '../General/LoggedInContext'

export default function Register() {
    const [formData, setFormData] = useState({username: '', password: '', confirm: '', email: ''})
    const { handleLogin } = useContext(LoggedInContext)

    const handleFormSubmit = async event => {
        event.preventDefault();
        if (formData.username.length <= 0 || formData.password.length <= 0 || formData.confirm.length <= 0 || formData.email.length <= 0) {
            alert('Fill out all fields');
            return false;
        }
        else if (formData.password !== formData.confirm) {
            alert('Password and confirm must match.');
            return false;
        }
        const result = await fetchPost('/knowledge/register', formData);
        if (result.errors !== undefined) {
            alert(result.errors.non_field_errors[0]);
            return false;
        }
        localStorage.setItem('loggedIn', true);
        handleLogin(true);
    }

    const handleInputChange = event => {
        event.preventDefault();
        const {name} = event.target;
        const {value} = event.target;
        setFormData(oldFormData => ({...oldFormData, [name]: value}));
    }

    return (
        <div style={{margin: '15px'}}>
            <h2>Register</h2>
            <form style={{padding: '10px'}} onSubmit={handleFormSubmit}>
                <input required type='text' placeholder='Username' onChange={handleInputChange} value={formData.username} className='form-control' name='username' aria-label='username'/>
                <input required type='email' placeholder='Email' onChange={handleInputChange} value={formData.email} className='form-control' name='email' aria-label='email' style={{marginTop: '10px', marginBottom: '10px'}}/>
                <input required type='password' placeholder='Password' onChange={handleInputChange} value={formData.password} className='form-control' name='password' aria-label='password' style={{marginTop: '10px', marginBottom: '10px'}}/>
                <input required type='password' placeholder='Confirm password' onChange={handleInputChange} value={formData.confirm} className='form-control' name='confirm' aria-label='confirm' style={{marginTop: '10px', marginBottom: '10px'}}/>

                <input type='submit' value='Register' aria-label='register' className='btn btn-primary'/>
            </form>
        </div>
    )
    
}