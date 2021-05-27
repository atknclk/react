/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectId = () =>
  createSelector(
    selectHome,
    homeState => homeState.currentid,
  );

export { selectHome, makeSelectId };
