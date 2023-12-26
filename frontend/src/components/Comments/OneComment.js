import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';
import "./Comments.css"
import EditCommentsModal from './EditCommentsModal';
import { getUser } from '../../store/users';
import { getCommentLikes,deleteLike,createLike } from "../../store/likes"
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const OneComment = ({comment}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const commentUserId = comment.userId
    const commentUser = useSelector(getUser(commentUserId))
    const likesForComments = useSelector(getCommentLikes(comment?.id))
    let numOfLikes;

    numOfLikes = likesForComments.length ? (
        <>
            <i className="fa-solid fa-thumbs-up"></i> {likesForComments.length}
        </>
    ) : null;

    const userLiked = likesForComments.some((like) => like.userId === user?.id )
    const likeByUser = likesForComments.find((like) => like.userId === user?.id)

    function handleUnlikeClick(e) {
        e.preventDefault();

        dispatch(deleteLike(likeByUser.id))
    }

    function handleLikeClick(e) {
        e.preventDefault();

        let like = {
            userId: user.id,
            likeableId: comment.id,
            likeableType: 'Comment'
        }
        dispatch(createLike(like))
    }

    const likeButtonStyle = {
        color: userLiked ? 'blue' : 'grey',
    };

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    function handleDelete(e){
        e.preventDefault();

        if (comment.userId === user.id) {
            dispatch(deleteComment(comment.id))
        }
    }

    return(
        <div id="one-comment">
            <div id="comment-info">
                <Link to={`/users/${commentUserId}`} className="comment-link">
                    <div className="comment-profile-pic">
                        <img src={`${comment?.pfp}`}/>
                    </div>
                    <h4>{`${comment.user} ${comment.user2}`}</h4>
                </Link>
            </div>

            <p id="comment-body">{comment.body}</p>

            <div id="dropdown-container">
                {user?.id === comment.userId && (
                    <div className="dropdown">
                    <button className="dropbtn" onClick={toggleDropdown}>
                        ...
                    </button>
                    <div className={`dropdown-content ${isDropdownVisible ? 'visible' : ''}`}>
                        <EditCommentsModal commentId={comment.id} onClose={closeDropdown}/>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                    </div>
                )}
            </div>

            <div id="likes-counter-comment">
                {numOfLikes}
            </div>

            <button id="like-button-comment" onClick={userLiked ? handleUnlikeClick : handleLikeClick}>
                <i className="fa-solid fa-thumbs-up" style={likeButtonStyle}></i>
                <p style={likeButtonStyle}>Like</p>
            </button>

        </div>
    )
}

export default OneComment;