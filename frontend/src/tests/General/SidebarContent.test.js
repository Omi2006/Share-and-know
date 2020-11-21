import React, { useState } from 'react';
import { screen, render, act } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { LoggedinProvider } from '../../components/Auth/LoggedInContext';
import SidebarContent from '../../components/General/SidebarContent';
import userEvent from '@testing-library/user-event';
import { ToggleLoggedinProvider } from '../../components/Auth/ToggleLoginContext';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                test: 'test',
            }),
    })
);

function TestWrapper(props) {
    const [loggedIn, setLoggedIn] = useState(props.loggedIn);

    return (
        <LoggedinProvider value={loggedIn}>
            <ToggleLoggedinProvider value={setLoggedIn}>
                <HashRouter>
                    <SidebarContent style={{}} toggleSidebar={() => {}} />
                    <h1>{loggedIn}</h1>
                </HashRouter>
            </ToggleLoggedinProvider>
        </LoggedinProvider>
    );
}

describe('Testing sidebar', () => {
    test('Renders default urls correctly', () => {
        render(<TestWrapper loggedIn="omar" />);
        expect(screen.getByText('Share')).toBeInTheDocument();
        expect(screen.getByText(/Home/)).toBeInTheDocument();
    });

    test('Renders logged in urls correctly', () => {
        render(<TestWrapper loggedIn="omar" />);
        expect(screen.getByText(/New post/)).toBeInTheDocument();
        expect(screen.getByText(/Logout/)).toBeInTheDocument();
    });

    test('Renders non logged in urls correctly', () => {
        render(<TestWrapper loggedIn={null} />);
        expect(screen.getByText(/Login/)).toBeInTheDocument();
        expect(screen.getByText(/Register/)).toBeInTheDocument();
    });

    test('Logout sets logged in as null', async () => {
        render(<TestWrapper loggedIn="omar" />);
        expect(screen.getByText('omar')).toBeInTheDocument();
        act(() => userEvent.click(screen.getByText(/Logout/)));
        expect(await screen.findByText('omar')).toHaveTextContent('');
    });
});
