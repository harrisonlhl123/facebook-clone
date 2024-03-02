import csrfFetch from "./csrf.js";

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";

const receiveUser = payload => ({
    type: RECEIVE_USER,
    payload
})

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})

// export const getUser = userId => state => state.users ? state.users[userId] : null;
export const getUser = userId => state => {
    if (state.users) {
      const user = Object.values(state.users).find(user => user.id == userId);
      return user ? { ...user } : null;
    }
    return null;
};

export const getUsers = state => state.users ? Object.values(state.users) : [];

export const fetchUser = (userId) => async (dispatch) => {
    // debugger
    const response = await csrfFetch(`/api/users/${userId}`);

    if(response.ok){
        const user = await response.json();
        // debugger
        dispatch(receiveUser(user));
    }
}

export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');

    if(response.ok){
        const users = await response.json();
        dispatch(receiveUsers(users));
    }
}

const usersReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case RECEIVE_USER:
            return {...newState, ...action.payload.users};
        case RECEIVE_USERS:
            return {...newState, ...action.users};
        default:
            return state;
    }
}

export default usersReducer