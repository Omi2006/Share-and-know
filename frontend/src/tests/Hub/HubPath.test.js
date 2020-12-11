import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HubPath } from '../../components/Hub';

describe('Tests whether HubPath shows the appropriate paths', () => {
    test('Tests whether it shows one hub normally', () => {
        render(
            <MemoryRouter initialEntries={['/hubs/FIRST']}>
                <HubPath />
            </MemoryRouter>
        );
        expect(screen.getByText('FIRST')).toBeInTheDocument();
        expect(screen.queryByText('hubs')).toBeNull();
    });

    test('Tests whether it shows multiple hubs normally', () => {
        render(
            <MemoryRouter initialEntries={['/hubs/FIRST/SECOND']}>
                <HubPath />
            </MemoryRouter>
        );
        expect(screen.getByText('FIRST')).toBeInTheDocument();
        expect(screen.getByText('SECOND')).toBeInTheDocument();
    });

    test('Tests whether it filters out the new keyword', () => {
        render(
            <MemoryRouter initialEntries={['/hubs/FIRST/SECOND/new']}>
                <HubPath />
            </MemoryRouter>
        );
        expect(screen.getByText('FIRST')).toBeInTheDocument();
        expect(screen.getByText('SECOND')).toBeInTheDocument();
        expect(screen.queryByText('new')).toBeNull();
    });

    test('Tests whether it filters out last 2 items if 2nd last is posts', () => {
        render(
            <MemoryRouter initialEntries={['/hubs/FIRST/SECOND/posts/ABCDEF']}>
                <HubPath />
            </MemoryRouter>
        );
        expect(screen.getByText('FIRST')).toBeInTheDocument();
        expect(screen.getByText('SECOND')).toBeInTheDocument();
        expect(screen.queryByText('posts')).toBeNull();
        expect(screen.queryByText('ABCDEF')).toBeNull();
    });

    test('Tests whether it filters out last 2 items if 2nd last is posts and last is new', () => {
        render(
            <MemoryRouter initialEntries={['/hubs/FIRST/SECOND/posts/new']}>
                <HubPath />
            </MemoryRouter>
        );
        expect(screen.getByText('FIRST')).toBeInTheDocument();
        expect(screen.getByText('SECOND')).toBeInTheDocument();
        expect(screen.queryByText('posts')).toBeNull();
        expect(screen.queryByText('new')).toBeNull();
    });
});
