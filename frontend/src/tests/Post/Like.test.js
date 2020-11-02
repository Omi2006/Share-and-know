import React, { useState } from 'react';
import { screen, render, act } from '@testing-library/react';
import Like from '../../components/Post/Like';
import { LoginProvider } from '../../components/General/LoggedInContext';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                likes: [
                    { username: 'joe' },
                    { username: 'peter' },
                    { username: 'omar' },
                ],
            }),
    })
);

function TestWrapper(props) {
    const [likes, setLikes] = useState(props.likes);

    return (
        <LoginProvider value={{ loggedIn: props.loggedIn }}>
            <Like setLikes={setLikes} likes={likes} />
        </LoginProvider>
    );
}

describe('Testing like functionlity', () => {
    test('LIke button is not rendered when not logged in', () => {
        render(<TestWrapper loggedIn={undefined} likes={[]} />);
        expect(screen.queryByTitle('like button')).toBeNull();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('Like button renders correctly when user is logged in', () => {
        render(<TestWrapper loggedIn="omar" likes={[]} />);
        expect(screen.getByTitle('like button')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('Liking increases like count', async () => {
        const likes = [{ username: 'joe' }, { username: 'peter' }];

        render(<TestWrapper likes={likes} loggedIn="omar" />);
        const likeButton = screen.getByTitle('like button');
        act(() => userEvent.click(likeButton));
        expect(await screen.findByText('3')).toBeInTheDocument();
    });

    test('Unlkiing decreases like count', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        likes: [{ username: 'joe' }, { username: 'peter' }],
                    }),
            })
        );

        const likes = [
            { username: 'joe' },
            { username: 'peter' },
            { username: 'omar' },
        ];

        render(<TestWrapper likes={likes} loggedIn="omar" />);
        const likeButton = screen.getByTitle('like button');
        act(() => userEvent.click(likeButton));
        expect(await screen.findByText('2')).toBeInTheDocument();
    });
});
