import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OnePost from "./OnePost";
import { getPosts, fetchPosts } from '../../store/posts';
import MakePosts from './MakePosts';
import "./Posts.css"


function AllPosts() {

    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    return(
        <>
            <MakePosts />
            <ul>
                {posts.map(post => {
                    return <OnePost post={post} />
                })}
            </ul>
        </>
    )
}

export default AllPosts;