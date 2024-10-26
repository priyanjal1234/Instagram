import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import HomeRight from './HomeRight'
import { getUserProfile } from '../services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentUser, setLoggedin } from '../redux/reducers/UserReducer'
import { getAllPosts } from '../services/PostService'
import { setAllPosts } from '../redux/reducers/PostReducer'

const Home = () => {
  let dispatch = useDispatch()
  let { currentUser } = useSelector(state => state.user)
  let { allPosts } = useSelector(state => state.post)
  useEffect(() => {
    async function fetchUserProfile() {
      let fetchUserProfileRes = await getUserProfile()
     
        dispatch(setcurrentUser(fetchUserProfileRes.data))
      
    }
    fetchUserProfile()
  },[currentUser])

  useEffect(() => {
    async function fetchPosts() {
      let fetchPostsRes = await getAllPosts()
      if(fetchPostsRes && fetchPostsRes.status === 200) {
        dispatch(setAllPosts(fetchPostsRes.data))
      }
    }
    fetchPosts()
  },[allPosts])

  return (
    <div className='w-full min-h-screen bg-black text-white flex'>
      <Sidebar />
     
     <Feed />
     <HomeRight />

    </div>
  )
}

export default Home
