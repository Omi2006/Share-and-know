import React from 'react'
import Comment from './Comment'

export default function CommentList(props) {

    return (
        <div>
            {props.comments.map((comment, index) => {
                return <Comment key={index} comment={comment}/>
            })}
        </div>
    )
}