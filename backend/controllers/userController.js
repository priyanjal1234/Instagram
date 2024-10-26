const {
  validateUser,
  userModel,
  validateLogin,
} = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports.registerController = async function (req, res) {
  let { name, username, email, password } = req.body;
  try {
    let result = validateUser({ name, username, email, password });
    if (result && result.error) {
      return res.status(400).json({ message: result.error.message });
    }
    let user = await userModel.findOne({ email });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    user = await userModel.create({
      name,
      username,
      email,
      password: hash,
    });
    let token = jwt.sign({ name, username, email }, process.env.JWT_KEY);
    res.cookie("token", token, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginController = async function (req, res) {
  let { email, password } = req.body;
  try {
    let result = validateLogin({ email, password });
    if (result && result.error) {
      return res.status(400).json({ message: result.error.message });
    }
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { email, name: user.name, username: user.username },
          process.env.JWT_KEY
        );
        res.cookie("token", token, {
          maxAge: 365 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "You are logged in" });
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutController = function (req, res) {
  try {
    res.cookie("token", "");
    res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserProfileController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.updateProfileController = async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let updatedUser;
  try {
    if (req.file) {
      updatedUser = await userModel.findOneAndUpdate(
        { email: req.user.email },
        {
          name: req.body.name || user.name,
          username: req.body.username || user.username,
          bio: req.body.bio || user.bio,
          profilePicture: req.file.path || user.profilePicture,
        },
        { new: true }
      );
    } else {
      updatedUser = await userModel.findOneAndUpdate(
        { email: req.user.email },
        {
          name: req.body.name || user.name,
          username: req.body.username || user.username,
          bio: req.body.bio || user.bio,
        },
        { new: true }
      );
    }
    if (!updatedUser) {
      return res.status(404).json({ message: "Updated user not found" });
    }
    res.status(200).json({ message: "Profile has been updated Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.followUserController = async function (req, res) {
  try {
    let currentUser = await userModel.findOne({ email: req.user.email });
    let usertobefollowed = await userModel.findOne({ _id: req.params.id });
    if (
      !currentUser.following.includes(usertobefollowed._id) &&
      !usertobefollowed.followers.includes(currentUser._id)
    ) {
      currentUser.following.push(usertobefollowed._id);
      usertobefollowed.followers.push(currentUser._id);
      await currentUser.save();
      await usertobefollowed.save();
      return res.status(200).json({ message: "User is followed" });
    } else {
      res.status(400).json({ message: "You are already following this user" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.unfollowUserController = async function (req, res) {
  try {
    let currentUser = await userModel.findOne({ email: req.user.email });
    let usertobeunfollowed = await userModel.findOne({ _id: req.params.id });
    if (
      currentUser.following.includes(usertobeunfollowed._id) &&
      usertobeunfollowed.followers.includes(currentUser._id)
    ) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== usertobeunfollowed._id.toString()
      );
      usertobeunfollowed.followers = usertobeunfollowed.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
      await currentUser.save();
      await usertobeunfollowed.save();
      res.status(200).json({ message: "User is unfollowed" });
    } else {
      return res.status(400).json({ message: "User is unfollowed already" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.forgotPasswordController = async function (req, res) {
  let { email } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    let resettoken = crypto.randomBytes(15).toString("hex");
    user.resetPasswordToken = resettoken;
    await user.save();
    const resetUrl = `http://localhost:5173/reset-password/${resettoken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "priyanjal362@gmail.com",
        pass: "tlcj lzyw nseo joth",
      },
    });
    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: resetUrl,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.resetPasswordController = async function (req, res) {
  let { newPassword } = req.body;
  try {
    let user = await userModel.findOne({
      resetPasswordToken: req.params.token,
    });
    if (!user)
      return res.status(404).json({ message: "User with the token not found" });
    let newSalt = await bcrypt.genSalt(10);
    let newHash = await bcrypt.hash(newPassword, newSalt);
    user.password = newHash;
    await user.save();
    res.status(200).json({ message: "Password is reset successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllUsersController = async function (req, res) {
  try {
    let allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getSpecificUserController = async function (req, res) {
  try {
    let user = await userModel.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
