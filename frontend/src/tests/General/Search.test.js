import React, { useState } from 'react';
import { screen, render, act } from '@testing-library/react';
import { Search } from '../../components/General';
import userEvent from '@testing-library/user-event';

function TestWrapper({ type, page }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(page);
    return (
        <>
            <h1>{currentPage}</h1>
            <h1>{search}</h1>
            <Search
                setSearch={setSearch}
                type={type}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
}

describe('tests whether the search feature works', () => {
    test('Renders correctly', () => {
        render(<TestWrapper type="posts" page={1} />);
        expect(screen.getByText('Find specific posts')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('What do you want to search for?')
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('Search')).toBeInTheDocument();
    });

    test('Typing registers and does not change search immediately', () => {
        render(<TestWrapper type="posts" page={1} />);
        const inputbox = screen.getByPlaceholderText(
            'What do you want to search for?'
        );
        userEvent.type(inputbox, 'Hello there');
        expect(
            screen.getAllByDisplayValue('Hello there')[0]
        ).toBeInTheDocument();
        expect(screen.queryByText('Hello there')).toBeNull();
    });

    test('Clicking the search button does change search and current page to 1', async () => {
        render(<TestWrapper type="posts" page={2} />);
        const inputbox = screen.getByPlaceholderText(
            'What do you want to search for?'
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
        expect(await screen.findByText('1')).toBeInTheDocument();
    });
});
