import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Hub } from '../../components/Hub';
import { LoggedInProvider } from '../../components/Auth';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                id: 1,
                full_path: 'FIRST',
                total: 1,
                description: 'THE FIRST',
                results: [
                    {
                        id: '1',
                        title: 'Hello there',
                        poster: {
                            username: 'General Kenobi',
                        },
                        description: 'SECOND',
                        content: 'How are you?',
                        date: '10 days ago',
                        uuid: 'ASJDJ34',
                    },
                ],
            }),
    })
);

function renderComponent() {
    render(
        <MemoryRouter initialEntries={['/hubs/FIRST']}>
            <LoggedInProvider value="joe">
                <Routes>
                    <Route path="/hubs/:title">
                        <Hub />
                    </Route>
                </Routes>
            </LoggedInProvider>
        </MemoryRouter>
    );
}

describe('Tests whether hub shows correctly', () => {
    test('Renders correctly when hub is source hub', async () => {
        act(renderComponent);
        await waitFor(() =>
            expect(screen.getByText('FIRST')).toBeInTheDocument()
        );
        expect(screen.getByText('THE FIRST')).toBeInTheDocument();
        expect(screen.getByText('How are you?')).toBeInTheDocument();
        expect(screen.queryByText('+ New Post')).toBeNull();
    });

    test('Renders correctly when hub is not source hub', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        id: 1,
                        full_path: 'FIRST/',
                        total: 1,
                        description: 'THE FIRST',
                        results: [
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
                        ],
                    }),
            })
        );
        act(renderComponent);
        await waitFor(() =>
            expect(screen.getByText('FIRST')).toBeInTheDocument()
        );
        expect(screen.getByText('How are you?')).toBeInTheDocument();
        expect(screen.getByText('THE FIRST')).toBeInTheDocument();
        expect(screen.queryByText('+ New post')).toBeInTheDocument();
    });

    test('Renders sub hubs when type changes', async () => {
        act(renderComponent);
        await waitFor(() => userEvent.click(screen.getByText('Posts')));
        expect(await screen.findByText('SECOND')).toBeInTheDocument();
        expect(screen.getByText('Hubs')).toBeInTheDocument();
        expect(screen.getByText('+ New Hub')).toBeInTheDocument();
        expect(screen.queryByText('How are you?')).toBeNull();
    });
});
