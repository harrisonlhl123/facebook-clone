import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import "./Posts.css"

const OnePost = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    function handleDelete(e){
        e.preventDefault();

        
        if (post.authorId === user.id) {
            dispatch(deletePost(post.id))
        }
    }

    return(
        <div className='one-post'>
            <h3>{post.author}</h3>
            <h3>{post.body}</h3>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default OnePost;