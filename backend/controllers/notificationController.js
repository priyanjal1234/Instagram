const notificationModel = require("../models/notification-model");
const postModel = require("../models/post-model");
const { userModel } = require("../models/user-model");

module.exports.createLikeNotificationController = async function (req, res) {
  try {
    let { id } = req.body;
    let fromUser = await userModel.findOne({ email: req.user.email });
    let post = await postModel.findOne({ _id: id });
    let user = await userModel.findOne({ _id: req.params.userId });
    let notification = await notificationModel.create({
      user: user._id,
      post: post._id,
      type: "like",
      fromUser: fromUser._id,
      message: post.likes.includes(fromUser._id)
        ? `${fromUser.name} liked your post`
        : `${fromUser.name} disliked your post`,
    });
    res.status(201).json(notification.message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserNotificationsController = async function (req, res) {
  let { id } = req.params;
  try {
    let notifications = await notificationModel.find({ user: id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
