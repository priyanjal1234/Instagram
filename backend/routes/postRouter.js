const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createPostController, getAllPostsController, deletePostController, likePostController, saveLinkController } = require('../controllers/postController')
const upload = require('../config/multerConfig')

router.post("/create",isLoggedin,upload.single("postImage"),createPostController)

router.get("/all-posts",getAllPostsController)

router.delete("/post/delete/:id",isLoggedin,deletePostController)

router.post("/post/like/:id",isLoggedin,likePostController)

router.post("/post/link/:id",isLoggedin,saveLinkController)

module.exports = router