import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import List from '../../components/Post/List';

test('Renders correctly', () => {
    const posts = [
        {
            id: '1',
            title: 'Hello there',
            poster: {
                username: 'General Kenobi',
            },
            content: 'How are you?',
            date: '10 days ago',
            uuid: 'ASJDJ34',
        },
        {
            id: '2',
            title: 'Hello there friend',
            poster: {
                username: 'General Kennobi',
            },
            content: 'How are youu?',
            date: '10 days agooo',
            uuid: 'ASJDJ3434',
        },
    ];

    const { container } = render(
        <HashRouter>
            <List posts={posts} />
        </HashRouter>
    );
    const list = container.firstChild;
    expect([...list.children]).toHaveLength(2);
});
