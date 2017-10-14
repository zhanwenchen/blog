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
