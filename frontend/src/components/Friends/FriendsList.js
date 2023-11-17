import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const FriendsList = () => {

    // const dispatch = useDispatch();
    // const currentUser = useSelector((state) => state.session.user);
    const { userId } = useParams();
    // const user = useSelector(getUser(userId));
    const friends = useSelector(state => {
        return state.users[userId]?.friendIds.map(id => {
            return state.users[id]
        })
    })
    // const users = useSelector(getUsers);
    // const friends = currentUser.friends || [];
    // const friendsData = users.filter(user => friends.includes(user.id));


    // debugger
    return (
        <>
            <h3>Friends List will go here</h3>
            <ul>
                {friends?.map(friend => (
                    <li key={friend?.id}>{friend?.firstName} {friend?.lastName}</li>
                ))}
            </ul>
        </>
    )
}

export default FriendsList;

