import React from 'react';
import { PostRow } from './';
import { CardDeck, Spinner } from 'reactstrap';
import { animated, useSprings } from 'react-spring';
import { usePrefersReducedMotion } from '../General';

export default function WrappedPostList({ posts, isLoading }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const springs = useSprings(
        posts.length,
        posts.map(post => ({
            from: {
                transform: 'translate3D(100px,0,0)',
            },
            to: {
                transform: 'translate3D(0,0,0)',
            },
            immediate: prefersReducedMotion,
        }))
    );
    //Handle no posts, temporal fix as for the poster, handle the type rerender before the items update
    return isLoading ? (
        <Spinner color="primary" />
    ) : posts.length > 0 ? (
        <CardDeck className="deck">
            {springs.map((props, i) => (
                <animated.div
                    style={props}
                    key={posts[i].id}
                    className="col-md-12"
                >
                    <PostRow post={posts[i]} />
                </animated.div>
            ))}
        </CardDeck>
    ) : (
        <h5 style={{ margin: '20px', textAlign: 'center' }}>
            Nothing to see here!
        </h5>
    );
}
