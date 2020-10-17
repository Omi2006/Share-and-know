import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../style/post.css'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default function Post() {
    const { uuid } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`knowledge/post?uuid=${uuid}`);
            const result = await response.json();
            console.log(result)
            setPost(result);
        }
        getPost();
    }, [uuid])
    return post.content === undefined ? null : (
        <div style={{padding: '10px'}}>
            <div>
                <h6>{post.poster.username}</h6>
                <footer style={{fontSize: '12px'}} className='text-muted'>{post.date}</footer>
                <h2 id='posttitle'>{post.title}</h2>
            </div>
            <hr />
            <div id='postdiv'>
                {post.content}
            </div>
            <hr />
            <CommentForm post={post.id}/>
            <hr />
            <CommentList comments={post.comments}/>
        </div>
    )
}