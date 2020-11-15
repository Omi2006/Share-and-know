import React from 'react';
import { screen, render, waitFor, act } from '@testing-library/react';
import Post from '../../components/Post/Post';
import { MemoryRouter, Route } from 'react-router-dom';
import { LoggedinProvider } from '../../components/Auth/LoggedInContext';

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
                category: {
                    title: 'test',
                    id: 1,
                },
            }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

function renderComponent(loggedIn) {
    render(
        <MemoryRouter initialEntries={['/posts/ABCDEFG']}>
            <LoggedinProvider value={loggedIn}>
                <Route path="/posts/:uuid">
                    <Post />
                </Route>
            </LoggedinProvider>
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

        act(() => renderComponent(null));
        await waitFor(() =>
            expect(screen.getByRole('status')).toBeInTheDocument()
        );
    });

    test('Renders post correctly', async () => {
        act(() => renderComponent('Joe'));
        await waitFor(() => {
            expect(screen.getByText('Hello there')).toBeInTheDocument();
            expect(screen.getByText('test')).toBeInTheDocument();
            expect(screen.getByText('General Kenobi')).toBeInTheDocument();
            expect(screen.getByText('How are you?')).toBeInTheDocument();
            expect(screen.getByText('10 days ago')).toBeInTheDocument();
            expect(screen.getByText('0')).toBeInTheDocument();
            expect(
                screen.queryByText('You must be logged in to comment!')
            ).toBeNull();
        });
    });

    test('Renders non logged in user correctly', async () => {
        act(() => renderComponent(null));
        await waitFor(() => {
            expect(screen.getByText('Hello there')).toBeInTheDocument();
            expect(screen.getByText('test')).toBeInTheDocument();
            expect(screen.getByText('General Kenobi')).toBeInTheDocument();
            expect(screen.getByText('How are you?')).toBeInTheDocument();
            expect(screen.getByText('10 days ago')).toBeInTheDocument();
            expect(screen.getByText('0')).toBeInTheDocument();
            expect(
                screen.getByText('You must be logged in to comment!')
            ).toBeInTheDocument();
        });
    });
});
