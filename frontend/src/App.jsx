import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import Dynamic from './Components/Dynamic'
import Comment from './Components/Comment'
import EditProfile from './Components/EditProfile'
import Post from './Components/Post'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import DynamicProfile from './Components/DynamicProfile'

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Register />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/home' element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/:name' element = {<Dynamic />}/>
        <Route path='/comment/:postId' element = {<Comment />}/>
        <Route path='/edit-profile' element = {<EditProfile />}/>
        <Route path='/post/:id' element = {<Post />}/>
        <Route path='/forgot-password' element = {<ForgotPassword />}/>
        <Route path='/reset-password/:token' element = {<ResetPassword />}/>
        <Route path='/profile/:id' element = {<DynamicProfile />}/>
        
      </Routes>
    </div>
  )
}

export default App