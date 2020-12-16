import React, { useEffect, useState } from 'react';
import { PostList } from './';
import { Spinner } from 'reactstrap';
import { Dropdown } from '../General';
import Paginate from '../Pagination';

export default function JoinedHubs() {
    const [posts, setPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(['-date', 'Newest']);

    //get the posts for a page

    useEffect(() => {
        setPosts({});
        const getPosts = async () => {
            const response = await fetch(
                `/knowledge/hub/items/1?page=${currentPage}&sort=${sortBy[0]}&type=posts&search=&filter=true`
            );
            const result = await response.json();
            setPosts(result);
        };
        getPosts();
    }, [currentPage, sortBy]);

    const options = [
        ['-date', 'Newest'],
        ['date', 'Oldest'],
        ['-likes', 'Most Liked'],
        ['likes', 'Least liked'],
    ];

    return posts === null ? (
        <Spinner color="primary" />
    ) : (
        <div style={{ overflow: 'hidden' }} className="wrapper">
            <h3 style={{ textAlign: 'center' }}>
                Posts from hubs you belong to
            </h3>
            <Dropdown
                options={options}
                setSortBy={setSortBy}
                selected={sortBy[1]}
            />
            {posts.results ? (
                <>
                    <PostList posts={posts.results} />
                    <Paginate
                        currentPage={currentPage}
                        last={posts.total}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            ) : (
                <Spinner color="primary" />
            )}
        </div>
    );
}
