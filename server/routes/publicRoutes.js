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

const router = express.Router();

// Import middleware

// Import handlers
const postLoginHandler = require('./postLoginHandler');
const postSignupHandler = require('./postSignupHandler');

const getAllPostsHandler = require('./getAllPostsHandler');
const getOnePostHandler = require('./getOnePostHandler');


router.post('/login', postLoginHandler); // NOTE: using passport.authenticate
router.post('/signup', postSignupHandler); // NOTE: using passport.authenticate


router.get('/posts', getAllPostsHandler);
router.get('/posts/:string_id', getOnePostHandler);

module.exports = router;
