/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectPosts = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.posts,
  );

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectPosts,
};
