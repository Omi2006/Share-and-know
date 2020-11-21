import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
    CardHeader,
    CardBody,
    CardSubtitle,
} from 'reactstrap';

export default function Row({ hub }) {
    return (
        <Card>
            <CardHeader style={{ backgroundColor: '#91ffa0' }}>
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
        </Card>
    );
}
