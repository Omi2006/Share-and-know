import React from 'react';
import { animated, useSpring } from 'react-spring';
import { CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom';
import { usePrefersReducedMotion } from '../General';
import { Row } from './';

const AnimatedDeck = animated(CardDeck);

export default function HubList({ hubs }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const deckStyles = useSpring({
        from: {
            transform: 'translate3D(0,100px,0)',
        },
        to: {
            transform: 'translate3D(0,0,0)',
        },
        immediate: prefersReducedMotion,
    });

    return hubs.length > 0 ? (
        <AnimatedDeck style={deckStyles} className="deck">
            {hubs.map(hub => (
                <Row hub={hub} key={hub.id} />
            ))}
        </AnimatedDeck>
    ) : (
        <h3>
            Looks like there are no hubs here.{' '}
            <Link to="new">Be the first one to make a hub!</Link>
        </h3>
    );
}
