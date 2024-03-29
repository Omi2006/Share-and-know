import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge, Spinner } from 'reactstrap';
import { CommentList, NewComment } from '../Comment';
import { LoggedInContext } from '../Auth';
import { LikeButton } from './';
import Identicon from 'react-identicons';
import Markdown from 'react-markdown';
import '../../style/post.css';

export default function Post() {
    const { uuid } = useParams();
    const [post, setPost] = useState({});
    const [likes, setLikes] = useState();
    const [comments, setComments] = useState([]);
    const loggedIn = useContext(LoggedInContext);

    useEffect(() => {
        //get the post and set the comments
        const getPost = async () => {
            const response = await fetch(`/knowledge/post/${uuid}`);
            const result = await response.json();
            setPost(result);
            setLikes(result.likes);
            setComments(result.comments);
        };
        getPost();
    }, [uuid]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    return !post.content ? (
        !post.error ? (
            <Spinner color="primary" />
        ) : (
            <h2>This post couldn't be found</h2>
        )
    ) : (
        <div style={{ padding: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                    to={`/users/${post.poster}`}
                    className="discrete-link"
                    style={{
                        display: 'inline-flex',
                        marginBottom: '10px',
                        width: 'min-content',
                    }}
                >
                    <Identicon size="33" string={post.poster} />
                    <h3 style={{ marginLeft: '10px' }}>{post.poster}</h3>
                </Link>
                <Link
                    to={`/hubs/${post.hub.full_path}`}
                    style={{ width: 'min-content' }}
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
                <h1 id="post-title">{post.title}</h1>
            </div>
            <hr />
            <div className="wrapper">
                <div id="post-div">
                    <Markdown>{post.content}</Markdown>
                </div>
                <hr />
                {loggedIn ? (
                    <NewComment post={post.id} setComments={setComments} />
                ) : (
                    <h2 className="error-message">
                        You must be logged in to comment!
                    </h2>
                )}
                {comments && comments.length > 0 ? (
                    <CommentList comments={comments} />
                ) : (
                    <h3 color="info">There are no comments here!</h3>
                )}
            </div>
        </div>
    );
}
