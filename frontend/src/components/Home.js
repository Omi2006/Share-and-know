import React, { useEffect, useState } from 'react';
import PostList from './Post/List';
import { Input, Spinner } from 'reactstrap';
import Pagination from './Pagination';

export default function Home() {
    const [posts, setPosts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [numRange, setNumRange] = useState([]);
    const [sortBy, setSortBy] = useState({ value: '-date' });

    //get the posts for a page

    useEffect(() => {
        setPosts({});
        const getPosts = async () => {
            const response = await fetch(
                `knowledge/posts?page=${currentPage}&sort=${sortBy.value}`
            );
            const result = await response.json();
            setPosts(result);
        };
        getPosts();
    }, [currentPage, sortBy]);

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
            <Input
                type="select"
                value={sortBy.value}
                style={{
                    marginLeft: '14px',
                    width: '130px',
                    backgroundColor: '#2edbff',
                }}
                onChange={e => setSortBy({ value: e.target.value })}
            >
                <option value="-date">Newest</option>
                <option value="date">Oldest</option>
                <option value="-likes">Most liked</option>
                <option value="likes">Least liked</option>
            </Input>
            <PostList posts={posts} />
            <Pagination
                currentPage={currentPage}
                numRange={numRange}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
