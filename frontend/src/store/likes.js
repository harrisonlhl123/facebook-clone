import csrfFetch from "./csrf";

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES'
export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE'
export const REMOVE_LIKE = 'likes/REMOVE_LIKE'

const receiveLikes = likes =>({
    type: RECEIVE_LIKES,
    likes
})

const receiveLike = like =>({
    type: RECEIVE_LIKE,
    like 
})

const removeLike = likeId =>({
    type: REMOVE_LIKE,
    likeId
})

export const getLike = likeId => state => state.likes ? state.likes[likeId] : null;

export const getLikes = state => state.likes ? state.likes : [];

export const getPostLikes = postId => state => Object.values(state.likes)
    .filter(like => like.likeableId === postId && like.likeableType === 'Post');


export const getCommentLikes = commentId => state => Object.values(state.likes)
    .filter(like => like.likeableId === commentId && like.likeableType === 'Comment');


export const fetchLikes = () => async (dispatch) => {
    const response = await csrfFetch('/api/likes')

    if(response.ok){
        const likes = await response.json()
        dispatch(receiveLikes(likes))
    }
}

export const fetchLike = (likeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${likeId}`)

    if(response.ok){
        const like = await response.json()
        dispatch(receiveLike(like))
    }
}

export const createLike = (like) => async (dispatch) => {
    const { userId, likeableId, likeableType } = like 

    const response = await csrfFetch(`/api/likes`, {
        method: 'POST',
        body: JSON.stringify({
            like: { userId, likeableId, likeableType }
        })
    })

    if(response.ok){
        const like = await response.json()
        dispatch(receiveLike(like))
        return like 
    }
}


export const deleteLike = (likeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE',
    })

    if(response.ok){
        dispatch(removeLike(likeId))
    }
}

const likesReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case RECEIVE_LIKES:
            return {...action.likes};
        case RECEIVE_LIKE:
            return {...state, [action.like.id]: action.like};
        case REMOVE_LIKE:
            delete newState[action.likeId];
            return newState;
        default:
            return state;
    }
}

export default likesReducer