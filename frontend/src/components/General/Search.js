import React from 'react';
import { useForm } from 'react-hook-form';
import '../../style/auth.css';
import { Form, Label } from 'reactstrap';

export default function Search({ setSearch, type, setCurrentPage }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        setSearch(data.search);
        //Set the current page to avoid errors if the pages count is less than the current page
        setCurrentPage(1);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '20px 2rem', paddingBottom: '0px' }}
        >
            <Label for="search">Find specific {type}</Label>
            <input
                className="form-control"
                placeholder="What do you want to search for?"
                type="text"
                name="search"
                id="search"
                ref={register}
                style={{ marginBottom: '15px' }}
            />
            <input className="btn btn-primary" value="Search" type="submit" />
        </Form>
    );
}
