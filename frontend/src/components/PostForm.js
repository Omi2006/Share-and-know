import React, {useState} from 'react'
import {FormGroup, Form, Input, Label} from 'reactstrap'
import { Redirect } from 'react-router-dom';
import { fetchPost } from './fetchPost'

export default function PostForm() {
    const [formData, setFormData] = useState({content: '', attached: '', title: ''});
    const [redirect, setRedirect] = useState(false)

    const handleInputChange = event => {
        const {id, value} = event.target;
        setFormData(oldForm => ({...oldForm, [id]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = fetchPost('/knowledge/new/post', formData)
        setRedirect(true)
        
    }
    return redirect ? <Redirect to='/' /> : (
        
        <Form style={{margin: '10px'}} method='POST' onSubmit={handleSubmit}>
            <h6>In here you make a new post. The content will be rendered using markdown. <a href='https://www.markdowntutorial.com/' target='_blank' rel="noopener noreferrer">What is markdown and how to use it.</a></h6>
            <FormGroup>
                <Label for='title'>Title: </Label>
                <Input type='text' aria-label='title' id='title' placeholder='Title' onChange={handleInputChange} className='form-control' required/>
            </FormGroup>
            <FormGroup>
                <Label for='content'>Content: </Label>
                <textarea type='text' aria-label='content' id='content' placeholder='Some good content' onChange={handleInputChange} className='form-control' rows={20} maxLength="2050" required></textarea>
            </FormGroup>
            <input type='submit' value='Create Post' />
        </Form>
    )
}