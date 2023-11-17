import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import FriendsList from '../Friends/FriendsList';
import MakePosts from '../Posts/MakePosts';
import AllPosts from '../Posts/AllPosts';
import "./ProfilePage.css";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId]);

    return (
        <div id="profile-page">
            <div id="cover-photo">
                <p>Cover photo will be here</p>
            </div>
            <div id="profile-info-container">
                <div id="profile-pic">
                    <i class="fa-regular fa-user"></i>
                </div>
                <div id="profile-info">
                    <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
                </div>
            </div>
            <div id="profile-container">
                <div id="profile-left">
                    <div id="bio">
                        <h3>Bio will be here</h3>
                    </div>
                    <div id="profile-friends-list">
                        <FriendsList />
                    </div>
                </div>
                <div id="profile-right">
                    <MakePosts />
                    <AllPosts />
                </div>
            </div>
            <div class="clearfix"></div>

            <Link to="/">Back</Link>
        </div>
    )
}

export default ProfilePage;