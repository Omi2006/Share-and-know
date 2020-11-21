import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Badge, Spinner } from 'reactstrap';
import Markdown from 'react-markdown';
import CommentList from '../Comment/List';
import CommentForm from '../Comment/New';
import LoggedInContext from '../Auth/LoggedInContext';
import LikeButton from './Like';

import '../../style/post.css';

export default function Post() {
    const { uuid } = useParams();
    const [post, setPost] = useState({});
    const [likes, setLikes] = useState();
    const [comments, setComments] = useState(post.comments);
    const loggedIn = useContext(LoggedInContext);

    useEffect(() => {
        //get the post and set the comments
        const getPost = async () => {
            const response = await fetch(`knowledge/post/${uuid}`);
            const result = await response.json();
            setPost(result);
            setLikes(result.likes);
            setComments(result.comments);
        };
        getPost();
    }, [uuid]);

    return !post.content ? (
        !post.error ? (
            <Spinner color="primary" />
        ) : (
            <h2>This post couldn't be found</h2>
        )
    ) : (
        <div style={{ padding: '25px' }}>
            <div>
                <h4>{post.poster.username}</h4>
                <Link
                    to={{
                        pathname: `/hubs/${post.hub.title}`,
                        state: { hub: post.hub },
                    }}
                >
                    <Badge color="primary">{post.hub.title}</Badge>
                </Link>
                {likes && (
                    <LikeButton
                        setLikes={setLikes}
                        likes={likes}
                        uuid={post.uuid}
                    />
                )}
                <footer style={{ fontSize: '12px' }}>{post.date}</footer>
                <h2 id="post-title">{post.title}</h2>
            </div>
            <hr />
            <div style={{ maxWidth: '1024px', margin: 'auto' }}>
                <div id="post-div">
                    <Markdown>{post.content}</Markdown>
                </div>
                <hr />
                {loggedIn ? (
                    <CommentForm post={post.id} setComments={setComments} />
                ) : (
                    <Alert color="danger">
                        You must be logged in to comment!
                    </Alert>
                )}
                <hr />
                {comments && <CommentList comments={comments} />}
            </div>
        </div>
    );
}
