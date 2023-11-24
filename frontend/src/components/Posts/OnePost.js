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
    let postLikes = useSelector(getPostLikes(post.id))
    let likesCounter;

    if (postLikes.length){
        likesCounter = <div id = "likescounterContainer">
        <i className="fa-solid fa-thumbs-up"></i> {postLikes.length} 
        </div>
    }

    const likesBool = postLikes.some((like) => like.userId === user.id )
    const userLike = postLikes.find((like) => like.userId === user.id)

    const handleUnlikeClick = ()=>{
        dispatch(deleteLike(userLike.id))
    }

    const handleLikeClick = ()=>{
        let like = {
            userId: user.id,
            likeableId: post.id,
            likeableType: 'Post'
        }
        dispatch(createLike(like))
    }

    let likesButton
    if (likesBool){
        likesButton = <p onClick={handleUnlikeClick} id ="postsUnlike" >Like</p>
    }else{
        likesButton = <p onClick={handleLikeClick} id ="postsLike"> Like</p>
    }



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

            <div id="likes-counter-container">
                {likesCounter}
            </div>

            <button id="like-button">{likesButton}</button>

            <br></br>

            <div id="edit-and-delete-buttons">
                {user.id === post.authorId && <EditPostsModal postId={post.id}/>}

                {user.id === post.authorId && <button onClick={handleDelete}>Delete</button>}
            </div>

            <br></br>

            <AllComments postId={post.id}/>
            <MakeComments postId={post.id}/>
        </div>
    )
}

export default OnePost;