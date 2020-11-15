import React from 'react';
import Comment from './Comment';
import { useTransition, animated, config } from 'react-spring';

export default function List({ comments }) {
    const transition = useTransition(comments, comment => comment.id, {
        from: {
            opacity: 0,
            transform: 'translateX(-100px)',
        },
        enter: { opacity: 1, transform: 'translateX(0px)' },
        config: config.wobbly,
    });

    return (
        <div>
            {transition.map(({ item, key, props }) => (
                <animated.div
                    style={{ ...props, overflow: 'hidden' }}
                    key={key}
                >
                    <Comment comment={item} />
                </animated.div>
            ))}
        </div>
    );
}
