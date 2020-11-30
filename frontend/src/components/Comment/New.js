import React, { useState, useRef } from 'react';
import { fetchCsrf } from '../Auth/fetchCsrf';
import { Form, FormGroup, Label, UncontrolledAlert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import TextArea from 'react-autosize-textarea';

export default function New({ setComments, post }) {
    const { register, handleSubmit, reset, errors } = useForm();
    const [message, setMessage] = useState({});
    const submitButton = useRef();

    const toggleMessage = () => setMessage({});

    const onSubmit = async data => {
        //Disable button to prevent submitting twice
        submitButton.current.disabled = true;

        if (data.content.length < 1) {
            setMessage({
                type: 'danger',
                content: 'You must fill out the comment!',
            });
            submitButton.current.disabled = false;
            return;
        }
        const formData = {
            content: data.content,
            post: post,
        };
        const result = await fetchCsrf('/knowledge/comment', formData, 'POST');
        //Check for server errors
        if (result.errors) {
            setMessage({
                type: 'danger',
                content: result.errors[Object.keys(result.errors)[0]],
            });
        } else {
            setMessage({
                type: 'success',
                content: 'Comment posted successfully.',
            });
            reset();
        }
        submitButton.current.disabled = false;
        //Add comment to comment lists
        try {
            setComments(prevComments => [result.comment, ...prevComments]);
        } catch (error) {
            alert(
                'Something went wrong in showing your comment. It should show when you reload though.'
            );
        }
    };

    return (
        <div>
            {message.content && (
                <UncontrolledAlert color={message.type} toggle={toggleMessage}>
                    {message.content}
                </UncontrolledAlert>
            )}
            {errors.content && (
                <UncontrolledAlert color="danger">
                    {errors.content.type === 'required'
                        ? 'You must fill out the comment!'
                        : 'Comment must be under 257 characters!'}
                </UncontrolledAlert>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="content">Content</Label>
                    <TextArea
                        ref={register({
                            required: true,
                            validate: value => value.length < 257,
                        })}
                        placeholder="A valuable comment..."
                        id="content"
                        name="content"
                        aria-label="Comment content"
                        className="form-control"
                    />
                </FormGroup>
                <input
                    type="submit"
                    value="Share your comment"
                    className="btn btn-primary"
                    ref={submitButton}
                />
            </Form>
        </div>
    );
}
