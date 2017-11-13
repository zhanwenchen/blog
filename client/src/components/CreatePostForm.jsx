import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';

const CreatePostForm = ({
  onSubmit,
  onChange,
  errors,
  post,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Create a New Post</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Title"
          name="title"
          errorText={errors.title}
          onChange={onChange}
          value={post.title}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Body"
          name="body"
          errorText={errors.body}
          onChange={onChange}
          value={post.body}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Post" primary />
      </div>

    </form>
  </Card>
);

CreatePostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default CreatePostForm;
