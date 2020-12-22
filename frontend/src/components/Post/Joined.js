import React from 'react';
import { GeneralPosts } from './';

export default function JoinedHubs() {
    return (
        <>
            <h3 style={{ textAlign: 'center' }}>
                Posts from hubs you belong to
            </h3>
            <GeneralPosts filter="joined" />
        </>
    );
}
