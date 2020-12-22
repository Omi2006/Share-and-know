import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { ListGroup } from 'reactstrap';
import { Search, usePrefersReducedMotion } from '../General';
import { UserRow } from './';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const prefersReducedMotion = usePrefersReducedMotion();

    const transitions = useTransition(users, user => user.id, {
        enter: {
            transform: 'scale(1)',
            opacity: 1,
        },
        from: {
            transform: 'scale(0)',
            opacity: 0,
        },
        leave: {
            transform: 'scale(0)',
            opacity: 0,
        },
        immediate: prefersReducedMotion,
    });

    useEffect(() => {
        if (search !== '') {
            const getUsers = async () => {
                const response = await fetch(
                    `/knowledge/users?search=${search}`
                );
                const result = await response.json();
                setUsers(result);
            };
            getUsers();
        }
    }, [search]);

    return (
        <div className="wrapper" style={{ marginTop: '30px' }}>
            <h2 style={{ textAlign: 'center' }}>Users</h2>
            <Search
                type="users"
                setSearch={setSearch}
                setCurrentPage={() => {}}
            />
            {users.length > 0 ? (
                <ListGroup flush className="item-list">
                    {transitions.map(({ props, key, item }) => (
                        <animated.div
                            key={key}
                            style={{ ...props, width: '100%' }}
                        >
                            <UserRow user={item.username} />
                        </animated.div>
                    ))}
                </ListGroup>
            ) : (
                <h3 style={{ textAlign: 'center' }}>
                    No users match your search!
                </h3>
            )}
        </div>
    );
}
