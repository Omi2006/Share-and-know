import React, { useEffect, useState } from 'react'
import PostRow from './Row'
import { CardDeck } from 'reactstrap'

export default function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('/knowledge/posts')
            const result = await response.json()
            setPosts(result)
        }
        getPosts()
    }, [])

    return (
        <div>
            <CardDeck>
                {posts.map((post, i) => {
                    return <PostRow post={post} key={i} />
                })}
            </CardDeck>
        </div>
    )
}