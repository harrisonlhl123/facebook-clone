import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "./Friends.css"

const FriendsList = () => {

    const { userId } = useParams();

    const friends = useSelector(state => {
        return state.users[userId]?.friendIds?.map(id => {
            return state.users[id]
        })
    })

    return (
        <div id="profile-friends-box">
            <h3>Friends</h3>
            <ul className="friends-list">
            {friends?.length > 0 &&
                friends?.map((friend, index) => (
                <div id="friend-container" key={friend?.id}>
                    <Link to={`/users/${friend?.id}`}>
                        <img src={`${friend?.pfp}`} id="friends-list-profile" alt={`Friend ${index + 1}`} />
                        <div id="friend-name-profile">
                            {friend?.firstName} {friend?.lastName}
                        </div>
                    </Link>
                </div>
                ))}
            </ul>
        </div>
    )
}

export default FriendsList;

