const commentModel = require("../models/comment-model");
const postModel = require("../models/post-model");
const { userModel } = require("../models/user-model");

module.exports.createPostController = async function (req, res) {
  let { caption } = req.body;
  try {
    let user = await userModel.findOne({ email: req.user.email });

    if (!req.file) {
      return res.status(400).send("No image uploaded.");
    }
    let post = await postModel.create({
      user: user._id,
      caption,
      postImage: req.file.path,
    });
    user.posts.push(post._id);
    await user.save();
    res.status(201).json({ message: "Post is created successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllPostsController = async function (req, res) {
  try {
    let allPosts = await postModel.find().populate("user");
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deletePostController = async function (req, res) {
  try {
    let posttobedeleted = await postModel.findOne({ _id: req.params.id });
    let user = await userModel.findOne({email: req.user.email})
    let deletedComments = await commentModel.deleteMany({
      post: posttobedeleted._id,
    });
    let deletedPost = await postModel.findOneAndDelete({ _id: req.params.id });
    user.posts = user.posts.filter(
      (id) => id.toString() !== posttobedeleted._id.toString()
    );

    await user.save();
    res.status(200).json({ message: "Post has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.likePostController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let posttobeliked = await postModel.findOne({ _id: req.params.id });
    if (!posttobeliked.likes.includes(user._id)) {
      posttobeliked.likes.push(user._id);
      await posttobeliked.save();
      return res.status(200).json({ message: "Post is liked" });
    } else {
      posttobeliked.likes = posttobeliked.likes.filter(
        (id) => id.toString() !== user._id.toString()
      );
      await posttobeliked.save();
      return res.status(200).json({ message: "Post is disliked" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.saveLinkController = async function (req, res) {
  let { postLink } = req.body;
  try {
    let post = await postModel.findOne({ _id: req.params.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.postLink = postLink;
    await post.save();
    return res.status(200).json({message: "Post link is saved"})
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
