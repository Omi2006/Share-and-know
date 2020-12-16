import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { PostList } from '../../components/Post';

describe('Tests post list', () => {
    test('Renders correctly', () => {
        const posts = [
            {
                id: '1',
                title: 'Hello there',
                poster: {
                    username: 'General Kenobi',
                },
                hub: { hub_path: '' },
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
                path: '',
                content: 'How are youu?',
                date: '10 days agooo',
                uuid: 'ASJDJ3434',
            },
        ];

        const { container } = render(
            <HashRouter>
                <PostList posts={posts} />
            </HashRouter>
        );
        const list = container.firstChild;
        expect([...list.children]).toHaveLength(2);
    });

    test('Renders correctly when no posts are present', () => {
        const posts = [];

        render(
            <HashRouter>
                <PostList posts={posts} />
            </HashRouter>
        );
        expect(screen.getByText('Nothing to see here!')).toBeInTheDocument();
    });
});
