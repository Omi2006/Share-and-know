import React from 'react';
import Comment from './Comment';
import { useTransition, animated, config } from 'react-spring';
import usePrefersReducedMotion from '../General/usePrefersReducedMotion';
import { useState } from 'react';

export default function List({ comments }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [page, setPage] = useState(1);

    const transition = useTransition(comments, comment => comment.id, {
        from: {
            opacity: 0,
            transform: 'translateX(-100px)',
        },
        enter: { opacity: 1, transform: 'translateX(0px)' },
        config: config.wobbly,
        immediate: prefersReducedMotion,
    });

    const handleLoadMore = () => {
        if (page * 5 <= comments.length) setPage(page + 1);
    };

    return (
        <div>
            {transition.splice(0, page * 5).map(({ item, key, props }) => (
                <animated.div
                    style={{ ...props, overflow: 'hidden' }}
                    key={key}
                >
                    <Comment comment={item} />
                </animated.div>
            ))}
            <button onClick={handleLoadMore}>Load more</button>
        </div>
    );
}
