import React from 'react';
import Row from './Row';
import { CardDeck } from 'reactstrap';
import { animated, useSpring } from 'react-spring';

const AnimatedDeck = animated(CardDeck);

export default function PostList({ posts }) {
    const deckStyles = useSpring({
        from: {
            opacity: 0,
            transform: 'translateX(100px)',
        },
        to: {
            opacity: 1,
            transform: 'translateX(0px)',
        },
    });
    //Handle no posts, temporal fix as for the poster, handle the type rerender before the items update
    return (
        <AnimatedDeck style={deckStyles} className="deck">
            {posts.map(post => (
                <Row post={post} key={post.id} />
            ))}
        </AnimatedDeck>
    );
}
