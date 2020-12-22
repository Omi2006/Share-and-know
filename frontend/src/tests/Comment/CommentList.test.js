import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CommentList } from '../../components/Comment';

describe('Testing Comment list', () => {
    const comments = [
        {
            id: '1',
            commenter: 'General Kenobi',
            content: 'How are you?',
            date: '10 days ago',
        },
        {
            id: '2',
            commenter: 'General Kennobi',
            content: 'How are youu?',
            date: '10 days agooo',
        },
    ];

    test('Renders right amount of comments and no load more for less than 5 comments', () => {
        const { container } = render(
            <HashRouter>
                <CommentList comments={comments} />
            </HashRouter>
        );
        expect([...container.firstChild.children]).toHaveLength(2);
    });
});
