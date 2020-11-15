import React from 'react';
import Row from './Row';
import { CardDeck } from 'reactstrap';
import { animated, useSpring } from 'react-spring';

const AnimatedDeck = animated(CardDeck);

export default function PostList({ posts }) {
    const styles = useSpring({
        from: {
            opacity: 0,
            transform: 'translateX(100px)',
        },
        to: {
            opacity: 1,
            transform: 'translateX(0px)',
        },
    });

    return (
        <AnimatedDeck style={styles} className="post-list">
            {posts.map(post => {
                return <Row post={post} key={post.id} />;
            })}
        </AnimatedDeck>
    );
}
