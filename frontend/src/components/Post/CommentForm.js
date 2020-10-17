import React, { useState, useRef } from 'react';
import {fetchPost} from '../Auth/fetchPost';
import { Form, FormGroup, Label, UncontrolledAlert, Alert, FormText } from 'reactstrap';
import { useForm } from 'react-hook-form';

export default function CommentForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState({});
    const submitButton = useRef();

    const onSubmit = async data => {
        submitButton.current.disabled = true;

        if (data.content.length < 1) {
            setMessage({type: 'danger', content: 'You must fill out the comment!'});
            submitButton.current.disabled = false;
            return ;
        }
        const formData = {
            'content': data.content,
            'post': props.post,
        };
        const result = await fetchPost('/knowledge/new/comment', formData);
        if (result.errors === undefined) {
            setMessage({type: 'success', content: 'Comment posted successfully.'});
        }
        else {
            setMessage({type: 'danger', content: result.errors[Object.keys(result.errors)[0]]});
        }
        submitButton.current.disabled = false;
    }

    return (
        <div>
            {message.content === undefined ? null : (<Alert color={message.type} toggle={() => setMessage({})}>{message.content}</Alert>)}
            {errors.content && <UncontrolledAlert color='danger'>You must fill out the comment!</UncontrolledAlert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for='content'>Content</Label>
                    <textarea ref={register({ required: true })} placeholder='A valuable comment...' id='content' name='content' aria-label='Comment content' className='form-control' />
                    <FormText>Tip: you can drag the right lower edge of the input box to make it bigger or smaller.</FormText>
                </FormGroup>
                <input type='submit' value='Share your comment' className='btn btn-primary' ref={submitButton}/>
            </Form>
        </div>
    )
}