import React from 'react';
import { screen, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { NewPost } from '../../components/Post';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                errors: {
                    title: 'Too weird',
                },
            }),
    })
);

describe('Testing new post', () => {
    test('Throws error when empty fields', async () => {
        render(
            <HashRouter>
                <NewPost />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Create post');
        userEvent.click(submitInput);
        expect(
            await screen.findByText('You must provide a title!')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('You must provide some content!')
        ).toBeInTheDocument();
    });

    test('Typing registers', () => {
        render(
            <HashRouter>
                <NewPost />
            </HashRouter>
        );
        const titleInput = screen.getByPlaceholderText('Title...');
        const bodyInput = screen.getByPlaceholderText('Some good content...');
        userEvent.type(titleInput, 'Hello there');
        userEvent.type(bodyInput, 'General Kenobi');
        expect(screen.getByDisplayValue('Hello there')).toBeInTheDocument();
        expect(screen.getByDisplayValue('General Kenobi')).toBeInTheDocument();
    });

    test('Handles too long of a title', async () => {
        render(
            <HashRouter>
                <NewPost />
            </HashRouter>
        );
        const titleInput = screen.getByPlaceholderText('Title...');
        const bodyInput = screen.getByPlaceholderText('Some good content...');
        userEvent.type(titleInput, 'x'.repeat(65));
        userEvent.type(bodyInput, 'General Kenobi');
        const submitInput = screen.getByDisplayValue('Create post');
        userEvent.click(submitInput);
        expect(await screen.findByText('Title must be 64 characters at most!'));
    });

    test('Handles submission reject', async () => {
        render(
            <HashRouter>
                <NewPost />
            </HashRouter>
        );
        const submitInput = screen.getByDisplayValue('Create post');
        const titleInput = screen.getByPlaceholderText('Title...');
        const bodyInput = screen.getByPlaceholderText('Some good content...');
        userEvent.type(titleInput, 'Hello there');
        userEvent.type(bodyInput, 'General Kenobi');
        userEvent.click(submitInput);
        expect(await screen.findByText('Too weird')).toBeInTheDocument();
    });
});
