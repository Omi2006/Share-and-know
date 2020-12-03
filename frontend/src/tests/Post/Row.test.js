import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { PostRow } from '../../components/Post';

test('renders correctly', () => {
    const post = {
        title: 'Hello there',
        poster: {
            username: 'General Kenobi',
        },
        content: 'How are you?',
        date: '10 days ago',
        uuid: 'ASJDJ34',
    };

    render(
        <HashRouter>
            <PostRow post={post} />
        </HashRouter>
    );
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('By: General Kenobi')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
    expect(screen.getByText('10 days ago')).toBeInTheDocument();
});

test('renders null post correctly', () => {
    render(
        <HashRouter>
            <PostRow post={null} />
        </HashRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
});
