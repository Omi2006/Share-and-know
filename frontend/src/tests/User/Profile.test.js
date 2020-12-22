import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserProfile } from '../../components/User';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                username: 'joe',
                post_count: 1,
                joined_hubs_count: 2,
            }),
    })
);

function renderComponent() {
    render(
        <MemoryRouter initialEntries={['/users/joe']}>
            <Routes>
                <Route path="/users/:username" element={<UserProfile />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Tests whether a users page is rendered correctly', () => {
    test('Tests whether a normal user is rendered correctly', async () => {
        act(renderComponent);
        await waitFor(() =>
            expect(screen.getByText('joe')).toBeInTheDocument()
        );
        expect(screen.getByText('Has 1 posts')).toBeInTheDocument();
        expect(screen.getByText('Member of 2 hubs')).toBeInTheDocument();
    });

    test('Tests whether a not found user is rendered correctly', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ error: 'not found' }),
            })
        );
        act(renderComponent);
        await waitFor(() =>
            expect(
                screen.getByText('This user could not be found')
            ).toBeInTheDocument()
        );
    });
});
