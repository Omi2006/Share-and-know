import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { UserRow } from '../../components/User';

describe('Tests whether a user row renders correctly', () => {
    test('Tests a correct render', () => {
        render(
            <HashRouter>
                <UserRow user="joe" />
            </HashRouter>
        );
        expect(screen.getByText('joe')).toBeInTheDocument();
    });
});
