import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import "./Posts.css"
import EditPostsModal from './EditPostsModal';
import { getUser } from '../../store/users';
import AllComments from '../Comments/AllComments';
import MakeComments from '../Comments/MakeComments';
import { getPostLikes, deleteLike, createLike } from "../../store/likes";



const OnePost = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const postUserId = post.authorId
    const postUser = useSelector(getUser(postUserId))
    let likesForPost = useSelector(getPostLikes(post?.id))
    let numOfLikes;

    numOfLikes = likesForPost.length ? (
        <>
            <i className="fa-solid fa-thumbs-up"></i> {likesForPost.length}
        </>
    ) : null;

    const userliked = likesForPost.some((like) => like.userId === user.id )
    const likeByUser = likesForPost.find((like) => like.userId === user.id)

    function handleUnlikeClick(e) {
        e.preventDefault();

        dispatch(deleteLike(likeByUser.id))
    }

    function handleLikeClick(e) {
        e.preventDefault();

        let like = {
            userId: user.id,
            likeableId: post.id,
            likeableType: 'Post'
        }
        dispatch(createLike(like))
    }

    const likeButtonStyle = {
        color: userliked ? 'blue' : 'grey',
    };

    function handleDelete(e){
        e.preventDefault();

        if (post.authorId === user.id) {
            dispatch(deletePost(post.id))
        }
    }

    return(
        <div className='one-post'>
            <div id="post-comment-separator">
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

                <div id="likes-counter-post">
                    {numOfLikes}
                </div>
            </div>

            <div id="like-comment-post">
                <button id="like-button-post" onClick={userliked ? handleUnlikeClick : handleLikeClick}>
                    <i className="fa-solid fa-thumbs-up" style={likeButtonStyle}></i>
                    <p style={likeButtonStyle}>Like</p>
                </button>

                <button
                    id="comment-button-post"
                    onClick={() => {
                        const commentsSection = document.getElementById(`comments-section-${post.id}`);
                        if (commentsSection) {
                            commentsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    >
                    <i class="fa-regular fa-comment"></i>
                    Comment
                </button>
            </div>

            <br></br>

            <div id="edit-and-delete-buttons">
                {user.id === post.authorId && <EditPostsModal postId={post.id}/>}

                {user.id === post.authorId && <button onClick={handleDelete}>Delete</button>}
            </div>

            <br></br>

            <AllComments postId={post.id}/>
            <div id={`comments-section-${post.id}`}>
                <MakeComments postId={post.id} />
            </div>
            {/* <MakeComments postId={post.id}/> */}
        </div>
    )
}

export default OnePost;