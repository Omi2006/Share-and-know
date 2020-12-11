import React, { useState } from 'react';
import { screen, render } from '@testing-library/react';
import { ToggleButton } from '../../components/Hub';
import userEvent from '@testing-library/user-event';

function TestWrapper() {
    const [type, setType] = useState('stuff');
    const handleTypeChange = () => setType('not stuff');
    return <ToggleButton type={type} handleTypeChange={handleTypeChange} />;
}

describe('Tests whether toggle button works', () => {
    test('Tests whether renders correctly', () => {
        render(<TestWrapper />);
        expect(screen.getByText('Stuff')).toBeInTheDocument();
    });

    test('Tests whether type changes correctly', async () => {
        render(<TestWrapper />);
        userEvent.click(screen.getByText('Stuff'));
        expect(await screen.findByText('Not stuff')).toBeInTheDocument();
        expect(screen.queryByText('Stuff')).toBeNull();
    });
});
