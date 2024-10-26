import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedin } from "../redux/reducers/UserReducer";

const Login = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let { isLoggedin } = useSelector(state => state.user)
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if(isLoggedin) {
      return navigate("/home")
    }
    return navigate("/login")
  },[])

  function handleLoginChange(e) {
    let { name,value } = e.target 
    setlogin({...login,[name]:value})
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    let loginUserRes = await loginUser(login)
    if(loginUserRes.status === 200) {
      toast.success("Login Successfull")
      dispatch(setLoggedin(true))
      navigate("/home")
    }
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center gap-8 text-white">
      <div>
        <img src="../hello.png" alt="" />
      </div>
      <div className="w-[350px] h-[370px] border-2 border-zinc-700 p-8">
        <div className="w-full flex justify-center mb-8">
          <img
            className="w-[190px]"
            src="https://github.com/asynchronousJavascriptor/instaclone/blob/main/public/images/logo.png?raw=true"
            alt=""
          />
        </div>
        <form onSubmit={handleLoginSubmit}>
          <input
            className="px-3 py-2 w-full bg-[#121212] mb-5 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={handleLoginChange}
          />
          <input
            className="px-3 py-2 w-full bg-[#121212] mb-5 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={handleLoginChange}
          />
          <input
            className="w-full h-[40px] bg-[#0095F6] rounded-full"
            type="submit"
            value={"Login"}
          />
        </form>
        <span className="block mt-3">
          Don't have an account?{" "}
          <Link className="text-blue-600" to={"/"}>
            Sign up
          </Link>
        </span>
        <Link to={'/forgot-password'} className="block mt-2 text-blue-600">Forgot Password</Link>
      </div>
    </div>
  );
};

export default Login;
