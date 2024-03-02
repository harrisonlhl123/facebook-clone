import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from '../../store/friends';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ContactsList = () => {

    const currentUserId = useSelector((state) => state.session.user.id);

    const friends = useSelector(state =>  state.users[currentUserId]?.friends?.map((friendId) => {
        return state.users[friendId]
    }))

    return (
        <>
            <ul>
                {friends?.map((friend) => (
                    <li key={friend?.id} id="contact-friends-list">
                        <div id="contact-container">
                            <Link to={`/users/${friend?.id}`}>
                                <img src={`${friend?.pfp}`} id="contact-list-newsfeed" alt="Friend" />
                                <div id="friend-name-contact">
                                    {friend?.firstName} {friend?.lastName}
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ContactsList;