import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { GeneralPosts } from '../Post';
import Identicon from 'react-identicons';

export default function UserPosts() {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`/knowledge/user/${username}`);
            const result = await response.json();
            setUser(result);
        };
        getUser();
    }, [username]);

    return !user ? (
        <Spinner color="primary" />
    ) : !user.error ? (
        <div>
            <div style={{ margin: '50px' }}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <Identicon size="80" bg="white" string={username} />
                    <div style={{ marginLeft: '20px' }}>
                        <h2>{username}</h2>
                        <h5>Has {user.post_count} posts</h5>
                        <h5>Member of {user.joined_hubs_count} hubs</h5>
                    </div>
                </div>
                <hr />
                <h3 style={{ textAlign: 'center' }}>Posts from {username}</h3>
            </div>
            <GeneralPosts filter={username} />
        </div>
    ) : (
        <h2>This user could not be found</h2>
    );
}
