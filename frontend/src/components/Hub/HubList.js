import React from 'react';
import { animated, useSprings } from 'react-spring';
import { CardDeck, Spinner } from 'reactstrap';
import { usePrefersReducedMotion } from '../General';
import { Row } from './';

export default function HubList({ hubs, isLoading }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const springs = useSprings(
        hubs.length,
        hubs.map(hub => ({
            from: {
                transform: 'translate3D(0,100px,0)',
            },
            to: {
                transform: 'translate3D(0,0,0)',
            },
            immediate: prefersReducedMotion,
        }))
    );

    return isLoading ? (
        <Spinner color="primary" />
    ) : hubs.length > 0 ? (
        <CardDeck className="deck wrapper">
            {springs.map((props, i) => (
                <animated.div
                    style={props}
                    className="col-md-12"
                    key={hubs[i].id}
                >
                    <Row hub={hubs[i]} />
                </animated.div>
            ))}
        </CardDeck>
    ) : (
        <h5 style={{ margin: '20px', textAlign: 'center' }}>
            Nothing to see here!
        </h5>
    );
}
