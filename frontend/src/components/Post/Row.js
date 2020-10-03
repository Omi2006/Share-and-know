import React from 'react'
import {
    Card, 
    CardText, 
    CardBody, 
    CardLink,
    CardTitle, 
    CardSubtitle, 
    Col, 
    CardHeader, 
    CardFooter
  } from 'reactstrap';
import { Link } from 'react-router-dom'

export default function Row(props) {
    const { post } = props;

    return post === undefined ? null : (
        <Col md="4" style={{paddingBottom: "10px"}}>
            <Card>
                <CardHeader>
                    <CardTitle><h5>{post.title}</h5></CardTitle>
                    <CardSubtitle>By: {post.poster.username}</CardSubtitle>
                </CardHeader>
                <CardBody style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    <CardText>{post.content}</CardText>
                </CardBody>
                <CardFooter style={{justifyContent: 'space-between', display: 'inline-flex'}}>
                    <CardLink><Link to={`posts/${post.uuid}`}>See more</Link></CardLink>
                    <CardText>{post.date}</CardText>
                </CardFooter>
            </Card>
        </Col>
    )
}