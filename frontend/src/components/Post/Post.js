import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../style/post.css'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import LoggedInContext from '../General/LoggedInContext'
import { Alert } from 'reactstrap'

export default function Post() {
    const { uuid } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState(post.comments)
    const { loggedIn } = useContext(LoggedInContext);
    useEffect(() => {
        //get the post and set the comments
        const getPost = async () => {
            const response = await fetch(`knowledge/post?uuid=${uuid}`);
            const result = await response.json();
            setPost(result);
            setComments(result.comments);
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
            {loggedIn ? <CommentForm post={post.id} setComments={setComments}/> : <Alert color='danger'>You must be logged in to comment!</Alert>}
            <hr />
            {comments ? <CommentList comments={comments}/> : null}
        </div>
    )
}