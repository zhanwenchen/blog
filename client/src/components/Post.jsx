import { Card, CardText } from 'material-ui/Card';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Post = ({
  errors,
  post,
}) => (
  <Card className="container">
    {errors.summary && <p className="error-message">{errors.summary}</p>}

    <p>Author: {post.author}. Posted on {post.createdAt}</p>
    <p>Last updated on {post.updatedAt}</p>
    <h2 className="card-heading">{post.title}</h2>

    {post.body}

  </Card>
);

Post.propTypes = {
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default Post;
