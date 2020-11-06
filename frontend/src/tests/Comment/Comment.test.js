import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from '../../components/Comment/Comment';
import { LoginProvider } from '../../components/General/LoggedInContext';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: 'success' }),
    })
);

let consoleSpy;

beforeAll(() => {
    fetch.mockClear();
    consoleSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(message => {
            if (
                !message.includes(
                    'Use the `defaultValue` or `value` props instead of setting children on <textarea>'
                )
            ) {
                global.console.warn(message);
            }
        });
});

afterAll(() => consoleSpy.mockRestore());

describe('Testing comments', () => {
    const commentData = {
        commenter: {
            username: 'joe',
        },
        content: 'Joe',
        date: '10 days ago',
    };

    test('Renders correctly when logged in user is poster', () => {
        render(
            <HashRouter>
                <LoginProvider value={{ loggedIn: 'joe' }}>
                    <Comment comment={commentData} />
                </LoginProvider>
            </HashRouter>
        );
        expect(screen.getByText('@joe')).toBeInTheDocument();
        expect(screen.getByText('Joe')).toBeInTheDocument();
        expect(screen.getByText('10 days ago')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    test('Renders correctly when logged in user is not poster', () => {
        render(
            <HashRouter>
                <LoginProvider value={{ loggedIn: 'peter' }}>
                    <Comment comment={commentData} />
                </LoginProvider>
            </HashRouter>
        );
        expect(screen.getByText('@joe')).toBeInTheDocument();
        expect(screen.getByText('Joe')).toBeInTheDocument();
        expect(screen.getByText('10 days ago')).toBeInTheDocument();
        expect(screen.queryByText('Edit')).toBeNull();
    });

    test('Edit shows textarea, save, and cancel', async () => {
        render(
            <HashRouter>
                <LoginProvider value={{ loggedIn: 'joe' }}>
                    <Comment comment={commentData} />
                </LoginProvider>
            </HashRouter>
        );
        act(() => {
            userEvent.click(screen.getByText('Edit'));
        });
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('Editing textbox and saving changes content', async () => {
        render(
            <HashRouter>
                <LoginProvider value={{ loggedIn: 'joe' }}>
                    <Comment comment={commentData} />
                </LoginProvider>
            </HashRouter>
        );
        act(() => {
            userEvent.click(screen.getByText('Edit'));
        });
        userEvent.type(screen.getByRole('textbox'), 'lol');
        expect(screen.getByRole('textbox')).toHaveValue('lol');
        act(() => {
            userEvent.click(screen.getByText('Save'));
        });
        expect(await screen.findByText('lol')).toBeInTheDocument();
        expect(await screen.findByText('Edit')).toBeInTheDocument();
    });

    test('Cancel editing works', () => {
        render(
            <HashRouter>
                <LoginProvider value={{ loggedIn: 'joe' }}>
                    <Comment comment={commentData} />
                </LoginProvider>
            </HashRouter>
        );
        act(() => {
            userEvent.click(screen.getByText('Edit'));
        });
        userEvent.type(screen.getByRole('textbox'), 'lol');
        act(() => {
            userEvent.click(screen.getByText('Cancel'));
        });
        expect(screen.getByText('Joe')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });
});
