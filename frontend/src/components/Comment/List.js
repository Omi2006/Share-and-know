import React from 'react';
import Comment from './Comment';
import { useTransition, animated, config } from 'react-spring';
import usePrefersReducedMotion from '../General/usePrefersReducedMotion';

export default function List({ comments }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const transition = useTransition(comments, comment => comment.id, {
        from: {
            opacity: 0,
            transform: 'translateX(-100px)',
        },
        enter: { opacity: 1, transform: 'translateX(0px)' },
        config: config.wobbly,
        immediate: prefersReducedMotion,
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
