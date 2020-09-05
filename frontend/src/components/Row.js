import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, CardHeader
  } from 'reactstrap';
  
export default function PostRow(props) {
    const {post} = props

    if (post === undefined) {
        return null
    }
    return (
        <Col md="4" style={{paddingBottom: "10px"}}>
            <Card>
                <CardHeader>
                    <CardTitle><h5>{post.title}</h5></CardTitle>
                    <CardSubtitle>By: {post.poster.username}</CardSubtitle>
                </CardHeader>
                <CardBody>
                    <CardBody>
                        <CardText style={{textOverflow: 'ellipsis'}}>{post.content}</CardText>
                    </CardBody>
                </CardBody>
            </Card>
        </Col>
    )
}