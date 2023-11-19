import React from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import "./Posts.css"
import EditPostsModal from './EditPostsModal';
// import EditPosts from './EditPosts';

const OnePost = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    function handleDelete(e){
        e.preventDefault();

        
        if (post.authorId === user.id) {
            dispatch(deletePost(post.id))
        }
    }

    // function handleEdit(e) {
    //     e.preventDefault();

    //    return (
    //         <EditPosts />
    //    )
    // }

    return(
        <div className='one-post'>
            <h3>{`${post.author} ${post.author2}`}</h3>

            <p id="posts-body">{post.body}</p>

            <img src={`${post?.photo}`} />

            <br></br>


            {/* <button onClick={handleEdit}>Edit</button> */}
            <div id="edit-and-delete-buttons">
                {user.id === post.authorId && <EditPostsModal postId={post.id}/>}

                {user.id === post.authorId && <button onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    )
}

export default OnePost;