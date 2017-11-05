-[ ] TODO: add username in addition to email in server/models/User.js, client/src/containers/SignupPage.jsx, client/src/components/SignupForm.jsx

1. You should `return` res.json in your handlers

routes/createPostHandler

If you don't `return` res.json(obj) or res.status(200).json(obj), your response IS the obj - no status so your chai `should.have.status(200)` will fail. If you return it, your object can be accessed by `res.body.obj`.

>
chai AssertionError: expected { Object: { id: ... } to have headers or getHeader method

```
// Correct code: returning res.json(...)
models.Post.create({
  UserId: req.user.id,
  title: req.body.title,
  body: req.body.body,
})
  .then(newPost => res.json({ newPost }))
  .catch((err) => {
    throw err;
  });
```

```
// Wrong code: evaluating res.json(...)
models.Post.create({
  UserId: req.user.id,
  title: req.body.title,
  body: req.body.body,
})
  .then(newPost => {
    res.json({ newPost });
  })
  .catch((err) => {
    throw err;
  });
```

1. Params vs FormData

Will throw 404 Error when DELETE /posts, because Express.js is looking for a routing entry like
```
router.delete('/posts', isLoggedIn, deletePostHandler);
```

but that's different from what we have:

```
router.delete('/posts/:string_id', isLoggedIn, deletePostHandler);
```

which requires a url parameter. When Express.js cannot find a handler for a route, it throws 404.

```
// routes/deletePostHandler.js
router.delete('/posts/:string_id', isLoggedIn, deletePostHandler); // parameters
// test/test-server.js
const deleteRes = await agent.delete('/posts').type('form').send({ string_id: newPost.string_id });
```

```

router.delete('/posts', isLoggedIn, deletePostHandler);

```

DELETE /posts 404 1.503 ms - 3437


## Comments Previously in configurePassport.js

// Lynda Chiwetelu: Using Passport With Sequelize and MySQL
// Tutorial: https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
// Github: https://github.com/lyndachiwetelu/using-passport-with-sequelize-and-mysql

// Understanding passport.js auth flow:
// http://toon.io/understanding-passportjs-authentication-flow/

// same passport instance as in app.js because passport is a singleton
// don't need to pass around passport between app.js and here, unlike
// Lynda Chiwetelu's example


// function verified(err, user, info) {
//     if (err) { return self.error(err); }
//     if (!user) { return self.fail(info); }
//     self.success(user, info);
//   }

// IDEA: deprecate configurePassport.js and move functionalities into route handlers
// IDEA for blog: use async bcrypt algo instead of sync. Tutorials are wrong because they use mongodb. Better not tie up your node.js io. Source: https://stackoverflow.com/questions/11605943/async-or-sync-bcrypt-function-to-use-in-node-js-in-order-to-generate-hashes. More on bcrypt sync vs async: https://www.npmjs.com/package/bcrypt
// IDEA for blog: point - don't store the salt in the db. Here's why: https://stackoverflow.com/questions/277044/do-i-need-to-store-the-salt-with-bcrypt. More on bcrypt salt here: https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts

// TODO: Write test cases with login failures

// IDEA: idea for blog: user does not need to be passed around either
// CHANGED: removed passport, user from Lynda Chiwetelu's example because those
//          are singletons
// BLOG: done(error, validationResult, message?) completes the authentication
//        process. validationResult != false => authentication success

// serializeUser stores specified user info in the session
// calling done(null, userInfo) in serializeUser causes
// 1. req.session.passport.user = { // our serialised user object // }
// 2. The result is also attached to the request as req.user
// done() also invokes requestHandler
// passport/Authenticator.prototype.serializeUser() is a setter
// result: req.session.passport.user = {id:'..'}

// REVIEW: what is the first argument? a generic user or the user model????
// Only put user.id into session because otherwise leak user info and impact
// performance. Although if some user information is repetitively needed,
// having frequently requested info in session could improve performance.

// console.log(req);

// get the user from our database and store it in req.user.
// query db and pass user to done

// passport/Authenticator.prototype.deserializeUser() is a setter
// result: user object attaches to the request as req.user
