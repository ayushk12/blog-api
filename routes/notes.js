const express = require("express");
const router = express.Router();
const {
  getPosts,
  newPost,
  editPost,
  deletePost
} = require("../controllers/posts");

router.get("/getAllPosts", getPosts);
router.post("/newPost", newPost);
router.put("/editPost", editPost);
router.delete("/deletePost", deletePost);

module.exports = router;
