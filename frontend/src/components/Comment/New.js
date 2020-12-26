import React, { useRef } from 'react';
import { fetchCsrf } from '../Auth';
import { Form, FormGroup } from 'reactstrap';
import { useForm } from 'react-hook-form';
import TextArea from 'react-autosize-textarea';
import toast from 'react-hot-toast';

export default function New({ setComments, post }) {
    const { register, handleSubmit, reset, errors } = useForm();
    const submitButton = useRef();

    const onSubmit = data => {
        //Disable button to prevent submitting twice
        submitButton.current.disabled = true;

        if (data.content.length < 1) {
            toast.error('You must fill out the comment!');
            submitButton.current.disabled = false;
            return;
        }
        const formData = {
            content: data.content,
            post: post,
        };
        const result = fetchCsrf('/knowledge/comment', formData, 'POST');
        //Check for server errors
        toast.promise(
            result,
            {
                loading: 'Loading...',
                error: err => {
                    submitButton.current.disabled = false;
                    return err.toString();
                },
                success: data => {
                    reset();
                    setComments(prevComments => [
                        data.comment,
                        ...prevComments,
                    ]);
                    submitButton.current.disabled = false;
                    return 'Comment created successfully!';
                },
            },
            {
                error: { duration: 2000 },
            }
        );
    };

    return (
        <div>
            {errors.content && (
                <p className="error-message">
                    {errors.content.type === 'required'
                        ? 'You must fill out the comment!'
                        : 'Comment must be under 257 characters!'}
                </p>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <TextArea
                        ref={register({
                            required: true,
                            validate: value => value.length < 257,
                        })}
                        placeholder="A valuable comment..."
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
