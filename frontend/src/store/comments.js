import csrfFetch from "./csrf.js";

export const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
})

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
})

export const getComment = commentId => state => state.comments ? state.comments[commentId] : null;


export const getComments = state => state.comments ? state.comments : [];

export const fetchComments = () => async (dispatch) => {
    const response = await csrfFetch('/api/comments');

    if(response.ok){
        const comments = await response.json();
        dispatch(receiveComments(comments));
    }
}

export const fetchComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`);

    if(response.ok){
        const comment = await response.json();
        dispatch(receiveComment(comment));
    }
}

export const createComment = (comment) => async (dispatch) => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(comment)
    });

    if (response.ok){
        const comment = await response.json();
        dispatch(receiveComment(comment));
    }
}

export const updateComment = (comment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        body: JSON.stringify(comment)
    });

    if (response.ok){
        const comment = await response.json();
        dispatch(receiveComment(comment));
    }

    return response;
}

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok){
        dispatch(removeComment(commentId));
    }
}

const commentsReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case RECEIVE_COMMENTS:
            return {...newState, ...action.comments};
        case RECEIVE_COMMENT:
            return {...newState, [action.comment.id]: action.comment};
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}

export default commentsReducer