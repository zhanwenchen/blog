import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Posts from '../components/Posts.jsx';

const GET_ALL_POSTS_URL = '/api/posts';

class AllPostsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      posts: [],
    };
  }

  componentDidMount() {
    fetch(GET_ALL_POSTS_URL)
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });

                localStorage.setItem('successMessage', responseJson.message);
                const possiblePosts = responseJson.posts;
                if (!_.isEmpty(possiblePosts) && Array.isArray(possiblePosts)) {
                  this.setState({
                    posts: possiblePosts,
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
      <Posts
        errors={this.state.errors}
        posts={this.state.posts}
      />
    );
  }
}

export default AllPostsPage;
