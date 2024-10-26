import React, { useState } from 'react'
import { editProfile } from '../services/UserService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const EditProfile = () => {
  let navigate = useNavigate()
  const [profilePicture, setprofilePicture] = useState()
  const [name, setname] = useState('')
  const [username, setusername] = useState('')
  const [bio, setbio] = useState('')

  async function handleEditProfile(e) {
    e.preventDefault()
    let formdata = new FormData()
    formdata.append("profilePicture",profilePicture)
    formdata.append("name",name)
    formdata.append("username",username)
    formdata.append("bio",bio)
    let editProfileRes = await editProfile(formdata)
    if(editProfileRes.status === 200) {
      toast.success("Profile is updated")
      navigate("/home")
    }
  }

  return (
    <div className='w-full h-screen bg-zinc-900 p-10 text-white'>
      <div className='w-full flex justify-between'>
      <h1 className='text-3xl font-semibold mb-4'>Edit Your Profile</h1>
      <Link to={'/home'} className='text-blue-600'>Go back to home</Link>
      </div>
      <form onSubmit={handleEditProfile}>
        <input onChange={e => setprofilePicture(e.target.files[0])} type="file" name='profilePicture' />
        <input value={name} onChange={e => setname(e.target.value)} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="text" placeholder='Name' name='name' />
        <input value={username} onChange={e => setusername(e.target.value)} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="text" placeholder='Username' name='username' />
        <input value={bio} onChange={e => setbio(e.target.value)} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="text" placeholder='Bio' name='bio' />
        <input className='px-3 py-2 bg-blue-600 rounded-lg' type="submit" value={"Update"} />
      </form>
    </div>
  )
}

export default EditProfile
