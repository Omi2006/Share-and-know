import React from 'react';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Col,
    CardHeader,
    CardFooter,
    Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import '../../style/post.css';

export default function Row({ post }) {
    return !post ? (
        <Spinner color="primary" />
    ) : (
        <Col md="4" style={{ marginBottom: '30px' }}>
            <Card style={{ margin: '0px' }}>
                <CardHeader style={{ backgroundColor: '#68d8ee' }}>
                    <CardTitle>
                        <h5>{post.title}</h5>
                    </CardTitle>
                    <CardSubtitle>By: {post.poster.username}</CardSubtitle>
                </CardHeader>
                <CardBody className="back-blue">
                    <CardText className="post-content">{post.content}</CardText>
                </CardBody>
                <CardFooter className="footer back-blue">
                    <p className="card-link">
                        <Link to={`/posts/${post.uuid}`}>See more</Link>
                    </p>
                    <CardText className="text-muted">{post.date}</CardText>
                </CardFooter>
            </Card>
        </Col>
    );
}
