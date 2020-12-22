import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { UserList } from '../../components/User';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                { id: 1, username: 'joe' },
                { id: 2, username: 'pete' },
            ]),
    })
);

describe('Tests whether a list of users is rendered correctly', () => {
    test('Tests whether nothing is rendered without search being typed', () => {
        render(
            <HashRouter>
                <UserList />
            </HashRouter>
        );
        expect(
            screen.getByText('No users match your search!')
        ).toBeInTheDocument();
        expect(screen.queryByText('joe')).toBeNull();
        expect(screen.queryByText('pete')).toBeNull();
    });

    test('Tests whether the list of users is rendered correctly after something is searched', async () => {
        render(
            <HashRouter>
                <UserList />
            </HashRouter>
        );
        userEvent.type(
            screen.getByPlaceholderText('What do you want to search for?'),
            'x'
        );
        userEvent.click(screen.getByDisplayValue('Search'));
        expect(await screen.findByText('joe')).toBeInTheDocument();
        expect(screen.getByText('pete')).toBeInTheDocument();
    });
});
