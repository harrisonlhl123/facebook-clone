import csrfFetch from "./csrf.js";

export const RECEIVE_USER = "users/RECEIVE_USER";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const getUser = userId => state => state.users ? state.users[userId] : null;

export const fetchUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);

    if(response.ok){
        const user = await response.json();
        debugger
        dispatch(receiveUser(user.user));
    }
}

const usersReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case RECEIVE_USER:
            return {...newState, [action.user.id]: action.user};
        default:
            return state;
    }
}

export default usersReducer