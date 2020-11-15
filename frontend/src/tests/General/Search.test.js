import React, { useState } from 'react';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../components/General/Search';

function TestWrapper({ type }) {
    const [search, setSearch] = useState('');
    return (
        <>
            <h1>{search}</h1>
            <Search setSearch={setSearch} type={type} />
        </>
    );
}

describe('tests whether the search feature works', () => {
    test('Renders correctly', () => {
        render(<TestWrapper type="posts" />);
        expect(screen.getByText('Find specific posts')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('What do you want to search for?...')
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('Search')).toBeInTheDocument();
    });

    test('Typing registers and does not change search immediately', () => {
        render(<TestWrapper type="posts" />);
        const inputbox = screen.getByPlaceholderText(
            'What do you want to search for?...'
        );
        userEvent.type(inputbox, 'Hello there');
        expect(
            screen.getAllByDisplayValue('Hello there')[0]
        ).toBeInTheDocument();
        expect(screen.queryByText('Hello there')).toBeNull();
    });

    test('Clicking the search button does change search', async () => {
        render(<TestWrapper type="posts" />);
        const inputbox = screen.getByPlaceholderText(
            'What do you want to search for?...'
        );
        const searchButton = screen.getByDisplayValue('Search');
        userEvent.type(inputbox, 'Hello there');
        act(() => {
            userEvent.click(searchButton);
        });
        expect(await screen.findByText('Hello there')).toBeInTheDocument();
        userEvent.type(inputbox, 'l');
        act(() => {
            userEvent.click(searchButton);
        });
        expect(await screen.findByText('l')).toBeInTheDocument();
    });
});
