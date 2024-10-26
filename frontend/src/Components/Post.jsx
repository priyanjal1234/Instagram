import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const Post = () => {
    let {id} = useParams()
    let {allPosts} = useSelector(state => state.post)
    let post = allPosts && allPosts.filter(post => post._id === id)[0]
    return (
        <div className='w-full h-screen bg-black text-white flex flex-col gap-5 items-center justify-center'>
            <div className='flex items-center gap-5'>
                <h1 className='text-3xl font-semibold'>This is read only</h1>
                <Link to={'/'} className='text-blue-600'>Visit Website</Link>
            </div>
            <div className='w-[400px] h-fit border-2 border-zinc-600'>
                <div className='w-full h-[450px] border-b-2 border-zinc-600'>
                    <img className='w-full h-full object-cover' src={post && post.postImage} alt="" />
                </div>

            </div>
        </div>
    )
}

export default Post
