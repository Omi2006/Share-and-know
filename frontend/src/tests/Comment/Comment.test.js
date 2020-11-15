import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from '../../components/Comment/Comment';
import { LoggedinProvider } from '../../components/Auth/LoggedInContext';
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
                <LoggedinProvider value="joe">
                    <Comment comment={commentData} />
                </LoggedinProvider>
            </HashRouter>
        );
        expect(screen.getByText('@joe')).toBeInTheDocument();
        expect(screen.getByText('Joe')).toBeInTheDocument();
        expect(screen.getByText('10 days ago')).toBeInTheDocument();
        expect(screen.getByText('edit')).toBeInTheDocument();
    });

    test('Renders correctly when logged in user is not poster', () => {
        render(
            <HashRouter>
                <LoggedinProvider value="peter">
                    <Comment comment={commentData} />
                </LoggedinProvider>
            </HashRouter>
        );
        expect(screen.getByText('@joe')).toBeInTheDocument();
        expect(screen.getByText('Joe')).toBeInTheDocument();
        expect(screen.getByText('10 days ago')).toBeInTheDocument();
        expect(screen.queryByText('edit')).toBeNull();
    });

    test('Edit shows textarea, save, and cancel', async () => {
        render(
            <HashRouter>
                <LoggedinProvider value="joe">
                    <Comment comment={commentData} />
                </LoggedinProvider>
            </HashRouter>
        );
        act(() => {
            userEvent.click(screen.getByText('edit'));
        });
        expect(screen.getByText('cancel')).toBeInTheDocument();
        expect(screen.getByText('save')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('Editing textbox and saving changes content', async () => {
        render(
            <HashRouter>
                <LoggedinProvider value="joe">
                    <Comment comment={commentData} />
                </LoggedinProvider>
            </HashRouter>
        );
        act(() => {
            userEvent.click(screen.getByText('edit'));
        });
        userEvent.type(screen.getByRole('textbox'), 'lol');
        expect(screen.getByRole('textbox')).toHaveValue('lol');
        act(() => {
            userEvent.click(screen.getByText('save'));
        });
        expect(await screen.findByText('lol')).toBeInTheDocument();
        expect(await screen.findByText('edit')).toBeInTheDocument();
    });

    test('Cancel editing works', () => {
        render(
            <HashRouter>
                <LoggedinProvider value="joe">
                    <Comment comment={commentData} />
                </LoggedinProvider>
            </HashRouter>
        );
        act(() => {
            userEvent.click(screen.getByText('edit'));
        });
        userEvent.type(screen.getByRole('textbox'), 'lol');
        act(() => {
            userEvent.click(screen.getByText('cancel'));
        });
        expect(screen.getByText('Joe')).toBeInTheDocument();
        expect(screen.getByText('edit')).toBeInTheDocument();
    });
});
