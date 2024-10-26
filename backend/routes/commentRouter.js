const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createCommentController, getAllCommentsController, getPostCommentsController, deleteCommentController } = require('../controllers/commentController')

router.post("/comment/:id",isLoggedin,createCommentController)

router.get("/all-comments",getAllCommentsController)

router.get("/post/comments/:id",getPostCommentsController)

router.delete("/delete/:postId/comment/:id",isLoggedin,deleteCommentController)

module.exports = router