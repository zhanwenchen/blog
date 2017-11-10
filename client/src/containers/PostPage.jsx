import React, { PropTypes } from 'react';
import _ from 'lodash';
import Post from '../components/Post.jsx';

const GET_POST_URL = stringId => `/api/posts/${stringId}`;

class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      post: {
        stringId: '',
        title: '',
        body: '',
        author: '',
        createdAt: null,
        updatedAt: null,
      },
    };
  }

  componentDidMount() {
    console.log('PostPage')
    const paramStringId = this.props.params.stringId;
    fetch(GET_POST_URL(paramStringId))
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {

                console.log('responseJson is', responseJson)
                this.setState({
                  errors: {},
                });

                localStorage.setItem('successMessage', responseJson.message);
                const possiblePost = responseJson.post;
                if (!_.isEmpty(possiblePost) && _.isObject(possiblePost)) {
                  this.setState({
                    post: possiblePost,
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
        post={this.state.post}
      />
    );
  }
}

export default PostPage;
