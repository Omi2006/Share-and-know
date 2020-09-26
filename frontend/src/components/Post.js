import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Post(props) {
    const { uuid } = useParams()
    const [post, setPost] = useState({})
    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`knowledge/post?uuid=${uuid}`)
            const result = await response.json()
            setPost(result)
        }
        getPost()
    }, [uuid])
    return post.content === undefined ? null : (
        <div>
            <h4>{post.content}</h4>
        </div>
    )
}