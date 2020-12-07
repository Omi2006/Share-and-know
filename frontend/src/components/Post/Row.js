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
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import '../../style/post.css';

export default function Row({ post }) {
    const navigate = useNavigate();
    const goToPost = () => navigate(`posts/${post.uuid}`);

    return (
        <Col md="12" style={{ marginBottom: '30px' }}>
            <Card className="hover-card" onClick={goToPost} title="See more">
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
                        <Link to={`/posts/${post.uuid}`} aria-label="see more">
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                            <span className="visually-hidden">See more</span>
                        </Link>
                    </p>
                    <CardText className="text-muted">{post.date}</CardText>
                </CardFooter>
            </Card>
        </Col>
    );
}
