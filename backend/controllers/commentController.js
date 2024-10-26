const commentModel = require("../models/comment-model");
const postModel = require("../models/post-model");
const { userModel } = require("../models/user-model");
const { post } = require("../routes/commentRouter");

module.exports.createCommentController = async function (req, res) {
  let { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let post = await postModel.findOne({ _id: req.params.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    let comment = await commentModel.create({
      content,
      post: post._id,
      user: user._id,
    });
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json({ message: "Comment is created" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllCommentsController = async function (req, res) {
  try {
    let allComments = await commentModel.find();
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getPostCommentsController = async function (req, res) {
  try {
    let post = await postModel.findOne({ _id: req.params.id });
    let postComments = await commentModel
      .find({ post: post._id })
      .populate("user");
    res.status(200).json(postComments);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deleteCommentController = async function (req, res) {
  try {
    let comment = await commentModel.findOne({_id: req.params.id})
    let post = await postModel.findOne({_id: req.params.postId})
    let deletedComment = await commentModel.findOneAndDelete({
      _id: req.params.id,
    });
    post.comments = post.comments.filter(id => id.toString() !== comment._id.toString())
    await post.save()
    res.status(200).json({ message: "Comment Deleted" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
