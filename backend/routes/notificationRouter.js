const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createLikeNotificationController, getUserNotificationsController } = require('../controllers/notificationController')

router.post("/create/like/:userId",isLoggedin,createLikeNotificationController)

router.get("/get/:id",getUserNotificationsController)

module.exports = router