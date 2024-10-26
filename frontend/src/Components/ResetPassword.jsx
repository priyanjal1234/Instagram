import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../services/UserService'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    let { token } = useParams()
    let navigate = useNavigate()
    const [newPassword, setnewPassword] = useState('')

    async function handleResetPassword(e) {
        e.preventDefault()
        let resetPasswordRes = await resetPassword(token,newPassword)
        if(resetPasswordRes.status === 200) {
            toast.success("Password Reset Successfully")
            navigate("/login")
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <h1 className='text-3xl font-semibold mb-5'>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <input className='px-3 py-2 bg-zinc-700 outline-none mr-4' value={newPassword} onChange={e => setnewPassword(e.target.value)} type="password" placeholder='New Password' name='newPassword' />
                <input className='px-3 py-2 bg-blue-600 rounded-lg' type="submit" value={"Reset"} />
            </form>
        </div>
    )
}

export default ResetPassword
