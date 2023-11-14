import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import "./Posts.css"
import EditPosts from './EditPosts';

const OnePost = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    function handleDelete(e){
        e.preventDefault();

        
        if (post.authorId === user.id) {
            dispatch(deletePost(post.id))
        }
    }

    function handleEdit(e) {
        e.preventDefault();

       return (
            <EditPosts />
       )
    }

    return(
        <div className='one-post'>
            <h3>{`${post.author} ${post.author2}`}</h3>

            <p id="posts-body">{post.body}</p>

            <br></br>

            <button onClick={handleEdit}>Edit</button>

            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default OnePost;