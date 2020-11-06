import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import PostList from './Post/List';

export default function Category() {
    const [category, setCategory] = useState({});
    const { name } = useParams();

    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch(`knowledge/category/${name}`);
            const result = await response.json();
            console.log(result);
            setCategory(result);
        };
        getCategory();
    }, [name]);

    return !category.name ? (
        <Spinner color="primary" />
    ) : (
        <PostList posts={category.posts} />
    );
}
