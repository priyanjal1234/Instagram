import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {  setLoggedin } from "../redux/reducers/UserReducer";

const Register = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { isLoggedin } = useSelector(state => state.user)
    const [register, setregister] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        if(isLoggedin) {
            return navigate("/home")
        }
        return navigate("/")
    },[])

    function handleRegisterChange(e) {
        let { name,value } = e.target 
        setregister({...register,[name]:value})
    }

    async function handleRegisterSubmit(e) {
        e.preventDefault()
        let registerUserRes = await registerUser(register)
        if(registerUserRes.status === 201) {
            toast.success("Registration Successfull")
            dispatch(setLoggedin(true))
            navigate("/home")
        }
    }

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center gap-8 text-white">
        <div>
            <img src="../hello.png" alt="" />
        </div>
        <div className="w-[350px] h-[500px] border-2 border-zinc-700 p-8">
            <div className="w-full flex justify-center mb-8">
            <img
                className="w-[190px]"
                src="https://github.com/asynchronousJavascriptor/instaclone/blob/main/public/images/logo.png?raw=true"
                alt=""
            />
            </div>
            <form onSubmit={handleRegisterSubmit}>
            <input
                className="w-full px-3 py-2 block mb-3 bg-[#121212] outline-none"
                type="text"
                placeholder="Name"
                name="name"
                value={register.name}
                onChange={handleRegisterChange}
            />
            <input
                className="w-full px-3 py-2 block mb-3 bg-[#121212] outline-none"
                type="text"
                placeholder="Username"
                name="username"
                value={register.username}
                onChange={handleRegisterChange}
            />
            <input
                className="w-full px-3 py-2 block mb-3 bg-[#121212] outline-none"
                type="email"
                placeholder="Email"
                name="email"
                value={register.email}
                onChange={handleRegisterChange}
            />
            <input
                className="w-full px-3 py-2 block mb-3 bg-[#121212] outline-none"
                type="password"
                placeholder="Password"
                name="password"
                value={register.password}
                onChange={handleRegisterChange}
            />
            <input
                className="w-full h-[40px] bg-[#0095F6] rounded-full"
                type="submit"
                value={"Continue"}
            />
            </form>
            <span className="block mt-3">Already have an account? <Link className="text-blue-600" to={'/login'}>Login</Link></span>
        </div>
        </div>
    );
};

export default Register;
