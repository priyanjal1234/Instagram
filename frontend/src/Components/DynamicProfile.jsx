import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSpecificUser } from '../services/UserService'
import { useSelector } from 'react-redux'

const DynamicProfile = () => {
    let { currentUser } = useSelector(state => state.user)
    let { id } = useParams()
    const [user, setuser] = useState({})

    useEffect(() => {
        async function fetchSpecificUser() {
            let fetchSpecificUserRes = await getSpecificUser(id)
            if(fetchSpecificUserRes.status === 200) {
                setuser(fetchSpecificUserRes.data)
            }
        }
        fetchSpecificUser()
    },[])
    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <div className='w-full flex justify-between items-center'>
            <h1 className='text-3xl font-semibold mb-5'>{currentUser && user && currentUser._id === user._id ? `Hello, ${user && user.name}` : `Profile of ${user && user.name}`}</h1>
            <Link to={'/home'} className='text-blue-600'>Go back to home</Link>
            </div>
            <p className='text-lg mb-4'>Name: {user && user.name}</p>
            <p className='text-lg mb-4'>Username: {user && user.username}</p>
            <p className='text-lg mb-4'>Email: {user && user.email}</p>
            <p className='text-lg mb-4'>Followers: {user && user.followers && user.followers.length}</p>
            <p className='text-lg mb-4'>Following: {user && user.following && user.following.length}</p>
            <p className='text-lg mb-4'>Posts: {user && user.posts && user.posts.length}</p>
            {
               currentUser && user && currentUser._id === user._id ? <Link className='px-3 py-2 bg-blue-600 rounded-lg' to={'/edit-profile'}>Edit Profile</Link> : "" 
            }
        </div>
    )
}

export default DynamicProfile
