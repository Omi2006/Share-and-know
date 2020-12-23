import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, Form, Label } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCsrf } from '../Auth';
import TextArea from 'react-autosize-textarea';
import toast from 'react-hot-toast';

export default function PostForm() {
    const submitButton = useRef();
    const { register, handleSubmit, errors } = useForm();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onSubmit = data => {
        if (!submitButton.current) {
            return;
        }
        submitButton.current.disabled = true;
        data.hubs = pathname.split('/');
        const result = fetchCsrf('/knowledge/new/post', data, 'POST');
        //Check for server errors
        toast.promise(result, {
            loading: 'Loading...',
            error: err => {
                submitButton.current.disabled = false;
                return err.toString();
            },
            success: info => {
                //Solve hanging loading toast
                submitButton.current.disabled = false;
                navigate(`/hubs/${info.hub_path}/posts/${info.uuid}`);
                return 'Post created successfully!';
            },
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>New post</h3>
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
