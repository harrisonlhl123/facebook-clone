import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "./Friends.css"

const FriendsList = () => {

    const { userId } = useParams();

    const friends = useSelector(state => {
        return state.users[userId]?.friendIds.map(id => {
            return state.users[id]
        })
    })

    return (
        <div id="profile-friends-box">
            <h3>Friends</h3>
            <ul>
                {friends?.map(friend => (
                        <Link to={`/users/${friend?.id}`}><li id="profile-friends-list" key={friend?.id}>{friend?.firstName} {friend?.lastName}</li></Link>
                ))}
            </ul>
        </div>
    )
}

export default FriendsList;

