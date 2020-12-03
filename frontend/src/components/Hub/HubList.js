import React from 'react';
import { animated, useSpring } from 'react-spring';
import { CardDeck } from 'reactstrap';
import { usePrefersReducedMotion } from '../General';
import Row from './Row';

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

    return (
        <AnimatedDeck style={deckStyles} className="deck">
            {hubs.map(hub => (
                <Row hub={hub} />
            ))}
        </AnimatedDeck>
    );
}
