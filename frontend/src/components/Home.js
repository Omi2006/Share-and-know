import React, { useEffect, useState } from 'react'
import PostList from './Post/List'
import Pagination from './Pagination'

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
        }
        getPosts();
    }, [currentPage])

    //generate the pagination number ranges
    useEffect(() => {
        //If posts is undefined, don't run this part
        if (posts.results === undefined) {
            return () => {};
        };
        let range = [1];
        for (let i = 0; i < 4; i++) {
            //If smaller than 2, we wanna choose the biggest to prevent negatives and if smaller, prevent overboarding by choosing the smallest one
            i < 2 ? range.push(Math.max(1, currentPage + (i - 2))) : range.push(Math.min(posts.total, currentPage + (i - 2)));
        };
        range.push(posts.total);
        //Remove repeated numbers
        range = [... new Set(range)];
        setNumRange(range);
    }, [posts, currentPage])

    return posts.results === undefined ? null : (
        <div>
            <h3>Home</h3>
            <PostList posts={posts} />
            <Pagination currentPage={currentPage} numRange={numRange} setCurrentPage={setCurrentPage} />
        </div>
    )

}