/** ~/routes/index.js
* Load all middleware and route handlers;
* Map HTTP method urls + urls to the
*
* NOTE All responses should be in JSON, including any message returned to the
*   front-end
*/

// TODO: instead of id as param, use username for users and title for posts?

const models  = require('../models');
const express = require('express');
const router  = express.Router();


// Import middleware
const authenticate = require('../middleware/authenticate.js')

// Import handlers
const postLoginHandler = require('./postLoginHandler');
const postLogoutHandler = require('./postLogoutHandler');
const postSignupHandler = require('./postSignupHandler');

const getAllUsersHandler = require('./getAllUsersHandler');
const getOneUserHandler = require('./getOneUserHandler');
const createUserHandler = require('./createUserHandler');
const updateUserHandler = require('./updateUserHandler');
const deleteUserHandler = require('./deleteUserHandler');

const getAllPostsHandler = require('./getAllPostsHandler');
const getOnePostHandler = require('./getOnePostHandler');
const createPostHandler = require('./createPostHandler');
const updatePostHandler = require('./updatePostHandler');
const deletePostHandler = require('./deletePostHandler');


router.post('/login', postLoginHandler);
router.post('/logout', authenticate. postLogoutHandler);
router.post('/signup', postSignupHandler);

router.get('/users', authenticate, getAllUsersHandler);
router.get('/users/:username', authenticate, getOneUserHandler);
router.post('/users', createUserHandler);
router.put('/users/:username', authenticate, updateUserHandler);
router.delete('/users/:username', authenticate, deleteUserHandler);

router.get('/posts', getAllPostsHandler);
router.get('/posts/:string_id', getOnePostHandler);
router.post('/posts', authenticate, createPostHandler);
router.put('/posts/:string_id', authenticate, updatePostHandler);
router.delete('/posts/:string_id', authenticate, deletePostHandler);


module.exports = router;
