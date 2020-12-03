import React from 'react';
import { screen, render } from '@testing-library/react';
import { Login } from '../../components/Auth';
import { HashRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                errors: {
                    credentials: 'Invalid credentials.',
                },
            }),
    })
);

describe('Testing login', () => {
    test('Throws error when empty fields', async () => {
        render(
            <HashRouter>
                <Login />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Login');
        userEvent.click(submitInput);
        expect(
            await screen.findByText('Remember to fill out the username!')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Remember to fill out the password!')
        ).toBeInTheDocument();
    });

    test('Typing registers', () => {
        render(
            <HashRouter>
                <Login />
            </HashRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        userEvent.type(usernameInput, 'Hello there');
        userEvent.type(passwordInput, 'General Kenobi');
        expect(screen.getByDisplayValue('Hello there')).toBeInTheDocument();
        expect(screen.getByDisplayValue('General Kenobi')).toBeInTheDocument();
    });

    test('Handles submission reject', async () => {
        render(
            <HashRouter>
                <Login />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Login');
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        userEvent.type(usernameInput, 'Hello there');
        userEvent.type(passwordInput, 'General Kenobi');
        userEvent.click(submitInput);
        expect(
            await screen.findByText('Invalid credentials.')
        ).toBeInTheDocument();
    });
});
