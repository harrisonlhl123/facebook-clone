import csrfFetch from "./csrf.js";
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "./comments.js";

export const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
export const RECEIVE_POST = "posts/RECEIVE_POST";
export const REMOVE_POST = "posts/REMOVE_POST";

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

const removePost = postId => ({
    type: REMOVE_POST,
    postId
})

export const getPost = postId => state => state.posts ? state.posts[postId] : null;

export const getPosts = state => state.posts ? state.posts : [];

export const getUserPosts = userId => state => Object.values(state.posts)
    .filter(post => post.authorId == userId || post.feedId == userId)

export const fetchPosts = () => async (dispatch) => {
    const response = await csrfFetch('/api/posts');

    if(response.ok){
        const posts = await response.json();
        dispatch(receivePosts(posts));
    }
}

export const fetchPost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`);

    if(response.ok){
        const post = await response.json();
        dispatch(receivePost(post));
    }
}

export const createPost = (post) => async (dispatch) => {
    const { body, feed_id, photo } = post;
    const response = await csrfFetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ body, feed_id, photo })
        // headers: {
        //     "Content-Type": "application/json"
        // }
    });

    if (response.ok){
        const createdPost = await response.json();
        dispatch(receivePost(createdPost));
    }
}

export const updatePost = (post) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify(post)
        // headers: {
        //     "Content-Type": "application/json"
        // }
    });

    if (response.ok){
        const post = await response.json();
        dispatch(receivePost(post));
    }

    return response;
}

export const deletePost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })

    if (response.ok){
        dispatch(removePost(postId));
    }
}

export const uploadPost = (post) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts`, {
      method: "POST",
      body: post.newPost,
    });
  
    if (res.ok) {
      let data = await res.json();
      dispatch(receivePost(data));
      return data;
    }
  };

const postsReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case RECEIVE_POSTS:
            return {...newState, ...action.posts};
        case RECEIVE_POST:
            return {...newState, [action.post.id]: action.post};
        case REMOVE_POST:
            delete newState[action.postId];
            return newState;
        case RECEIVE_COMMENT:
            let post = state[action.comment.postId];
            let commentIds = post.commentIds;
            let newCommendIds = commentIds.includes(action.comment.id) ? commentIds : [action.comment.id, ...commentIds]
            let newPost = {
                ...post,
                commentIds: newCommendIds
            };
            return {...newState, [action.comment.postId]: newPost};
        case REMOVE_COMMENT:
            let removedCommentPost = state[action.comment.post_id];
            let removedPostCommentIds = [...(removedCommentPost.commentIds)];
            let updatedPost = {
                ...removedCommentPost,
                commentIds: removedPostCommentIds.filter(ele => ele != action.comment.post_id)
            };
            return {...newState, [action.comment.post_id]: updatedPost};            
        default:
            return state;
    }
}

export default postsReducer