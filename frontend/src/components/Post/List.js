import React from 'react';
import { PostRow } from './';
import { CardDeck, Spinner } from 'reactstrap';
import { animated, useSpring } from 'react-spring';
import { usePrefersReducedMotion } from '../General';

const AnimatedDeck = animated(CardDeck);

export default function WrappedPostList({ posts, isLoading }) {
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
    return isLoading ? (
        <Spinner color="primary" />
    ) : posts.length > 0 ? (
        <AnimatedDeck style={deckStyles} className="deck">
            {posts.map(post => (
                <PostRow post={post} key={post.id} />
            ))}
        </AnimatedDeck>
    ) : (
        <h5 style={{ margin: '20px', textAlign: 'center' }}>
            Nothing to see here!
        </h5>
    );
}
