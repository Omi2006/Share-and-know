import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Row } from '../../components/Hub';

describe('Tests whether a hub row renders correctly', () => {
    test('renders correctly', () => {
        const hub = {
            title: 'Hello there',
            date: '10 days ago',
            description: 'General Kenobi',
        };

        render(
            <HashRouter>
                <Row hub={hub} />
            </HashRouter>
        );
        expect(screen.getByText('Hello there')).toBeInTheDocument();
        expect(screen.getByText('General Kenobi')).toBeInTheDocument();
        expect(screen.getByText('Made 10 days ago')).toBeInTheDocument();
    });
});
