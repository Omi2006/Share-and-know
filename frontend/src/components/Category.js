import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import PostList from './Post/List';

import '../style/category.css';
import Paginate from './Pagination';
import Search from './General/Search';
import Dropdown from './General/Dropdown';

export default function Category() {
    const [category, setCategory] = useState(useLocation().state?.id);
    const [sortBy, setSortBy] = useState(['-date', 'Newest']);
    const [items, setItems] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState('posts');
    const [search, setSearch] = useState('');
    const { title } = useParams();

    useEffect(() => {
        if (category) return () => {};
        const getCategory = async () => {
            const response = await fetch(`knowledge/category/details/${title}`);
            const result = await response.json();
            setCategory(result.id);
        };
        getCategory();
    }, [title]);

    //Get items for given category and skip if category isn't ready
    useEffect(() => {
        setItems({});
        if (!category) return () => {};
        const getItems = async () => {
            const response = await fetch(
                `knowledge/category/items/${category}?sort=${sortBy[0]}&page=${currentPage}&type=${type}&search=${search}`
            );
            const result = await response.json();
            setItems(result);
        };
        getItems();
    }, [category, currentPage, type, search, sortBy]);

    const options = [
        ['-date', 'Newest'],
        ['date', 'Oldest'],
        ['-likes', 'Most Liked'],
        ['likes', 'Least liked'],
    ];

    return !category ? (
        <Spinner color="primary" />
    ) : (
        <div style={{ overflow: 'hidden' }}>
            <h3 style={{ textAlign: 'center' }}>
                {type.charAt(0).toUpperCase() + type.slice(1)} in category{' '}
                <span className="category-name">{title}</span>
            </h3>
            <Button
                color="primary"
                onClick={() =>
                    setType(type === 'posts' ? 'categories' : 'posts')
                }
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
            <Search setSearch={setSearch} type={type} />
            <Dropdown
                options={options}
                setSortBy={setSortBy}
                selected={sortBy[1]}
            />
            {items.results ? (
                type === 'posts' && (
                    <>
                        <PostList posts={items.results} />
                        <Paginate
                            currentPage={currentPage}
                            last={items.total}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )
            ) : (
                <Spinner color="primary" />
            )}
        </div>
    );
}
