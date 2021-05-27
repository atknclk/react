import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR } from './constants';

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function postsLoaded(posts) {
  return {
    type: LOAD_POSTS_SUCCESS,
    posts,
  };
}

export function postsLoadingError(error) {
  return {
    type: LOAD_POSTS_ERROR,
    error,
  };
}
