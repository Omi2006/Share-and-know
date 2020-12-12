import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HubList } from '../../components/Hub';

describe('Tests hub list functionality', () => {
    test('Renders correctly', () => {
        const hubs = [
            {
                id: 1,
                title: 'Hello there',
                date: '10 days ago',
                description: 'General Kenobi',
            },
            {
                id: 2,
                title: 'Hello there friend',
                description: 'General Kenobi',
                date: '10 days agooo',
            },
        ];

        const { container } = render(
            <HashRouter>
                <HubList hubs={hubs} />
            </HashRouter>
        );
        const list = container.firstChild;
        expect([...list.children]).toHaveLength(2);
    });

    test('Renders correctly when no hubs are present', () => {
        const hubs = [];

        render(
            <HashRouter>
                <HubList hubs={hubs} />
            </HashRouter>
        );
        expect(screen.getByText('Nothing to see here!')).toBeInTheDocument();
    });
});
