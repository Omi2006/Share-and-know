import React from 'react';
import Comment from './Comment';
import { useTransition, animated, config } from 'react-spring';
import usePrefersReducedMotion from '../General/usePrefersReducedMotion';
import { useState } from 'react';
import { useEffect } from 'react';

export default function List({ comments }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [page, setPage] = useState(1);
    const [commentList, setCommentList] = useState(comments.slice(0, 5));

    const transition = useTransition(commentList, comment => comment.id, {
        from: {
            opacity: 0,
            transform: 'translateX(-100px)',
        },
        enter: { opacity: 1, transform: 'translateX(0px)' },
        config: config.wobbly,
        immediate: prefersReducedMotion,
    });

    const handleLoadMore = () => {
        setCommentList([
            ...commentList,
            ...comments.slice(page * 5, (page + 1) * 5),
        ]);
        setPage(page + 1);
    };

    let pageYOffset = window.pageYOffset;

    useEffect(() => {
        setCommentList(prevCommentList => [
            comments[0],
            ...prevCommentList.slice(1),
        ]);
    }, [comments]);

    useEffect(() => {
        window.scroll({ top: pageYOffset });
    }, [commentList]);

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
            {page * 5 <= comments.length && (
                <button
                    className="btn btn-primary center"
                    onClick={handleLoadMore}
                >
                    Load more
                </button>
            )}
        </div>
    );
}
