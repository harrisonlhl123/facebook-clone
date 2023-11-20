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
            <h3>Friends</h3>
            <ul>
                {friends?.map(friend => (
                    <>
                        <img src={`${friend?.pfp}`} id="contact-list-newsfeed"/>
                        <Link to={`/users/${friend?.id}`}><li key={friend?.id} id="contact-friends-list">{friend?.firstName} {friend?.lastName}</li></Link>
                    </>
                ))}
            </ul>
        </>
    )
}

export default ContactsList;