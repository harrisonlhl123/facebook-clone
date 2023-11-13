import csrfFetch from "./csrf.js";

export const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
export const RECEIVE_POST = "posts/RECEIVE_POST";
export const REMOVE_POST = "posts/REMOVE_POST";

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})

const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

const removePost = postId => ({
    type: REMOVE_POST,
    postId
})

export const getPost = postId => state => state.posts ? state.posts[postId] : null;


export const getPosts = state => state.posts ? state.posts : [];

export const fetchPosts = () => async (dispatch) => {
    const response = await csrfFetch('api/posts');

    if(response.ok){
        const posts = await response.json();
        dispatch(receivePosts(posts));
    }
}

export const fetchPost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`api/posts/${postId}`);

    if(response.ok){
        const post = await response.json();
        dispatch(receivePost(post));
    }
}

export const createPost = (post) => async (dispatch) => {
    const response = await csrfFetch('api/posts', {
        method: 'POST',
        body: JSON.stringify(post)
        // headers: {
        //     "Content-Type": "application/json"
        // }
    });

    if (response.ok){
        const post = await response.json();
        dispatch(receivePost(post));
    }
}

export const updatePost = (post) => async (dispatch) => {
    const response = await csrfFetch(`api/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok){
        const post = await response.json();
        dispatch(receivePost(post));
    }
}

export const deletePost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`api/posts/${postId}`, {
        method: 'DELETE'
    })

    if (response.ok){
        dispatch(removePost(postId));
    }
}

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
        default:
            return state;
    }
}

export default postsReducer