import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, Form, Label, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { fetchCsrf } from '../Auth/fetchCsrf';
import TextArea from 'react-autosize-textarea';

export default function PostForm() {
    const submitButton = useRef();
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState({});
    const { push } = useHistory();

    const onSubmit = async data => {
        submitButton.current.disabled = true;
        const result = await fetchCsrf('/knowledge/new/post', data, 'POST');
        //Check for server errors
        if (result.errors) {
            submitButton.current.disabled = false;
            setMessage({
                type: 'danger',
                content: result.errors[Object.keys(result.errors)[0]],
            });
            return false;
        }
        submitButton.current.disabled = true;
        push('/');
    };

    return (
        <div>
            {message.content && (
                <Alert color={message.type} toggle={() => setMessage({})}>
                    {message.content}
                </Alert>
            )}
            <Form
                style={{ margin: '10px' }}
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h6>
                    In here you make a new post. The content will be rendered
                    using markdown.{' '}
                    <a
                        href="https://www.markdowntutorial.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        What is markdown and how to use it.
                    </a>
                </h6>
                <FormGroup>
                    <Label for="title">Title: </Label>
                    <input
                        type="text"
                        aria-label="title"
                        name="title"
                        id="title"
                        placeholder="Title..."
                        className="form-control"
                        ref={register({
                            required: true,
                            validate: value => value.length < 65,
                        })}
                    />
                    {errors.title && (
                        <p className="error-message">
                            {errors.title.type === 'required'
                                ? 'You must provide a title!'
                                : 'Title must be 64 characters at most!'}
                        </p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="content">Content: </Label>
                    <TextArea
                        type="text"
                        aria-label="content"
                        name="content"
                        id="content"
                        className="form-control"
                        placeholder="Some good content..."
                        ref={register({ required: true })}
                        rows={20}
                        maxLength="2050"
                    />
                    {errors.content && (
                        <p className="error-message">
                            You must provide some content!
                        </p>
                    )}
                </FormGroup>
                <input
                    type="submit"
                    value="Create post"
                    className="btn btn-primary"
                    ref={submitButton}
                />
            </Form>
        </div>
    );
}
