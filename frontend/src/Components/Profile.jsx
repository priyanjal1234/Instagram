import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/UserService'
import { toast } from 'react-toastify'
import { setLoggedin } from '../redux/reducers/UserReducer'

const Profile = () => {
    let { currentUser } = useSelector(state => state.user)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    async function handleLogout() {
        let logoutUserRes = await logoutUser()
        if(logoutUserRes.status === 200) {
            toast.success("Logout Successfull")
            dispatch(setLoggedin(false))
            navigate("/login")
        }
    }

    return (
        <div className='text-white p-10 w-full'>
        <div className='w-full flex justify-between items-center'>
        <h1 className='text-3xl mb-5'>Hello, {currentUser && currentUser.name}</h1>
        <span onClick={handleLogout} className='text-red-500 cursor-pointer'>Logout</span>
        <Link to={'/home'} className='text-blue-600'>Go back to home</Link>
        </div>
        <p className="text-lg mb-4">Name: {currentUser && currentUser.name}</p>
        <p className="text-lg mb-4">Username: {currentUser && currentUser.username}</p>
        <p className="text-lg mb-4">Email: {currentUser && currentUser.email}</p>
        {
            currentUser && currentUser.bio ? <p className='text-lg mb-4'>Bio: {currentUser.bio}</p> : ""
        }
        <p className="text-lg mb-4">Followers: {currentUser && currentUser.followers && currentUser.followers.length}</p>
        <p className='text-lg mb-4'>Following: {currentUser && currentUser.following && currentUser.following.length}</p>
        <p className="text-lg mb-6">Posts: {currentUser && currentUser.posts && currentUser.posts.length}</p>
        <Link to={'/edit-profile'} className='px-3 py-2 bg-blue-600 rounded-lg'>Edit Profile</Link>
        </div>
    )
}

export default Profile
