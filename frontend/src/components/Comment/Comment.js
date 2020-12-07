import React, { useContext, useRef, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faSave,
    faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { fetchCsrf } from '../Auth';
import TextArea from 'react-autosize-textarea';
import Markdown from 'react-markdown';
import LoggedinContext from '../Auth/LoggedInContext';
import '../../style/post.css';

export default function Comment({ comment }) {
    const loggedIn = useContext(LoggedinContext);
    const editCommentContent = useRef();
    const [content, setContent] = useState(comment.content);
    const [editing, setEditing] = useState(false);

    const toggleEditing = () => setEditing(!editing);

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
        toggleEditing();
    };
    return (
        <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
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
                                style={{ fontSize: '0.9rem' }}
                                outline
                                title="Cancel"
                                onClick={toggleEditing}
                            >
                                <span className="visually-hidden">cancel</span>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </Button>
                        )}
                        <Button
                            color={editing ? 'success' : 'primary'}
                            style={{ marginLeft: '10px', fontSize: '0.9rem' }}
                            outline
                            title={editing ? 'Save' : 'Edit'}
                            disabled={
                                editCommentContent.current &&
                                editCommentContent.current.length < 1
                            }
                            onClick={editComment}
                        >
                            <span className="visually-hidden">
                                {editing ? 'save' : 'edit'}
                            </span>
                            <FontAwesomeIcon icon={editing ? faSave : faEdit} />
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardBody style={{ backgroundColor: 'rgb(215, 245, 255)' }}>
                {editing ? (
                    <TextArea
                        className="edit-comment"
                        ref={editCommentContent}
                        maxLength="256"
                    >
                        {content}
                    </TextArea>
                ) : (
                    <Markdown
                        style={{
                            whiteSpcae: 'preWrap',
                            marginTop: '0px',
                            marginBottom: '1rem',
                        }}
                    >
                        {content}
                    </Markdown>
                )}
            </CardBody>
        </Card>
    );
}
