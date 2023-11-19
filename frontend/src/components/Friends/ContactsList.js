import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, fetchUsers } from '../../store/users';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ContactsList = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    // const friends = useSelector(state => {
    //     return state.users[userId]?.friendIds.map(id => {
    //         return state.users[id]
    //     })
    // })
    const users = useSelector(getUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const friends = currentUser.friends || [];
    const friendsData = users.filter(user => friends.includes(user.id));

    return (
        <>
            <h3>Friends</h3>
            <ul>
                {friendsData?.map(friend => (
                    <li key={friend?.id}>{friend?.firstName} {friend?.lastName}</li>
                ))}
            </ul>
        </>
    )
}

export default ContactsList;