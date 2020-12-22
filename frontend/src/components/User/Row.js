import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Identicon from 'react-identicons';
import '../../style/user.css';

export default function UserRow({ user }) {
    const navigate = useNavigate();
    const goToUser = () => navigate(`/users/${user}`);

    return (
        <ListGroupItem onClick={goToUser} className="item">
            <Identicon string={user} size="35" bg="white" />
            <div style={{ marginLeft: '20px' }}>
                <h6>{user}</h6>
                <Link to={`/users/${user}`} aria-label="see user">
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                    <span className="visually-hidden">See user</span>
                </Link>
            </div>
        </ListGroupItem>
    );
}
