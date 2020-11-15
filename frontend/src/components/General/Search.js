import React from 'react';
import { useForm } from 'react-hook-form';
import '../../style/auth.css';
import { Form, Label } from 'reactstrap';

export default function Search({ setSearch, type }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        setSearch(data.search);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Label for="search">Find specific {type}</Label>
            <input
                className="form-control"
                placeholder="What do you want to search for?..."
                type="text"
                name="search"
                id="search"
                ref={register}
            />
            <input className="btn btn-primary" value="Search" type="submit" />
        </Form>
    );
}
