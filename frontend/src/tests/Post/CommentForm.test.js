import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from '../../components/Post/CommentForm';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({ message: 'Comment posted successfully.' }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

function TestWrapper() {
    const [comments, setComments] = useState([]);
    return (
        <HashRouter>
            <CommentForm setComments={setComments} post={1} />
        </HashRouter>
    );
}

describe('Testing comment form', () => {
    test('Submit shows error when no input provided', async () => {
        render(<TestWrapper />);
        const submitInput = screen.getByDisplayValue('Share your comment');
        act(() => {
            userEvent.click(submitInput);
        });
        expect(
            await screen.findByText('You must fill out the comment!')
        ).toBeInTheDocument();
    });
});
