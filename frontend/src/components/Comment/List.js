import React from 'react';
import Comment from './Comment';
import { useTransition, animated, config } from 'react-spring';
import { usePrefersReducedMotion } from '../General';
import { useState, useEffect } from 'react';

export default function List({ comments }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [page, setPage] = useState(1);
    const [commentList, setCommentList] = useState(comments.slice(0, 5));

    const transition = useTransition(commentList, comment => comment.id, {
        from: {
            opacity: 0,
            transform: 'translate3D(-100px,0,0)',
        },
        enter: { opacity: 1, transform: 'translate3D(0,0,0)' },
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
        if (comments[0] !== undefined)
            setCommentList(prevCommentList => [
                comments[0],
                ...prevCommentList.slice(1),
            ]);
    }, [comments]);

    //Keep the same page scroll so that the comments don't appear at the bottom.
    useEffect(() => {
        window.scroll({ top: pageYOffset });
    }, [commentList, pageYOffset]);

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
