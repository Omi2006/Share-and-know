import React from 'react'
import Row from './Row'
import { CardDeck } from 'reactstrap'

export default function PostList(props) {

    const posts = props.posts.results.map(post => {
        return <Row post={post} key={post.id.toString()} />
    })

    return (
        <CardDeck style={{justifyContent: 'center', padding: '30px', width: '100%'}}>
            {posts}
        </CardDeck>
    )
}