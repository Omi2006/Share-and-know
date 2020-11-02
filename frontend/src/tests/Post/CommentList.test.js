import React from 'react';
import { render } from '@testing-library/react';
import CommentList from '../../components/Post/CommentList';

describe('Testing Comment list', () => {
    const comments = [
        {
            id: '1',
            commenter: {
                username: 'General Kenobi',
            },
            content: 'How are you?',
            date: '10 days ago',
        },
        {
            id: '2',
            commenter: {
                username: 'General Kennobi',
            },
            content: 'How are youu?',
            date: '10 days agooo',
        },
    ];

    test('Renders right amount of comments', () => {
        const { container } = render(<CommentList comments={comments} />);
        expect([...container.firstChild.children]).toHaveLength(2);
    });
});
