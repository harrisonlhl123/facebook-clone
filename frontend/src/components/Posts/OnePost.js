import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../store/posts';

const OnePost = ({post}) => {
    const dispatch = useDispatch();

    function handleDelete(e){
        e.preventDefault();

        dispatch(deletePost(post.id))
    }

    return(
        <li>
            <Link to={`/posts/${post.id}`}>{post.body}</Link>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default OnePost;