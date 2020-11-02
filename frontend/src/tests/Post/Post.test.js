import React from 'react';
import { screen, render, waitFor, act } from '@testing-library/react';
import Post from '../../components/Post/Post';
import { MemoryRouter, Route } from 'react-router-dom';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                id: '1',
                title: 'Hello there',
                content: 'How are you?',
                poster: {
                    username: 'General Kenobi',
                },
                comments: [],
                likes: [],
                uuid: 'ABCDEFG',
                date: '10 days ago',
            }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

function renderComponent() {
    render(
        <MemoryRouter initialEntries={['/posts/ABCDEFG']}>
            <Route path="/posts/:uuid">
                <Post />
            </Route>
        </MemoryRouter>
    );
}

describe('Testing post rendering', () => {
    test('Renders null post correctly', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        content: undefined,
                    }),
            })
        );

        act(() => renderComponent());
        await waitFor(() =>
            expect(screen.getByRole('status')).toBeInTheDocument()
        );
    });

    test('Renders post correctly', async () => {
        act(() => renderComponent());
        await waitFor(() => {
            expect(screen.getByText('Hello there')).toBeInTheDocument();
            expect(screen.getByText('General Kenobi')).toBeInTheDocument();
            expect(screen.getByText('How are you?')).toBeInTheDocument();
            expect(screen.getByText('10 days ago')).toBeInTheDocument();
            expect(screen.getByText('0')).toBeInTheDocument();
        });
    });
});
