import React from 'react'
import Row from './Row'
import { CardDeck } from 'reactstrap'

export default function PostList(props) {

    return (
        <CardDeck style={{justifyContent: 'center'}}>
            {props.posts.results.map((post, i) => {
                return <Row post={post} key={i} />
            })}
        </CardDeck>
    )
}