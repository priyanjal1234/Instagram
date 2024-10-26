const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// Database Connection
const db = require('./config/db')
db()

// Routes
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const notificationRouter = require('./routes/notificationRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: 'https://instagram-1234567-frontend.onrender.com',
    credentials: true
}))

app.use("/api/users",userRouter)

app.use("/api/posts",postRouter)

app.use("/api/comments",commentRouter)

app.use("/api/notifications",notificationRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT,function() {
    console.log(`Server is running on port ${PORT}`)
})
