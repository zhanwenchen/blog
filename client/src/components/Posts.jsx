import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Post from './Post.jsx';

const TEASER_NUM_OF_CHARS = 30;

const Posts = ({
  errors,
  posts,
}) => (
  <div className="posts">
    {/* {errors.summary && <p className="error-message">{errors.summary}</p>} */}
    {posts.length === 0 && <p>There are currently no posts</p>}
    {posts.length > 0 && <p> what </p> &&
      posts.map(post => (
        <Post
          key={post.string_id}
          errors={errors}
          stringId={post.string_id}
          author={`${post.User.firstName} ${post.User.lastName}`}
          title={post.title}
          body={_.truncate(post.body, {
            length: TEASER_NUM_OF_CHARS,
            separator: /,?\.* +/,
          })}
          // TODO: find a more performant way to format date strings
          createdAt={new Date(post.createdAt).toString()}
          updatedAt={new Date(post.updatedAt).toString()}
        />
      ))
    }
  </div>
);

Posts.propTypes = {
  errors: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(Post).isRequired,
};

export default Posts;
