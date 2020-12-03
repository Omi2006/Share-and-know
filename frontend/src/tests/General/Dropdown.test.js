import React, { useState } from 'react';
import { screen, render, act, waitFor } from '@testing-library/react';
import { Dropdown } from '../../components/General';
import userEvent from '@testing-library/user-event';

function TestWrapper() {
    const [selected, setSelected] = useState(['date', 'Oldest']);
    const options = [
        ['-date', 'Newest'],
        ['date', 'Oldest'],
    ];
    return (
        <>
            <Dropdown
                selected={selected[1]}
                setSortBy={setSelected}
                options={options}
            />
        </>
    );
}

describe('Tests whether the dropdown works', () => {
    test('Tests whether it renders correctly', async () => {
        render(<TestWrapper />);
        expect(screen.getByText('Oldest')).toBeInTheDocument();
        const toggleButton = screen.getByTestId('toggle');
        act(() => {
            userEvent.click(toggleButton);
        });
        expect(await screen.findByText('Newest')).toBeInTheDocument();
    });

    test('Clicking a new option changes the selected option', async () => {
        render(<TestWrapper />);
        const toggleButton = screen.getByTestId('toggle');
        act(() => {
            userEvent.click(toggleButton);
        });
        await waitFor(() => {
            act(() => {
                userEvent.click(screen.getByText('Newest'));
            });
        });

        expect(await screen.findByText('Newest')).toBeInTheDocument();
        expect(screen.queryByText('Oldest')).toBeNull();
    });
});
