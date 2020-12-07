import React from 'react';
import { PostRow } from './';
import { CardDeck } from 'reactstrap';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
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
    return posts.length > 0 ? (
        <AnimatedDeck style={deckStyles} className="deck">
            {posts.map(post => (
                <PostRow post={post} key={post.id} />
            ))}
        </AnimatedDeck>
    ) : (
        <h5>
            Looks like there are no posts here.{' '}
            <Link to="posts/new">Be the first one to make a post!</Link>
        </h5>
    );
}
