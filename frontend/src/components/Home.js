import React, { useEffect, useState } from 'react';
import PostList from './Post/List';
import { Spinner } from 'reactstrap';
import Pagination from './Pagination';

export default function Home() {
    const [posts, setPosts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [numRange, setNumRange] = useState([]);

    //get the posts for a page
    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(`knowledge/posts?page=${currentPage}`);
            const result = await response.json();
            setPosts(result);
        };
        getPosts();
    }, [currentPage]);

    //generate the pagination number ranges
    useEffect(() => {
        //If posts is undefined, don't run this part
        if (!posts.results) {
            return () => {};
        }
        //Change the numrange when the posts change
        const newRange = [1, currentPage, posts.total];
        setNumRange([...new Set(newRange)]);
    }, [posts, currentPage]);

    return !posts.results ? (
        <Spinner color="primary" />
    ) : (
        <div>
            <h3 style={{ textAlign: 'center' }}>Home</h3>
            <PostList posts={posts} />
            <Pagination
                currentPage={currentPage}
                numRange={numRange}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
