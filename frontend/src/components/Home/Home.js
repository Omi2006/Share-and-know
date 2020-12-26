import React from 'react';
import { CardDeck, Col, Row } from 'reactstrap';
import { HomeRow } from './';

export default function Home() {
    const hubs = [
        {
            title: 'Technology',
            color: '#9b9bf7',
        },
        {
            title: 'History',
            color: '#e6aeae',
        },
        {
            title: 'Math',
            color: 'yellow',
        },
        {
            title: 'Geography',
            color: 'brown',
        },
        {
            title: 'Science',
            color: 'green',
        },
        {
            title: 'Art',
            color: 'Orange',
        },
        {
            title: 'Fun',
            color: 'pink',
        },
        {
            title: 'Other-stuff',
            color: 'purple',
        },
    ];

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>
                Welcome! Choose any of the hubs to start sharing!
            </h2>
            <CardDeck className="big-wrapper deck">
                <Row>
                    {hubs.map(hub => (
                        <Col
                            md="6"
                            style={{
                                padding: 0,
                                marginBottom: '15px',
                            }}
                            key={hub.id}
                        >
                            <HomeRow hub={hub} />
                        </Col>
                    ))}
                </Row>
            </CardDeck>
        </div>
    );
}
