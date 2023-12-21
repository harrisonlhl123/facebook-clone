import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import postsReducer from './posts';
import usersReducer from './users';
import commentsReducer from './comments';
import likesReducer from './likes';
import friendReducer from './friends';

const rootReducer = combineReducers({
    session,
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
    likes: likesReducer,
    friends: friendReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;