import React from 'react'
import Row from './Row'
import { CardDeck } from 'reactstrap'

export default function PostList(props) {

    return (
        <CardDeck style={{ padding: '10px', width: '100%' }}>
            {props.posts.results.map(post => {
                return <Row post={post} key={post.id.toString()} />
            })}
        </CardDeck>
    )
}