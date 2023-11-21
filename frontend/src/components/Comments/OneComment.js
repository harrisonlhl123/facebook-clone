import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';
import "./Comments.css"
import EditComments from "./EditComments"
import { getUser } from '../../store/users';

const OneComment = ({comment}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const commentUserId = comment.userId
    const commentUser = useSelector(getUser(commentUserId))

    function handleDelete(e){
        e.preventDefault();

        if (comment.userId === user.id) {
            dispatch(deleteComment(comment.id))
        }
    }

    return(
        <div id="one-comment">
            <div id="comment-info">
                <div className="comment-profile-pic">
                    <img src={`${comment?.pfp}`}/>
                </div>
                <h4>{`${comment.user} ${comment.user2}`}</h4>
            </div>

            <p id="comment-body">{comment.body}</p>

            <br></br>

            <div id="comments-edit-delete-buttons">
                {user.id === comment.userId && <EditComments commentId={comment.id}/>}
                {user.id === comment.userId && <button onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    )
}

export default OneComment;