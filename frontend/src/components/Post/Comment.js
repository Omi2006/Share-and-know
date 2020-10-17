import React from 'react'
import { Card, CardHeader, CardText, CardBody } from 'reactstrap'

export default function Comment({ comment }) {

    return (
        <Card style={{ margin: '20px' }}>
            <CardHeader style={{ backgroundColor: 'rgb(203, 223, 230)' }}><h4>@{comment.commenter.username}</h4></CardHeader>
            <CardBody style={{ backgroundColor: 'rgb(215, 245, 255)' }}><CardText>{comment.content}</CardText></CardBody>
        </Card>
    )    
}