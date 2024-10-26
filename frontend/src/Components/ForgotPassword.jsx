import React, { useState } from 'react'
import { forgotPassword } from '../services/UserService'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setemail] = useState('')

    async function handleForgotPassword(e) {
        e.preventDefault()
        let forgotPasswordRes = await forgotPassword(email)
        if(forgotPasswordRes.status === 200) {
            toast.success("Check your email")
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <h1 className='text-3xl font-semibold mb-5'>Enter your email</h1>
            <form onSubmit={handleForgotPassword}>
                <input value={email} onChange={e => setemail(e.target.value)} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="email" placeholder='Email' name='email' />
                <input className='px-3 py-2 bg-blue-600 rounded-lg' type="submit" value={"Get link"} />
            </form>
        </div>
    )
}

export default ForgotPassword
