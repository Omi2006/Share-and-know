import React from 'react';
import Comment from './Comment';

export default function List(props) {
    return (
        <div>
            {props.comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />;
            })}
        </div>
    );
}
