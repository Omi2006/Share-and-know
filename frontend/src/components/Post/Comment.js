import React, { useContext, useRef, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, Button } from 'reactstrap';
import LoginContext from '../General/LoggedInContext';
import TextArea from 'react-autosize-textarea';
import Markdown from 'react-markdown';

import '../../style/post.css';
import { fetchCsrf } from '../Auth/fetchCsrf';

export default function Comment({ comment }) {
    const { loggedIn } = useContext(LoginContext);
    const editCommentContent = useRef();
    const [content, setContent] = useState(comment.content);
    const [editing, setEditing] = useState(false);

    const editComment = async () => {
        if (editCommentContent.current) {
            const { value } = editCommentContent.current;
            if (value.length > 256) {
                alert('Comment must be less than 256 characters long');
                return;
            }
            setContent(value);
            const result = await fetchCsrf(
                `/knowledge/comment/${comment.id}`,
                { content: value },
                'PUT'
            );
            if (result.errors) {
                alert(result.errors[Object.keys(result.errors)[0]]);
            }
        }
        setEditing(!editing);
    };
    return (
        <Card style={{ margin: '20px' }}>
            <CardHeader
                style={{
                    backgroundColor: 'rgb(203, 223, 230)',
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <h4>@{comment.commenter.username}</h4>
                    <CardText className="text-muted">{comment.date}</CardText>
                </div>
                {comment.commenter.username === loggedIn && (
                    <div>
                        {editing && (
                            <Button
                                color="danger"
                                size="sm"
                                outline
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            color="success"
                            size="sm"
                            style={{ marginLeft: '10px' }}
                            maxLength="256"
                            outline
                            disabled={
                                editCommentContent.current &&
                                editCommentContent.current.length < 1
                            }
                            onClick={() => editComment()}
                        >
                            {editing ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardBody style={{ backgroundColor: 'rgb(215, 245, 255)' }}>
                {editing ? (
                    <TextArea className="edit-comment" ref={editCommentContent}>
                        {content}
                    </TextArea>
                ) : (
                    <CardText tag="pre">
                        <Markdown>{content}</Markdown>
                    </CardText>
                )}
            </CardBody>
        </Card>
    );
}
