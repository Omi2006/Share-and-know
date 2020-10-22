import React from 'react'
import {
    Card, 
    CardText, 
    CardBody, 
    CardTitle, 
    CardSubtitle, 
    Col, 
    CardHeader, 
    CardFooter
  } from 'reactstrap';
import { Link } from 'react-router-dom'

import '../../style/post.css'

export default function Row(props) {
    const { post } = props;

    return !post ? null : (
        <Col md="4" style={{paddingBottom: "10px"}}>
            <Card style={{margin: '0px'}}>
                <CardHeader style={{ backgroundColor: '#68d8ee' }}>
                    <CardTitle><h5>{post.title}</h5></CardTitle>
                    <CardSubtitle>By: {post.poster.username}</CardSubtitle>
                </CardHeader>
                <CardBody className='back-blue'>
                    <CardText className='post-content'>{post.content}</CardText>
                </CardBody>
                <CardFooter className='footer back-blue'>
                    <p className='card-link'><Link to={`posts/${post.uuid}`}>See more</Link></p>
                    <CardText>{post.date}</CardText>
                </CardFooter>
            </Card>
        </Col>
    )
}