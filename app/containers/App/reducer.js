/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_POSTS_SUCCESS, LOAD_POSTS, LOAD_POSTS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  //currentid: false,
  userData: {
    posts: false,
  },
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_POSTS:
        draft.loading = true;
        draft.error = false;
        draft.userData.posts = false;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.userData.posts = action.posts;
        draft.loading = false;
        draft.currentid = action.currentid;
        break;
      case LOAD_POSTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
