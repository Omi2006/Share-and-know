import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
    CardHeader,
    CardBody,
    CardFooter,
    Col,
    CardSubtitle,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

export default function Row({ hub }) {
    const navigate = useNavigate();
    const goToHub = () => navigate(hub.title);

    return (
        <Col md="6" style={{ marginBottom: '30px' }}>
            <Card onClick={goToHub} title="Go to hub" className="hover-card">
                <CardHeader className="back-green">
                    <CardTitle>
                        <h5>{hub.title}</h5>
                    </CardTitle>
                    <CardSubtitle>
                        <p style={{ fontSize: '0.85em' }}>Made {hub.date}</p>
                    </CardSubtitle>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#a2ffaf' }}>
                    <CardText>{hub.description}</CardText>
                </CardBody>
                <CardFooter className="footer back-green">
                    <p className="card-link">
                        <Link to={`${hub.title}`} aria-label="see more">
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                            <span className="visually-hidden">See more</span>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </Col>
    );
}
