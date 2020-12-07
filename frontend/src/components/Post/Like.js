import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchCsrf } from '../Auth/fetchCsrf';
import { Badge } from 'reactstrap';
import { LoggedInContext } from '../Auth';
import '../../style/post.css';

export default function LikeButton({ likes, uuid, setLikes }) {
    const loggedIn = useContext(LoggedInContext);
    const usernames = likes.map(user => user.username);

    const handleLike = async () => {
        const result = await fetchCsrf(`/knowledge/post/${uuid}`, {}, 'PUT');
        if (result.errors) {
            alert('An error has occured. Try again later.');
        } else {
            setLikes(result.likes);
        }
    };

    return (
        <div>
            {loggedIn && (
                <button onClick={handleLike} className="like-button">
                    <FontAwesomeIcon
                        icon={faHeart}
                        title="like button"
                        className={
                            usernames.includes(loggedIn)
                                ? 'dislike-icon'
                                : 'like-icon'
                        }
                    />
                    <span className="visually-hidden">
                        {usernames.includes(loggedIn) ? 'Like' : 'Dislike'}
                        the post
                    </span>
                </button>
            )}
            <Badge pill color="info">
                {likes.length}
            </Badge>
        </div>
    );
}
