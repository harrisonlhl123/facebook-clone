import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId]);

    return (
        <>
            <h1>Profile Page</h1>
            <h1>{user?.id}</h1>
            <h1>{user?.firstName}</h1>
            <h1>{user?.lastName}</h1>
            <Link to="/">Back</Link>
        </>
    )
}

export default ProfilePage;