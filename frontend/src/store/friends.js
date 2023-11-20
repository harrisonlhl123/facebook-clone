import csrfFetch from "./csrf.js";
import { receiveUsers } from "./users.js"

export const getFriends = state => state.users ? Object.values(state.users) : [];

export const fetchFriends = () => async (dispatch) => {
    const response = await csrfFetch('/api/friends');

    if(response.ok){
        const friends = await response.json();
        dispatch(receiveUsers(friends));
    }
}