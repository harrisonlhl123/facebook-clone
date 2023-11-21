import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import "./Posts.css"
import EditPostsModal from './EditPostsModal';
import { getUser } from '../../store/users';
import AllComments from '../Comments/AllComments';
import MakeComments from '../Comments/MakeComments';

const OnePost = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const postUserId = post.authorId
    const postUser = useSelector(getUser(postUserId))

    function handleDelete(e){
        e.preventDefault();

        
        if (post.authorId === user.id) {
            dispatch(deletePost(post.id))
        }
    }

    return(
        <div className='one-post'>
            <div className="post-info">
                <div className="post-profile-pic">
                    <img src={`${post?.pfp}`} />
                </div>
                <h3>{`${post.author} ${post.author2}`}</h3>
            </div>

            <p id="posts-body">{post.body}</p>

            {post.photo && (
                <div className="post-photo-container">
                    <img src={`${post.photo}`} id="post-photo" />
                </div>
            )}

            <br></br>

            <div id="edit-and-delete-buttons">
                {user.id === post.authorId && <EditPostsModal postId={post.id}/>}

                {user.id === post.authorId && <button onClick={handleDelete}>Delete</button>}
            </div>

            <br></br>

            <AllComments />
            <MakeComments />
        </div>
    )
}

export default OnePost;