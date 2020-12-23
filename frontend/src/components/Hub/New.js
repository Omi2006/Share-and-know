import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import { fetchCsrf } from '../Auth';
import toast from 'react-hot-toast';

export default function NewHub() {
    const { register, errors, handleSubmit } = useForm();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onSubmit = data => {
        data.hubs = pathname.split('/');
        //replace spaces with dashes
        data.title = data.title.replace(/ /g, '-');
        const result = fetchCsrf('/knowledge/new/hub', data, 'POST');
        toast.promise(result, {
            loading: 'Loading...',
            error: err => err.toString(),
            success: info => {
                navigate(`/hubs/${info.full_path}`);
                return 'Hub created successfully!';
            },
        });
    };

    return (
        <div className="wrapper">
            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
                Make a new hub
            </h2>
            <h5 style={{ margin: '20px' }}>
                Create a new hub to share all sorts of things with others!
            </h5>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                style={{ textAlign: 'left' }}
            >
                <FormGroup>
                    <Label for="title">Hub name</Label>
                    <input
                        type="text"
                        id="title"
                        className="form-control input"
                        name="title"
                        placeholder="A nice name..."
                        ref={register({
                            required: true,
                            validate: {
                                length: value => value.length < 21,
                                name: value =>
                                    value.toLowerCase() !== 'new' &&
                                    value.toLowerCase() !== 'posts',
                            },
                        })}
                    />
                    {errors.title && (
                        <p className="error-message">
                            {errors.title.type === 'required'
                                ? 'You need to give the hub a name!'
                                : errors.title.type === 'length'
                                ? 'The hub name must be under 21 characters!'
                                : 'That hub name is not allowed!'}
                        </p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="description">The hub description</Label>
                    <input
                        type="text"
                        id="description"
                        className="form-control input"
                        name="description"
                        placeholder="An awesome description..."
                        ref={register({
                            required: true,
                            validate: value => value.length < 101,
                        })}
                    />
                    {errors.description && (
                        <p className="error-message">
                            {errors.description.type === 'required'
                                ? 'You need to give the hub a description!'
                                : 'The hub description must be under 101 characters!'}
                        </p>
                    )}
                </FormGroup>
                <input
                    type="submit"
                    value="New hub"
                    className="btn btn-primary"
                />
            </Form>
        </div>
    );
}
