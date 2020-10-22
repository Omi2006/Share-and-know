import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormGroup, Form, Label, Alert, FormText } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { fetchPost } from '../Auth/fetchPost'

export default function PostForm() {
    const [redirect, setRedirect] = useState(false);
    const submitButton = useRef();
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState({});

    const onSubmit = async data => {
        submitButton.current.disabled = true;
        const result = await fetchPost('/knowledge/new/post', data);
        //Check for server errors
        if (result.errors) {
            submitButton.current.disabled = false;
            setMessage({type: 'danger', content: result.errors[Object.keys(result.errors)[0]]});
            return false;
        };
        submitButton.current.disabled = true;
        setRedirect(true);
    }

    return redirect ? <Redirect to='/' /> : (
        <div>
            {message.content === undefined ? null : (<Alert color={message.type} toggle={() => setMessage({})}>{message.content}</Alert>)}
            <Form style={{margin: '10px'}} method='POST' onSubmit={handleSubmit(onSubmit)}>
                <h6>In here you make a new post. The content will be rendered using markdown. <a href='https://www.markdowntutorial.com/' target='_blank' rel="noopener noreferrer">What is markdown and how to use it.</a></h6>
                <FormGroup>
                    <Label for='title'>Title: </Label>
                    <input 
                        type='text' 
                        aria-label='title' 
                        name='title' 
                        id='title' 
                        placeholder='Title...' 
                        className='form-control'
                        ref={register({ required: true })} 
                    />
                    {errors.title && <p style={{ color: '#bf1650'}}>⚠ You must provide a title!</p>}
                </FormGroup>
                <FormGroup>
                    <Label for='content'>Content: </Label>
                    <textarea
                        type='text' 
                        aria-label='content' 
                        name='content' 
                        id='content' 
                        className='form-control'
                        placeholder='Some good content...' 
                        ref={register({ required: true })} 
                        rows={20} 
                        maxLength="2050"
                    />
                    <FormText>Tip: you can drag the right lower edge of the input box to make it bigger or smaller.</FormText>
                    {errors.content && <p style={{ color: '#bf1650'}}>⚠ You must provide some content!</p>}
                </FormGroup>
                <input type='submit' value='Register' className='btn btn-primary' ref={submitButton} />
            </Form>
        </div>
    )
}