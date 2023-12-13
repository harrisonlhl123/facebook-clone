import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from '../../store/friends';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ContactsList = () => {

    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id);
    const friends = useSelector(state =>  state.users[currentUserId]?.friendIds?.map((friendId) => {
        return state.users[friendId]
    }))

    useEffect(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    return (
        <>
            <ul>
                {friends?.map((friend) => (
                    <li key={friend?.id} id="contact-friends-list">
                        <div id="contact-container">
                            <img src={`${friend?.pfp}`} id="contact-list-newsfeed" alt="Friend" />
                            <Link to={`/users/${friend?.id}`}>
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