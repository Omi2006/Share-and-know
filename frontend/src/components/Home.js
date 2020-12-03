import React, { useEffect, useState } from 'react';
import { PostList } from './Post';
import { Spinner } from 'reactstrap';
import { Dropdown } from './General';
import Paginate from './Pagination';

export default function Home() {
    const [posts, setPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(['-date', 'Newest']);

    //get the posts for a page

    useEffect(() => {
        setPosts({});
        const getPosts = async () => {
            const response = await fetch(
                `knowledge/hub/items/1?page=${currentPage}&sort=${sortBy[0]}&type=posts&search=`
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
        <div style={{ overflow: 'hidden' }}>
            <h3 style={{ textAlign: 'center' }}>Home</h3>
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
