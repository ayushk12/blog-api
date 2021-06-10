const User = require("../models/User");
const Post = require("../models/Notes");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc        get all posts
// @route       GET /api/posts/getPosts
// @access      private
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.user });

  return res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @desc        create a new note
// @route       POST /api/posts/newNote
// @access      private
exports.newPost = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  let note = await Post.create({ user: req.user, title, description });



  return res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc        edit  a note
// @route       PUT /api/posts/editNote
// @access      private
exports.editPost = asyncHandler(async (req, res, next) => {
  const { id, title, description } = req.body;

  let note = await Post.findById(id);

  if (req.user !== note.user.toString()) {
    return next(new ErrorResponse("Not authorized to update", 401));
  }

  note = await Post.findByIdAndUpdate(id, req.body, { new: true });



  if (!note) {
    return next(new ErrorResponse("No note found to update", 404));
  }

  return res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc        delete a note
// @route       POST /api/posts/deleteNote
// @access      private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const note = await Post.findByIdAndRemove(req.body.id);

  if (!note) {
    return next(new ErrorResponse("No note found to delete", 404));
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});
