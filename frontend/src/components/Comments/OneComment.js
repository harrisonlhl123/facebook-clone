import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';
import "./Comments.css"
import EditCommentsModal from './EditCommentsModal';
import { getUser } from '../../store/users';
import { getCommentLikes,deleteLike,createLike } from "../../store/likes"

const OneComment = ({comment}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const commentUserId = comment.userId
    const commentUser = useSelector(getUser(commentUserId))

    const commentLikes = useSelector(getCommentLikes(comment?.id))
    let likesCounter;

    if(commentLikes.length){
        likesCounter = <div id = "commentlikesContainer">
        <i className="fa-solid fa-thumbs-up"></i> {commentLikes.length} 
        </div>
    }

    const likesBool = commentLikes.some((like) => like.userId === user.id )
    const userLike = commentLikes.find((like) => like.userId === user.id)

    const handleUnlikeClick = ()=>{
        dispatch(deleteLike(userLike.id))
    }

    const handleLikeClick = ()=>{
        let like = {
            userId: user.id,
            likeableId: comment.id,
            likeableType: 'Comment'
        }
        dispatch(createLike(like))
    }
    
    let likesButton
    if (likesBool){
        likesButton = <p onClick={handleUnlikeClick} id ="commentsunlike" >Like</p>
    }else{
        likesButton = <p onClick={handleLikeClick} id ="commentslike"> Like</p>
    }

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

            <div id="comments-edit-delete-buttons">
                {user.id === comment.userId && <EditCommentsModal commentId={comment.id}/>}
                {user.id === comment.userId && <button onClick={handleDelete}>Delete</button>}
            </div>

            <div>{likesCounter}</div>
            {likesButton}

        </div>
    )
}

export default OneComment;