import React, { PropTypes } from 'react';
import _ from 'lodash';
import Post from '../components/Post.jsx';

const GET_POST_URL = stringId => `/api/posts/${stringId}`;

class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      stringId: '',
      title: '',
      body: '',
      author: '',
      createdAt: null,
      updatedAt: null,
    };
  }

  componentDidMount() {
    const paramStringId = this.props.params.stringId;
    fetch(GET_POST_URL(paramStringId))
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });

                localStorage.setItem('successMessage', responseJson.message);
                const possiblePost = responseJson.post;
                if (!_.isEmpty(possiblePost) && _.isObject(possiblePost)) {
                  // const {
                  //   stringId,
                  //   title,
                  //   author,
                  //   body,
                  //   createdAt,
                  //   updatedAt,
                  // } = possiblePost;
                  this.setState({
                    stringId: possiblePost.string_id,
                    title: possiblePost.title,
                    author: possiblePost.author,
                    body: possiblePost.body,
                    createdAt: possiblePost.createdAt,
                    updatedAt: possiblePost.updatedAt,
                  });
                } else {
                  // TODO: handle 404 error in the front-end
                  throw new TypeError('post does not exist');
                }
                break;
              }
              default: {
                const errors = responseJson.errors ? responseJson.errors : {};
                errors.summary = responseJson.message;

                this.setState({
                  errors,
                });
              }
            }
          })
          .catch((error) => { throw error; });
      });
  }

  render() {
    return (
      <Post
        errors={this.state.errors}
        // post={this.state.post}
        stringId={this.state.stringId}
        author={this.state.author}
        title={this.state.title}
        body={this.state.body}
        createdAt={this.state.createdAt}
        updatedAt={this.state.updatedAt}
      />
    );
  }
}

export default PostPage;
