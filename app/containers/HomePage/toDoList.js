import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import PostList from 'components/PostList';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import Form from './Form';
import Input from './Input';
import AtPrefix from './AtPrefix';
import { loadPosts } from '../App/toDoActions';
import { makeSelectId } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeId } from './actions';

const key = 'posts';

export function toDoList({
  currentid,
  onSubmitForm,
  onChangeId,
  posts,
  loading,
  error,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (currentid && currentid.trim().length > 0) onSubmitForm();
  }, []);

  const postsListProps = {
    loading,
    error,
    posts,
  };
  return (
    // <button onClick = {() => setIsButtonClick(true)}>DENE BAKAM</button>
    <article>
      <Form onSubmit={onSubmitForm}>
        <label htmlFor="currentid">
          <FormattedMessage {...messages.trymeMessage} />
          <AtPrefix>
            <FormattedMessage {...messages.trymeAtPrefix} />
          </AtPrefix>
          <Input
            id="2"
            type="text"
            placeholder="enter an id"
            value={currentid}
            onChange={onChangeId}
          />
        </label>
      </Form>
      <PostList {...postsListProps} />
    </article>
  );
}

toDoList.prototypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  currentid: PropTypes.string,
  onChangeId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  currentid: makeSelectId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeId: evt => dispatch(changeId(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadPosts());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(toDoList);
