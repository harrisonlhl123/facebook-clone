import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OnePost from "./OnePost";
import { getPosts, fetchPosts } from '../../store/posts';
import "./Posts.css"


function AllPosts() {

    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    return(
        <>
            <ul>
                {Object.values(posts).map(post => {
                    return <OnePost post={post} key={post.id}/>
                })}
            </ul>
        </>
    )
}

export default AllPosts;