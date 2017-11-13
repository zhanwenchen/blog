import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

const Post = ({
  errors,
  stringId,
  author,
  title,
  body,
  createdAt,
  updatedAt,
}) => (
  <Card className="container">
    {errors && errors.summary && <p className="error-message">{errors.summary}</p>}

    <h2 className="card-heading"><Link to={stringId}>{title}</Link></h2>
    <p>Author: {author}. Posted on {createdAt}</p>
    <p>Last updated on {updatedAt}</p>

    <CardText>{body}</CardText>

  </Card>
);

Post.propTypes = {
  errors: PropTypes.object.isRequired,
  stringId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  updatedAt: PropTypes.instanceOf(Date).isRequired,
};

export default Post;
