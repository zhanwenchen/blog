import React from 'react';
import PropTypes from 'prop-types';
import { BrowserHistory, Router } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm.jsx';
import Auth from '../modules/Auth';

const CREATE_POST_URL = '/api/private/posts';

export default class CreatePostPage extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);

    // set the initial comonent state
    this.state = {
      errors: {},
      post: {
        title: '',
        body: '',
      },
    };

    /**
     * processForm and changeUser have a fixed "this"
     * (an instance of SignupPage) wherever they end up.
     * Otherwise when they are called in the DOM,
     * "this" will be the DOM "Window" instance, where
     * "Window.processForm" and "Window.changeUser"
     * will be "undefined".
     */
    this.processForm = this.processForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * @function handleInputChange
   * @description Update the state.post object when user changes the form
   * @param {Object} event - the JavaScript event object
   */
  handleInputChange(event) {
    const field = event.target.name;
    const post = this.state.post;
    post[field] = event.target.value;

    this.setState({
      post,
    });
  }

  /**
   * @function processForm
   * @description process the form
   * @param {Object} event - the JavaScript event Object
   */
  processForm(event) {
    // prevent default action. In this case, action is the form submission
    event.preventDefault();

    const data = JSON.stringify({
      title: this.state.post.title,
      body: this.state.post.body,
    });

    fetch(CREATE_POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: data,
    })
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });
                localStorage.setItem('successMessage', responseJson.message);
                // redirect to login
                const newPostStringId = responseJson.post.string_id;
                const newPostURL = `/posts/${newPostStringId}`;
                this.props.history.push(newPostURL);
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
          });
      })
      .catch((error) => { throw error; });
  }

  /**
  * @function render
  *
  */
  render() {
    return (
      <CreatePostForm
        onSubmit={this.processForm}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        post={this.state.post}
      />
    );
  }
}
