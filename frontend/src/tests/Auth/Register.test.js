import React from 'react';
import { screen, render } from '@testing-library/react';
import { Register } from '../../components/Auth';
import { HashRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.reject({
                errors: {
                    credentials: 'User with that username already exists.',
                },
            }),
    })
);

describe('Testing Register', () => {
    test('Throws error when empty fields', async () => {
        render(
            <HashRouter>
                <Register />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Register');
        userEvent.click(submitInput);
        expect(
            await screen.findByText('Remember to fill out the username!')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Remember to fill out the password!')
        ).toBeInTheDocument();
        expect(await screen.findByText('Remember to fill out the email!'));
        expect(
            await screen.findByText(
                'Remember to fill out the confirm password!'
            )
        );
    });

    test('Typing registers', () => {
        render(
            <HashRouter>
                <Register />
            </HashRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmInput = screen.getByPlaceholderText('Confirm password');
        userEvent.type(usernameInput, 'Hello there');
        userEvent.type(emailInput, 'kenobi@kenobi.com');
        userEvent.type(passwordInput, 'General Kenobi');
        userEvent.type(confirmInput, 'General Kenobi');
        expect(screen.getByDisplayValue('Hello there')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue('kenobi@kenobi.com')
        ).toBeInTheDocument();
        expect(screen.getAllByDisplayValue('General Kenobi')).toHaveLength(2);
    });

    test('Makes sure password and confirm fields match', async () => {
        render(
            <HashRouter>
                <Register />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Register');
        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmInput = screen.getByPlaceholderText('Confirm password');
        userEvent.type(usernameInput, 'Hello there');
        userEvent.type(emailInput, 'kenobi@kenobi.com');
        userEvent.type(passwordInput, 'General Kenobi');
        userEvent.type(confirmInput, 'Not General Kenobi');
        userEvent.click(submitInput);
        expect(
            await screen.findByText('Password and confirm fields must match!')
        ).toBeInTheDocument();
    });

    test('Handles submission reject', async () => {
        render(
            <HashRouter>
                <Register />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Register');
        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmInput = screen.getByPlaceholderText('Confirm password');
        userEvent.type(usernameInput, 'Hello there');
        userEvent.type(emailInput, 'kenobi@kenobi.com');
        userEvent.type(passwordInput, 'General Kenobi');
        userEvent.type(confirmInput, 'General Kenobi');
        userEvent.click(submitInput);
        setTimeout(
            () =>
                expect(
                    screen.getByText('User with that username already exists.')
                ).toBeInTheDocument(),
            3000
        );
    });
});
