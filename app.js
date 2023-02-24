const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");
const timeAgo = require('node-time-ago');
const allPosts = require('./allposts');
const singlePost = require('./singlepost');

app.use(morgan('dev'));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(allPosts(posts));

});

app.get("/posts/:id", (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id){
    const error = "ERROR 404";
    next(error);
  }
  
  res.send(singlePost(post));
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send("Post not found!");
})

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
