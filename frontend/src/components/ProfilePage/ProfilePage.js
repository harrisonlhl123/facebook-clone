import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import FriendsList from '../Friends/FriendsList';
import MakePosts from '../Posts/MakePosts';
import AllPosts from '../Posts/AllPosts';
import "./ProfilePage.css";
import { getUserPosts } from '../../store/posts';

const ProfilePage = () => {
    const dispatch = useDispatch();
    //profile page user
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const currentUser = useSelector((state) => state.session.user);
    let userPosts = useSelector(getUserPosts(userId))

    
    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId]);

    return (
        <div id="profile-page">
            <div id="cover-photo">
                <img src={`${user?.cover}`} />
            </div>
            <div id="profile-info-container">
                <div id="profile-pic">
                    <img src={`${user?.pfp}`} />
                </div>
                <div id="profile-info">
                    <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
                </div>
            </div>
            <div id="profile-container">
                <div id="profile-left">
                    <div id="bio">
                        <h3>Bio</h3>
                        <p>{`${user?.bio}`}</p>
                    </div>
                    <div id="profile-friends-list">
                        <FriendsList />
                    </div>
                </div>
                <div id="profile-right">
                    {currentUser && currentUser.id === user.id && <MakePosts />}
                    {/* <MakePosts /> */}
                    <AllPosts posts={userPosts}/>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    )
}

export default ProfilePage;