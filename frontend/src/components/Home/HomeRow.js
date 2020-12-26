import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
    CardHeader,
    CardBody,
    CardFooter,
    CardSubtitle,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

export default function Row({ hub }) {
    const navigate = useNavigate();
    const goToHub = () => navigate(`/hubs/${hub.title}`);

    return (
        <Card
            onClick={goToHub}
            title="Go to hub"
            className="hover-card"
            style={{
                marginLeft: '15px',
                boxShadow: `3px 5px 6px ${hub.color}`,
            }}
        >
            <CardHeader className="back-green">
                <CardTitle>
                    <h5>{hub.title.replace(/-/g, ' ')}</h5>
                </CardTitle>
                <CardSubtitle>
                    <p style={{ fontSize: '0.85em' }}>Made at the beginning</p>
                </CardSubtitle>
            </CardHeader>
            <CardBody style={{ backgroundColor: '#a2ffaf' }}>
                <CardText>
                    For all things related to {hub.title.replace(/-/g, ' ')}
                </CardText>
            </CardBody>
            <CardFooter className="footer back-green">
                <p className="card-link">
                    <Link to={`/hubs/${hub.title}`} aria-label="see more">
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                        <span className="visually-hidden">See more</span>
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
