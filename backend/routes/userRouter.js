const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  getUserProfileController,
  updateProfileController,
  followUserController,
  unfollowUserController,
  forgotPasswordController,
  resetPasswordController,
  getAllUsersController,
  searchUserController,
  getSpecificUserController,
} = require("../controllers/userController");
const { isLoggedin } = require("../middlewares/isLoggedin");
const upload = require("../config/multerConfig");

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/profile", isLoggedin, getUserProfileController);

router.put(
  "/update/profile",
  isLoggedin,
  upload.single("profilePicture"),
  updateProfileController
);

router.post("/follow/:id", isLoggedin, followUserController);

router.post("/unfollow/:id", isLoggedin, unfollowUserController);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password/:token", resetPasswordController);

router.get("/all-users",getAllUsersController)


router.get("/user/profile/:id",getSpecificUserController)

module.exports = router;
