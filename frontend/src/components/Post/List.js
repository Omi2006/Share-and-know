import React from 'react';
import Row from './Row';
import { CardDeck } from 'reactstrap';
import { animated, useSpring } from 'react-spring';
import { usePrefersReducedMotion } from '../General';

const AnimatedDeck = animated(CardDeck);

export default function PostList({ posts }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const deckStyles = useSpring({
        from: {
            transform: 'translate3D(100px,0,0)',
        },
        to: {
            transform: 'translate3D(0,0,0)',
        },
        immediate: prefersReducedMotion,
    });
    //Handle no posts, temporal fix as for the poster, handle the type rerender before the items update
    return posts[0]?.poster ? (
        <AnimatedDeck style={deckStyles} className="deck">
            {posts.map(post => (
                <Row post={post} key={post.id} />
            ))}
        </AnimatedDeck>
    ) : null;
}
