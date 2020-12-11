import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { NewHub } from '../../components/Hub';
import { HashRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ full_path: 'stuff' }),
    })
);

function TestWrapper() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/hubs/stuff" element={<p>redirected</p>} />
                <Route path="*" element={<NewHub />} />
            </Routes>
        </HashRouter>
    );
}

describe('Tests whether the new hub works', () => {
    test('Tests whether it renders correctly', () => {
        render(<TestWrapper />);
        expect(
            screen.getByPlaceholderText('A nice name...')
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('An awesome description...')
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('New hub')).toBeInTheDocument();
    });

    test('Tests whether typing registers', async () => {
        render(<TestWrapper />);
        const nameInput = screen.getByPlaceholderText('A nice name...');
        const descriptionInput = screen.getByPlaceholderText(
            'An awesome description...'
        );
        userEvent.type(nameInput, 'Hello there');
        userEvent.type(descriptionInput, 'General Kenobi');
        expect(
            await screen.findByDisplayValue('Hello there')
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('General Kenobi')).toBeInTheDocument();
    });

    test('Tests whether error shows when missing fields', async () => {
        render(<TestWrapper />);
        userEvent.click(screen.getByDisplayValue('New hub'));
        expect(
            await screen.findByText('You need to give the hub a name!')
        ).toBeInTheDocument();
        expect(
            screen.getByText('You need to give the hub a description!')
        ).toBeInTheDocument();
    });

    test('Tests whether error shows with too long fields', async () => {
        render(<TestWrapper />);
        const nameInput = screen.getByPlaceholderText('A nice name...');
        const descriptionInput = screen.getByPlaceholderText(
            'An awesome description...'
        );
        userEvent.type(nameInput, 'H'.repeat(21));
        userEvent.type(descriptionInput, 'G'.repeat(101));
        userEvent.click(screen.getByDisplayValue('New hub'));
        expect(
            await screen.findByText('The hub name must be under 21 characters!')
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'The hub description must be under 101 characters!'
            )
        ).toBeInTheDocument();
    });

    test('Tests whether error shows with invalid name', async () => {
        render(<TestWrapper />);
        const nameInput = screen.getByPlaceholderText('A nice name...');
        userEvent.type(nameInput, 'new');
        act(() => userEvent.click(screen.getByDisplayValue('New hub')));
        expect(
            await screen.findByText('That hub name is not allowed!')
        ).toBeInTheDocument();
    });
});
