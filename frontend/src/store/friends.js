import csrfFetch from "./csrf.js";
import { receiveUsers } from "./users.js"

const CREATE_FRIEND = 'friends/CREATE_FRIEND';
const DESTROY_FRIEND = 'friends/DESTROY_FRIEND';

export const createFriend = friend => ({
    type: CREATE_FRIEND,
    friend,
});
  
export const destroyFriend = friendId => ({
    type: DESTROY_FRIEND,
    friendId,
});

export const getFriends = state => state.users ? Object.values(state.users) : [];

export const fetchFriends = () => async (dispatch) => {
    const response = await csrfFetch('/api/friends');

    if(response.ok){
        const friends = await response.json();
        dispatch(receiveUsers(friends));
    }
}