/** ~/routes/index.js
* Load all middleware and route handlers;
* Map HTTP method urls + urls to the
*
* NOTE All responses should be in JSON, including any message returned to the
*   front-end
*/

// IDEA: instead of id as param, use username for users and title for posts?
// IDEA: implement updateUserHandler
// IDEA: implement deleteUserHandler
// IDEA: implement updatePostHandler
// IDEA: implement deletePostHandler
// IDEA: implement /comments routes and handlers

const express = require('express');

// Import middleware
const isLoggedIn = require('../middleware/isLoggedIn.js');

// Import handlers
const postLoginHandler = require('./postLoginHandler');
const postLogoutHandler = require('./postLogoutHandler');
const postSignupHandler = require('./postSignupHandler');

const getAllUsersHandler = require('./getAllUsersHandler');
const getOneUserHandler = require('./getOneUserHandler');
// const updateUserHandler = require('./updateUserHandler');
// const deleteUserHandler = require('./deleteUserHandler');

const getAllPostsHandler = require('./getAllPostsHandler');
const getOnePostHandler = require('./getOnePostHandler');
const createPostHandler = require('./createPostHandler');
// const updatePostHandler = require('./updatePostHandler');
const deletePostHandler = require('./deletePostHandler');

const router = express.Router();

router.post('/login', postLoginHandler); // NOTE: using passport.authenticate
router.post('/logout', isLoggedIn, postLogoutHandler);
router.post('/signup', postSignupHandler); // NOTE: using passport.authenticate

router.get('/users', isLoggedIn, getAllUsersHandler);
router.get('/users/:username', isLoggedIn, getOneUserHandler);
// router.put('/users/:username', isLoggedIn, updateUserHandler);
// router.delete('/users/:username', isLoggedIn, deleteUserHandler);

router.get('/posts', getAllPostsHandler);
router.get('/posts/:string_id', getOnePostHandler);
router.post('/posts', isLoggedIn, createPostHandler);
// router.put('/posts/:string_id', isLoggedIn, updatePostHandler);
router.delete('/posts/:string_id', isLoggedIn, deletePostHandler);

module.exports = router;
