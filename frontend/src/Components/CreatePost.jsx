import React, { useRef, useState } from 'react'
import { createPost } from '../services/PostService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    let imageRef = useRef(null)
    let navigate = useNavigate()
    const [caption, setcaption] = useState('')
    const [postImage, setpostImage] = useState()

    async function handleCreatePost(e) {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append("caption",caption)
        formdata.append("postImage",postImage)
        let createPostRes = await createPost(formdata)
        if(createPostRes.status === 201) {
            toast.success("Post Created Successfully")
            navigate("/home")
        }
    }

    return (
        <div className='w-full min-h-screen bg-black flex pt-8 text-white items-center flex-col gap-5'>
            <button onClick={() => imageRef.current.click()} className='px-3 py-2 bg-blue-600 rounded-lg'>
                Upload Image
            </button>
            <form onSubmit={handleCreatePost}>
                <input ref={imageRef} onChange={e => setpostImage(e.target.files[0])} className='hidden' type="file" name='postImage' />
                <input value={caption} onChange={e => setcaption(e.target.value)} name='caption' placeholder='Enter Caption' type="text" className='w-[450px] pl-4 h-[45px] border-2 border-white bg-transparent outline-none block' />
                <div className='w-[450px] flex justify-center'>
                <input type="submit" value={"Create"} className='px-3 py-2 mt-3 block bg-blue-600 rounded-lg' />
                </div>
            </form>
        </div>
    )
}

export default CreatePost
