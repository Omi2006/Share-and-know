import React from 'react';
import { animated, useSpring } from 'react-spring';
import { CardDeck } from 'reactstrap';
import Row from './Row';

const AnimatedDeck = animated(CardDeck);

export default function HubList({ hubs }) {
    const deckStyles = useSpring({
        from: {
            transform: 'translateY(100px)',
        },
        to: {
            transform: 'translateY(0px)',
        },
    });

    return (
        <AnimatedDeck style={deckStyles} className="deck">
            {hubs.map(hub => (
                <Row hub={hub} />
            ))}
        </AnimatedDeck>
    );
}
